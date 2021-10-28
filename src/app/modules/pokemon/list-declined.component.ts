import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/IPokemon';

@Component({
  selector: 'app-list-declined',
  template: `
<h2>Pokemon Rifiutati: {{myPoke.length}}</h2>
<div class="overflow-auto" style="height:90vh;">
<ng-container *ngIf="myPoke">
    <ng-container *ngFor="let data of myPoke">
       
            <div class="alert alert-primary d-flex" role="alert" (click)="this.submitted.emit(data.id)">
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
  @Input() myPoke!: Pokemon[];
  @Output() submitted = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

}