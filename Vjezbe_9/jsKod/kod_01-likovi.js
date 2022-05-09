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

    this.frame_sets = {};

    this.layer = layer;
    this.visible = true;

  }

  jump(h = 50) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }

}

class Racoon extends Animal {
  constructor(layer) {
    super(0, 0, layer);

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

    this.okvir = true;
    this._zivoti = 3;
    this.bodovi = 0;
    this.visible = true;
  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 1.5;
  }

  moveLeft() {
    this.direction = 270; 
    this.velocity_x -= 1.5; 
  } 
  start(){ 
    this.x = 0; 
    this.y = 6*64; 
  }
  updatePosition(){
    super.updatePosition(2,0.8);

    if(this.y >= Postavke.dno){
      this.start()
      this.zivoti--;
      GameSettings.output("Bodovi:"+Postavke.racoon.bodovi,true);
      GameSettings.output("Životi:"+Postavke.racoon.zivoti,false);
    }
    /*if(this.zivoti == 0){
      btnStop_click();
    }*/
  }
    get zivoti(){
      return this._zivoti;
      }
    set zivoti(v){
      if(v<1){
        btnStop_click();
      }
    else{
      this._zivoti = v
      }
  }
  collect(c,g){ //coin
    this.bodovi += c.value;
    g.stvori();
    c.start();
  }

  skupi(g){//gljiva
    this._zivoti++;
    g.makni(); //miče gljivu s mape
  }
}


class Collectable extends Item {

  constructor(layer) {
    super(layer);
    if(this.constructor == Collectable){
      throw new Error("ne moze se instancirati");
    }

  }

  getType() {
    return this.constructor.name;
  }

}

class Coin extends Collectable{
  constructor(layer){
    super(layer)
    this.value = 10;
    this.visible = true;
  }
  start(){
    this.x = Postavke.random(0,19*64);
    this.y = 4*64;
  }
}
class Gljiva extends Collectable{
  constructor(layer){
    super(layer);
    this.visible = false;
    this.g = 0;
  }
  stvori(){
    this.g++
    if(this.g == 3){
      this.start();
      this.g = 0;
    }
  }
  start(){
    this.x = Postavke.random(0,19*64);
    this.y = 4*64;
    this.visible = true;
  }
  makni(){
    this.visible = false;
  }
}
