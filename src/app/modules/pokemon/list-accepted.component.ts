import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-list-accepted',
  template: `
  <h2>Squadra:</h2>
  <ng-container *ngIf="this.getService.pokeOnSquad$ | async as poke">
    <ng-container *ngFor="let data of poke">
      <div class="alert alert-primary d-flex" role="alert" (click)="getDetails(data.id)">
       
        <p>#{{data.id}}</p>
          <p class="ml-3">{{data.name}}</p>
          <img src="{{data.sprites.front_default}}" alt="">
        
          <button class="btn btn-danger" (click)="getService.deleteFromSquad(data)">Elimina</button>
      </div>
    </ng-container>
  </ng-container>
  `,
  styles: [
  ]
})
export class ListAcceptedComponent implements OnInit {

  constructor(public getService: GetPokeService, private router: Router) { }

  ngOnInit(): void {

  }

  getDetails(id: number) {
    this.router.navigate(['/detail', id, 'onSquad']);
  }

}
