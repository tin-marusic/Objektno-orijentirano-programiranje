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
let dodir = false;
let penjanje = true;

function Projekt_logika() {
    let v = [Postavke.s1,Postavke.s2,Postavke.s3,Postavke.s4,Postavke.s5,Postavke.s6,
      Postavke.s7,Postavke.s8,Postavke.s9,Postavke.s10,Postavke.s11] //niz svih skala
    let metci = [ Postavke.m1,Postavke.m2,Postavke.m3,Postavke.m4,Postavke.m5]

    if (SENSING.left.active) {
      Postavke.GlavniLik.moveLeft();
    }
  
    if (SENSING.right.active) {
      Postavke.GlavniLik.moveRight();
    }

    for(let i = 0; i < v.length; i++){ //Ako ne dira ni jedne skale dodir je sigurno false
      if(Postavke.GlavniLik.touching(v[i])){
        dodir = true;
      }
      else{
        dodir = false;
      }
    }
    for(let i = 0; i < v.length; i++){ //ako dira barem jedne skale dodir je sigurno true
      if(Postavke.GlavniLik.touching(v[i])){
        dodir = true;
        }
    }
    
    if(dodir === true){ 
      Postavke.GlavniLik.no_gravity(); //ukidamo gravitaciju ako lik dira skale
      Postavke.GlavniLik.penjanje_skale = true; //za animaciju na skalama
      if (SENSING.up.active) {
        for(let i = 0; i < v.length; i++){
          if(Postavke.GlavniLik.touching(v[i])){ //gledamo koje skale lik dira
            if(v[i].gornje_skale === true){ //provjeravamo jesu li skale najgornje
              let polozaj = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik na vrhu skala
              if(polozaj < -53){ //ako je lik na vrhu skala neće se više penjat
                if(this.penjanje === false){ //da ne skoči odma ćim dođe na vrh nego je potrebno ponovo stisnit strelicu
                  Postavke.GlavniLik.friction = 0.8; //da lik može skočit dovoljno brzo
                  Postavke.GlavniLik.velocity_y = -50; //skok lika,jump ne radi
                }
              }
              else{ //ako nije na vrhu nastavlja se penjat
                
                Postavke.GlavniLik.moveUp();
                this.penjanje = true; //strelica prema gore stisnuta
              }
            }// ako skale nisu najgornje lik se samo penje po njima
            else{
              Postavke.GlavniLik.moveUp();
              this.penjanje = true;//strelica prema gore stisnuta
            }
          }
        }
      }
      else if (SENSING.down.active) {
        Postavke.GlavniLik.moveDown();
      }
      else if(!SENSING.up.active && !SENSING.down.active){//da lik ne propadne kad skoči na skale
        if(Postavke.GlavniLik.velocity_y > 4.2){
          for(let i = 0; i < v.length; i++){
            if(Postavke.GlavniLik.touching(v[i])){
            if(v[i].gornje_skale === true){ //vrijedi samo za najgornje skale
              let skale_likx = v[i].x - Postavke.GlavniLik.x; //gledamo razliku između položaja skala i lika
              let skale_liky = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik iznad skala
              if(-64 < skale_likx && skale_likx < 64 && skale_liky < -48){ //da ne uzme y krivih gornjih skala
                //skale_liky < -52 sluzi da ako skočimo sa strane na skale ne vraca nas na vrh
                Postavke.GlavniLik.velocity_y = 0;
                Postavke.GlavniLik.y = v[i].y - 56; //postavljamo lik na vrh skala
              }
            }
          }  
        }
      }
    }
  }
    else{ //ako ne dira skale vraćamo normalne postavke
      Postavke.GlavniLik.grav();
      Postavke.GlavniLik.penjanje_skale = false;
      if (SENSING.up.active) {
        Postavke.GlavniLik.jump();
      }
    }
    if (!SENSING.up.active) {
      this.penjanje = false; //strelica prema gore puštena
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
    if (!SENSING.space.active) { //ograničavamo 1 metak na 1 pritisak spacea
      pucanje = true;
    }
    /*if (SENSING.up.active) {
      Postavke.GlavniLik.jump();
    }*/
}