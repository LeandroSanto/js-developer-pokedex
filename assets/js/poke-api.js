
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeDataFullDetail(selectedData){
    const pokeInDetail = new PokemonDataPage();
    
    pokeInDetail.number = selectedData.id
    pokeInDetail.name = selectedData.name
    const types = selectedData.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokeInDetail.types = types
    pokeInDetail.type = type
    pokeInDetail.photo = selectedData.sprites.other.dream_world.front_default
    pokeInDetail.height = selectedData.height
    pokeInDetail.weight = selectedData.weight
    const abilities = selectedData.abilities.map((ability) => ability.ability.name)
    const stats = selectedData.stats.map((stat) => {
        return {
          baseStat: stat.base_stat,
          effort: stat.effort,
          name: stat.stat.name
        };
      });
    const moves = selectedData.moves.map((move) => move.move.name)  

    pokeInDetail.abilities = abilities
    pokeInDetail.stats = stats
    pokeInDetail.moves = moves
    
    return pokeInDetail

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


pokeApi.getPokeData = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => convertPokeDataFullDetail(jsonBody))
        .then((pokeInDetail) => pokeInDetail)
        .catch((error) => {
            console.error("Erro ao obter dados do Pokémon", error);
            throw error; // Propaga o erro para ser tratado externamente, se necessário
        });
};
