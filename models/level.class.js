class Level {
    backgroundObjects;
    clouds;
    enemies;
    groundTiles;
    collectableObjects; 
    level_end_x = 4320;

    constructor(enemies, clouds, backgroundObjects, groundTiles,collectableObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.groundTiles = groundTiles;
        this.collectableObjects = collectableObjects; 
    }
}
