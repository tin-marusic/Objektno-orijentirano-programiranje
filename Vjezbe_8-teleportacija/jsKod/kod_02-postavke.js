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
    case "vjezbe8":
      setupVjezbe8();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */

function setupVjezbe8() {

  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platforme");

  let d = new Dinosaur(0, 0, GAME.getSpriteLayer("dino"));
  GAME.addSprite(d);
  Postavke.dinosaur = d;

  Postavke.coin = new Coin(GAME.getSpriteLayer("coin"));
  GAME.addSprite(Postavke.coin);
  //Postavke.coin.visible = true;
  Postavke.coin.postavi();
  
  Postavke.gljiva = new Gljiva(GAME.getSpriteLayer("gljiva"));
  GAME.addSprite(Postavke.gljiva);
  Postavke.gljiva.stvori();

}