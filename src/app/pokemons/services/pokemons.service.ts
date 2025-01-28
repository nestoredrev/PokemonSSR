import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);
  private limitItems = 20;

  public loadPage( page:number ):Observable<SimplePokemon[]>{

    if( page !== 0 ){
      page--;
    }

    page = Math.max(0, page); // evitar numeros negativos

    return this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=${this.limitItems}`
      ).pipe(
        map( resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map( pokemon => ({
            id: pokemon.url.split('/').at(-2) ?? '', // devuelve el preultimo elemento de la array que en ese caso es el ID del pokemon desde la url
            name: pokemon.name
          }))
          return simplePokemons
        })
        // ,tap( console.log ) // visualizando la respuesta del map
      )
  }

  public loadPokemon( id:string ){
    return this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe( catchError(this.handleError) )
  }

  private handleError( error: HttpErrorResponse ){

    if( error.status === 0 ){ // 0 = error del lado del cliente
      console.log('An error ocurred', error.error);
    }else{
      console.log(`Backend returned code ${error.status}, body: ${error.error}`);
    }

    const errorMessage = error.error ?? 'An error ocurred';

    return throwError( () => new Error(errorMessage) );

  }

}
