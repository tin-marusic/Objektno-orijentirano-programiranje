class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }

  /** @type {Racoon} */
  static racoon;

  /** @type {Coin} */
  static coin;
  static gljiva;
  static Cilj;

  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static dno = 9 * 64;

}