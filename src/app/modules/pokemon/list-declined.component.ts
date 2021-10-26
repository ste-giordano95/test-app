import { Component, OnInit } from '@angular/core';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-list-declined',
  template: `
  <h2>Pokemon Rifiutati: {{this.getService.declinedArr.length}}</h2>
  <ng-container *ngIf="this.getService.pokeRejected$ | async as poke">
      <ng-container *ngFor="let data of poke">
      <div class="alert alert-primary d-flex" role="alert">
          <img src="{{data.sprites.front_default}}" alt="">
          <p>#{{data.id}}</p>
          <p class="ml-3">{{data.name}}</p>
      </div>
      </ng-container>
  </ng-container>
  `,
  styles: [
    `
    `
  ]
})
export class ListDeclinedComponent implements OnInit {

  constructor(public getService: GetPokeService) { }

  ngOnInit(): void {
  }

}
