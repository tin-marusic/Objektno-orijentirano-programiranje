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
btnSetupGame.addEventListener("click", setup);

function setup() {
  
  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "Prvi_dio_1":
      setupPrvi_dio_1();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

function setupPrvi_dio_1() {

    GAME.clearSprites();
    GAME.activeWorldMap.setCollisions("Platforme");  //likovi ne propadaju kroz platforme

    Postavke.s1 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s1.start(16*64,8*63.8); //smanjujemo y da lik ne "zapinje" za druge tileove
    Postavke.s1.gornje_skale = true; //označavamo najgornje skale
    GAME.addSprite(Postavke.s1);

    Postavke.s2 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s2.start(16*64,9*63.88); //ostale smanjujemo zbog grafike, da ne bude rupa na skalama
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(16*64,10*63.94);
    GAME.addSprite(Postavke.s3);

    Postavke.s4 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s4.start(11*64,2*63.4); 
    Postavke.s4.gornje_skale = true; 
    GAME.addSprite(Postavke.s4);

    Postavke.s5 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s5.start(11*64,3*63.55); 
    GAME.addSprite(Postavke.s5);

    Postavke.s6 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s6.start(11*64,4*63.7);
    GAME.addSprite(Postavke.s6);

    Postavke.s7 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s7.start(11*64,5*63.85);
    GAME.addSprite(Postavke.s7);

    Postavke.s8 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s8.start(4*64,3*63.7);
    GAME.addSprite(Postavke.s8);

    Postavke.s9 = new Skale(GAME.getSpriteLayer("skale_gornje"));
    Postavke.s9.start(4*64,2*63.4); 
    Postavke.s9.gornje_skale = true; 
    GAME.addSprite(Postavke.s9);

    Postavke.s10 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s10.start(16*64,1*64);
    GAME.addSprite(Postavke.s10);

    Postavke.s11 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s11.start(16*64,0); 
    GAME.addSprite(Postavke.s11);

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
    Postavke.GlavniLik.start();
    GAME.addSprite(Postavke.GlavniLik);

}