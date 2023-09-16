import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent {
  pokemon: Pokemon | null = null;

  constructor(
    private pokeapi: PokeapiService,
    private activatedRoute: ActivatedRoute) {
      const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
      this.pokeapi.getPokemon(id)
        .then(pokemon => this.pokemon = pokemon);
  }
}
