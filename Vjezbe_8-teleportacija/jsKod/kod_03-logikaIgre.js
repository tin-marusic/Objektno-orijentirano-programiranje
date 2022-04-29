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
/// <reference path="kod_02-postavke.js"/>
 
/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "vjezbe8")
    vjezbe8();

  GAME.update();
 
};

function vjezbe8() {

  if (SENSING.left.active) {
    Postavke.dinosaur.moveLeft();
  }

  if (SENSING.right.active) {
    Postavke.dinosaur.moveRight();
  }

  if (SENSING.up.active) {
    Postavke.dinosaur.jump();
  }

  if(Postavke.dinosaur.touching(Postavke.coin)){
    
    Postavke.dinosaur.collect(Postavke.coin,Postavke.gljiva);

    GameSettings.output(Postavke.dinosaur.points,true);
  }
  if(Postavke.dinosaur.touching(Postavke.gljiva)){
    
    Postavke.dinosaur.start();
  }

}