import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/IPokemon';
import { GetPokeService } from 'src/app/services/get-poke.service';

@Component({
  selector: 'app-list-accepted',
  template: `
  <h2>Squadra: </h2>
  <ng-container *ngIf="myPoke">
    <ng-container *ngFor="let data of myPoke">
      <div class="alert alert-primary d-flex" role="alert" (click)="this.submitted.emit(data.id)">
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
  @Input() myPoke!: Pokemon[];
  @Output() submitted = new EventEmitter<number>();

  constructor(public getService: GetPokeService) {
  }

  ngOnInit(): void { }

}
