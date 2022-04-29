//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

class Animal extends Sprite {
  constructor(x, y, layer) {

    super(x + 4, y + 4, 64 - 8, 64 - 8);

    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [11, 12, 13, 14, 15, 16, 17, 18, 19],
      "down": [1],
      "walk-down": [1],
      "left": [2],
      "walk-left": [21, 22, 23, 24, 25, 26, 27, 28, 29]
    };

    this.layer = layer;
    this.visible = true;
    // this.okvir = true;

  }

  jump(h = 50) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }

}

class Cat extends Animal {
  constructor(layer) {
    super(0, 0, layer);

    this.direction = 90;
  }

}

class Racoon extends Animal {
  constructor(x, y, layer) {
    super(x, y, layer);

    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [2, 3, 4, 5, 6, 7, 8],
      "down": [1],
      "walk-down": [1],
      "left": [11],
      "walk-left": [12, 13, 14, 15, 16, 17, 18]
    };

    this.layer = layer;
    this.visible = true;
    //this.okvir = true;
  }

  moveRight() {
    let a = arguments.length;
    switch (a) {
      case 0: //nema argumenata
        super.moveRight();
        break;
      case 1: //prima brzinu
        let v = arguments[0];
        this.direction = 90;
        this.velocity_x += v;
        break;
      default:
        break;
    }
  }

  // ne može skakati na vodi
  jump() {
    let a = arguments.length;
    if (a == 1) a = typeof arguments[0];

    switch (a) {
      case "number":
        let h = arguments[0];
        super.jump(h);
        break;
      case "string":
        let vrsta = arguments[0];
        if (vrsta == "voda") {
          console.log("Ne mogu skakati");
        }
        else if (vrsta == "gljiva") {
          super.jump(100);
        }
        else {
          super.jump();
        }
        break;
      default:
        break;
    }
  }


}

class Dinosaur extends Animal {

  constructor(x, y, layer) {
    super(x, y, layer);

    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      "down": [1],
      "walk-down": [1],
      "left": [21],
      "walk-left": [22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    };

    this.layer = layer;
    this.visible = true;
    this.okvir = true;

    this.health = 100;
    this.points = 0;
    this.pozicija = [0,5];
  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 1.5;
  }

  collect(c,g){
    c.visible = false;
    this.points += c.value;
    c.postavi();
    g.stvori();
  }

  start(){
    this.x = this.pozicija[0]*64;
    this.y = this.pozicija[1]*64;
  }

}

class Collectable extends Item {
  constructor(layer) {
    super(layer);

    this.visible = true;
  }

  updatePosition() {
    //ne kreću se!
  }

  getType() {
    return this.constructor.name;
  }

}

class Coin extends Collectable{
  constructor(layer){
    super(layer);
    this.poziciije = [[4,6],[7,5],[11,5],[13,4]];
    this.t = 0;
    this.value = 10;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  postavi(){
    //try{
    let poz = this.poziciije[this.getRandomInt(4)];
    this.x = poz[0]*64;
    this.y = poz[1]*64;
    
    //this.t++;

    /*if (this.t >= this.poziciije.length){
      this.t = 0
    }*/
    this.visible = true;
  //}
  //catch{}
  }
}

class Gljiva extends Item{
  constructor(layer){
    super(layer);
    this.visible = false;
    this.g = 0;
  }
  updatePosition() {
    //ne kreću se!
  }
  stvori(){
    this.g++
    if(this.g == 5){
      this.visible = true;
    }
  }
}