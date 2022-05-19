(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("vjezbe9",
{ "compressionlevel":-1,
 "editorsettings":
    {
     "export":
        {
         "format":"js"
        }
    },
 "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 18, 229, 230, 18, 232, 233, 17, 235, 236, 17, 238, 239, 17, 241, 17, 243, 244, 245, 246, 247, 18, 249, 250, 18, 252, 253, 18, 255, 256, 18, 258, 259, 18, 261, 18, 263, 264, 265, 266, 267, 18, 269, 270, 18, 272, 273, 18, 275, 276, 18, 278, 279, 18, 281, 18, 283, 284, 285, 286],
         "height":10,
         "id":1,
         "name":"pozadina",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8, 5, 5, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 1, 2, 2, 3, 0, 1, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 4, 5, 5, 6, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 4, 5, 5, 6, 0, 4, 5, 5, 5, 5],
         "height":10,
         "id":4,
         "name":"platforme",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":9,
         "name":"razno",
         "objects":[
                {
                 "gid":288,
                 "height":50,
                 "id":10,
                 "name":"coin",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":50,
                 "x":261.357,
                 "y":391.143
                }, 
                {
                 "gid":22,
                 "height":64,
                 "id":15,
                 "name":"cilj",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":1183.1,
                 "y":257.252
                }, 
                {
                 "gid":20,
                 "height":64,
                 "id":16,
                 "name":"gljiva",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":64,
                 "x":707.83408132735,
                 "y":382.307085543316
                }],
         "offsetx":12.1855025159798,
         "offsety":3.48157214742281,
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"items"
                }],
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 38, 0, 0, 0, 37, 38, 0, 0, 0, 37, 38, 0, 0, 0, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 17, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 18, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 18, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0],
         "height":10,
         "id":6,
         "name":"ukras",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":8,
         "name":"dino",
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"dinosaur"
                }],
         "type":"tilelayer",
         "visible":false,
         "width":20,
         "x":0,
         "y":0
        }, 
        {
         "data":[71, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 79, 82, 83, 84, 85, 86, 0, 0, 79, 79, 80, 81, 82, 83, 84, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":13,
         "name":"racoon",
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"racoon"
                }],
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }],
 "nextlayerid":14,
 "nextobjectid":17,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.2",
 "tileheight":64,
 "tilesets":[
        {
         "columns":6,
         "firstgid":1,
         "image":"maps\/Platforma3\/pics\/grass_dirt_water.png",
         "imageheight":512,
         "imagewidth":384,
         "margin":0,
         "name":"grass_dirt_water",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":48,
         "tileheight":64,
         "tilewidth":64,
         "transparentcolor":"#ff00ff"
        }, 
        {
         "columns":11,
         "firstgid":49,
         "image":"maps\/Platforma3\/pics\/dino.png",
         "imageheight":128,
         "imagewidth":704,
         "margin":0,
         "name":"dino",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":22,
         "tileheight":64,
         "tilewidth":64,
         "transparentcolor":"#ff00ff"
        }, 
        {
         "columns":8,
         "firstgid":71,
         "image":"maps\/Platforma3\/pics\/racoon.png",
         "imageheight":128,
         "imagewidth":512,
         "margin":0,
         "name":"racoon",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":16,
         "tileheight":64,
         "tilewidth":64,
         "transparentcolor":"#ff00ff"
        }, 
        {
         "columns":20,
         "firstgid":87,
         "image":"maps\/Platforma3\/pics\/bg2.bmp",
         "imageheight":640,
         "imagewidth":1280,
         "margin":0,
         "name":"bg2",
         "spacing":0,
         "tilecount":200,
         "tileheight":64,
         "tilewidth":64,
         "transparentcolor":"#ff00ff"
        }, 
        {
         "columns":2,
         "firstgid":287,
         "image":"maps\/Platforma3\/pics\/spikeCoin.png",
         "imageheight":64,
         "imagewidth":128,
         "margin":0,
         "name":"spikeCoin",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":2,
         "tileheight":64,
         "tilewidth":64,
         "transparentcolor":"#f7f7f7"
        }],
 "tilewidth":64,
 "type":"map",
 "version":"1.8",
 "width":20
});