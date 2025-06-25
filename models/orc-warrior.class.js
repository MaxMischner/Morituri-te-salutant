class OrkWorrier extends Enemy {

    height = 80 ;
    width = 80;
    energy;
    lastAttackTime = 0;
    animationSpeeds = {
        IDLE: 150,
        RUN: 120,
        ATTACK: 180,
        JUMP: 150,
        
    };
    
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
        'img/Orcs/Orc_Warrior/Hurt/tile000.png',
        'img/Orcs/Orc_Warrior/Hurt/tile001.png'
    ];
   

    IMAGES_ATTACK = [
    'img/Orcs/Orc_Warrior/Attack/tile000.png',
    'img/Orcs/Orc_Warrior/Attack/tile001.png',
    'img/Orcs/Orc_Warrior/Attack/tile002.png',
    'img/Orcs/Orc_Warrior/Attack/tile003.png'
];

    IMAGES_DEAD = [
        'img/Orcs/Orc_Warrior/Dead/tile000.png',
        'img/Orcs/Orc_Warrior/Dead/tile001.png',
        'img/Orcs/Orc_Warrior/Dead/tile002.png',
        'img/Orcs/Orc_Warrior/Dead/tile003.png'
    ];
    
    IMAGES_RUN = [
        'img/Orcs/Orc_Warrior/Run/tile000.png',
        'img/Orcs/Orc_Warrior/Run/tile001.png',
        'img/Orcs/Orc_Warrior/Run/tile002.png',
        'img/Orcs/Orc_Warrior/Run/tile003.png',
        'img/Orcs/Orc_Warrior/Run/tile004.png',
        'img/Orcs/Orc_Warrior/Run/tile005.png'
    ];

    IMAGES_IDEL = [
        'img/Orcs/Orc_Warrior/Idle/tile000.png',
        'img/Orcs/Orc_Warrior/Idle/tile001.png',
        'img/Orcs/Orc_Warrior/Idle/tile002.png',
        'img/Orcs/Orc_Warrior/Idle/tile003.png',
        'img/Orcs/Orc_Warrior/Idle/tile004.png'
    ]

    constructor(x,y){
        super();
        this.loadImage('img/Orcs/Orc_Warrior/Idle/tile000.png')
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.25;
        this.energy= 40;
        this.alreadyHit = false;
         this.isInvincible = false;
        this.invincibilityDuration = 1000;
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);  
        this.loadImages(this.IMAGES_ATTACK);   
        this.applyGravity(); 
        this.animate();
    }
    
/**
 * Starts a controllable animation loop that makes the enemy patrol.
 * This runs at approximately 60 frames per second using a stoppable interval.
 */
animate() {
    this.setStoppableInterval(() => {
        this.patrol();
    }, 1000 / 60);
}

}    