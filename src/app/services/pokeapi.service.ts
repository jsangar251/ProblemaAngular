import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Observable, forkJoin, lastValueFrom, zip } from 'rxjs';

const BASE_URL = 'https://pokeapi.co/api/v2/';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private httpClient: HttpClient) { }


  delay(obs:Observable<any>):Observable<any>{
    return new Observable(new_obs=>{
      obs.subscribe(data=>{
        setTimeout(()=>{
          new_obs.next(data);
          new_obs.complete();
        },Math.random() *10 ) 
      })
    })
  }

  async getPokemon(id: number) : Promise<Pokemon> {
    const pokemon: any = await lastValueFrom(this.httpClient.get(`${BASE_URL}pokemon/${id}`));
    
    return this.toPokemon(pokemon);
  }

  async getGeneration(id: number) : Promise<Pokemon[]> {
    const generation: any = await lastValueFrom(this.httpClient.get(`${BASE_URL}generation/${id}`));
    
    let requests: Observable<any>[] = [];
    for (let specie of generation.pokemon_species) {
      const url = specie.url.replace('pokemon-species', 'pokemon');
      requests.push(this.httpClient.get(url));
    }

    const data: any[] = await lastValueFrom(forkJoin(requests));
    console.log(data);
    return data.map(this.toPokemon);

    /*let requests: Observable<any>[] = [];
    for (let specie of generation.pokemon_species) {
      var index = 0;
      this.httpClient.get(`${BASE_URL}pokemon/${specie.name}`).subscribe({
        next:(data:any)=>{
          data['index']= index;
          this.toPokemon(data)
        },
        error:err=>{}
      })
      requests.push();
    }*/
    
    

    let pokemons: Pokemon[] = [];
    for (let specie of generation.pokemon_species) {
      const data: any = this.httpClient.get(`${BASE_URL}pokemon/${specie.name}`).toPromise().then((data)=>{
        console.log(data);
        pokemons.push(this.toPokemon(data));
      })
     
    }

    pokemons.sort((p1, p2) => p1.id - p2.id);

    return pokemons;
  }

  private toPokemon(json: any): Pokemon {
    return {
      id: json.id,
      name: json.name,
      iconUrl: json.sprites.front_default
    };
  }
}
