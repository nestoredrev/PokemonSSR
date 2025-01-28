
import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { PokeAPIResponse, Pokemon, SimplePokemon } from "../interfaces";
import { catchError } from "rxjs";

const mockApiPokeResponse: PokeAPIResponse = {
    "count": 1304,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    "previous": '',
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }
    ]
}





const expectedPokemon: SimplePokemon[] = [
    {id: '1', name: 'bulbasaur'},
    {id: '2', name: 'ivysaur'},
];

const mockPokemon = {
    id: '1',
    name: 'bulbasour'
}



describe('PokemonsService', () => {

    let service: PokemonsService;
    let httpMock: HttpTestingController;
    beforeEach( () => {

        TestBed.configureTestingModule({
            providers:[
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(PokemonsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // despues de cada peticion indicar que no hay mas peticones
        httpMock.verify();
    })

    it('should be created PokemonsService', () => {
        expect(service).toBeTruthy();
    })

    it('should load a page of SimplePokemons', () => {
        
        service.loadPage(1).subscribe( pokemons => {
            expect( pokemons ).toEqual(expectedPokemon);
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)

        expect ( req.request.method ).toBe('GET');

        req.flush( mockApiPokeResponse ); // enviar la data esperada de la request
    });

    it('should load a page 5 of SimplePokemons', () => {
        
        service.loadPage(5).subscribe( pokemons => {
            expect( pokemons ).toEqual(expectedPokemon);
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`)

        expect ( req.request.method ).toBe('GET');

        req.flush( mockApiPokeResponse ); // enviar la data esperada de la request
    });


    it(`should load a Pokemon by ID`, () => {

        const pokemonId = '1';

        service.loadPokemon(pokemonId).subscribe( (pokemon:any) => {
            expect( pokemon ).toEqual( mockPokemon );
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

        expect ( req.request.method ).toBe('GET');

        req.flush( mockPokemon ); // enviar la data esperada de la request

    })


    it(`should load a Pokemon by Name`, () => {

        const pokemonName = 'bulbasour';

        service.loadPokemon(pokemonName).subscribe( (pokemon:any) => {
            expect( pokemon ).toEqual( mockPokemon );
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        expect ( req.request.method ).toBe('GET');

        req.flush( mockPokemon ); // enviar la data esperada de la request

    })


    it(`should catch error if pokemon not found`, () => {

        const pokemonName = 'yo-no-existo';

        service.loadPokemon(pokemonName)
        .pipe(
            catchError( error => {
                expect(error.message).toContain('Pokemon not found!');
                return [];
            })
        )
        .subscribe();

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        expect ( req.request.method ).toBe('GET');

        req.flush('Pokemon not found!',{
            status: 404,
            statusText: 'Pokemon no encontrado'
        }); 

    })

})