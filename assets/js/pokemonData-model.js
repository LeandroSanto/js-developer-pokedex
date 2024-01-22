class PokemonDataPage extends Pokemon{
    abilities = [];
    height;
    weight;
    stats = [];
    moves = [];

    constructor(abilities,height,weight,stats,moves){
        super()

        this.abilities = abilities;
        this.height = height;
        this.weight = weight;
        this.stats = stats;
        this.moves = moves;
    }
}