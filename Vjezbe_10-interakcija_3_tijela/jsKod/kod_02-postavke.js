//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_01-likovi.js"/>

// što će se pokrenuti kad se klikne button Setup:
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);

function setup() {
  
  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "vjezbe9":
      setupVjezbe9();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */

function setupVjezbe9() {

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platforme");
  Postavke.racoon = new Racoon(GAME.getSpriteLayer("racoon"));
  Postavke.racoon.start();
  GAME.addSprite(Postavke.racoon);

  Postavke.coin = new Coin(GAME.getSpriteLayer("coin"));
  //Postavke.coin.start();
  GAME.addSprite(Postavke.coin);

  Postavke.gljiva = new Gljiva(GAME.getSpriteLayer("gljiva"));
  GAME.addSprite(Postavke.gljiva);

  Postavke.cilj = new Cilj(GAME.getSpriteLayer("cilj"));
  GAME.addSprite(Postavke.cilj);

  GameSettings.output("Bodovi:"+Postavke.racoon.bodovi,true);
  GameSettings.output("Životi:"+Postavke.racoon.zivoti,false);

}