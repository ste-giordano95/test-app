import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Pokemon } from '../models/IPokemon';

@Injectable({
  providedIn: 'root'
})
export class GetPokeService {
  private URL: string = 'https://pokeapi.co/api/v2/pokemon/';

  private allPokemon!: BehaviorSubject<Pokemon[]>;
  public allPokemon$!: Observable<Pokemon[]>;

  public allPokemonArr: Pokemon[] = [];




  constructor(private http: HttpClient) {
    this.allPokemon = new BehaviorSubject<Pokemon[]>([]);
    this.allPokemon$ = this.allPokemon.asObservable();

  }

  public getRandomPokemon(): Observable<Pokemon> {

    const randomNum = Math.floor(Math.random() * 898) + 1;

    return this.http.get<Pokemon>(this.URL + randomNum).pipe(
      retry(3),
      tap(() => console.log('Get pokemom random eseguito')),
      catchError(this.handleError)
    )
  }

  public getPokemonById(id: number): {} {
    return this.allPokemon$.subscribe(data => data.find((poke) => { poke.id === id }));

  }

  add(poke: Pokemon, status: string) {
    poke.status = status;

    status == 'onSquad' ?
      this.allPokemonArr.filter(poke => poke.status == 'onSquad').length < 6 ? this.allPokemonArr.push(poke) :
        alert('Squadra al massimo!') : this.allPokemonArr.push(poke);

    this.allPokemon.next(this.allPokemonArr);
  }

  public deleteFromSquad(poke: Pokemon) {
    this.allPokemonArr.splice(this.allPokemonArr.indexOf(poke), 1);
    this.allPokemon.next(this.allPokemonArr);
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend return code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }




}
