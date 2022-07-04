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


function update_main() {
 
    if (GAME.activeWorldMap.name == "Prvi_dio_1")
      Projekt_logika1();
    else if(GAME.activeWorldMap.name == "Drugi_dio_1"){
      Projekt_logika2();
    }
    else if(GAME.activeWorldMap.name == "Treci_dio_1"){
      Projekt_logika3();
    }
  
    GAME.update();
    GameSettings.output("Bodovi:"+Postavke.GlavniLik.points,true);
    GameSettings.output("Životi:"+Postavke.GlavniLik.health,false);

  
};
let bodovi = 0; //varijable pomoću kojih ćemo čuvati bodove i živote pri prijelazu među levelima
let zivoti = 100; //osvježavat će se na pocetku i na kraju funkcije za logiku
let space_pritisnut = true; 
let dodir = false;
let up_pritisnut = true;
let down_pritisnut = false;
let dodir_platforma_nevidljiva = false; //pomoću ovog ćemo stavit ograničenje na prolazak kroz platformu
let ukini_kretnje = false //za ukidanje micanja lijevo i desno na skalama
let smjer = null; //smjer pucanja na skalama

function Projekt_logika1() {
    Postavke.GlavniLik.points = bodovi;
    Postavke.GlavniLik.health = zivoti;
    
    let v = [Postavke.s1,Postavke.s2,Postavke.s3,Postavke.s4,Postavke.s5,Postavke.s6,
            Postavke.s7,Postavke.s8,Postavke.s9,Postavke.s10,Postavke.s11,Postavke.s12,
            Postavke.s13,Postavke.s14,Postavke.s15,Postavke.s16,Postavke.s17] //niz svih skala
    let metci = [ Postavke.m1,Postavke.m2,Postavke.m3,Postavke.m4,Postavke.m5]
    let bladers = [Postavke.b1,Postavke.b2,Postavke.b3]
    let blader_coins = [Postavke.c1,Postavke.c2,Postavke.c3]
    let blasters = [Postavke.blaster1,Postavke.blaster2,Postavke.blaster3]
    let blaster_coins = [Postavke.c4,Postavke.c5,Postavke.c6]
    let blaster_metci = [[Postavke.bm1,Postavke.bm2],[Postavke.bm3,Postavke.bm4],[Postavke.bm5,Postavke.bm6]]

    if (SENSING.left.active && !ukini_kretnje) {
      Postavke.GlavniLik.moveLeft();
      smjer = "lijevo";
      Postavke.GlavniLik.bottom_skale = false;  //pomakne li se lik gasimo animaciju za dno skala
    }
  
    if (SENSING.right.active && !ukini_kretnje) {
      Postavke.GlavniLik.moveRight();
      smjer = "desno";
      Postavke.GlavniLik.bottom_skale = false; 
    }

    for(let i = 0; i < v.length; i++){ //Ako ne dira ni jedne skale dodir je sigurno false
      if(Postavke.GlavniLik.touching(v[i])){
        dodir = true;
      }
      else{
        dodir = false;
      }
    }
    for(let i = 0; i < v.length; i++){ //ako dira barem jedne skale dodir je sigurno true
      if(Postavke.GlavniLik.touching(v[i])){
        dodir = true;
        }
    }
    
    if(dodir){ 
      Postavke.GlavniLik.no_gravity(); //ukidamo gravitaciju ako lik dira skale
      Postavke.GlavniLik.penjanje_skale = true; //za animaciju na skalama 
      if (SENSING.up.active) {
        Postavke.GlavniLik.bottom_skale = false; 
        for(let i = 0; i < v.length; i++){
          if(Postavke.GlavniLik.touching(v[i])){ //gledamo koje skale lik dira
            ukini_kretnje = true; //lik se ne miče livo-desno kad je na skalama
            if(v[i].gornje_skale){ //provjeravamo jesu li skale najgornje
              let polozaj = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik na vrhu skala
              if(polozaj < -53.5){ //ako je lik na vrhu skala neće se više penjat
                ukini_kretnje = false; //kad je na vrhu dopuštamo pomicanje livo-desno
                Postavke.GlavniLik.on_top = true; //animacija na vrhu
                Postavke.GlavniLik.velocity_y = 0;
                Postavke.GlavniLik.y = v[i].y - 56; //postavljamo lik na vrh skala da ne zapne za platforme
                if(!up_pritisnut){ //da ne skoči odma ćim dođe na vrh nego je potrebno ponovo stisnit strelicu
                  Postavke.GlavniLik.friction = 0.8; //da lik može skočit dovoljno brzo
                  Postavke.GlavniLik.jumping = false;
                  Postavke.GlavniLik.jump();
                  //Postavke.GlavniLik.velocity_y = -50; //skok lika
                }
              }
              else{ //ako nije na vrhu nastavlja se penjat
                
                Postavke.GlavniLik.moveUp();
                Postavke.GlavniLik.x = v[i].x;
                up_pritisnut = true; //strelica prema gore stisnuta
                Postavke.GlavniLik.on_top = false;
              }
            }// ako skale nisu najgornje lik se samo penje po njima
            else{
              Postavke.GlavniLik.moveUp();
              Postavke.GlavniLik.x = v[i].x;
              up_pritisnut = true;//strelica prema gore stisnuta
              Postavke.GlavniLik.on_top = false;
            }
          }
        }
      }
      else if (SENSING.down.active) {
        ukini_kretnje = true;
        Postavke.GlavniLik.on_top = false;
        for(let i = 0; i < v.length; i++){
          if(Postavke.GlavniLik.touching(v[i])){
              Postavke.GlavniLik.x = v[i].x;
              if(v[i].donje_skale){ //provjeravamo jesu li donje
                if(Postavke.GlavniLik.y - v[i].y > 6){
                  ukini_kretnje = false; //vracamo kretnje ako je lik na dnu skala
                  Postavke.GlavniLik.bottom_skale = true; //animacija na dnu skala
                }
                else{
                  Postavke.GlavniLik.moveDown();
                }
              }
              else{
                Postavke.GlavniLik.moveDown();
              }
            }
          }
        Postavke.GlavniLik.jumping = false;//zbog animacija
        down_pritisnut = true; //zbog ograničenja pucanja
        
      }
      else if(!SENSING.up.active && !SENSING.down.active){//da lik ne propadne kad skoči na skale
        if(Postavke.GlavniLik.velocity_y > 4.2){
          for(let i = 0; i < v.length; i++){
            if(Postavke.GlavniLik.touching(v[i])){
            if(v[i].gornje_skale){ //vrijedi samo za najgornje skale
              let skale_likx = v[i].x - Postavke.GlavniLik.x; //gledamo razliku između položaja skala i lika
              let skale_liky = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik iznad skala
              if(-64 < skale_likx && skale_likx < 64 && skale_liky < -48){ //da ne uzme y krivih gornjih skala
                //skale_liky < -52 sluzi da ako skočimo sa strane na skale ne vraca nas na vrh
                Postavke.GlavniLik.velocity_y = 0;
                Postavke.GlavniLik.y = v[i].y - 55; //postavljamo lik na vrh skala
              }
            }
          }  
        }
      }
    }
  }
    else{ //ako ne dira skale vraćamo normalne postavke
      Postavke.GlavniLik.on_top = false;
      Postavke.GlavniLik.grav();
      Postavke.GlavniLik.penjanje_skale = false;
      ukini_kretnje = false;
      if (SENSING.up.active) {
        if(!up_pritisnut){ //jedan pritisak jedan skok
          Postavke.GlavniLik.jump();
          up_pritisnut = true;
        }
      }
    }
    if (!SENSING.up.active) {
      up_pritisnut = false; //strelica prema gore puštena
    }
    if(!SENSING.down.active){
      down_pritisnut = false; //strelica prema dolje puštena
    }
    if(!Postavke.GlavniLik.jumping){ //ako lik pada neće moći skočiti
      if(Postavke.GlavniLik.velocity_y>1.7){
        Postavke.GlavniLik.jumping = true;
      }
    }
    for(let i = 0; i < metci.length; i++){
    if(!metci[i].poziv){ //možemo pucati samo kad nema metka na mapi
      if (SENSING.space.active) {
          if(!space_pritisnut){
            if(Postavke.GlavniLik.penjanje_skale && (up_pritisnut || down_pritisnut) ){
              break // ne može pucat dok se penje i silazi niz skale
            }
            else if(!Postavke.GlavniLik.penjanje_skale){ //pucanje kad lik ne dira skale
              if(Postavke.GlavniLik.velocity_x >= 0){
                Postavke.GlavniLik.puca(metci[i],"desno");
              }
              else{
                Postavke.GlavniLik.puca(metci[i],"lijevo");
              }
            }
            else{
              if (SENSING.left.active){
                smjer = "lijevo";
              }
              else if (SENSING.right.active){
                smjer = "desno";
              }
              Postavke.GlavniLik.puca(metci[i],smjer);
            }
            
            
            space_pritisnut = true; //neće moć pucat dok ne pustimo space
            Postavke.GlavniLik.pucanje = true; //animacije pucanja lika
          }
          
        }
      }
    }
    if (!SENSING.space.active) { //ograničavamo 1 metak na 1 pritisak spacea
      space_pritisnut = false;
      Postavke.GlavniLik.pucanje = false; // prekidamo animacije pucanja
      Postavke.GlavniLik.pucanje_skale_l = false;
      Postavke.GlavniLik.pucanje_skale_d = false;
    }

    // INTERAKCIJE S NEPRIJATELJIMA
    
    //BLADERI
    for(let i = 0; i < bladers.length; i++){ //ako Glavni lik takne bilo kojeg bladera doživi štetu
      if(Postavke.GlavniLik.touching(bladers[i])){
        Postavke.GlavniLik.demage(bladers[i])
        if(bladers[i].x_distance(Postavke.GlavniLik) > 50){ //računa udaljenost među likovima da odredimo stanu s koje dolazi blader
          bladers[i].touch_Glavni_Lik("desno"); //ako dolazi s desna odbit će se desno
        }
        else{
          bladers[i].touch_Glavni_Lik("lijevo");
        }
      }
      if(Postavke.GlavniLik.touching(blader_coins[i])){
        Postavke.GlavniLik.total_points(blader_coins[i]);
        blader_coins[i].pokupi()
      }
    }

    for(let i = 0;i < metci.length;i++){ //ako metak pogodi bladera on doživi štetu
      for(let j = 0; j < bladers.length ;j++){
        if(metci[i].touching(bladers[j])){
          bladers[j].demage(metci[i],blader_coins[j]); //šaljemo metak kojim je pogođen i coin koji će se stvoriti ako umre
          metci[i].visible = false;
        }
      }
    }

    //BLASTERI
    //Glavni lik puca na blaster
    for(let i = 0;i < metci.length;i++){ 
      for(let j = 0; j < blasters.length ;j++){
        if(metci[i].touching(blasters[j])){
          if(!blasters[j].zatvoren){  //blaster dozivi stetu samo ako je otvoren
            blasters[j].demage(metci[i],blaster_coins[j]);
          }
        }
      }
    }
    //Lik dodiruje blaster
    for(let j = 0; j < blasters.length ;j++){
      if(Postavke.GlavniLik.touching(blasters[j])){
        Postavke.GlavniLik.demage(blasters[j]);   //ako lik dotakne blastera dozivi stetu
        if(smjer=="desno"){
          Postavke.GlavniLik.velocity_x = -100;  //kad lik dotakne blastera odbije se
        }
        else{
          Postavke.GlavniLik.velocity_x = 100;
        }
      }
      //lik skuplja coine iza blastera
      if(Postavke.GlavniLik.touching(blaster_coins[j])){
        Postavke.GlavniLik.total_points(blaster_coins[j]);
        blaster_coins[j].pokupi()
      }
    }
    //blaster puca
    for(let j = 0; j < blasters.length ;j++){
      if(blasters[j].pucanje && blasters[j].visible){ //gledamo je li blaster u stanju pucanja
          blasters[j].puca(blaster_metci[j]); //ako je puca svoja dva metka
      }
    }

    //blaster pogađa lika
    for(let i = 0;i < blasters.length;i++){  //vrtimo redove matrice
      for(let j = 0;j < 2; j++){  //vrtimo stupce matrice
        if(Postavke.GlavniLik.touching(blaster_metci[i][j])){ //promatramo svaki element matrice redom
          Postavke.GlavniLik.demage(blaster_metci[i][j]);
          blaster_metci[i][j].visible = false; //ako pogodi glavnog lika micemo metak
          blaster_metci[i][j].x = blaster_metci[i][j].x_0 //vraćamo metak na početnu poziciju da se ispuca sa pravog mjesta kad bude vidljiv
          blaster_metci[i][j].y = blaster_metci[i][j].y_0
        }
      }
    }

    bodovi = Postavke.GlavniLik.points;
    zivoti = Postavke.GlavniLik.health;
}

function Projekt_logika2() {
  Postavke.GlavniLik.points = bodovi;
  Postavke.GlavniLik.health = zivoti;
 
  let v = [Postavke.s1,Postavke.s2,Postavke.s3,Postavke.s4,Postavke.s5,Postavke.s6,
    Postavke.s7,Postavke.s10,Postavke.s11,Postavke.s12,
    Postavke.s13,Postavke.s14,Postavke.s15,Postavke.s16,Postavke.s17] //niz svih skala
  let metci = [ Postavke.m1,Postavke.m2,Postavke.m3,Postavke.m4,Postavke.m5]

  if (SENSING.left.active && !ukini_kretnje) {
    Postavke.GlavniLik.moveLeft();
    smjer = "lijevo";
    Postavke.GlavniLik.bottom_skale = false;
  }

  if (SENSING.right.active && !ukini_kretnje) {
    Postavke.GlavniLik.moveRight();
    smjer = "desno";
    Postavke.GlavniLik.bottom_skale = false;
  }

  for(let i = 0; i < v.length; i++){ //Ako ne dira ni jedne skale dodir je sigurno false
    if(Postavke.GlavniLik.touching(v[i])){
      dodir = true;
    }
    else{
      dodir = false;
    }
  }
  for(let i = 0; i < v.length; i++){ //ako dira barem jedne skale dodir je sigurno true
    if(Postavke.GlavniLik.touching(v[i])){
      dodir = true;
      }
  }
  
  if(dodir){ 
    Postavke.GlavniLik.no_gravity(); //ukidamo gravitaciju ako lik dira skale
    Postavke.GlavniLik.penjanje_skale = true; //za animaciju na skalama i ukidamo micanje livo desno dok se penje
    if (SENSING.up.active) {
      Postavke.GlavniLik.bottom_skale = false;
      for(let i = 0; i < v.length; i++){
        if(Postavke.GlavniLik.touching(v[i])){ //gledamo koje skale lik dira
          ukini_kretnje = true; //lik se ne miče livo-desno kad je na skalama
          if(v[i].gornje_skale){ //provjeravamo jesu li skale najgornje
            let polozaj = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik na vrhu skala
            if(polozaj < -53.5){ //ako je lik na vrhu skala neće se više penjat
              ukini_kretnje = false; //kad je na vrhu dopuštamo pomicanje livo-desno
              Postavke.GlavniLik.on_top = true;
              Postavke.GlavniLik.velocity_y = 0;
              Postavke.GlavniLik.y = v[i].y - 56; //postavljamo lik na vrh skala da ne zapne za platforme
              if(!up_pritisnut){ //da ne skoči odma ćim dođe na vrh nego je potrebno ponovo stisnit strelicu
                Postavke.GlavniLik.friction = 0.8; //da lik može skočit dovoljno brzo
                Postavke.GlavniLik.jumping = false;
                Postavke.GlavniLik.jump();
                //Postavke.GlavniLik.velocity_y = -50; //skok lika
              }
            }
            else{ //ako nije na vrhu nastavlja se penjat
              
              Postavke.GlavniLik.moveUp();
              Postavke.GlavniLik.x = v[i].x;
              up_pritisnut = true; //strelica prema gore stisnuta
              Postavke.GlavniLik.on_top = false;
            }
          }// ako skale nisu najgornje lik se samo penje po njima
          else{
            Postavke.GlavniLik.moveUp();
            Postavke.GlavniLik.x = v[i].x;
            up_pritisnut = true;//strelica prema gore stisnuta
            Postavke.GlavniLik.on_top = false;
          }
        }
      }
    }
    else if (SENSING.down.active) {
      Postavke.GlavniLik.on_top = false;
      ukini_kretnje = true;
      for(let i = 0; i < v.length; i++){
        if(Postavke.GlavniLik.touching(v[i])){
            Postavke.GlavniLik.x = v[i].x;
            if(v[i].donje_skale){ //provjeravamo jesu li donje
              if(Postavke.GlavniLik.y - v[i].y > 6){
                ukini_kretnje = false; //vracamo kretnje ako je lik na dnu skala
                Postavke.GlavniLik.bottom_skale = true;
              }
              else{
                Postavke.GlavniLik.moveDown();
              }
            }
            else{
              Postavke.GlavniLik.moveDown();
            }
          }
        }
      Postavke.GlavniLik.jumping = false;//zbog animacija
      down_pritisnut = true; //zbog ograničenja pucanja
      
    }
    else if(!SENSING.up.active && !SENSING.down.active){//da lik ne propadne kad skoči na skale
      if(Postavke.GlavniLik.velocity_y > 4.2){
        for(let i = 0; i < v.length; i++){
          if(Postavke.GlavniLik.touching(v[i])){
          if(v[i].gornje_skale){ //vrijedi samo za najgornje skale
            let skale_likx = v[i].x - Postavke.GlavniLik.x; //gledamo razliku između položaja skala i lika
            let skale_liky = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik iznad skala
            if(-64 < skale_likx && skale_likx < 64 && skale_liky < -48){ //da ne uzme y krivih gornjih skala
              //skale_liky < -52 sluzi da ako skočimo sa strane na skale ne vraca nas na vrh
              Postavke.GlavniLik.velocity_y = 0;
              Postavke.GlavniLik.y = v[i].y - 55; //postavljamo lik na vrh skala
            }
          }
        }  
      }
    }
  }
}
  else{ //ako ne dira skale vraćamo normalne postavke
    Postavke.GlavniLik.grav();
    Postavke.GlavniLik.on_top = false;
    Postavke.GlavniLik.penjanje_skale = false;
    ukini_kretnje = false;
    if (SENSING.up.active) {
      if(!up_pritisnut){ //jedan pritisak jedan skok
        Postavke.GlavniLik.jump();
        up_pritisnut = true;
      }
    }
  }
  if (!SENSING.up.active) {
    up_pritisnut = false; //strelica prema gore puštena
  }
  if(!SENSING.down.active){
    down_pritisnut = false; //strelica prema dolje puštena
  }
  if(!Postavke.GlavniLik.jumping){ //ako lik pada neće moći skočiti
    if(Postavke.GlavniLik.velocity_y>2.7){
      Postavke.GlavniLik.jumping = true;
    }
  }
  for(let i = 0; i < metci.length; i++){
  if(!metci[i].poziv){ //možemo pucati samo kad nema metka na mapi
    if (SENSING.space.active) {
        if(!space_pritisnut){
          if(Postavke.GlavniLik.penjanje_skale && (up_pritisnut || down_pritisnut) ){
            break // ne može pucat dok se penje i silazi niz skale
          }
          else if(!Postavke.GlavniLik.penjanje_skale){ //pucanje kad lik ne dira skale
            if(Postavke.GlavniLik.velocity_x >= 0){
              Postavke.GlavniLik.puca(metci[i],"desno");
            }
            else{
              Postavke.GlavniLik.puca(metci[i],"lijevo");
            }
          }
          else{
            if (SENSING.left.active){
              smjer = "lijevo";
            }
            else if (SENSING.right.active){
              smjer = "desno";
            }
            Postavke.GlavniLik.puca(metci[i],smjer);
          }
          
          
          space_pritisnut = true; //neće moć pucat dok ne pustimo space
          Postavke.GlavniLik.pucanje = true; //animacije pucanja lika
        }
        
      }
    }
  }
  if (!SENSING.space.active) { //ograničavamo 1 metak na 1 pritisak spacea
    space_pritisnut = false;
    Postavke.GlavniLik.pucanje = false; // prekidamo animacije pucanja
    Postavke.GlavniLik.pucanje_skale_l = false;
    Postavke.GlavniLik.pucanje_skale_d = false;
  }

  bodovi = Postavke.GlavniLik.points;
  zivoti = Postavke.GlavniLik.health;
}

function Projekt_logika3() {  //logika za trecu mapu, slicno ko i za prve dvi

  Postavke.GlavniLik.points = bodovi;
  Postavke.GlavniLik.health = zivoti;

  let v = [Postavke.s1,Postavke.s2,Postavke.s3,Postavke.s10,Postavke.s11,Postavke.s12
          ,Postavke.s16,Postavke.s17] //niz svih skala
  let metci = [ Postavke.m1,Postavke.m2,Postavke.m3,Postavke.m4,Postavke.m5]

  if (SENSING.left.active && !dodir_platforma_nevidljiva && !ukini_kretnje) {  //stavljamo ograničenje da se ne kreće lijevo ako dira "nevidljivu" platformu
    Postavke.GlavniLik.moveLeft();
    smjer = "lijevo";
    Postavke.GlavniLik.bottom_skale = false;
  }

  if (SENSING.right.active && !ukini_kretnje) {
    Postavke.GlavniLik.moveRight();
    smjer = "desno";
    Postavke.GlavniLik.bottom_skale = false;
  }

  for(let i = 0; i < v.length; i++){ //Ako ne dira ni jedne skale dodir je sigurno false
    if(Postavke.GlavniLik.touching(v[i])){
      dodir = true;
    }
    else{
      dodir = false;
    }
  }
  for(let i = 0; i < v.length; i++){ //ako dira barem jedne skale dodir je sigurno true
    if(Postavke.GlavniLik.touching(v[i])){
      dodir = true;
      }
  }
  
  if(dodir){ 
    Postavke.GlavniLik.no_gravity(); //ukidamo gravitaciju ako lik dira skale
    Postavke.GlavniLik.penjanje_skale = true; //za animaciju na skalama i ukidamo micanje livo desno dok se penje
    if (SENSING.up.active) {
      Postavke.GlavniLik.bottom_skale = false;
      for(let i = 0; i < v.length; i++){
        if(Postavke.GlavniLik.touching(v[i])){ //gledamo koje skale lik dira
          ukini_kretnje = true; //lik se ne miče livo-desno kad je na skalama
          if(v[i].gornje_skale){ //provjeravamo jesu li skale najgornje
            let polozaj = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik na vrhu skala
            if(polozaj < -53.5){ //ako je lik na vrhu skala neće se više penjat
              ukini_kretnje = false; //kad je na vrhu dopuštamo pomicanje livo-desno
              Postavke.GlavniLik.on_top = true;
              Postavke.GlavniLik.velocity_y = 0;
              Postavke.GlavniLik.y = v[i].y - 56; //postavljamo lik na vrh skala da ne zapne za platforme
              if(!up_pritisnut){ //da ne skoči odma ćim dođe na vrh nego je potrebno ponovo stisnit strelicu
                Postavke.GlavniLik.friction = 0.8; //da lik može skočit dovoljno brzo
                Postavke.GlavniLik.jumping = false;
                Postavke.GlavniLik.jump();
                //Postavke.GlavniLik.velocity_y = -50; //skok lika
              }
            }
            else{ //ako nije na vrhu nastavlja se penjat
              
              Postavke.GlavniLik.moveUp();
              Postavke.GlavniLik.x = v[i].x;
              up_pritisnut = true; //strelica prema gore stisnuta
              Postavke.GlavniLik.on_top = false;
            }
          }// ako skale nisu najgornje lik se samo penje po njima
          else{
            Postavke.GlavniLik.moveUp();
            Postavke.GlavniLik.x = v[i].x;
            up_pritisnut = true;//strelica prema gore stisnuta
            Postavke.GlavniLik.on_top = false;
          }
        }
      }
    }
    else if (SENSING.down.active) {
      Postavke.GlavniLik.on_top = false;
      ukini_kretnje = true;
      for(let i = 0; i < v.length; i++){
        if(Postavke.GlavniLik.touching(v[i])){
            Postavke.GlavniLik.x = v[i].x;
            if(v[i].donje_skale){ //provjeravamo jesu li donje
              if(Postavke.GlavniLik.y - v[i].y > 6){
                ukini_kretnje = false; //vracamo kretnje ako je lik na dnu skala
                Postavke.GlavniLik.bottom_skale = true;
              }
              else{
                Postavke.GlavniLik.moveDown();
              }
            }
            else{
              Postavke.GlavniLik.moveDown();
            }
          }
        }
      Postavke.GlavniLik.jumping = false;//zbog animacija
      down_pritisnut = true; //zbog ograničenja pucanja
      
    }
    else if(!SENSING.up.active && !SENSING.down.active){//da lik ne propadne kad skoči na skale
      if(Postavke.GlavniLik.velocity_y > 4.2){
        for(let i = 0; i < v.length; i++){
          if(Postavke.GlavniLik.touching(v[i])){
          if(v[i].gornje_skale){ //vrijedi samo za najgornje skale
            let skale_likx = v[i].x - Postavke.GlavniLik.x; //gledamo razliku između položaja skala i lika
            let skale_liky = v[i].polozaj_skale(Postavke.GlavniLik.y); //gledamo je li lik iznad skala
            if(-64 < skale_likx && skale_likx < 64 && skale_liky < -48){ //da ne uzme y krivih gornjih skala
              //skale_liky < -52 sluzi da ako skočimo sa strane na skale ne vraca nas na vrh
              Postavke.GlavniLik.velocity_y = 0;
              Postavke.GlavniLik.y = v[i].y - 55; //postavljamo lik na vrh skala
            }
          }
        }  
      }
    }
  }
}
  else{ //ako ne dira skale vraćamo normalne postavke
    Postavke.GlavniLik.grav();
    Postavke.GlavniLik.on_top = false;
    Postavke.GlavniLik.penjanje_skale = false;
    ukini_kretnje = false;
    if (SENSING.up.active) {
      if(!up_pritisnut){ //jedan pritisak jedan skok
        Postavke.GlavniLik.jump();
        up_pritisnut = true;
      }
    }
  }
  if (!SENSING.up.active) {
    up_pritisnut = false; //strelica prema gore puštena
  }
  if(!SENSING.down.active){
    down_pritisnut = false; //strelica prema dolje puštena
  }
  if(!Postavke.GlavniLik.jumping){ //ako lik pada neće moći skočiti
    if(Postavke.GlavniLik.velocity_y>1.7){
      Postavke.GlavniLik.jumping = true;
    }
  }
  for(let i = 0; i < metci.length; i++){
  if(!metci[i].poziv){ //možemo pucati samo kad nema metka na mapi
    if (SENSING.space.active) {
        if(!space_pritisnut){
          if(Postavke.GlavniLik.penjanje_skale && (up_pritisnut || down_pritisnut) ){
            break // ne može pucat dok se penje i silazi niz skale
          }
          else if(!Postavke.GlavniLik.penjanje_skale){ //pucanje kad lik ne dira skale
            if(Postavke.GlavniLik.velocity_x >= 0){
              Postavke.GlavniLik.puca(metci[i],"desno");
            }
            else{
              Postavke.GlavniLik.puca(metci[i],"lijevo");
            }
          }
          else{
            if (SENSING.left.active){
              smjer = "lijevo";
            }
            else if (SENSING.right.active){
              smjer = "desno";
            }
            Postavke.GlavniLik.puca(metci[i],smjer);
          }
          
          
          space_pritisnut = true; //neće moć pucat dok ne pustimo space
          Postavke.GlavniLik.pucanje = true; //animacije pucanja lika
        }
        
      }
    }
  }
  if (!SENSING.space.active) { //ograničavamo 1 metak na 1 pritisak spacea
    space_pritisnut = false;
    Postavke.GlavniLik.pucanje = false; // prekidamo animacije pucanja
    Postavke.GlavniLik.pucanje_skale_l = false;
    Postavke.GlavniLik.pucanje_skale_d = false;
  }

  if(Postavke.GlavniLik.x > 4*64 && Postavke.GlavniLik.y < 6.5*64){ //kad dođe na određenu udaljenost pokazujemo "nevidljive" platforme
    Postavke.platforma1.postani_vidljiv();
    Postavke.platforma2.postani_vidljiv();
  }
  if(Postavke.GlavniLik.touching(Postavke.platforma1) || Postavke.GlavniLik.touching(Postavke.platforma2)){
    if(Postavke.GlavniLik.velocity_x < 0){
      Postavke.GlavniLik.velocity_x = 0; //postavimo brzinu na 0 da ne prođe kroz platformu
      Postavke.GlavniLik.x = Postavke.platforma1.x + 64; //pomaknemo lika malo u desno da može skočiti bez zapinjanja za platformu    
    }
    dodir_platforma_nevidljiva = true; //ukidamo mogućnost kretanja lijevo
  }
  else{
    dodir_platforma_nevidljiva = false; //kad ne platforme dira vraćamo mogućnost kretanja lijevo
  }
  if(Postavke.GlavniLik.touching(Postavke.spike1) ||Postavke.GlavniLik.touching(Postavke.spike2)){
    Postavke.GlavniLik.demage(Postavke.spike1)
  }

  bodovi = Postavke.GlavniLik.points;
  zivoti = Postavke.GlavniLik.health;

}