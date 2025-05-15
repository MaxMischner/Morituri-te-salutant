class CloudManager {
    constructor(world) {
        this.world = world;
        this.concurrentSpawns = 0;
    }

    updateClouds() {
        this.world.level.clouds = this.world.level.clouds.filter(cloud => cloud.x > -cloud.width);
    }

    startCloudSpawner() {
        const spawnCloud = () => {
            if (this.world.level.clouds.length < 15 && this.concurrentSpawns < 3) {
                this.concurrentSpawns++;

                let cloud = new Cloud();
                cloud.x = this.world.level.level_end_x + Math.random() * 200;
                cloud.y = 50 + Math.random() * 100;
                this.world.level.clouds.push(cloud);

                setTimeout(() => {
                    this.concurrentSpawns--;
                }, 3000);
            }

            let nextSpawn = 20000 + Math.random() * 30000;
            setTimeout(spawnCloud, nextSpawn);
        };

        spawnCloud();
    }
}