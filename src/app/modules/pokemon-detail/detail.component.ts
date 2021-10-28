import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/IPokemon';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-detail',
  template: `
<div class="d-flex justify-content-center">
    <ng-container *ngIf="myPoke">

        <div class="card" style="width: 40rem;">
            <h1 class="card-title text-center">#{{myPoke.id}} {{myPoke.name}}</h1>
            <img class="card-img-top align-items-center" style="max-width:50%;" src="{{myPoke.sprites.front_default}}" alt="Card image cap">
            <div class="card-body">

                <div class="d-flex justify-content-center">
                    <div>
                        <h3 class="card-text">Statistiche</h3>
                        <ng-container *ngFor="let b of myPoke.stats">
                            <div class="d-flex card-text">
                                <p>{{b.stat.name}}</p>:
                                <p>{{b.base_stat}}</p>
                            </div>
                        </ng-container>
                        <p class="card-text"></p>
                        <!--a href="#" class="btn btn-primary">Torna Indietro</a-->
                    </div>

                    <div class="ms-5 card-text">
                        <h3>Mosse</h3>
                        <div class="overflow-auto" style="height:50vh;">
                            <ng-container *ngFor="let b of myPoke.moves">
                                <p>{{b.move.name}}</p>
                            </ng-container>
                        </div>
                        <p class="card-text"></p>
                        <!--a href="#" class="btn btn-primary">Torna Indietro</a-->
                    </div>

                </div>

            </div>
            <button class="btn btn-primary" (click)="back()" >Go to Home</button>
        </div>
    </ng-container>
</div>
  `,
  styles: [`
    .card{
    
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.79);
  }

  .card-text{
     color: white;
    }

    .card-title{
      color:white;
    }
  `]
})
export class DetailComponent implements OnInit {
  public myPoke!: Pokemon;

  constructor(private activatedRoute: ActivatedRoute, public getService: GetPokeService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.getService.allPokemon$.subscribe(data => {
      const pokemon = data.find((poke) => poke.id === id)
      if (pokemon) { this.myPoke = pokemon };
    });
  }

  back(): void {
    this.router.navigate(['/home']);
  }

}
