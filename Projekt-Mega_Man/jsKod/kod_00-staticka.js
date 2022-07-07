class Postavke {

    constructor() {
      if (this instanceof Postavke) {
        throw new Error("Statička klasa nema instance!");
      }
    }
  
    static GlavniLik = null;
    static s1; //skale
    static s2;
    static s3;
    static s4;
    static s5; 
    static s6;
    static s7;
    static s8;
    static s9;
    static s10;
    static s11;
    static s12; 
    static s13;
    static s14;
    static s15;
    static s16;
    static s17;
    static s18;
    static m1; //metci glavni lik
    static m2;
    static m3;
    static m4;
    static m5;
    static platforma1; //dvi platforme koje se same stvore u posebnim uvjetima
    static platforma2;
    static spike1; //šiljci
    static spike2;
    static spike3;
    static b1;  //bladeri
    static b2;
    static b3;
    static c1;  //coins
    static c2;
    static c3;
    static blaster1; //blasteri
    static blaster2;
    static blaster3;
    static bm1; //metci blastera
    static bm2;
    static bm3;
    static bm4;
    static bm5;
    static bm6;
    static bat1; //baterije
    static bat2;
    static bat3;
    static hc; //health coin
    static SniperJoe;
    static sm1; //SniperJoe metci
    static sm2;
    static sm3;
    static sm4;
    static sm5;
    static ec; //coin za završit igru
    static first_setup; //true ili false - služi za resetiranje bodova i zivota pri novom setupu
    static nula; //brojevi za ispisati broj bodova na kraju
    static jedan;
    static dva;
    static tri;
    static cetiri;
    static pet;
    static sest;
    static sedam;
    static osam;
    static devet;
}