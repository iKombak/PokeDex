

const pokeApi={}

function convertirPokeApiDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    pokemon.types = pokemonDetail.types.map((typeSlot)=>typeSlot.type.name)

    const types = pokemonDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type] = types

    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
    return pokemon
}


pokeApi.getPokemonDetails = (pokemon)=>{
    return fetch(pokemon.url)
    .then((response)=>response.json())
    .then(convertirPokeApiDetailToPokemon)
}

pokeApi.getPokemons=(offset = 0,limit=5)=>{
    const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response)=>response.json())
    .then((jsonBody)=>jsonBody.results)
    .then((pokemons)=>pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequest)=>Promise.all(detailRequest))
    .then((pokemonsDetails)=>pokemonsDetails)
}

