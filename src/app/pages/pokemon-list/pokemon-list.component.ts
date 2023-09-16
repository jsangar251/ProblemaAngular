import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnDestroy {

  pokemons: Pokemon[] = [];
  unsubs:Subscription | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeapi: PokeapiService) {
      this.unsubs = this.activatedRoute.params.subscribe(data=>{
        console.log(data);
        this.loadGeneration(data['id']);
      });
  }

  ngOnDestroy(): void {
    this.unsubs?.unsubscribe();
  }

  loadGeneration(id: number): void {
    console.log(id);
    this.pokeapi.getGeneration(id)
      .then(pokemons => this.pokemons = pokemons);
  }
}
