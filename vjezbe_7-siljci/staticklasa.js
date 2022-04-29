class StatickaKlasa{
    constructor(){
        if(this instanceof StatickaKlasa){
            throw "greska"
        }
    }
    static metoda(){
        console.log("Metoda")
    }
}