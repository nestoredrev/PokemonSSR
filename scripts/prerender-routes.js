
// funcion anonima auto-invocada
const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 20;
(async () => {

    const fs = require('fs'); // fileSystem de nodejs

    const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1); // genera un array de 1 al legnth definido
    const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1); // genera un array de 1 al legnth definido

    let fileContent = pokemonIds.map(
        id => `/pokemons/${id}`
    ).join('\n');

    fileContent += '\n'; // salto de linea para separar los Ids de los pages

    fileContent += pages.map(
        page => `pokemons/page/${page}`
    ).join('\n');

    // Paginacion por nombres de los Pokemons
    const pokemonsNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}/`)
    .then( res => res.json());

    fileContent += '\n';

    fileContent += pokemonsNameList.results.map(
        pokemon => `/pokemons/${pokemon.name}`
    ).join('\n');


    fs.writeFileSync('routes.txt', fileContent);

    console.log('routes.txt Generated!');
    

})();

