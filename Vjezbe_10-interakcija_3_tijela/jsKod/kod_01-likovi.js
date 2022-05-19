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
    Postavke.gljiva.makni();
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
    //g.stvori();
    c.start();
  }

  puca(g){
    let s = 0;
    if(this.velocity_x > 0){  //određuje se smjer pucanja 
      s = 1
    }
    else if(this.velocity_x == 0){
      s = 2
    }
    else{s = 0}
    let x = this.x;
    let y = this.y;
    g.vidljivost(x,y,s);
  }

  /*skupi(g){//gljiva
    this._zivoti++;
    g.makni(); //miče gljivu s mape
  }*/
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
    this.i = 1;
    this.poziv = false;
  }
  vidljivost(x,y,s){
    this.x = x;
    this.y = y;
    this.visible = true;
    if(s == 1){   //smjer gljive u ovisnosti o s
      this.moveRight();
      this.moveUp();
    }
    else if(s == 2){
      this.moveUp();
    }
    else{
      this.moveLeft();
      this.moveUp();
    }
    //this.moveDown();
    this.poziv = true; //ograničava na samo jedno stvaranje gljive
    
  }
  moveRight() {
    this.direction = 90;
    this.velocity_x += 7.5;
  }
  moveDown() {
    this.direction = 0;
    this.velocity_y += 0;
  }
  moveLeft() {
    this.direction = 270;
    this.velocity_x -= 7.5;
  }
  moveUp() {
    this.direction = 0;
    this.velocity_y -= 7.5;
  }
  updatePosition(gravity = 0, friction = 0) { //ukida gravitaciju i usporavanje
    this.x_old = this.x;
    this.x += this.velocity_x;
    this.y += this.velocity_y;
    this.y_old = this.y;
    this.g += 1;
    this.makni();

    //this.velocity_x *= friction;
    /*if(this.y < 390){
      this.velocity_y += gravity;
    }*/
    /*if(this.velocity_x < 1 ){
      if(this.velocity_x > 0)
      this.visible = false;
    }
    if(this.velocity_x > -1 ){
      if(this.velocity_x < 0)
      this.visible = false;
    }*/
  }
  kraj(){
    console.log("Pobjeda");
    btnStop_click();
  }
  makni(){  //organičava vrijeme postojanja gljive
    if(this.g > 30){   //nakon što se updatePosition izvrši 30 puta mičemo gljivu
      this.visible = false;
      this.g = 0;
      this.poziv = false;
      this.velocity_x = 0;
      this.velocity_y = 0;
    }
  
  }
 
}

class Cilj extends Collectable{
  constructor(layer){
    super(layer);
    this.visible = true;
    this.x = 13*64;
    this.y = 2*64;
  }
  updatePosition(gravity = 0, friction = 0) { 
      this.x_old = this.x;
      this.x += this.velocity_x;
      this.y += this.velocity_y;
      this.y_old = this.y;
  }
}
