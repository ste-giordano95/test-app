import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-list-declined',
  template: `
  <h2>Pokemon Rifiutati: {{this.getService.declinedArr.length}}</h2>
  <div class="overflow-auto" style="height:90vh;">
  <ng-container *ngIf="this.getService.pokeRejected$ | async as poke">
      <ng-container *ngFor="let data of poke">
      <div class="alert alert-primary d-flex" role="alert" (click)="getDetails(data.id)">
          <img src="{{data.sprites.front_default}}" alt="">
          <p>#{{data.id}}</p>
          <p class="ml-3">{{data.name}}</p>
      </div>
      </ng-container>
  </ng-container>
  </div>
  `,
  styles: [
    `
    `
  ]
})
export class ListDeclinedComponent implements OnInit {

  constructor(public getService: GetPokeService, private router: Router) { }

  ngOnInit(): void {
  }

  getDetails(id: number) {
    this.router.navigate(['/detail', id, 'noSquad']);
  }

}
