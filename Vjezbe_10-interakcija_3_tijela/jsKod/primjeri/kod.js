class Animal {

  constructor() {
    if (this.constructor == Animal) {
      throw new Error("Apstraktna klasa se ne može instancirati");
    }
  }

  say() {
    throw new Error("Metoda say() se mora implementirati");
  }

  eat() {
    console.log("jedem...");
  }
}

class Dog extends Animal {
  say() {
    console.log("vau vau");
  }
}

class Cat extends Animal {
  say() {
    console.log("mijau");
  }
  eat() {
    console.log("blablabal");
  }
}

class Mouse extends Animal { }

let d = new Dog();
let m = new Cat();
let s = new Mouse();
let a = new Animal();
d.eat();
d.say();
m.say();
d.eat();
m.eat();