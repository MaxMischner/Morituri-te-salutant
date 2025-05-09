const level1= new Level(
     [
        new OrkWorrier(),
        new OrkWorrier(),
        new OrkWorrier(),
        // Fügen Sie mehr Gegner hinzu und positionieren Sie sie an verschiedenen Stellen
    ],
     [
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],
     [
        
        new BackgroundObjekt('../img/Mounten/m1/1.png',0,0),
        new BackgroundObjekt('../img/Mounten/m1/2.png',0,0),
        new BackgroundObjekt('../img/Mounten/m1/3.png',400,0),
        new BackgroundObjekt('../img/Mounten/m1/3.png',0,0),
        new BackgroundObjekt('../img/Mounten/m1/4.png',0,0),
        new BackgroundObjekt('../img/Mounten/m1/5.png',0,0),
        new BackgroundObjekt('../img/Mounten/m1/1.png',720,0),
        new BackgroundObjekt('../img/Mounten/m1/2.png',720,0),
        new BackgroundObjekt('../img/Mounten/m1/3.png',1120,0),
        new BackgroundObjekt('../img/Mounten/m1/3.png',720,0),
        new BackgroundObjekt('../img/Mounten/m1/4.png',720,0),
        new BackgroundObjekt('../img/Mounten/m1/5.png',720,0),
        new BackgroundObjekt('../img/Mounten/m1/1.png',1440,0),
        new BackgroundObjekt('../img/Mounten/m1/2.png',1440,0),
        new BackgroundObjekt('../img/Mounten/m1/3.png',1440,0),
        new BackgroundObjekt('../img/Mounten/m1/4.png',1440,0),
        new BackgroundObjekt('../img/Mounten/m1/5.png',1440,0),
        new BackgroundObjekt('../img/Mounten/m1/1.png',2160,0),
        new BackgroundObjekt('../img/Mounten/m1/2.png',2160,0),
        new BackgroundObjekt('../img/Mounten/m1/3.png',2160,0),
        new BackgroundObjekt('../img/Mounten/m1/4.png',2160,0),
        new BackgroundObjekt('../img/Mounten/m1/5.png',2160,0)
        
    ],
    [
        new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 110, 400),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 0, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 32, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 64, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 96, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 128, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 160, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 192, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 224, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 256, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 288, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 320, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 352, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 384, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 416, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 448, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 480, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 512, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 544, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 576, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 608, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 640, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 672, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 704, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 736, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 768, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 800, 400),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 832, 400),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 864, 400),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 896, 400),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 928, 400),
            // 928 - 1500 → Standardboden + kleine Plattformen
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 928, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 960, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 992, 450),
// Loch
// Loch
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1088, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1120, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1152, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1184, 450),
// Plattform zum Springen (y = 400)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1216, 400),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1248, 400),
// Boden geht weiter (y = 450)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1280, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1312, 450),
// Loch (Springpassage)
// Loch
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1376, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1408, 450),

// 1500 - 2000 → Schluchten und Plattformen
// Hohe Plattform (y = 350)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1472, 350),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1504, 350),
// tiefer Boden → SCHLUCHTE (y = 500 → für Orks reinspawnen möglich!)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1536, 500),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1568, 500),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1600, 500),
// hohe Plattform (y = 300 → Sprungzone)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1632, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1664, 300),
// Boden normalisieren
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1696, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1728, 450),
// kleine Schlucht (Lücke zum Springen)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1792, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1824, 450),

// 2000 - 2300 → Normale Plattformen vor dem Boss
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1952, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1984, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2016, 450),
// kleiner Sprungbereich (Loch)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2080, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2112, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2144, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2176, 450),


// 2300 - 2600 → FLACHE Bossarena → keine Löcher

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2332, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2364, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2396, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2428, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2460, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2492, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2524, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2556, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2588, 450),

    ],
[
    new Blockstone('../img/Collectebals/PNG/tile000.png',200,300),
    new Blockstone('../img/Collectebals/PNG/shiny/16.png',400,300),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',250,350)
],
);