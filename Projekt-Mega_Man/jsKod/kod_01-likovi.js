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
      
      this.okvir = false;
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
        this.okvir = false;
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
        if(this.on_top && !this.pucanje) this.changeFrameSet(this.frameSets("right"), "pause");
        //za penjanje po skalama
        else if(this.bottom_skale && !this.pucanje) this.changeFrameSet(this.frameSets("right"), "pause");
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
    recovery(c){
      this.health += c.help;
    }
    total_points(c){
      this.points += c.points;
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
    this.value = 10; //šteta koju nanosi protivniku
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
    if(this.velocity_x < 10.5 && this.velocity_x >-10.5){ //kad metak dotakne nešto maknemo ga
      this.makni()
    }
    else if(this.velocity_y < -0.1 || this.velocity_y > 0.1){
      this.makni(); //da metak ne zaobilazi platforme
    }

  }
  makni(){  //micemo metak
       
      this.visible = false;
      this.g = 0;
      this.poziv = false;
      this.velocity_x = 0;
      this.velocity_y = 0;
      this.x = 0;
      this.y = 0;
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
  razlika(c){  //za odrediti s koje strane lik dolazi na šiljke
    let raz = this.y - c.y;
    if(raz > 0){
      return true;
    }
    else{
      c.velocity_y = 0;
      return false;
    }
  }
}

class Blader extends Lik{
    constructor(layer){
      super(0,0,layer);

      this.frame_sets={
        "left": [114,115],
        "right": [112,113]
      }

      this.visible = true;
      this.health = 10;
      this.value = 10;
      this.velocity_x = 5; //početna brzina i smjer
      this.direction = 90;
      this.granica_desno = null;
      this.granica_lijevo = null;
    }
    updatePosition() { //ukida gravitaciju 
      this.x_old = this.x;
      this.x += this.velocity_x;
      this.y_old = this.y;
      this.y += this.velocity_y;
      if(this.x < this.granica_lijevo){ //ako prođe zadane granice mjenja smjer kretanja
        this.moveRight();
      }
      else if(this.x > this.granica_desno){
        this.moveLeft();
      }
    }
    moveLeft(){
      this.direction = 270; 
      this.velocity_x = -5; 
    }
    moveRight(){
      this.direction = 90;
      this.velocity_x = 5;
    }

    start(x1,x2,x0,y0){ //zadanju se granice kretanja i početni polozaj
      this.x = x0;
      this.y = y0;
      this.granica_desno = x2
      this.granica_lijevo = x1
    }

    updateAnimation() {
      if(this.direction == 90)this.changeFrameSet(this.frameSets("right"), "loop" , 7);
      if(this.direction == 270) this.changeFrameSet(this.frameSets("left"), "loop" , 7);
      this.animate();
    }
    demage(c,coin){
      this.health -= c.value; //kad neprijatelj pogodi lika zdravlje se smanjuje
      if(this.health <= 0){
        this.visible = false; 
        coin.stvori(this.x,this.y) //ako blader umre stvaramo coin na tom mjestu
      }
     }
     touch_Glavni_Lik(smjer){
      if(smjer == "desno"){
        this.velocity_x = 100;  //kad dotakne glavnog lika odbit će se u smjeru iz kojeg dolazi u odnosu na Glavnog lika
      }
      else if(smjer == "lijevo"){
        this.velocity_x = -100;
      }
     }

     x_distance(c){ //računa udaljenost između dva lika po x
      let x = this.x - c.x;
      return x
     }

}

class coin extends Item{
  constructor(layer){
    super(layer);
    this.visible = false ;  
    this.points = 10; 
    this.width = 50;
    this.height = 50;
    this.sirina = 16; //za novu funkciju touching
    this.visina = 16;
    this.startx = this.x; 
    this.starty = this.y;
    this.okvir = false;
  }
  stvori(x,y){
    this.x = x;
    this.y = y;
    this.visible = true;
  }
  pokupi(){
    this.visible = false;
  }
  updatePosition(gravity = 0, friction = 0) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    this.velocity_x *= friction;
    this.velocity_y *= friction;
    this.startx = this.x; 
    this.starty = this.y
  }
}

class Health_coin extends coin{
  constructor(layer){
    super(layer);
    this.help = 50; //koliko će popraviti zdravlje glavnom liku
    this.width = 124;
    this.height = 124;
    this.sirina = 32; //za novu funkciju touching
    this.visina = 32;
    this.startx = this.x;
    this.starty = this.y
  }
  updatePosition() { //položaj se ne mijenja
    this.x_old = this.x;
    this.y_old = this.y;
    this.startx = this.x;
    this.starty = this.y
  }
}

class blaster extends Lik{
  constructor(layer){
    super(0,0,layer);

    this.frame_sets={
      "zatvoren": [121],
      "otvaranje": [122,123],
      "zatvaranje": [123,122],
      "pucanje" : [124]
    }

    this.visible = true;
    this.health = 10;
    this.value = 20;
    this.vrijeme = 0;
    this.zatvoren = true;  //ovo ćemo koristit za redoslijed animacija
    this.otvaranje = false; //mijenjat ćemo vrijednosti u update position
    this.pucanje = false;
    this.smjer = null; //smjer u kojem će pucat
  }

  updateAnimation() {
    if(this.zatvoren)this.changeFrameSet(this.frameSets("zatvoren"), "pause");
    else if(this.otvaranje) this.changeFrameSet(this.frameSets("otvaranje"), "loop" , 10);
    else if(this.zatvaranje) this.changeFrameSet(this.frameSets("zatvaranje"), "loop" , 10);
    else if(this.pucanje) this.changeFrameSet(this.frameSets("pucanje","pause"))
    this.animate();
  }

  updatePosition() { //položaj se ne mijenja
    this.x_old = this.x;
    this.y_old = this.y;
    this.vrijeme += 1;
    if(this.vrijeme > 130){ //primitivni tajmer, racuna vrijeme pomocu broja update positiona
      this.vrijeme = 0;
      this.zatvaranje = true;
      this.pucanje = false;
    }
    else if(this.vrijeme > 90){
      this.pucanje = true;
      this.otvaranje = false;
    }
    else if(this.vrijeme > 70){
      this.otvaranje = true;
      this.zatvoren = false;
    }
    else if(this.vrijeme > 10){
      this.zatvoren = true;
      this.zatvaranje = false;
    }
  }
  start(x,y){
    this.x = x;
    this.y = y;
  }
  demage(c,coin){
    this.health -= c.value; //kad neprijatelj pogodi lika zdravlje se smanjuje
    if(this.health <= 0){
      this.visible = false; 
      coin.stvori(this.x,this.y) //ako blader umre stvaramo coin na tom mjestu
    }
   }
   puca(c){ //prima niz od dva metka
    c[0].visible = true; //za slučaj da je metak pogodio lika pa je visible false
    c[1].visible = true;
    c[0].vidljivost(this.x,this.y,-5,this.smjer); //svakom  zadaje početnu brzinu u y smjeru i pocetni polozaj
    c[1].vidljivost(this.x,this.y,1,this.smjer);
   
   }

}

class blaster3 extends blaster{  //samo promjenjena brzina pucanja za treću mapu
  constructor(layer){
    super(layer);
  }
  puca(c){ //prima niz od dva metka
    c[0].visible = true; //za slučaj da je metak pogodio lika pa je visible false
    c[1].visible = true;
    c[0].vidljivost(this.x,this.y,-4,this.smjer); //svakom  zadaje početnu brzinu u y smjeru i pocetni polozaj
    c[1].vidljivost(this.x,this.y,4,this.smjer);
  }
}

class bMetak extends Metak{ //ko i obični metak uz promjenu brzina u update position
  constructor(layer){
    super(layer);
    this.width = 20;
    this.height = 20;
  }
  vidljivost(x,y,v0,smjer){
    
    if(!this.poziv){
      this.velocity_y = v0;
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
    
  }
  updatePosition() { //ukida gravitaciju i usporavanje
    this.x_old = this.x;
    this.x += this.velocity_x;
    this.y_old = this.y;
    this.y += this.velocity_y;
    
    if(this.velocity_x < 1 && this.velocity_x >-1){ //kad metak dotakne nešto maknemo ga
      this.makni()
      
    }
    else if(this.velocity_y < -15 || this.velocity_y > 15){
      this.makni(); //da metak ne zaobilazi platforme
    }

  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 6 ;
  }

  moveLeft() {
    this.direction = 270;
    this.velocity_x -= 6 ;
  }
}

class Batery extends Lik{
  constructor(layer){
    super(0,0,layer);

    this.frame_sets={
      "stoji" : [21],
      "kretanje": [22]
    }

    this.visible = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.smjer = null; //smjer kretanja
    this.value = 10;
    this.health = 40;
    this.vrijeme = 0; //tajmer
  }

  updateAnimation() {
    if(this.velocity_x > 3 || this.velocity_x < -3 ||this.velocity_y >3 || this.velocity_y < -3 )this.changeFrameSet(this.frameSets("kretanje"), "pause");
    else this.changeFrameSet(this.frameSets("stoji"), "pause");
    this.animate();
  }

  start(x,y,smjer){
    this.x = x;
    this.y = y;
    this.smjer = smjer;
  }
  demage(c,coin){
    this.health -= c.value; //kad neprijatelj pogodi lika zdravlje se smanjuje
    if(this.health <= 0){
      this.visible = false; 
      coin.stvori(this.x,this.y) //ako blader umre stvaramo coin na tom mjestu
    }
   }

   updatePosition() { //ukida gravitaciju i usporavanje
    this.x_old = this.x;
    this.x += this.velocity_x;
    this.y_old = this.y;
    this.y += this.velocity_y;
    this.vrijeme += 1;
    if(this.smjer == "desno"){ //određuje oce li se gibat lijevo desno ili gore dolje
      if(this.vrijeme < 100){ //vremenski određeno kad mijenja smijer gibanja
        this.moveRight();
      }
      else if(this.vrijeme < 200){
        this.moveLeft();
      }
      else{
        this.vrijeme = 0;
      }
    }
    if(this.smjer == "gore"){
      if(this.vrijeme < 40){
        this.moveUp();
      }
      else if(this.vrijeme < 80){
        this.moveDown();
      }
      else{
        this.vrijeme = 0;
      }
    }
  }

  moveRight() {
    this.direction = 90;
    this.velocity_x += 1;
  }

  moveLeft() {
      this.direction = 270; 
      this.velocity_x -= 1; 
    }
  moveUp() {
      this.direction = 0;
      this.velocity_y -= 1;
    }
  moveDown() {
      this.direction = 180;
      this.velocity_y += 1;
    }

}

class SniperJoe extends Lik{
  constructor(layer){
    super(0,0,layer);

    this.frame_sets={
      "stoji_l" : [81],
      "stoji_d" : [85],
      "pucanje_l": [82,83,84],
      "pucanje_d": [86,87,88]
    }

    this.visible = true;
    this.health = 50;
    this.vrijeme = 0; //tajmer
    this.stojil = true; //za animacije
    this.stojid = false;
    this.pucanjel = false;
    this.pucanjed = false;
    this.okvir = true;
    this.gravity = 1.2;
    this.friction = 0.8;
    this.height = 64;
    this.width = 64;
    this.smjer = "lijevo";
  }

  jump(h = 25) {
  
    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y = -h;

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
    if(Postavke.platforma1.visible){
      this.vrijeme += 1;
      if(this.vrijeme > 150){
        this.vrijeme = 0;
      }
      else if(this.vrijeme < 70 && Postavke.GlavniLik.x < this.x){
        this.stojil = true;
        this.stojid = false;
        this.pucanjel = false;
        this.pucanjed = false;
      }
      else if(this.vrijeme > 70 && Postavke.GlavniLik.x < this.x){
        this.pucanjel = true;
        this.stojil = false;
        this.stojid = false;
        this.pucanjed = false;
        this.smjer = "lijevo";
      }
      if(this.vrijeme < 70 && Postavke.GlavniLik.x > this.x){
        this.stojid = true;
        this.pucanjed = false;
        this.stojil = false;
        this.pucanjel = false;
      }
      else if(this.vrijeme > 70 && Postavke.GlavniLik.x > this.x){
        this.pucanjed = true;
        this.stojid = false;
        this.stojil = false;
        this.pucanjel = false;
        this.smjer = "desno";
      }
      
    }
    
  }

  updateAnimation() {
    if(this.stojil)this.changeFrameSet(this.frameSets("stoji_l"), "pause");
    else if(this.stojid) this.changeFrameSet(this.frameSets("stoji_d"), "pause" );
    else if(this.pucanjed) this.changeFrameSet(this.frameSets("pucanje_d"), "loop" ,5);
    else if(this.pucanjel) this.changeFrameSet(this.frameSets("pucanje_l"),"loop",5)
    this.animate();
  }

  start(x,y){
    this.x = x;
    this.y = y;
  }

  puca(g){
    let x = this.x +32 ; //postavljamo na centar lika
    let y = this.y + 23 ;
    g.vidljivost(x,y,this.smjer);
  }

  demage(c){//,coin){
    this.health -= c.value; //kad neprijatelj pogodi lika zdravlje se smanjuje
    if(this.health <= 0){
      this.pucanjel = false; //da ne puca nakon što nestane
      this.pucanjed = false;
      this.visible = false; 
      //coin.stvori(this.x,this.y) //ako blader umre stvaramo coin na tom mjestu
    }
   }

   dodir(c){ //ako glavni lik dotakne Sniper Joea odbije se
      let udaljenost_x = this.x - c.x;
      let udaljenost_y = this.y - c.y;
      if(udaljenost_x < 0){
        c.velocity_x += 100;
      }
      else{
        c.velocity_x -= 100;
      }
      if(udaljenost_y > 0){
        c.velocity_y -= 30;
      }
   }
}