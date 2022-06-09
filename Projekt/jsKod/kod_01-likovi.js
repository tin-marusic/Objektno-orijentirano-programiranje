/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>


class Lik extends Sprite {
    constructor(x, y, layer) {
  
      super(x + 4, y + 4, 64 - 8, 64 - 8);
  
      this.frame_sets = {};
  
      this.layer = layer;
      this.visible = true;
    }
  
    jump(h = 50) {
  
      if (!this.jumping) {
  
        this.jumping = true;
        this.velocity_y = -h;
  
      }
    }
  
}

class GlavniLik extends Lik{
    constructor(layer){
        super(0,0,layer);
        this.frame_sets={
            "up": [11],
            "up_l": [13],
            "walk-up": [12],
            "walk_l-up": [14],
            "right": [5],
            "walk-right": [1,2, 3, 4, 5, 6, 7, 8,9],
            "down": [10],
            "walk-down": [11,12],
            "left": [20],
            "walk-left": [21, 22, 23, 24, 25, 26,27,28,29],
            "skale":[15,16,17,18],
        };
        this.okvir = true;
        this.gravity = 2;
        this.friction = 0.8;

    }
    moveRight() {
        this.direction = 90;
        this.velocity_x = 7.5;
      }
    
    moveLeft() {
        this.direction = 270; 
        this.velocity_x = -7.5; 
      }
    moveUp() {
        this.direction = 0;
        this.velocity_y = -4;
      }
    moveDown() {
        this.direction = 180;
        this.velocity_y = 4;
      }
    start(){ 
        this.x = 0; 
        this.y = 6*64; 
      } 
    updatePosition() {
        this.x_old = this.x;
        this.y_old = this.y;
        this.velocity_y += this.gravity;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    
        this.velocity_x *= this.friction;
        this.velocity_y *= this.friction;
      }
    no_gravity(){
      this.gravity = 0;
      this.friction = 0.1; //ubrzavamo mu usporavanje
    }
    grav(){
      this.gravity = 2;
      this.friction = 0.8;
    }
    puca(g){
      let s = 0;
      if(this.velocity_x > 0){  //određuje se smjer pucanja 
        s = 1
      }
      else if(this.velocity_x < 0){
        s = 2;
      }
      else{}
      let x = this.x +32 ; //postavljamo na centar lika
      let y = this.y + 23 ;
      g.vidljivost(x,y,s,this.velocity_x);
    }

}

class Skale extends Item{
    constructor(layer){
      super(layer);
      this.visible = true;
      this.gornje_skale = false; // postavljamo klasu za najgornje skale
    }
    start(x,y){
      this.x = x;
      this.y =y;
    }
    updatePosition() { //položaj se ne mijenja
      this.x_old = this.x;
      this.y_old = this.y;
    }
    polozaj_skale(x){
      if(this.gornje_skale === true){
        let y = x - this.y; //razlika između položaja lika na skalama i vrha skala
        return y
      }
      else{
        return -1 //vraćamo vrijednost da je lik iznad skala ako nije na najgornjim skalama
      }
    }
}

class Metak extends Item{
  constructor(layer){
    super(layer);
    this.visible = false;
    this.g = 0;
    this.i = 1;
    this.poziv = false;
  }

  vidljivost(x,y,s,z1){
    this.x = x;
    this.y = y;
    this.x_0 = x;
    this.y_0 = y;
    this.visible = true;
    this.poziv = true; //ograničava na samo jedno stvaranje metka
    if(s == 1){   //smjer metka u ovisnosti o s
      this.moveRight();
    }
    else if(s === 2){
      this.moveLeft();
    }
    else{
    }
  }
  moveRight() {
    this.direction = 90;
    this.velocity_x += 11.5 ;
  }

  moveLeft() {
    this.direction = 270;
    this.velocity_x -= 11.5 ;
  }

  updatePosition() { //ukida gravitaciju i usporavanje
    this.x_old = this.x;
    this.x += this.velocity_x;
    this.y_old = this.y;
    this.y += this.velocity_y;
    this.g += 1;
    if(this.velocity_x < 10.5 && this.velocity_x >-10.5){ //kad metak dotakne nešto maknemo ga
      this.makni()
    }
    else if(this.velocity_y < -0.01 || this.velocity_y > 0.01){
      this.makni(); //da metak ne zaobilazi platforme
    }

  }
  makni(){  //micemo metak
       
      this.visible = false;
      this.g = 0;
      this.poziv = false;
      this.velocity_x = 0;
      this.velocity_y = 0;
  }
 
}



