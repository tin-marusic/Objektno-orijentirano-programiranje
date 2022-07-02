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
  
    jump(h = 35) {
  
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
            "up": [31],
            "up_l": [33],
            "walk-up": [32],
            "walk_l-up": [34],
            "right": [64],
            "right_pucanje": [66],
            "walk-right": [21,22, 23, 24, 25, 26, 27, 28,29],
            "walk-right_pucanje": [101,102,103,104,105,106,107,108,109],
            "down": [30],
            "walk-down": [31,32],
            "left": [65],
            "left_pucanje": [67],
            "walk-left": [41, 42, 43, 44, 45, 46,47,48,49],
            "walk-left_pucanje": [81,82,83,84,85,86,87,88,89],
            "skale":[35,36,37,38],
            "skale_stoji":[35]
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
    start(x,y){ 
        this.x = x; 
        this.y = y; 
      } 
    change_map1(){  //prebacujemo na mapu iznad
      if (GAME.activeWorldMap.name == "Prvi_dio_1"){
        GAME.setActiveWorldMap("Drugi_dio_1");
        btnSetupGame.dispatchEvent(levelupEvent1); //pozivamo setup za tu mapu
      }
      else if (GAME.activeWorldMap.name == "Drugi_dio_1"){
        GAME.setActiveWorldMap("Treci_dio_1");
        btnSetupGame.dispatchEvent(levelupEvent2); //pozivamo setup za tu mapu
      }
    }

    change_map2(){ //prebacujemo na mapu ispod
      if (GAME.activeWorldMap.name == "Drugi_dio_1"){
        GAME.setActiveWorldMap("Prvi_dio_1");
        btnSetupGame.dispatchEvent(leveldownEvent1); //pozivamo setup za tu mapu       
      }
      else if (GAME.activeWorldMap.name == "Treci_dio_1"){
        GAME.setActiveWorldMap("Drugi_dio_1");
        btnSetupGame.dispatchEvent(leveldownEvent2); //pozivamo setup za tu mapu       
      }
    }

    updatePosition() {
        this.x_old = this.x;
        this.y_old = this.y;
        this.velocity_y += this.gravity;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    
        this.velocity_x *= this.friction;
        this.velocity_y *= this.friction;
        if(this.y < 0.7*64){ //izlaz s mape s gornje strane
          this.change_map1(); 
        }
        else if(this.y > 14.5*64){ //izlaz s mape s donje strane
          this.change_map2();
        }
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
      else{s = 1} // brzina je 0 samo na početku,a tad nam više odgovara da puca desno
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

class platforma_nevidljiva extends Item{
  constructor(layer){
    super(layer);
    this.visible = false;
  }
  updatePosition() { //položaj se ne mijenja
    this.x_old = this.x;
    this.y_old = this.y;
  }

  start(x,y){
    this.x = x;
    this.y =y;
  }

  postani_vidljiv(){
    this.visible = true;
  }
}



