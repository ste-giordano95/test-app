import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/IPokemon';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-home',
  template: `

  <div class="d-flex">

  <app-list-declined></app-list-declined>


    <ng-container *ngIf="pokemon | async as poke">

      <div class="card me-5 ms-5" style="width: 18rem;">
      <h1 class="card-title mb-5">{{poke.name}}</h1>
       <img class="card-img-top" src="{{poke.sprites.front_default}}" alt="{{poke.name}}">
        <div class="card-body">
         <h5 class="mb-3">Dettagli:</h5>
         <p class="card-text">Id: {{poke.id}}</p>
         <p class="card-text">Weight: {{poke.weight}}</p>
         <p class="card-text">Height: {{poke.height}}</p>
         <button href="#" class="btn btn-success" (click)="capture(poke)" >Cattura</button>
         <button href="#" class="btn btn-danger" (click)="reject(poke)">Rifiuta</button>
         <p>E' apparso un {{poke.name}} selvatico!</p>
       </div>
      </div>
    </ng-container>

    <app-list-accepted></app-list-accepted>

    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  public pokemon!: Observable<Pokemon>;

  constructor(public getService: GetPokeService) { }

  ngOnInit(): void {
    this.refresh();
  }

  capture(poke: Pokemon) {
    this.getService.addToSquad(poke);
    this.refresh();
  }

  reject(poke: Pokemon) {
    this.getService.addToRejected(poke);
    this.refresh();
  }

  refresh() {
    this.pokemon = this.getService.getRandomPokemon();
  }

}
