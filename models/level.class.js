class Level {
    backgroundObjects;
    clouds;
    enemies;
    groundTiles;
    collectableObjects; 
    level_end_x = 4320;
    activeEffects;

    constructor(enemies, clouds, backgroundObjects, groundTiles,collectableObjects,activeEffects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.groundTiles = groundTiles;
        this.collectableObjects = collectableObjects; 
        this.activeEffects = [];
    }
}
