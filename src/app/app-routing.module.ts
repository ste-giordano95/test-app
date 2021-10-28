import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './modules/pokemon-detail/detail.component';
import { HomeComponent } from './modules/pokemon/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'detail/:id',
    loadChildren: () => import('./modules/pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule), component: DetailComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
