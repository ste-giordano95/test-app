import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ListAcceptedComponent } from './list-accepted.component';
import { ListDeclinedComponent } from './list-declined.component';
import { PokemonDetailModule } from '../pokemon-detail/pokemon-detail.module';



@NgModule({
  declarations: [
    HomeComponent,
    ListAcceptedComponent,
    ListDeclinedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PokemonModule { }
