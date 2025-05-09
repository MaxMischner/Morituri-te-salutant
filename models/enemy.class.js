class Enemy extends MoveabelObject{
    direction = -1;
    IMAGES_IDEL = [];
    attackCooldown = 4000;  // In Millisekunden (1 Sekunde)
lastAttackTime = 0;


    turning = false;         // Dreht sich gerade um?
turnWaitTime = 1000;     // Wartezeit beim Umdrehen in ms
attackState = "idle"; // idle, windup, strike, cooldown
attackTimer = 0;
attackDuration = {
    windup: 600,
    strike: 500,
    cooldown: 3000
};
attackRangeValue = 70;

updateAttack() {
    if (this.attackState === "idle") return;

    let elapsed = Date.now() - this.attackTimer;

    if (this.attackState === "windup") {
        this.playAnimation(this.IMAGES_ATTACK, "ATTACK");

        if (elapsed >= this.attackDuration.windup) {
            this.attackState = "strike";
            this.attackTimer = Date.now();
        }

    } else if (this.attackState === "strike") {

        this.playAnimation(this.IMAGES_ATTACK, "ATTACK");

        if (elapsed >= this.attackDuration.strike) {
            if (this.isAttackTargetInRange(this.world.character)) {
                this.world.character.takeDamage(20);
            }
            this.attackState = "cooldown";
            this.attackTimer = Date.now();
        }

    } else if (this.attackState === "cooldown") {

        this.playAnimation(this.IMAGES_IDEL, "IDLE");

        if (elapsed >= this.attackDuration.cooldown) {
            this.attackState = "idle";
        }
    }
}

startAttack() {
    if (this.attackState !== "idle") return; // Bereits im Angriff

    this.attackState = "windup";
    this.attackTimer = Date.now();
}



patrol() {
    if (this.isDead) return;
    if (this.isStunned) {
        if (Date.now() - this.stunTime < 3000) { // 1 Sekunde Stun
            this.playAnimation(this.IMAGES_IDEL, "IDLE");
            console.log('stune');
            
            return;
        } else {
            this.isStunned = false; // <---- WICHTIG: Stun ist vorbei
        
    }
}
    

    // Angriff läuft → Angriffsupdate aufrufen
    if (this.attackState !== "idle") {
        this.updateAttack();
        return;
    }

    if (this.turning) {
        this.playAnimation(this.IMAGES_IDEL, "IDLE");1
        if (Date.now() - this.turnTimer >= this.turnWaitTime) {
            this.turning = false;
            this.direction *= -1;
            this.otherDiretion = this.direction < 0;
        }
        return;
    }

    this.x += this.direction * this.speed;
    this.otherDiretion = this.direction < 0;

    if (this.world?.level?.groundTiles?.some(tile => this.isBlockingTile(tile))) {
        this.x -= this.direction * this.speed;
        this.turning = true;
        this.turnTimer = Date.now();
    } else {
        this.playAnimation(this.IMAGES_RUN,"RUN");
    }
}

tryAttack(target) {
    if (this.isDead) return;
    if (this.attackState !== "idle") return;

    if (this.isAttackTargetInRange(target)) {
        this.startAttack();
    }
}





isAttackTargetInRange(target) {
    let distanceX = Math.abs((this.x + this.width / 2) - (target.x + target.width / 2));

    return distanceX < this.attackRangeValue;
}
showStunEffect() {
    console.log("SHOW STUN EFFECT wird ausgeführt!");
    if (!this.img) return;

    let ctx = this.world?.ctx;
    if (!ctx) return;

    ctx.save();

    // Blinken / Schatten Effekt (ist schon vorhanden)
    ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.5;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "yellow";
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    // NEU: STUN TEXT
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "yellow";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("STUN", this.x + this.width / 2, this.y - 10); // Über dem Kopf
    this.drawStunStars(ctx);
    ctx.restore();
}

drawStunStars(ctx) {
    let time = Date.now() / 200;
    let starCount = 3;

    for (let i = 0; i < starCount; i++) {
        let angle = time + (i * (Math.PI * 2 / starCount));
        let starX = this.x + this.width / 2 + Math.cos(angle) * 30;
        let starY = this.y - 20 + Math.sin(angle) * 10;

        ctx.beginPath();
        ctx.arc(starX, starY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
    }
}
}
