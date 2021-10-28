import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/IPokemon';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-home',
  template: `

<div class="d-flex justify-content-center">

    <app-list-declined [myPoke]="myPokeRejected" (submitted)="getDetails($event)"></app-list-declined>


    <ng-container *ngIf="this.getService.isLoading">
    <div class="card d-flex justify-content-center">
          <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></span>
        <span class="sr-only">Loading...</span>
      </button>
    </div>
    </ng-container>

    <ng-container *ngIf="pokemon$ | async as poke">

        <div class="card me-5 ms-5">
            <h1 class="card-title mb-5">{{poke.name}}</h1>
            <img class="card-img-top"  src="{{poke.sprites.front_default}}">
            <div class="card-body">
                <h5 class="mb-3 card-text">Dettagli:</h5>
                <p class="card-text">Id: {{poke.id}}</p>
                <p class="card-text">Weight: {{poke.weight}}</p>
                <p class="card-text">Height: {{poke.height}}</p>
                <div class="d-flex justify-content-between mb-3">
                    <button href="#" class="btn btn-success" (click)="capture(poke)">Cattura</button>
                    <button href="#" class="btn btn-danger" (click)="reject(poke)">Rifiuta</button>
                </div>
                <p class="lol">E' apparso un {{poke.name | uppercase}} selvatico!</p>
            </div>
        </div>
    </ng-container>

    <app-list-accepted [myPoke]="myPokeSquad" (submitted)="getDetails($event)"></app-list-accepted>

</div>
`,
  styles: [
    `
.card{
width: 18rem !important;
height: 50rem !important;
background-color: rgb(0,0,0);
background-color: rgba(0,0,0,0.79);
}

.card-text{
color: white;
}

.card-title{
color:white;
}
.lol{
color: yellow;
}
`
  ]
})
export class HomeComponent implements OnInit {
  public pokemon$!: Observable<Pokemon>;
  public myPokeSquad: Pokemon[] = [];
  public myPokeRejected: Pokemon[] = [];


  constructor(public getService: GetPokeService, private router: Router) { }

  ngOnInit(): void {
    this.refresh();
  }

  capture(poke: Pokemon) {
    this.getService.add(poke, 'onSquad');

    this.getService.allPokemon$.subscribe(data => {
      const pokemon = data.filter((poke) => poke.status === 'onSquad')
      if (pokemon) { this.myPokeSquad = pokemon };
    });

    this.refresh();
  }

  reject(poke: Pokemon) {
    this.getService.add(poke, 'noSquad');

    this.getService.allPokemon$.subscribe(data => {
      const pokemon = data.filter((poke) => poke.status === 'noSquad')
      if (pokemon) { this.myPokeRejected = pokemon };
    });

    this.refresh();
  }

  refresh() {
    this.getService.isLoading = true;
    this.getService.allPokemon$.subscribe(data => {
      const pokemon = data.filter((poke) => poke.status === 'onSquad')
      if (pokemon) { this.myPokeSquad = pokemon };
    });

    this.getService.allPokemon$.subscribe(data => {
      const pokemon = data.filter((poke) => poke.status === 'noSquad')
      if (pokemon) { this.myPokeRejected = pokemon };
    });

    this.pokemon$ = this.getService.getRandomPokemon();
  }

  getDetails(id: number) {
    this.router.navigate(['/detail', id]);
  }

}