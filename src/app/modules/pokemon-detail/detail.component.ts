import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/IPokemon';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-detail',
  template: `
   <ng-container *ngIf="myPoke">
      
   <div class="card" style="width: 40rem;">
   <h5 class="card-title">#{{myPoke.id}} {{myPoke.name}}</h5>
  <img class="card-img-top" style="max-width:50%;" src="{{myPoke.sprites.front_default}}" alt="Card image cap">
  <div class="card-body">

<div class="d-flex">
    <div>
        <h3>Statistiche</h3>
        <ng-container *ngFor="let b of myPoke.stats">
          <div class="d-flex">
            <p>{{b.stat.name}}</p>:
            <p>{{b.base_stat}}</p>
            </div>
        </ng-container>
        <p class="card-text"></p>
        <!--a href="#" class="btn btn-primary">Torna Indietro</a-->
    </div>

    <div class="ms-5" >
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
</div>
   </ng-container>
  `,
  styles: [
  ]
})
export class DetailComponent implements OnInit {
  public myPoke!: Pokemon;

  constructor(private activatedRoute: ActivatedRoute, public getService: GetPokeService) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const status = this.activatedRoute.snapshot.paramMap.get('status');

    status == 'onSquad' ? this.getService.pokeOnSquad$.subscribe(data => {
      const pokemon = data.find((poke) => poke.id === id)
      if (pokemon) { this.myPoke = pokemon };
    }) :
      this.getService.pokeRejected$.subscribe(data => {
        const pokemon = data.find((poke) => poke.id === id)
        if (pokemon) { this.myPoke = pokemon };
      });;

  }

}
