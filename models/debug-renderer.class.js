class DebugRenderer {
    constructor(world) {
        this.world = world;
    }

    renderDebugInfo() {
        this.world.level.enemies.forEach(enemy => this.drawOffsetBox(enemy));
        this.drawOffsetBox(this.world.character);
    }

    drawOffsetBox(mo, color = 'orange') {
        this.world.ctx.beginPath();
        this.world.ctx.lineWidth = "2";
        this.world.ctx.strokeStyle = color;
    
        let x = mo.x + (mo.offset?.left || 0) + this.world.camera_x;
        let y = mo.y + (mo.offset?.top || 0);
        let width = mo.width - (mo.offset?.left || 0) - (mo.offset?.right || 0);
        let height = mo.height - (mo.offset?.top || 0) - (mo.offset?.bottom || 0);
    
        this.world.ctx.rect(x, y, width, height);
        this.world.ctx.stroke();
    }

    getDebugColor(mo) {
        if (mo instanceof Character) return 'blue';
        if (mo instanceof Enemy) return 'red';
        return 'grey';
    }
}