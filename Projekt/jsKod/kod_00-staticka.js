class Postavke {

    constructor() {
      if (this instanceof Postavke) {
        throw new Error("Statička klasa nema instance!");
      }
    }
  
    static glavni = null;
    static s1;
    static s2;
    static s3;
    static m1;
    static m2;
    static m3;
}