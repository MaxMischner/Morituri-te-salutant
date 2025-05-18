const level1= new Level(
     [
        
        new OrkWorrier(450,350),
        new OrkWorrier(1800,200),
        new OrkWorrier(1700,200),
        new OrcShamane(2400,350),
        new OrcShamane(1024,350),
        new OrkWorrier(2700,200),
        new OrcShamane(2900,200),
        new OrkWorrier(2950,350),
        new OrkWorrier(3000,350),
        new OrkWorrier(3050,350),
        new Endboss()
    ],
     [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),

    ],
     [
        
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/1.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/2.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/3.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/4.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/5.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/6.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/7.png',0,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/1.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/2.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/3.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/4.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/5.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/6.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/7.png',720,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/1.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/2.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/3.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/4.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/5.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/6.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/7.png',1440,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/1.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/2.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/3.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/4.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/5.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/6.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/7.png',2160,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/1.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/2.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/3.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/4.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/5.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/6.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/7.png',2880,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/1.png',3600,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/2.png',3600,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/3.png',3600,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/4.png',3600,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/5.png',3600,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/6.png',3600,0),
        new BackgroundObjekt('../img/Plattform/2 Background/Layers/7.png',3600,0),
    ],
    [
        
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 0, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 32, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 64, 450),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 96, 450),

            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 110, 418),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 110, 386),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 142, 386),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 142, 418),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 142, 354),
            


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

            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 704, 418),

           

            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 800, 354),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 832, 354),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 864, 354),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 896, 354),
            new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 928, 354),


            // 928 - 1500 → Standardboden + kleine Plattformen

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 960, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 992, 450),

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1024, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1056, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1088, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1120, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1152, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1184, 450),

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 960, 322),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 992, 322),

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1024, 322),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1056, 322),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1088, 322),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1120, 322),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1152, 322),

// Plattform zum Springen (y = 400)


// Boden geht weiter (y = 450)

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1312, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1344, 450),
// Loch (Springpassage)
// Loch



// 1500 - 2000 → Schluchten und Plattformen
// Hohe Plattform (y = 350)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1472, 350),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1504, 350),
// tiefer Boden → SCHLUCHTE (y = 500 → für Orks reinspawnen möglich!)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1536, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1568, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1600, 300),
// hohe Plattform (y = 300 → Sprungzone)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1632, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1664, 300),
// Boden normalisieren
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1696, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1728, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1760, 300),
// kleine Schlucht (Lücke zum Springen)
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1792, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1824, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1856, 300),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1888, 300),


// 2000 - 2300 → Normale Plattformen vor dem Boss
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1952, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 1984, 450),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2016, 450),

new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2048, 450),


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

// 2600 - 3000 → Hohe Plattformen und Schluchten
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2620, 350),
new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2652, 350),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2684, 350),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2716, 350),
    

    // Höher Plattform (y = 300)
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2820, 300),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2852, 300),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2884, 300),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2916, 300),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2948, 300),


    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 2980, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3012, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3044, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3076, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3108, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3140, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3172, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3204, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3236, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3268, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3300, 450),
   
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3428, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3460, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3492, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3524, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3556, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3588, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3620, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3652, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3684, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3716, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3748, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3780, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3812, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3844, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3876, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3908, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3940, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 3972, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4004, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4036, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4068, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4100, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4132, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4164, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4196, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4228, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4260, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4292, 450),
    new GroundTile('../img/Plattform/1 Tiles/Tile_02.png', 4324, 450),

    
    ],
[
    new Blockstone('../img/Collectebals/PNG/tile000.png',200,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',250,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',500,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',532,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',564,400),
    
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1034,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1002,400),
    new Blockstone('../img/Collectebals/PNG/tile000.png',970,400),
    new Blockstone('../img/Collectebals/PNG/tile000.png',910,315),

    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1024,270),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1056,270),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1088,270),

    new Blockstone('../img/Collectebals/PNG/tile000.png',1344,400),

    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1848,260),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1816,260),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1784,260),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',1752,260),
    new Blockstone('../img/Collectebals/PNG/tile000.png',1875,260),

    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',2880,260),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',2912,260),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',2944,260),

    new Blockstone('../img/Collectebals/PNG/tile000.png',1950,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3000,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3032,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3064,400),
    new Blockstone('../img/Collectebals/PNG/tile000.png',3096,400),

    new Blockstone('../img/Collectebals/PNG/tile000.png',3432,400),
    new Blockstone('../img/Collectebals/PNG/tile000.png',3464,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3496,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3528,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3560,400),
    new ScoreItem ('../img/Collectebals/PNG/shiny/5.png',3592,400),



],
);