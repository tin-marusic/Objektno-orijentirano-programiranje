class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw "Statička klasa nema instance!";
    }
  }
  static dinosaur;
  static coin;
  static gljiva;
  //dinosaur, coin, gljiva
  //random(min, max)

}