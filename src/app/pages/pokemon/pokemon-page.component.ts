import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  
  
  public pokemon = signal<Pokemon | null>(null);
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.pokemonService.loadPokemon(id)
    .pipe(
      tap(( { id, name } ) => {
        const pageTitle = `#${id} -- ${name}`;
        const pageDescription = `Página del Pokemon ${name}`;

        this.title.setTitle(pageTitle);

        this.meta.updateTag({
          name: 'description',
          content: pageDescription
        });

        // OG es para redes sociales
        this.meta.updateTag({
          name: 'og:title',
          content: pageTitle
        });

        this.meta.updateTag({
          name: 'og:description',
          content: pageDescription
        });

        this.meta.updateTag({
          name: 'og:image',
          content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        });

      })
    )
    .subscribe( pokemon => {
      this.pokemon.set(pokemon);
    })
  }
}
