/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/// <reference path="kod_01-likovi.js"/>
/// <reference path="kod_02-postavke.js"/>


function update_main() {
 
    if (GAME.activeWorldMap.name == "Prvi_dio_1")
      Projekt_logika();
  
    GAME.update();
  
};
let pucanje = true; 
let dodir = "no";

function Projekt_logika() {
    let v = [Postavke.s1,Postavke.s2,Postavke.s3] //niz svih skala
    let metci = [ Postavke.m1,Postavke.m2,Postavke.m3]

    if (SENSING.left.active) {
      Postavke.GlavniLik.moveLeft();
    }
  
    if (SENSING.right.active) {
      Postavke.GlavniLik.moveRight();
    }

    for(let i = 0; i < v.length; i++){ //Ako ne dira ni jedne skale dodir je sigurno ne
      if(Postavke.GlavniLik.touching(v[i])){
        dodir = "da";
      }
      else{
        dodir = "no"
      }
    }
    for(let i = 0; i < v.length; i++){ //ako dira barem jedne skale dodir je sigurno da
      if(Postavke.GlavniLik.touching(v[i])){
        dodir = "da";
        }
    }
    
    if(dodir === "da"){ //ukidamo gravitaciju ako lik dira skale
      Postavke.GlavniLik.no_gravity();
      Postavke.GlavniLik.penjanje_skale = true; //za animaciju na skalama
      if (SENSING.up.active) {
        Postavke.GlavniLik.moveUp();
      }
      else if (SENSING.down.active) {
        Postavke.GlavniLik.moveDown();
      }
    }
    else{ //ako ne dira skale vraćamo normalne postavke
      Postavke.GlavniLik.grav();
      Postavke.GlavniLik.penjanje_skale = false;
      if (SENSING.up.active) {
        Postavke.GlavniLik.jump();
      }
    }
    if(Postavke.GlavniLik.jumping === false){ //ako lik pada neće moći skočiti
      if(Postavke.GlavniLik.velocity_y>0.1){
        Postavke.GlavniLik.jumping = true;
      }
    }
    for(let i = 0; i < metci.length; i++){
    if(metci[i].poziv === false){ //možemo pucati samo kad nema metka na mapi
      if (SENSING.space.active) {
          if(pucanje === true){
            Postavke.GlavniLik.puca(metci[i]);
            pucanje = false; //neće moć pucat dok ne pustimo space
          }
          
        }
      }
    }
    if (SENSING.space.active) { //ograničavamo 1 metak na 1 pritisak spacea
    }
    else{
      pucanje = true;
    }

    /*if (SENSING.up.active) {
      Postavke.GlavniLik.jump();
    }*/
}