/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_01-likovi.js"/>


let btnSetupGame = document.getElementById("btnSetupGame");
const levelupEvent1 = new Event("levelup1"); //za prelazak na drugu mapu
const levelupEvent2 = new Event("levelup2"); //za prelazak na trecu mapu
const leveldownEvent1 = new Event("leveldown1"); //za povratak na prvu mapu
const leveldownEvent2 = new Event("leveldown2"); //za povratak na drugu mapu
const gameover = new Event("gameover"); //za kraj igrice
const wingamee = new Event("wingamee");

btnSetupGame.addEventListener("click", setup);
btnSetupGame.addEventListener("levelup1", podigni1);
btnSetupGame.addEventListener("leveldown1", spusti1);
btnSetupGame.addEventListener("levelup2", setupTreci_dio_1);
btnSetupGame.addEventListener("leveldown2", spusti2);
btnSetupGame.addEventListener("gameover",setup_gameover)
btnSetupGame.addEventListener("wingamee",setup_gameover) 

function setup() {
  
  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
      case "Prvi_dio_1":
        setupPrvi_dio_1(0,13.98*64);
        Postavke.first_setup = true;
        break;

      case "Drugi_dio_1":
        setupDrugi_dio_1(17*64,14.4*64);
        Postavke.first_setup = true;
        console.log("szvha")
        break;

      case "Treci_dio_1":
        setupTreci_dio_1(1*64,2*64);
        Postavke.first_setup = true;
        break;

      default:
        throw "Ne postoji setup za " + GAME.activeWorldMap.name;
        break;
  }

  render_main();
}
function spusti1(){  //postavljamo setup za prvu mapu, ali lika postavljamo na skale na vrhu
  setupPrvi_dio_1(17*64,0.72*64)
  Postavke.first_setup = false;
}

function podigni1(){
  setupDrugi_dio_1(17*64,14.4*64)
  Postavke.first_setup = false;
}

function spusti2(){  //postavljamo setup za prvu mapu, ali lika postavljamo na skale na vrhu
  setupDrugi_dio_1(1*64,0.72*64)
  Postavke.first_setup = false;
}

function setupPrvi_dio_1(x,y) {

    GAME.clearSprites();
    GAME.activeWorldMap.setCollisions("Platforme");  //likovi ne propadaju kroz platforme

    Postavke.s1 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s1.start(2*64,11*63.9); //smanjujemo y da lik ne "zapinje" za druge tileove
    Postavke.s1.gornje_skale = true; //označavamo najgornje skale
    GAME.addSprite(Postavke.s1);

    Postavke.s2 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s2.start(2*64,12*63.92); //ostale smanjujemo zbog grafike, da ne bude rupa na skalama
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(2*64,13*63.96);
    GAME.addSprite(Postavke.s3);

    Postavke.s4 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s4.start(2*64,14*64); 
    Postavke.s4.donje_skale = true;
    GAME.addSprite(Postavke.s4);

    Postavke.s5 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s5.start(14*64,10*63.8); 
    Postavke.s5.gornje_skale = true;
    GAME.addSprite(Postavke.s5);

    Postavke.s6 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s6.start(14*64,11*63.85);
    GAME.addSprite(Postavke.s6);

    Postavke.s7 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s7.start(14*64,12*63.9);
    GAME.addSprite(Postavke.s7);

    Postavke.s8 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s8.start(14*64,13*63.95);
    GAME.addSprite(Postavke.s8);

    Postavke.s9 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s9.start(14*64,14*64);  
    Postavke.s9.donje_skale = true;
    GAME.addSprite(Postavke.s9);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s10.start(18*64,7*63.8);
    Postavke.s10.gornje_skale = true;
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(18*64,8*63.9); 
    GAME.addSprite(Postavke.s11);

    Postavke.s12 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s12.start(18*64,9*64); 
    Postavke.s12.donje_skale = true;
    GAME.addSprite(Postavke.s12);

    Postavke.s13 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s13.start(2*64,4*63.72);
    Postavke.s13.gornje_skale = true;
    GAME.addSprite(Postavke.s13);

    Postavke.s14 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s14.start(2*64,5*63.86); 
    GAME.addSprite(Postavke.s14);

    Postavke.s15 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s15.start(2*64,6*63.97); 
    Postavke.s15.donje_skale = true;
    GAME.addSprite(Postavke.s15);

    Postavke.s16 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s16.start(17*64,1*63.8);
    Postavke.s16.gornje_skale = true;
    GAME.addSprite(Postavke.s16);

    Postavke.s17 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s17.start(17*64,2*63.9);
    Postavke.s17.donje_skale = true; 
    GAME.addSprite(Postavke.s17);

    Postavke.m1 = new Metak(GAME.getSpriteLayer("metak1"));
    GAME.addSprite(Postavke.m1);
    Postavke.m2 = new Metak(GAME.getSpriteLayer("metak2"));
    GAME.addSprite(Postavke.m2);
    Postavke.m3 = new Metak(GAME.getSpriteLayer("metak3"));
    GAME.addSprite(Postavke.m3);
    Postavke.m4 = new Metak(GAME.getSpriteLayer("metak4"));
    GAME.addSprite(Postavke.m4);
    Postavke.m5 = new Metak(GAME.getSpriteLayer("metak5"));
    GAME.addSprite(Postavke.m5);

    Postavke.b1 = new Blader(GAME.getSpriteLayer("Blader"));
    Postavke.b1.start(5.1*64,9*64,7*64,11*64);
    GAME.addSprite(Postavke.b1);

    Postavke.b2 = new Blader(GAME.getSpriteLayer("Blader2"));
    Postavke.b2.start(8*64,11.99*64,10*64,13*64);
    GAME.addSprite(Postavke.b2);

    Postavke.b3 = new Blader(GAME.getSpriteLayer("Blader3"));
    Postavke.b3.start(0.8,3.99*64,1*64,3*64);
    GAME.addSprite(Postavke.b3);

    Postavke.c1 = new coin(GAME.getSpriteLayer("coin1"));
    GAME.addSprite(Postavke.c1);

    Postavke.c2 = new coin(GAME.getSpriteLayer("coin2"));
    GAME.addSprite(Postavke.c2);

    Postavke.c3 = new coin(GAME.getSpriteLayer("coin3"));
    GAME.addSprite(Postavke.c3);

    Postavke.c4 = new coin(GAME.getSpriteLayer("coin4"));
    GAME.addSprite(Postavke.c4);

    Postavke.c5 = new coin(GAME.getSpriteLayer("coin5"));
    GAME.addSprite(Postavke.c5);

    Postavke.c6 = new coin(GAME.getSpriteLayer("coin6"));
    GAME.addSprite(Postavke.c6);

    Postavke.blaster1 = new blaster(GAME.getSpriteLayer("Blaster1"));
    Postavke.blaster1.start(18*64,12*64);
    Postavke.blaster1.smjer = "lijevo";
    GAME.addSprite(Postavke.blaster1);

    Postavke.blaster2 = new blaster(GAME.getSpriteLayer("Blaster2"));
    Postavke.blaster2.start(13*64,4*64);
    Postavke.blaster2.smjer = "desno";
    GAME.addSprite(Postavke.blaster2);

    Postavke.blaster3 = new blaster(GAME.getSpriteLayer("Blaster3"));
    Postavke.blaster3.start(0,4*64);
    Postavke.blaster3.smjer = "desno";
    GAME.addSprite(Postavke.blaster3);

    Postavke.bm1 = new bMetak(GAME.getSpriteLayer("bm1"));
    GAME.addSprite(Postavke.bm1);
    Postavke.bm2 = new bMetak(GAME.getSpriteLayer("bm2"));
    GAME.addSprite(Postavke.bm2);
    Postavke.bm3 = new bMetak(GAME.getSpriteLayer("bm3"));
    GAME.addSprite(Postavke.bm3);
    Postavke.bm4 = new bMetak(GAME.getSpriteLayer("bm4"));
    GAME.addSprite(Postavke.bm4);
    Postavke.bm5 = new bMetak(GAME.getSpriteLayer("bm5"));
    GAME.addSprite(Postavke.bm5);
    Postavke.bm6 = new bMetak(GAME.getSpriteLayer("bm6"));
    GAME.addSprite(Postavke.bm6);

    Postavke.GlavniLik = new GlavniLik(GAME.getSpriteLayer("Glavni lik")); //glavni lik stvoren zadni da bude ispred skala
    Postavke.GlavniLik.start(x,y);
    GAME.addSprite(Postavke.GlavniLik);

}

function setupDrugi_dio_1(x,y) {
    GAME.clearSprites();
    GAME.activeWorldMap.setCollisions("Platforme");

    Postavke.s1 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s1.start(10*64,10*63.8); //smanjujemo y da lik ne "zapinje" za druge tileove
    Postavke.s1.gornje_skale = true; //označavamo najgornje skale
    GAME.addSprite(Postavke.s1);

    Postavke.s2 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s2.start(10*64,11*63.87); //ostale smanjujemo zbog grafike, da ne bude rupa na skalama
    Postavke.s2.gornje_skale = false;
    Postavke.s2.donje_skale = false;
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(10*64,12*63.94);
    Postavke.s3.gornje_skale = false;
    Postavke.s3.donje_skale = false;
    GAME.addSprite(Postavke.s3);

    Postavke.s4 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s4.start(10*64,13*64); 
    Postavke.s4.gornje_skale = false;
    Postavke.s4.donje_skale = true;
    GAME.addSprite(Postavke.s4);

    Postavke.s5 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s5.start(5*64,11*63.8); 
    Postavke.s5.gornje_skale = true;
    Postavke.s5.donje_skale = false;
    GAME.addSprite(Postavke.s5);

    Postavke.s6 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s6.start(5*64,12*63.85);
    Postavke.s6.gornje_skale = false;
    Postavke.s6.donje_skale = false;
    GAME.addSprite(Postavke.s6);

    Postavke.s7 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s7.start(5*64,13*63.9);
    Postavke.s7.gornje_skale = false;
    Postavke.s7.donje_skale = true;
    GAME.addSprite(Postavke.s7);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s10.start(18*64,5*63.8);
    Postavke.s10.gornje_skale = true;
    Postavke.s10.donje_skale = false;
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(18*64,6*63.9);
    Postavke.s11.gornje_skale = false;
    Postavke.s11.donje_skale = false; 
    GAME.addSprite(Postavke.s11);

    Postavke.s12 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s12.start(18*64,7*64);
    Postavke.s12.gornje_skale = false;
    Postavke.s12.donje_skale = true;
    GAME.addSprite(Postavke.s12);

    Postavke.s13 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s13.start(1*64,1*63.72);
    Postavke.s13.gornje_skale = true;
    Postavke.s13.donje_skale = false;
    GAME.addSprite(Postavke.s13);

    Postavke.s14 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s14.start(1*64,2*63.86);
    Postavke.s14.gornje_skale = false;
    Postavke.s14.donje_skale = false; 
    GAME.addSprite(Postavke.s14);

    Postavke.s15 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s15.start(1*64,3*63.97); 
    Postavke.s15.gornje_skale = false;
    Postavke.s15.donje_skale = true;
    GAME.addSprite(Postavke.s15);

    Postavke.s16 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s16.start(17*64,14*63.99);
    Postavke.s16.gornje_skale = true;
    Postavke.s16.donje_skale = false;
    GAME.addSprite(Postavke.s16);

    Postavke.s17 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s17.start(17*64,15*63.8);
    Postavke.s17.gornje_skale = false; 
    Postavke.s17.donje_skale = true;
    GAME.addSprite(Postavke.s17);

    Postavke.m1 = new Metak(GAME.getSpriteLayer("metak1"));
    GAME.addSprite(Postavke.m1);
    Postavke.m2 = new Metak(GAME.getSpriteLayer("metak2"));
    GAME.addSprite(Postavke.m2);
    Postavke.m3 = new Metak(GAME.getSpriteLayer("metak3"));
    GAME.addSprite(Postavke.m3);
    Postavke.m4 = new Metak(GAME.getSpriteLayer("metak4"));
    GAME.addSprite(Postavke.m4);
    Postavke.m5 = new Metak(GAME.getSpriteLayer("metak5"));
    GAME.addSprite(Postavke.m5);

    Postavke.b1 = new Blader(GAME.getSpriteLayer("Blader"));
    Postavke.b1.start(14*64,17.9*64,15*64,4*64);
    GAME.addSprite(Postavke.b1);

    Postavke.blaster1 = new blaster(GAME.getSpriteLayer("Blaster1"));
    Postavke.blaster1.start(11*64,3*64);
    Postavke.blaster1.smjer = "desno";
    GAME.addSprite(Postavke.blaster1);

    Postavke.blaster2 = new blaster(GAME.getSpriteLayer("Blaster2"));
    Postavke.blaster2.start(0,13*64);
    Postavke.blaster2.smjer = "desno";
    GAME.addSprite(Postavke.blaster2);

    Postavke.blaster3 = new blaster(GAME.getSpriteLayer("Blaster3"));
    Postavke.blaster3.start(1*64,8*64);
    Postavke.blaster3.smjer = "desno";
    GAME.addSprite(Postavke.blaster3);

    Postavke.bm1 = new bMetak(GAME.getSpriteLayer("bm1"));
    GAME.addSprite(Postavke.bm1);
    Postavke.bm2 = new bMetak(GAME.getSpriteLayer("bm2"));
    GAME.addSprite(Postavke.bm2);
    Postavke.bm3 = new bMetak(GAME.getSpriteLayer("bm3"));
    GAME.addSprite(Postavke.bm3);
    Postavke.bm4 = new bMetak(GAME.getSpriteLayer("bm4"));
    GAME.addSprite(Postavke.bm4);
    Postavke.bm5 = new bMetak(GAME.getSpriteLayer("bm5"));
    GAME.addSprite(Postavke.bm5);
    Postavke.bm6 = new bMetak(GAME.getSpriteLayer("bm6"));
    GAME.addSprite(Postavke.bm6);

    Postavke.bat1 = new Batery(GAME.getSpriteLayer("Batery"))
    Postavke.bat1.start(1*64,9*64,"desno")
    GAME.addSprite(Postavke.bat1);

    Postavke.bat2 = new Batery(GAME.getSpriteLayer("Batery1"))
    Postavke.bat2.start(8*64,12*64,"desno")
    GAME.addSprite(Postavke.bat2);

    Postavke.bat3 = new Batery(GAME.getSpriteLayer("Batery2"))
    Postavke.bat3.start(11*64,13*64,"gore")
    GAME.addSprite(Postavke.bat3);


    Postavke.c1 = new coin(GAME.getSpriteLayer("coin1"));
    GAME.addSprite(Postavke.c1);
    Postavke.c2 = new coin(GAME.getSpriteLayer("coin2"));
    GAME.addSprite(Postavke.c2);
    Postavke.c3 = new coin(GAME.getSpriteLayer("coin3"));
    GAME.addSprite(Postavke.c3);
    Postavke.c4 = new coin(GAME.getSpriteLayer("coin4"));
    GAME.addSprite(Postavke.c4);
    Postavke.c5 = new coin(GAME.getSpriteLayer("coin5"));
    GAME.addSprite(Postavke.c5);
    Postavke.c6 = new coin(GAME.getSpriteLayer("coin6"));
    GAME.addSprite(Postavke.c6);

    Postavke.hc = new Health_coin(GAME.getSpriteLayer("hcoin"));
    Postavke.hc.stvori(15,12.3*64);
    GAME.addSprite(Postavke.hc);

    Postavke.GlavniLik = new GlavniLik(GAME.getSpriteLayer("Glavni lik")); //glavni lik stvoren zadni da bude ispred skala
    Postavke.GlavniLik.start(x,y);
    GAME.addSprite(Postavke.GlavniLik);


}

function setupTreci_dio_1() {
  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("Platforme");

    Postavke.s1 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s1.start(17*64,11*63.8); //smanjujemo y da lik ne "zapinje" za druge tileove
    Postavke.s1.gornje_skale = true; //označavamo najgornje skale
    GAME.addSprite(Postavke.s1);

    Postavke.s2 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s2.start(17*64,12*63.87); //ostale smanjujemo zbog grafike, da ne bude rupa na skalama
    Postavke.s2.gornje_skale = false;
    Postavke.s2.donje_skale = false;
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s3.start(17*64,13*63.94);
    Postavke.s3.gornje_skale = false;
    Postavke.s3.donje_skale = true;
    GAME.addSprite(Postavke.s3);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s10.start(1*64,8*63.8);
    Postavke.s10.gornje_skale = true;
    Postavke.s10.donje_skale = false;
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(1*64,9*63.9); 
    Postavke.s11.gornje_skale = false;
    Postavke.s11.donje_skale = false;
    GAME.addSprite(Postavke.s11);

    Postavke.s12 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s12.start(1*64,10*64);
    Postavke.s12.gornje_skale = false; 
    Postavke.s12.donje_skale = true;
    GAME.addSprite(Postavke.s12);

    Postavke.s16 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s16.start(1*64,14*63.9);
    Postavke.s16.gornje_skale = true;
    Postavke.s16.donje_skale = false;
    GAME.addSprite(Postavke.s16);

    Postavke.s17 = new Skale(GAME.getSpriteLayer("skale_donje"));
    Postavke.s17.start(1*64,15*63); 
    Postavke.s17.gornje_skale = false; 
    Postavke.s17.donje_skale = true;
    GAME.addSprite(Postavke.s17);

    Postavke.m1 = new Metak(GAME.getSpriteLayer("metak1"));
    GAME.addSprite(Postavke.m1);
    Postavke.m2 = new Metak(GAME.getSpriteLayer("metak2"));
    GAME.addSprite(Postavke.m2);
    Postavke.m3 = new Metak(GAME.getSpriteLayer("metak3"));
    GAME.addSprite(Postavke.m3);
    Postavke.m4 = new Metak(GAME.getSpriteLayer("metak4"));
    GAME.addSprite(Postavke.m4);
    Postavke.m5 = new Metak(GAME.getSpriteLayer("metak5"));
    GAME.addSprite(Postavke.m5);

    Postavke.platforma1 = new platforma_nevidljiva(GAME.getSpriteLayer("Platforme_nevidljive")); //platforme koje se stvore naknadno
    Postavke.platforma1.start(3*64,7*64);
    GAME.addSprite(Postavke.platforma1);

    Postavke.platforma2 = new platforma_nevidljiva(GAME.getSpriteLayer("Platforme_nevidljive"));
    Postavke.platforma2.start(3*64,6*64);
    GAME.addSprite(Postavke.platforma2);

    Postavke.spike1 = new siljci(GAME.getSpriteLayer("siljci"));
    Postavke.spike1.start(8*64,11*62);
    GAME.addSprite(Postavke.spike1);

    Postavke.spike2 = new siljci(GAME.getSpriteLayer("siljci"));
    Postavke.spike2.start(11*64,11*62);
    GAME.addSprite(Postavke.spike2);

    Postavke.blaster1 = new blaster3(GAME.getSpriteLayer("Blaster1"));
    Postavke.blaster1.start(13*64,12*64);
    Postavke.blaster1.smjer = "lijevo";
    GAME.addSprite(Postavke.blaster1);

    Postavke.blaster2 = new blaster3(GAME.getSpriteLayer("Blaster2"));
    Postavke.blaster2.start(6*64,8*64);
    Postavke.blaster2.smjer = "desno";
    GAME.addSprite(Postavke.blaster2);

    Postavke.blaster3 = new blaster3(GAME.getSpriteLayer("Blaster3"));
    Postavke.blaster3.start(7*64,7*64);
    Postavke.blaster3.smjer = "desno";
    GAME.addSprite(Postavke.blaster3);

    Postavke.bm1 = new bMetak(GAME.getSpriteLayer("bm1"));
    GAME.addSprite(Postavke.bm1);
    Postavke.bm2 = new bMetak(GAME.getSpriteLayer("bm2"));
    GAME.addSprite(Postavke.bm2);
    Postavke.bm3 = new bMetak(GAME.getSpriteLayer("bm3"));
    GAME.addSprite(Postavke.bm3);
    Postavke.bm4 = new bMetak(GAME.getSpriteLayer("bm4"));
    GAME.addSprite(Postavke.bm4);
    Postavke.bm5 = new bMetak(GAME.getSpriteLayer("bm5"));
    GAME.addSprite(Postavke.bm5);
    Postavke.bm6 = new bMetak(GAME.getSpriteLayer("bm6"));
    GAME.addSprite(Postavke.bm6);

    Postavke.bat1 = new Batery(GAME.getSpriteLayer("Batery1"))
    Postavke.bat1.start(17*64,12*64,"desno")
    GAME.addSprite(Postavke.bat1);

    Postavke.bat2 = new Batery(GAME.getSpriteLayer("Batery2"))
    Postavke.bat2.start(1*64,6*64,"desno")
    GAME.addSprite(Postavke.bat2);

    Postavke.bat3 = new Batery(GAME.getSpriteLayer("Batery3"))
    Postavke.bat3.start(1*64,7*64,"gore")
    GAME.addSprite(Postavke.bat3);


    Postavke.c1 = new coin(GAME.getSpriteLayer("coin1"));
    GAME.addSprite(Postavke.c1);
    Postavke.c2 = new coin(GAME.getSpriteLayer("coin2"));
    GAME.addSprite(Postavke.c2);
    Postavke.c3 = new coin(GAME.getSpriteLayer("coin3"));
    GAME.addSprite(Postavke.c3);
    Postavke.c4 = new coin(GAME.getSpriteLayer("coin4"));
    GAME.addSprite(Postavke.c4);
    Postavke.c5 = new coin(GAME.getSpriteLayer("coin5"));
    GAME.addSprite(Postavke.c5);
    Postavke.c6 = new coin(GAME.getSpriteLayer("coin6"));
    GAME.addSprite(Postavke.c6);

  Postavke.SniperJoe = new SniperJoe(GAME.getSpriteLayer("Sniper_Joe"));
  Postavke.SniperJoe.start(12*64,5*64);
  GAME.addSprite(Postavke.SniperJoe);

  Postavke.sm1 = new Metak(GAME.getSpriteLayer("sm1"));
  GAME.addSprite(Postavke.sm1);
  Postavke.sm2 = new Metak(GAME.getSpriteLayer("sm2"));
  GAME.addSprite(Postavke.sm2);
  Postavke.sm3 = new Metak(GAME.getSpriteLayer("sm3"));
  GAME.addSprite(Postavke.sm3);
  Postavke.sm4 = new Metak(GAME.getSpriteLayer("sm4"));
  GAME.addSprite(Postavke.sm4);
  Postavke.sm5 = new Metak(GAME.getSpriteLayer("sm5"));
  GAME.addSprite(Postavke.sm5);   

  Postavke.ec = new coin(GAME.getSpriteLayer("end_coin"));
  Postavke.ec.width = 150;
  Postavke.ec.height = 150;
  GAME.addSprite(Postavke.ec);

  Postavke.GlavniLik = new GlavniLik(GAME.getSpriteLayer("Glavni lik")); //glavni lik stvoren zadni da bude ispred skala
  Postavke.GlavniLik.start(1*64,14.35*64);
  GAME.addSprite(Postavke.GlavniLik);
}

function setup_gameover(){

  GAME.clearSprites();

  brojevi = [0,1,2,3,4,5,6,7,8,9]
  brojevi_string = ["nula","jedan","dva","tri","cetiri","pet","sest","sedam","osam","devet"]
  brojevi_staticka = [Postavke.nula,Postavke.jedan,Postavke.dva,Postavke.tri,Postavke.cetiri,
                      Postavke.pet,Postavke.sest,Postavke.sedam,Postavke.osam,Postavke.devet]
  const niz = Array.from(String(Postavke.GlavniLik.points), Number);
  for(let i = 0; i < niz.length; i++){
    	for(let j = 0;j < brojevi.length ; j++){
        if(niz[i] === brojevi[j]){
            brojevi_staticka[j] = new broj(GAME.getSpriteLayer(brojevi_string[j]));
            brojevi_staticka[j].start(11*64 + i*64,5*64);
            GAME.addSprite(brojevi_staticka[j]);
        }
      }
  }
}
