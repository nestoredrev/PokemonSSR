
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonCardComponent } from './pokemon-card.component';
import { SimplePokemon } from '../../interfaces';

describe('PokemonCardComponent', () => {


    const mockPokemon : SimplePokemon = {
        id: '1',
        name: 'Bulbasaur'
    }


    let fixture: ComponentFixture<PokemonCardComponent>; 
    let compiled: HTMLElement;
    let component: PokemonCardComponent;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PokemonCardComponent],
        providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent); // Crear una instancia del componente
    fixture.componentRef.setInput('pokemon',mockPokemon); // inicializar los datos al input para poder pintar los datos en el test

    compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
    component = fixture.componentInstance; // Acceder a las propiedades del componentes .ts

    fixture.detectChanges(); // necesario para pintar los datos en el documento

  });


    it('should create the component PokemonCardComponent', () => {

    expect(component).toBeTruthy();

    });


    it(`should have SimplePokemon signal inputValue`, () => {

        expect(component.pokemon()).toEqual(mockPokemon); // toEqual es para comparar objetos

    });

    it(`should render the pokemon name and image correcly`, () => {
        expect( compiled.querySelector('img')?.src ).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mockPokemon.id}.png`);
        expect( compiled.querySelector('h2')?.innerText.trim() ).toBe(mockPokemon.name);
    })

    it(`should have the proper ng-reflect-router-link`, () => {

        const divWithLink = compiled.querySelector('div');
        expect(
            divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
        ).toBe(`/pokemon,${mockPokemon.name}`)

    })

});