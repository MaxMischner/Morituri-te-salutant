class OrcShamane extends Enemy {
    height = 80 ;
    width = 80;
    energy= 2;
    
    lastAttackTime = 0;
    animationSpeeds = {
        IDLE: 150,
        RUN: 120,
        ATTACK: 180,
        JUMP: 150,
        
    };
    isCasting = false;
    castingFrame = 0;
    attackCooldown = 4000;
    lastAttackTime = 0;

    offset = {
        top: 10,
        bottom: 0,
        left: 20,
        right: 20
    }
    attackRange = {
        offsetX: 0,
        width: 0,
    };
    
    IMAGES_HURT = [
        'img/Orcs/Orc_Shaman/Hurt/tile000.png',
        'img/Orcs/Orc_Shaman/Hurt/tile001.png'
    ];
   

    IMAGES_MAGIC = [
    'img/Orcs/Orc_Shaman/Magic/tile000.png',
    'img/Orcs/Orc_Shaman/Magic/tile001.png',
    'img/Orcs/Orc_Shaman/Magic/tile002.png',
    'img/Orcs/Orc_Shaman/Magic/tile003.png',
    'img/Orcs/Orc_Shaman/Magic/tile004.png',
    'img/Orcs/Orc_Shaman/Magic/tile005.png',
    'img/Orcs/Orc_Shaman/Magic/tile006.png',
    'img/Orcs/Orc_Shaman/Magic/tile007.png'
];

    IMAGES_DEAD = [
        'img/Orcs/Orc_Shaman/Dead/tile000.png',
        'img/Orcs/Orc_Shaman/Dead/tile001.png',
        'img/Orcs/Orc_Shaman/Dead/tile002.png',
        'img/Orcs/Orc_Shaman/Dead/tile003.png',
        'img/Orcs/Orc_Shaman/Dead/tile004.png'
    ];
    
    IMAGES_RUN = [
        'img/Orcs/Orc_Shaman/Run/tile000.png',
        'img/Orcs/Orc_Shaman/Run/tile001.png',
        'img/Orcs/Orc_Shaman/Run/tile002.png',
        'img/Orcs/Orc_Shaman/Run/tile003.png',
        'img/Orcs/Orc_Shaman/Run/tile004.png',
        'img/Orcs/Orc_Shaman/Run/tile005.png'
    ];

    IMAGES_IDEL = [
        'img/Orcs/Orc_Shaman/Idel/tile000.png',
        'img/Orcs/Orc_Shaman/Idel/tile001.png',
        'img/Orcs/Orc_Shaman/Idel/tile002.png',
        'img/Orcs/Orc_Shaman/Idel/tile003.png',
        'img/Orcs/Orc_Shaman/Idel/tile004.png'
    ]

    IMAGES_LIGHTNUNG_BOLT = [
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile000.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile001.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile002.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile003.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile004.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile005.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile006.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile007.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile008.png',
        'img/Orcs/Orc_Shaman/Lightning_Bolt/tile009.png',
        
    ]

    constructor(x,y){
        super();
        this.loadImage('img/Orcs/Orc_Shaman/Idel/tile000.png')
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);  
        this.loadImages(this.IMAGES_MAGIC);   
        this.applyGravity(); 
        this.animate();
    }

/**
 * Starts the Orc Shaman animation loop.
 * Handles direction, stun state, casting state, and attack logic.
 * @private
 */
animate() {
    this.setStoppableInterval(() => {
        if (!this.world || !this.world.character) return;
        if (this.isDead) return;
        const character = this.world.character;
        this.updateFacingDirection(character);
        if (this.handleStunState()) return;
        if (this.handleCastingState(character)) return;
        this.handleAttackLogic(character);
    }, 1000 / 60);
}

/**
 * Updates the facing direction of the Orc Shaman to face the character.
 * @param {Character} character - The target character.
 * @private
 */
updateFacingDirection(character) {
    this.otherDiretion = this.x > character.x;
}

/**
 * Handles the stunned state of the Orc Shaman and plays the hurt animation if stunned.
 * @returns {boolean} True if the shaman is stunned and no further action should occur.
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
 * Handles the casting state of the Orc Shaman.
 * Plays casting animation and triggers Lightning Bolt at the end of the casting.
 * @param {Character} character - The target character.
 * @returns {boolean} True if casting is in progress and no further action should occur.
 * @private
 */
handleCastingState(character) {
    if (this.isCasting) {
        this.playAnimation(this.IMAGES_MAGIC, "ATTACK");
        this.castingFrame++;
        if (this.castingFrame >= this.IMAGES_MAGIC.length) {
            this.castLightningAt(character.x + character.width / 2);
            this.isCasting = false;
            this.castingFrame = 0;
            this.lastAttackTime = Date.now();
        } return true;
    }return false;
}

/**
 * Handles attack logic.
 * Starts casting if cooldown is ready and target is in range, otherwise plays idle animation.
 * @param {Character} character - The target character.
 * @private
 */
handleAttackLogic(character) {
    const distance = Math.abs(this.x - character.x);
    if (
        Date.now() - this.lastAttackTime > this.attackCooldown &&
        distance <= 500
    ) {
        this.isCasting = true;
        this.castingFrame = 0;
    } else {
        this.playAnimation(this.IMAGES_IDEL, "IDLE");
    }
}

/**
 * Casts a Lightning Bolt targeting the specified X coordinate.
 * Plays a sound effect and adds the Lightning Bolt to the level's active effects.
 * @param {number} targetX - The X coordinate to target with the Lightning Bolt.
 * @private
 */
castLightningAt(targetX) {
    soundManager.play("magic");
    const bolt = new LightningBolt(targetX, 0, this.world.character); // comes from above
    bolt.world = this.world; // LightningBolt needs access to world
    this.world.level.activeEffects.push(bolt);
}

}