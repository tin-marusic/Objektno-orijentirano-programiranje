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
    case "catDog":
      setupLevel();
      break;

    case "vjezbe6":
      setupVjezbe6();
      break;

    case "vjezbe7":
      setupVjezbe7();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */

function setupLevel() {

  let catLayer = GAME.getSpriteLayer("macka");
  //let cat = new Animal(0, 0, catLayer);
  let cat = new Cat(catLayer);
  //cat.direction = 90;

  let dogLayer = GAME.getSpriteLayer("pas");
  let dog = new Animal(9 * 64, 0, dogLayer);
  dog.direction = 270;

  GAME.addSprite(cat);
  GAME.addSprite(dog);

  // ako se pogriješi naziv layer-a, ignorirat će
  GAME.activeWorldMap.setCollisions("platforme");

}


function setupVjezbe6() {
  let rLayer = GAME.getSpriteLayer("racoon");
  let r = new Racoon(0, 0, rLayer);
  GAME.addSprite(r);

  GAME.activeWorldMap.setCollisions("platforme");

  let nazivi = ["fast", "voda", "gljiva", "cilj"];

  for (let i = 0; i < nazivi.length; i++) {
    const n = nazivi[i];
    let item = new Item(GAME.getSpriteLayer(n));
    item.visible = true;
    GAME.addSprite(item);
  }

}

function setupVjezbe7() {

  GAME.activeWorldMap.setCollisions("platforme");

  let c = ["c1", "c2", "c3", "c4"];
  let s = ["s1", "s2"];
  
  //coins
  for(let i = 0;i<c.length;i++){
    let layer = GAME.getSpriteLayer(c[i]);
    let coin = new Coin(layer)
    coin.visible = true;
    GAME.addSprite(coin);
    Postavke.coins.push(coin);
  }
  //učitati, postaviti da su vidljivi, dodati u popis u statičkoj klasi...
  for(let i = 0;i<s.length;i++){
    let layer = GAME.getSpriteLayer(s[i]);
    let spike = new Spike(layer)
    spike.visible = true;
    GAME.addSprite(spike);
    Postavke.spikes.push(spike);
  }
  //spikes

  let d = new Dinosaur(0, 0, GAME.getSpriteLayer("dino"));
  GAME.addSprite(d);
  Postavke.Dinosaur = d;
  
}