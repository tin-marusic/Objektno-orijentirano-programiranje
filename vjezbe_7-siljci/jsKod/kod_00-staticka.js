class Postavke{
    constructor(){
        if(this instanceof Postavke){
        throw "Staticka klasa nema instance";
        }
    }
    static coins = [];
    static spikes = [];

    static KreajIgre = false;

    static Dinosaur = null;

    static cilj = 40;
    static health = 100;
}