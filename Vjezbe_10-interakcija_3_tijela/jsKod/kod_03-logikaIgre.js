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
 
  if (GAME.activeWorldMap.name == "vjezbe9")
    vjezbe9();

  GAME.update();
  GameSettings.output("Bodovi:"+Postavke.racoon.bodovi,true);
  GameSettings.output("Životi:"+Postavke.racoon.zivoti,false);

};

function vjezbe9() {

  if (SENSING.left.active) {
    Postavke.racoon.moveLeft();
  }

  if (SENSING.right.active) {
    Postavke.racoon.moveRight();
  }

  if (SENSING.up.active) {
    Postavke.racoon.jump();
  }
  if(Postavke.gljiva.poziv == false){ //možemo pucati samo kad nema gljive na mapi
    if (SENSING.space.active) {
      Postavke.racoon.puca(Postavke.gljiva);
  }
  }
  if(Postavke.racoon.touching(Postavke.coin)){
    Postavke.racoon.collect(Postavke.coin,Postavke.gljiva);
    GameSettings.output("Bodovi:"+Postavke.racoon.bodovi,true);
    GameSettings.output("Životi:"+Postavke.racoon.zivoti,false);
  }

  if(Postavke.cilj.touching(Postavke.gljiva)){
    GameSettings.output("Pobjeda",false);
    Postavke.gljiva.kraj();  //cilj igre pogoditi cilj gljivom
  }

  /*if(Postavke.racoon.touching(Postavke.gljiva)){
    Postavke.racoon.skupi(Postavke.gljiva);
    GameSettings.output("Bodovi:"+Postavke.racoon.bodovi,true);
    GameSettings.output("Životi:"+Postavke.racoon.zivoti,false);
  }*/
}