const pokemonList=document.getElementById('pokemonList')
const loadMoreButton=document.getElementById('loadMoreButton')
const maxRecordas=151
const limit = 10
let offset = 0



function loadPokemonItems(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons=[])=>{
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset,limit)

loadMoreButton.addEventListener('click',()=>{
    offset += limit
    const qtdRecordNexPage=offset+limit
    if(qtdRecordNexPage >= maxRecordas){
        const newLimit= maxRecordas - offset
        loadPokemonItems(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItems(offset,limit)
    }
})