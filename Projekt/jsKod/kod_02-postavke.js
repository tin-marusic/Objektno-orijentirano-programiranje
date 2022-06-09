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
    Postavke.s1.start(16*64,8*63.25); //smanjujemo y da lik ne "zapinje" za druge tileove
    GAME.addSprite(Postavke.s1);

    Postavke.s2 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s2.start(16*64,9*63.5); //ostale smanjujemo zbog grafike, da ne bude rupa na skalama
    GAME.addSprite(Postavke.s2);

    Postavke.s3 = new Skale(GAME.getSpriteLayer("skale"));
    Postavke.s3.start(16*64,10*63.75);
    GAME.addSprite(Postavke.s3);

    Postavke.m1 = new Metak(GAME.getSpriteLayer("metak1"));
    GAME.addSprite(Postavke.m1);
    Postavke.m2 = new Metak(GAME.getSpriteLayer("metak2"));
    GAME.addSprite(Postavke.m2);
    Postavke.m3 = new Metak(GAME.getSpriteLayer("metak3"));
    GAME.addSprite(Postavke.m3);

    Postavke.GlavniLik = new GlavniLik(GAME.getSpriteLayer("Glavni lik")); //glavni lik stvoren zadni da bude ispred skala
    Postavke.GlavniLik.start();
    GAME.addSprite(Postavke.GlavniLik);

}