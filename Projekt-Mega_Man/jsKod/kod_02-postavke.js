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
const leveldownEvent1 = new Event("leveldown1") //za povratak na prvu mapu
const leveldownEvent2 = new Event("leveldown2") //za povratak na drugu mapu

btnSetupGame.addEventListener("click", setup);
btnSetupGame.addEventListener("levelup1", podigni1);
btnSetupGame.addEventListener("leveldown1", spusti1);
btnSetupGame.addEventListener("levelup2", setupTreci_dio_1);
btnSetupGame.addEventListener("leveldown2", spusti2);

function setup() {
  
  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "Prvi_dio_1":
      setupPrvi_dio_1(0,13.98*64);
      break;

      case "Treci_dio_1":
        setupTreci_dio_1(1*64,2*64);
        break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}
function spusti1(){  //postavljamo setup za prvu mapu, ali lika postavljamo na skale na vrhu
  setupPrvi_dio_1(17*64,0.72*64)
}

function podigni1(){
  setupDrugi_dio_1(17*64,14.4*64)
}

function spusti2(){  //postavljamo setup za prvu mapu, ali lika postavljamo na skale na vrhu
  setupDrugi_dio_1(1*64,0.72*64)
}

function setupPrvi_dio_1(x,y) {

    GAME.clearSprites();
    GAME.activeWorldMap.setCollisions("Platforme");  //likovi ne propadaju kroz platforme

    Postavke.s1 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s1.start(2*64,11*63.8); //smanjujemo y da lik ne "zapinje" za druge tileove
    Postavke.s1.gornje_skale = true; //označavamo najgornje skale
    GAME.addSprite(Postavke.s1);

    Postavke.s2 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s2.start(2*64,12*63.87); //ostale smanjujemo zbog grafike, da ne bude rupa na skalama
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(2*64,13*63.94);
    GAME.addSprite(Postavke.s3);

    Postavke.s4 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s4.start(2*64,14*64); 
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

    Postavke.s9 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s9.start(14*64,14*64);  
    GAME.addSprite(Postavke.s9);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s10.start(18*64,7*63.8);
    Postavke.s10.gornje_skale = true;
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(18*64,8*63.9); 
    GAME.addSprite(Postavke.s11);

    Postavke.s12 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s12.start(18*64,9*64); 
    GAME.addSprite(Postavke.s12);

    Postavke.s13 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s13.start(2*64,4*63.72);
    Postavke.s13.gornje_skale = true;
    GAME.addSprite(Postavke.s13);

    Postavke.s14 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s14.start(2*64,5*63.86); 
    GAME.addSprite(Postavke.s14);

    Postavke.s15 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s15.start(2*64,6*63.97); 
    GAME.addSprite(Postavke.s15);

    Postavke.s16 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s16.start(17*64,1*63.8);
    Postavke.s16.gornje_skale = true;
    GAME.addSprite(Postavke.s16);

    Postavke.s17 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s17.start(17*64,2*63.9); 
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
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(10*64,12*63.94);
    GAME.addSprite(Postavke.s3);

    Postavke.s4 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s4.start(10*64,13*64); 
    GAME.addSprite(Postavke.s4);

    Postavke.s5 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s5.start(5*64,11*63.8); 
    Postavke.s5.gornje_skale = true;
    GAME.addSprite(Postavke.s5);

    Postavke.s6 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s6.start(5*64,12*63.85);
    GAME.addSprite(Postavke.s6);

    Postavke.s7 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s7.start(5*64,13*63.9);
    GAME.addSprite(Postavke.s7);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s10.start(18*64,5*63.8);
    Postavke.s10.gornje_skale = true;
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(18*64,6*63.9); 
    GAME.addSprite(Postavke.s11);

    Postavke.s12 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s12.start(18*64,7*64); 
    GAME.addSprite(Postavke.s12);

    Postavke.s13 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s13.start(1*64,1*63.72);
    Postavke.s13.gornje_skale = true;
    GAME.addSprite(Postavke.s13);

    Postavke.s14 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s14.start(1*64,2*63.86); 
    GAME.addSprite(Postavke.s14);

    Postavke.s15 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s15.start(1*64,3*63.97); 
    GAME.addSprite(Postavke.s15);

    Postavke.s16 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s16.start(17*64,14*63.8);
    Postavke.s16.gornje_skale = true;
    GAME.addSprite(Postavke.s16);

    Postavke.s17 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s17.start(17*64,15*63.9); 
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
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(17*64,13*63.94);
    GAME.addSprite(Postavke.s3);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s10.start(1*64,8*63.8);
    Postavke.s10.gornje_skale = true;
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(1*64,9*63.9); 
    GAME.addSprite(Postavke.s11);

    Postavke.s12 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s12.start(1*64,10*64); 
    GAME.addSprite(Postavke.s12);

    Postavke.s16 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s16.start(1*64,14*63.8);
    Postavke.s16.gornje_skale = true;
    GAME.addSprite(Postavke.s16);

    Postavke.s17 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s17.start(1*64,15*63.9); 
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

    Postavke.platforma1 = new platforma_nevidljiva(GAME.getSpriteLayer("Platforme_nevidljive"));
    Postavke.platforma1.start(5*64,13*64);
    Postavke.platforma1.postani_vidljiv()
    GAME.addSprite(Postavke.platforma1);


  Postavke.GlavniLik = new GlavniLik(GAME.getSpriteLayer("Glavni lik")); //glavni lik stvoren zadni da bude ispred skala
  Postavke.GlavniLik.start(1*64,14.35*64);
  GAME.addSprite(Postavke.GlavniLik);
}