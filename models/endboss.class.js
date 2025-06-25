class Endboss extends Enemy{
height = 200;
width = 200; 
isActive = false;
hasIntroStarted = false;
bossNameOpacity = 0;
bossNameSize = 80;
bossNameY = 0;
    attackDuration = {
        windup: 600,
        strike: 500,
        cooldown: 1500
};
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

    animationSpeeds = {
        IDLE: 150,
        RUN: 100,
        ATTACK: 150,
        JUMP: 150,
        
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
        this.bossNameSize = 48; 
        this.bossNameY = 180;   
        this.bossNameOpacity = 0;
       this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);  
        this.loadImages(this.IMAGES_ATTACK); 
        this.applyGravity();  
    }

/**
 * Starts the boss animation and behavior loop.
 * Triggers the intro sequence if the character reaches the end of the level.
 * This is the main public method of the Endboss.
 */
animate() {
    if (this.world.character.x > this.world.level_end_x && !this.hasIntroStarted) {
        this.triggerIntro();
    }

    this.setStoppableInterval(() => {
        this.updateBossBehavior();
    }, 1000 / 60);
}

/**
 * Updates the boss behavior and animation state.
 * Delegates behavior handling to specialized methods.
 * @private
 */
updateBossBehavior() {
    if (!this.world || !this.world.character) return;
    if (this.isDead) return;
    this.checkActivation();
    if (!this.isActive) {
        this.playAnimation(this.IMAGES_IDEL, "IDLE");
        return;
    }
    if (this.handleStunState()) return;
    if (this.handleOngoingAttack()) return;
    this.handleMovementAndAttack();
}

/**
 * Checks if the boss should be activated based on the character position.
 * @private
 */
checkActivation() {
    const character = this.world.character;
    const activationX = this.world.level.level_end_x - 720;
    if (!this.isActive && character.x >= activationX) {
        this.isActive = true;
        this.speed = 0.3;
    }
}

/**
 * Handles the stun state. Plays hurt animation if stunned.
 * @returns {boolean} True if boss is stunned and no further action should occur.
 * @private
 */
handleStunState() {
    if (this.isStunned) {
        const stunDuration = Date.now() - this.stunTime;
        if (stunDuration < 3000) {
            this.playAnimation(this.IMAGES_HURT, "HURT");
            return true;
        } else {
            this.isStunned = false;
        }
    }
    return false;
}

/**
 * Handles ongoing attack state.
 * @returns {boolean} True if attack is ongoing and no further action should occur.
 * @private
 */
handleOngoingAttack() {
    if (this.attackState !== "idle") {
        this.updateAttack();
        return true;
    }
    return false;
}

/**
 * Handles movement toward the character and triggers attack when in range.
 * @private
 */
handleMovementAndAttack() {
    const character = this.world.character;
    this.otherDiretion = this.x > character.x;
    if (Math.abs(this.x - character.x) > this.attackRangeValue) {
        this.x += this.otherDiretion ? -this.speed : this.speed;
        this.playAnimation(this.IMAGES_RUN, "RUN");
    } else {
        this.startAttack();
        soundManager.play("attack");
    }
}

/**
 * Triggers the boss intro sequence.
 * Moves the boss forward step by step, then starts the intro text and stops other intervals.
 * @private
 */
triggerIntro() {
    this.hasIntroStarted = true;
    this.isActive = true;
    this.world.character.canMove = false;
    let steps = 30;
    let stepSize = 3;
    this.setStoppableInterval(() => {
        if (steps-- > 0) {
            this.x -= stepSize;
        } else {
            this.startBossIntroText();
            this.stopAllIntervals();
        }
    }, 50);}
    
}

           