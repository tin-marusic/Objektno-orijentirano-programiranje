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
        this.health = 100;
        this.points = 0;

    }

    updateAnimation() {
      if (this.jumping && !this.penjanje_skale) {
        if(!this.pucanje){
          //ako skače i ne puca
          if (this.velocity_y < -0.1 && this.velocity_x > 0) this.changeFrameSet(this.frameSets("walk_l-up"), "pause");
          else if (this.velocity_y < -0.1 && this.velocity_x < 0) this.changeFrameSet(this.frameSets("walk-up"), "pause");
          else if (this.velocity_y > 0.1 && this.velocity_x < 0) this.changeFrameSet(this.frameSets("up"), "pause");
          else if(this.velocity_y > 0.1 && this.velocity_x > 0) this.changeFrameSet(this.frameSets("up_l"), "pause");
          else this.changeFrameSet(this.frameSets("right"), "pause");
        }
        //ako skace i puca desno
        else if(this.velocity_x > 0) this.changeFrameSet(this.frameSets("right_pucanje"), "pause");
        //ako skace i puca lijevo
        else this.changeFrameSet(this.frameSets("left_pucanje"), "pause");
      }
      // ako je lik okrenut desno
      else if (this.direction == 90) {
      // ako ima brzinu po x, onda rotiraj animacije koje postoje za walk-right
        if (this.velocity_x > 1.8 && !this.pucanje) this.changeFrameSet(this.frameSets("walk-right"), "loop", 3);
       // ako trci i puca 
        else if (this.velocity_x > 1.8 && this.pucanje) this.changeFrameSet(this.frameSets("walk-right_pucanje"), "loop", 3);
        else if(this.pucanje){
        //ako stoji i puca
          this.changeFrameSet(this.frameSets("right_pucanje"), "pause");
        }
         // ako stoji, onda prikaži zadani položaj za desno
        else this.changeFrameSet(this.frameSets("right"), "pause");
      }
      else if (this.direction == 270) {
        if (this.velocity_x < -1.8 && !this.pucanje) this.changeFrameSet(this.frameSets("walk-left"), "loop", 3);
        else if (this.velocity_x < -1.8 && this.pucanje) this.changeFrameSet(this.frameSets("walk-left_pucanje"), "loop", 3);
        else if(this.pucanje){
          this.changeFrameSet(this.frameSets("left_pucanje"), "pause");
        }
        else this.changeFrameSet(this.frameSets("left"), "pause");
      }
      else if(this.penjanje_skale){
        if(this.on_top) this.changeFrameSet(this.frameSets("right"), "pause");
        //za penjanje po skalama
        else if(this.velocity_y < -2.5 || this.velocity_y > 2.5)this.changeFrameSet(this.frameSets("skale"), "loop", 3);
        // pucanje na skalama u desno
        else if(this.pucanje_skale_d)   this.changeFrameSet(this.frameSets("right_pucanje"), "pause");
        //pucanje na skalama u lijevo
        else if(this.pucanje_skale_l)   this.changeFrameSet(this.frameSets("left_pucanje"), "pause");
        // ako ne puca samo određujemo stranu na koju će lik gledat kad stoji na skalama
        else this.changeFrameSet(this.frameSets("skale_stoji"), "pause");
      }
      /*else if (this.direction == 180) {
        if (this.velocity_y > 0.1) this.changeFrameSet(this.frameSets("walk-down"), "loop", 10);
        else this.changeFrameSet(this.frameSets("down"), "pause");
      }*/

      else{ //specifičan slučaj nakon setupa dok je brzina 0
        if(this.pucanje) this.changeFrameSet(this.frameSets("right_pucanje"), "pause");
        else this.changeFrameSet(this.frameSets("right"), "pause");
      }
  
      this.animate();
  
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
    puca(g,smjer){
      if(smjer == "desno"){
        this.pucanje_skale_d = true; //animacije pucanja na skalama
        this.pucnaje_skale_l = false;
      }
      else if(smjer == "lijevo"){
        this.pucanje_skale_l = true;
        this.pucanje_skale_d = false;
      }
      let x = this.x +32 ; //postavljamo na centar lika
      let y = this.y + 23 ;
      g.vidljivost(x,y,smjer);
    }
    demage(c){
      this.health -= c.value; //kad neprijatelj pogodi lika zdravlje se smanjuje
    }

}

class Skale extends Item{
    constructor(layer){
      super(layer);
      this.visible = true;
      this.gornje_skale = false; // postavljamo klasu za najgornje skale
      this.donje_skale = false;
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

  vidljivost(x,y,smjer){
    this.x = x;
    this.y = y;
    this.x_0 = x;
    this.y_0 = y;
    this.visible = true;
    this.poziv = true; //ograničava na samo jedno stvaranje metka
    if(smjer == "desno"){   //smjer metka u ovisnosti o s
      this.moveRight();
    }
    else if(smjer == "lijevo"){
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

class siljci extends Item{
  constructor(layer){
    super(layer);
    this.visible = true;
    this.value = 100;
  }
  start(x,y){
    this.x = x;
    this.y = y;
  }
  updatePosition() { //položaj se ne mijenja
    this.x_old = this.x;
    this.y_old = this.y;
  }
}



