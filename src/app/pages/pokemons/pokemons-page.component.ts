import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonsListComponent } from "../../pokemons/components/pokemons-list/pokemons-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { Meta, Title } from '@angular/platform-browser';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from 'rxjs';


@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonsListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  
  private title = inject(Title);
  private meta = inject(Meta);
  private pokemonsService = inject(PokemonsService);

  public isLoading = signal(true);
  public pokemons = signal<SimplePokemon[]>([]);
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // conviete de observable a signal
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map( params => params['page'] ?? '1' ),
      map( page => isNaN(+page) ? 1 : +page ), // +page es igual a Number(page) convierte string to number
      map( page => Math.max(1, page) ) // evitar numeros negativos
    )
  )

  

  ngOnInit() {

    // this.route.queryParamMap.subscribe( console.log );// obterner parametros de la url pj: http://localhost:4200/pokemons?page=2&az=3

    // this.loadPokemons();

    this.title.setTitle('Pokemons');
    this.meta.updateTag({
      name: 'description',
      content: 'Este mi Lista de pokemons'
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'Pokemons page'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular, Angular PRO, Pokemons Page, Nestor, Curso'
    });
  }

  // obtiene el dato actual de la señar
  public loadOnPageChanged = effect( () => {
    
    this.loadPokemons( this.currentPage() );
    
  },{
    allowSignalWrites: true
  })

  public loadPokemons( page = 0 ) {

    // const pageToLoad = this.currentPage()! + page;
    
    this.isLoading.set(true);
    
    this.pokemonsService.loadPage( page )
    .pipe(
      // tap( () => {
      //   this.router.navigate([], {queryParams: {page: pageToLoad}}) // actualizar la navegacion ya que la señar es readonly
      // }),
      tap( () => {
        this.title.setTitle(`Pokemons --- SSR - Page ${page}`);
      })
    )
    .subscribe( pokemons => {
      this.isLoading.set(false);
      this.pokemons.set(pokemons);
    });
  }

}
