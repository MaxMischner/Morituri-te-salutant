class Enemy extends MoveabelObject {
    constructor() {
        super();
        this.isStunned = false;
        // ... andere Initialisierungen ...
    }
    direction = -1;
    IMAGES_IDEL = [];
    attackCooldown = 2000;  // In Millisekunden (1 Sekunde)
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
attackRangeValue = 45;

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
                this.world.character.takeDamage(20, this);
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
    const stunDuration = Date.now() - this.stunTime;
    if (stunDuration < 3000) {
        this.playAnimation(this.IMAGES_HURT, "HURT"); // ✓ animiert
        return; // ↩ nichts anderes machen
    } else {
        this.isStunned = false;
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

hit(target) {
    if (!this.isAttackFrameActive()) {
        console.log("Kein aktiver Angriffsframe");
        return false;
    }

    console.log("Enemy hit-Methode aufgerufen", target);
    
    // Hitbox-Berechnung wie zuvor...

    if (isHit) {
        console.log("Treffer erkannt!", target);
        if (target instanceof Character) {
            if (target.isBlocking) {
                console.log("Charakter blockt den Angriff!");
                this.isStunned = true;
                this.stunTime = Date.now();
                console.log("Gegner wurde gestunnt!", this.isStunned, this.stunTime);
            } else {
                console.log("Charakter nimmt Schaden!");
                target.takeDamage(20);
            }
        }
    } else {
        console.log("Kein Treffer");
    }

    return isHit;
}



isAttackTargetInRange(target) {
   let facingLeft = this.otherDiretion;
let inRange = false;

if (facingLeft) {
    inRange = this.x >= target.x && this.x - target.x <= this.attackRangeValue;
} else {
    inRange = target.x >= this.x && target.x - this.x <= this.attackRangeValue;
}

return inRange;

}
showStunEffect() {
    if (!this.img || !this.world?.ctx) return;

    const ctx = this.world.ctx;
    ctx.save();

    ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.5;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "yellow";

    if (this.otherDiretion) {
        ctx.translate(this.x + this.width, this.y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.fillStyle = "yellow";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("STUN", this.width / 2, -10);

        this.drawStunStars(ctx, true);
    } else {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.fillStyle = "yellow";
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("STUN", this.x + this.width / 2, this.y - 10);

        this.drawStunStars(ctx, false);
    }

    ctx.restore();
}



drawStunStars(ctx, flipped = false) {
    let time = Date.now() / 200;
    let starCount = 3;

    for (let i = 0; i < starCount; i++) {
        let angle = time + (i * (Math.PI * 2 / starCount));
        let offsetX = Math.cos(angle) * 30;
        let offsetY = Math.sin(angle) * 10;

        let starX = flipped
            ? this.width / 2 + offsetX  // Gespiegelte Koordinaten
            : this.x + this.width / 2 + offsetX;

        let starY = flipped
            ? -20 + offsetY
            : this.y - 20 + offsetY;

        ctx.beginPath();
        ctx.arc(starX, starY, 5, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();
    }
}

}