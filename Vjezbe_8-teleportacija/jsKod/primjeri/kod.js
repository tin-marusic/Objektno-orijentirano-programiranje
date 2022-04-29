class Negativno extends Error {
  constructor(m) {
    super(m);
    this.name = "Negativan broj";
  }
}

function unosGodine() {
  let god = prompt("Kad ste rođeni?");

  if (isNaN(god)) throw new TypeError("Niste upisali broj!");

  return god;
}

function unosGodine2() {
  let god = prompt("Kad ste rođeni?");

  if (isNaN(god)) throw new TypeError("Niste upisali broj!");

  if (god < 0) throw new Negativno("Godina");

  return god;
}

function primjerThrow() {
  let g;
  try {
    g = unosGodine2();
  } catch (error) {
    if (error instanceof TypeError) {
      console.warn("Niste upisali godinu, postavit ćemo je na 2022");
      g = 2022;
    }
    else {
      console.log(error);
    }
  }
}

function primjerTry1() {
  try {

    console.log("Start");
    lalala; // ovo je greška
    console.log("Nije došlo do tu...");
  } catch (err) {
    console.log(err); //ispis cijelog objekta
    console.log(err.message); //lalala is not defined
    console.log(err.name); //ReferenceError
  }

  console.log("Program je došao do kraja");
}

class Racun {
  constructor() {
    this.stanje = 100;
  }

  isplati(iznos){
    this.stanje -= iznos;
    if (this.stanje<0) {
      throw new Error("Račun je postao negativan!");
    }
  }

}
//let r = new Racun();
//r.isplati(1000);
/*try{
  g = unosGodine2()
  //throw new Error("pogreska")
}
catch{
  console.log("uhvatili gresku")
}
primjerTry1()*/

primjerThrow()