class Endboss extends Enemy{

    height = 200;
    width = 200; 
isActive = false;
hasIntroStarted = false;
bossNameOpacity = 0;
bossNameSize = 80;
bossNameY = 0;

    offset = {
        top: 40,
        bottom: 0,
        left: 50,
        right: 50
    }
    attackRangeValue = 70;

     attackRange = {
        offsetX: 10,
        width: 30,
    };
    
     IMAGES_ATTACK = [
    'img/Boss/Minotaur_1/Attack/tile000.png',
    'img/Boss/Minotaur_1/Attack/tile001.png',
    'img/Boss/Minotaur_1/Attack/tile002.png',
    'img/Boss/Minotaur_1/Attack/tile004.png',
    'img/Boss/Minotaur_1/Attack/tile003.png'
    ];

    IMAGES_RUN = [
    'img/Boss/Minotaur_1/Walk/tile000.png',
    'img/Boss/Minotaur_1/Walk/tile001.png',
    'img/Boss/Minotaur_1/Walk/tile002.png',
    'img/Boss/Minotaur_1/Walk/tile003.png',
    'img/Boss/Minotaur_1/Walk/tile004.png',
    'img/Boss/Minotaur_1/Walk/tile005.png',
    'img/Boss/Minotaur_1/Walk/tile006.png',
    'img/Boss/Minotaur_1/Walk/tile007.png',
    'img/Boss/Minotaur_1/Walk/tile008.png',
    'img/Boss/Minotaur_1/Walk/tile009.png',
    'img/Boss/Minotaur_1/Walk/tile010.png',
    'img/Boss/Minotaur_1/Walk/tile011.png'
    ];

    IMAGES_DEAD = [
        'img/Boss/Minotaur_1/Dead/tile000.png',
        'img/Boss/Minotaur_1/Dead/tile001.png',
        'img/Boss/Minotaur_1/Dead/tile002.png',
        'img/Boss/Minotaur_1/Dead/tile003.png',
        'img/Boss/Minotaur_1/Dead/tile004.png'
    ];
    
    IMAGES_HURT = [
        'img/Boss/Minotaur_1/Hurt/tile000.png',
        'img/Boss/Minotaur_1/Hurt/tile001.png',
        'img/Boss/Minotaur_1/Hurt/tile002.png'
    ];

    IMAGES_IDEL = [
        'img/Boss/Minotaur_1/Idel/tile000.png',
        'img/Boss/Minotaur_1/Idel/tile001.png',
        'img/Boss/Minotaur_1/Idel/tile002.png',
        'img/Boss/Minotaur_1/Idel/tile003.png',
        'img/Boss/Minotaur_1/Idel/tile004.png',
        'img/Boss/Minotaur_1/Idel/tile005.png',
        'img/Boss/Minotaur_1/Idel/tile006.png',
        'img/Boss/Minotaur_1/Idel/tile007.png',
        'img/Boss/Minotaur_1/Idel/tile008.png',
        'img/Boss/Minotaur_1/Idel/tile009.png'    
    ]


    constructor(){
        super();
        this.loadImage('img/Boss/Minotaur_1/Walk/tile000.png')
        this.x = 4150;
        this.y = 200;
        this.speed = 0;
        this.isActive = false;
        this.bossNameSize = 48; // statt 80
        this.bossNameY = 180;   // etwas höher als vorher, da kleiner

        this.bossNameOpacity = 0;



       this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);  
        this.loadImages(this.IMAGES_ATTACK); 
        
        this.applyGravity(); 

        
    }

   animate() {
    if (this.world.character.x > this.world.level_end_x && !this.hasIntroStarted) {
    this.triggerIntro();
}

    setInterval(() => {
        this.updateBossBehavior();
    }, 1000 / 60);
}

updateBossBehavior() {
     if (!this.world || !this.world.character) return;
    // Falls tot, nichts mehr machen
    if (this.isDead) return;

    const character = this.world.character;

    // Boss wird erst aktiv, wenn Spieler im Endbereich ist
    const activationX = this.world.level.level_end_x - 720;

    if (!this.isActive && character.x >= activationX) {
        this.isActive = true;
        this.speed = 0.3; // Jetzt darf er sich bewegen
        console.log("Boss aktiviert!");
    }

    // Solange inaktiv → Idle-Animation
    if (!this.isActive) {
        this.playAnimation(this.IMAGES_IDEL, "IDLE");
        return;
    }

    // Wenn gestunnt → Hurt-Animation & Pause
    if (this.isStunned) {
    const stunDuration = Date.now() - this.stunTime;
    if (stunDuration < 3000) {
        this.playAnimation(this.IMAGES_HURT, "HURT"); // ✓ animiert
        return; // ↩ nichts anderes machen
    } else {
        this.isStunned = false;
    }
}


    // Angriff läuft → Angriff abspielen
    if (this.attackState !== "idle") {
        this.updateAttack(); // Erbt von Enemy
        return;
    }

    // Richtung setzen
    this.otherDiretion = this.x > character.x;

    // Bewegung zum Charakter
    if (Math.abs(this.x - character.x) > this.attackRangeValue) {
        // Boss bewegt sich auf den Spieler zu
        this.x += this.otherDiretion ? -this.speed : this.speed;
        this.playAnimation(this.IMAGES_RUN, "RUN");
    } else {
        // Wenn nahe genug → Angriff starten
        this.startAttack(); // aus Enemy
        soundManager.play("attack");
    }
}

triggerIntro() {
    this.hasIntroStarted = true;
    this.isActive = true;
    this.world.character.canMove = false;

    let steps = 30;
    let stepSize = 3;

    const interval = setInterval(() => {
        if (steps-- > 0) {
            this.x -= stepSize; // Minotauros läuft zum Spieler
        } else {
            clearInterval(interval);
            this.startBossIntroText();
        }
    }, 50);
}



}

           