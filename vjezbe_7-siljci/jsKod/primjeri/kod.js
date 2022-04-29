class Fakultet{
  static ime = "PMF";
  static Pozdrav(){
    return "Dobro došli na " + this.ime;
  }
 }
 // Poziv metode putem imena klase
 console.log(Fakultet.Pozdrav()); 

class StatickaKlasa {
  constructor() {

    if (this instanceof StatickaKlasa) {
      throw "Statička klasa se ne smije instancirati!";
    }

  }

  static metoda() { 
    console.log("Metoda")
  }

}

//let s = new StatickaKlasa();

class Auto {
  constructor() {
    // ako ne stavimo throw
  }
  static hello() {
    return "Hello!!";
  }
}

let myCar = new Auto();

console.log(Auto.hello());
console.log(myCar.hello()); //greška!
