
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { PokemonsListComponent } from './pokemons-list.component';
import { SimplePokemon } from '../../interfaces';

describe('PokemonsListComponent', () => {

  //Hay que simular los datos de entrada al componente
  const mockPokemon: SimplePokemon[] = [
    { id: '1', name: 'bulbasaur'},
    { id: '2', name: 'ivysaur'},
  ]


  let fixture: ComponentFixture<PokemonsListComponent>; 
  let compiled: HTMLElement;
  let component: PokemonsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsListComponent); // Crear una instancia del componente
    compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
    component = fixture.componentInstance; // Acceder a las propiedades del componentes .ts
  });


  it('should create the component', () => {    
    expect(component).toBeTruthy();
  });

  it('should render the pokemons list with 2 pokemon-cards', () => {
    fixture.componentRef.setInput('pokemons', mockPokemon);
    fixture.detectChanges();
    expect( compiled.querySelectorAll('pokemon-card').length ).toBe(mockPokemon.length);
  });


  it('should show the message "No hay pokemons" when no pokemons for rending ', () => {
    
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect( compiled.querySelector('div')?.innerText.trim() ).toBe('No hay pokemons');
    
  });

});