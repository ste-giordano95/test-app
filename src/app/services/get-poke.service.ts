import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Pokemon } from '../models/IPokemon';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class GetPokeService {
  private URL: string = 'https://pokeapi.co/api/v2/pokemon/';

  private pokeOnSquad!: BehaviorSubject<Pokemon[]>;
  private pokeRejected!: BehaviorSubject<Pokemon[]>;
  public pokeOnSquad$!: Observable<Pokemon[]>;
  public pokeRejected$!: Observable<Pokemon[]>;

  public acceptedArr: Pokemon[] = [];
  public declinedArr: Pokemon[] = [];



  constructor(private http: HttpClient) {
    this.pokeOnSquad = new BehaviorSubject<Pokemon[]>([]);
    this.pokeOnSquad$ = this.pokeOnSquad.asObservable();
    this.pokeRejected = new BehaviorSubject<Pokemon[]>([]);
    this.pokeRejected$ = this.pokeRejected.asObservable();

  }

  public getRandomPokemon(): Observable<Pokemon> {
    const randomNum = Math.floor(Math.random() * 898) + 1;

    return this.http.get<Pokemon>(this.URL + randomNum).pipe(
      retry(3),
      tap(() => console.log('Get pokemom random eseguito')),
      catchError(this.handleError)
    )
  }

  public getPokemonById(id: number, status: string): {} {
    return status == 'onSquad' ? this.pokeOnSquad$.subscribe(data => data.find((poke) => { poke.id === id })) : this.pokeRejected$.subscribe(data => data.find((poke) => { poke.id === id }));

  }


  addToSquad(poke: Pokemon) {

    this.acceptedArr.length < 6 ? this.acceptedArr.push(poke) : console.log("Squadra al massimo!");
    this.pokeOnSquad.next(this.acceptedArr);
  }

  addToRejected(poke: Pokemon) {
    this.declinedArr.push(poke);
    this.pokeRejected.next(this.declinedArr);
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
