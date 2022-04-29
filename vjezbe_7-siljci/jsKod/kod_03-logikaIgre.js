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

  if (GAME.activeWorldMap.name == "catDog")
    mackaPas();
  else if (GAME.activeWorldMap.name == "vjezbe6")
    vjezbe6();
  else if (GAME.activeWorldMap.name == "vjezbe7")
    vjezbe7();

  GAME.update();

};

function mackaPas() {
  let map = GAME.activeWorldMap;

  let cat = map.sprites[0];
  let dog = map.sprites[1];

  // interakcije u igri

  if (SENSING.right.active) {
    dog.moveRight();
  }

  if (SENSING.left.active) {
    dog.moveLeft();
  }

  if (SENSING.keyA.active) {
    cat.moveLeft();
  }

  if (SENSING.keyD.active) {
    cat.moveRight();
  }

  // zadatak 2
  if (SENSING.keyW.active) {
    cat.jump(50);
  }

  // zadatak 4
  if (cat.touching(dog)) {
    //GameSettings.output("Diram psa!!!");
    console.log("Diram psa!!!");
  }

  // zadatak 3
  if (dog.clicked(SENSING.mouse)) {
    dog.visible = false;
  }
}


function vjezbe6() {
  /** @type {Racoon} */
  let r = GAME.activeWorldMap.sprites[0];
  let fast = GAME.activeWorldMap.sprites[1];
  let voda = GAME.activeWorldMap.sprites[2];
  let gljiva = GAME.activeWorldMap.sprites[3];

  let items = [];
  items.push(fast);
  items.push(voda);
  items.push(gljiva);

  if (SENSING.right.active) {
    if (r.touching(fast)) {
      r.moveRight(5);
    }
    else {
      r.moveRight();
    }
  }

  if (SENSING.left.active) {
    r.moveLeft();
  }

  if (SENSING.up.active) {
    let pod = "";
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (r.touching(item))
        pod = item.layer.name;
    }
    r.jump(pod);
  }

};

function vjezbe7() {
  if (SENSING.right.active) {
    Postavke.Dinosaur.moveRight();
  }

  if (SENSING.left.active) {
    Postavke.Dinosaur.moveLeft();
  }

  // zadatak 2
  if (SENSING.up.active) {
    Postavke.Dinosaur.jump(50);
  }

  
  for(let i = 0;i<Postavke.coins.length;i++){
    const c = Postavke.coins[i];
    if (Postavke.Dinosaur.touching(c)) {
      Postavke.Dinosaur.collect(c);
    }

    for(let i = 0;i<Postavke.spikes.length;i++){
      const c = Postavke.spikes[i];
      if (Postavke.Dinosaur.touching(c)) {
        Postavke.Dinosaur.spike(c);
      }
    }
  }
  // zadatak 3
  //if (dog.clicked(SENSING.mouse)) {
    ///dog.visible = false;
  //}

  //kretanje dinosaura

  //dodir - coins

  //dodir - spikes

}