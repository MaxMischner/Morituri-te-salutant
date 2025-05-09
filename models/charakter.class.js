class Character extends MoveabelObject {
    world;
    speed = 2;
    score = 0;
    blockEnergy = 11;
    isBlocking = false;
    blockFrame = 0;
    blockActive = false;
    blockHoldTime = 0;
    blockMaxHoldTime = 60000; 
   attackRange = {
    offsetX: 70,  // Erhöhen Sie diesen Wert
    width: 100,   // Erhöhen Sie diesen Wert
};

    offset = {
        top: 20,
        bottom: 0,
        left: 25,
        right: 25
    }

    animationSpeeds = {
        IDLE: 150,
        RUN: 120,
        ATTACK: 60,
        JUMP: 150,
        BLOCK: 100
    };
    
    IMAGES_BLOCK =[
        'img/Heros/Gladiator_1/Block/tile000.png',
        'img/Heros/Gladiator_1/Block/tile001.png',
        'img/Heros/Gladiator_1/Block/tile002.png',
        'img/Heros/Gladiator_1/Block/tile003.png',
        'img/Heros/Gladiator_1/Block/tile004.png'

    ]
    IMAGES_RUN = [
        'img/Heros/Gladiator_1/Run/tile000.png',
        'img/Heros/Gladiator_1/Run/tile001.png',
        'img/Heros/Gladiator_1/Run/tile002.png',
        'img/Heros/Gladiator_1/Run/tile003.png',
        'img/Heros/Gladiator_1/Run/tile004.png',
        'img/Heros/Gladiator_1/Run/tile005.png',
        'img/Heros/Gladiator_1/Run/tile006.png',
        'img/Heros/Gladiator_1/Run/tile007.png',
        'img/Heros/Gladiator_1/Run/tile008.png',
        'img/Heros/Gladiator_1/Run/tile009.png'
    ]

    IMAGES_IDEL =[
        'img/Heros/Gladiator_1/Idel/tile000.png',
        'img/Heros/Gladiator_1/Idel/tile001.png',
        'img/Heros/Gladiator_1/Idel/tile002.png',
        'img/Heros/Gladiator_1/Idel/tile003.png',
        'img/Heros/Gladiator_1/Idel/tile004.png',
        'img/Heros/Gladiator_1/Idel/tile005.png'
  ];

    IMAGES_IDEL2 =[
        'img/Heros/Gladiator_1/Idle_2/tile000.png',
        'img/Heros/Gladiator_1/Idle_2/tile001.png',
        'img/Heros/Gladiator_1/Idle_2/tile002.png',
        'img/Heros/Gladiator_1/Idle_2/tile003.png',
        'img/Heros/Gladiator_1/Idle_2/tile004.png',
        'img/Heros/Gladiator_1/Idle_2/tile005.png',
        'img/Heros/Gladiator_1/Idle_2/tile006.png',
  ];

  IMAGES_JUMP =[
    'img/Heros/Gladiator_1/Jump/tile000.png',
    'img/Heros/Gladiator_1/Jump/tile001.png',
    'img/Heros/Gladiator_1/Jump/tile002.png',
    'img/Heros/Gladiator_1/Jump/tile003.png',
    'img/Heros/Gladiator_1/Jump/tile004.png',
    'img/Heros/Gladiator_1/Jump/tile005.png',
    'img/Heros/Gladiator_1/Jump/tile006.png',
    'img/Heros/Gladiator_1/Jump/tile007.png',
    'img/Heros/Gladiator_1/Jump/tile008.png',
    'img/Heros/Gladiator_1/Jump/tile009.png',
];

    IMAGES_ATTACK = [
        'img/Heros/Gladiator_1/Attak_1/tile000.png',
        'img/Heros/Gladiator_1/Attak_1/tile001.png',
        'img/Heros/Gladiator_1/Attak_1/tile002.png',
        'img/Heros/Gladiator_1/Attak_1/tile003.png',
        'img/Heros/Gladiator_1/Attak_1/tile004.png'
];
IMAGES_HURT = [
    'img/Heros/Gladiator_1/Hurt/tile000.png',
    'img/Heros/Gladiator_1/Hurt/tile001.png',
    'img/Heros/Gladiator_1/Hurt/tile002.png',
    'img/Heros/Gladiator_1/Hurt/tile003.png'
];
IMAGES_DEAD = [
    'img/Heros/Gladiator_1/Dead/tile000.png',
    'img/Heros/Gladiator_1/Dead/tile001.png',
    'img/Heros/Gladiator_1/Dead/tile002.png'
]

  
    constructor(){
        super().loadImage('img/Heros/Gladiator_1/Idle_2/tile000.png')
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_IDEL2);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_BLOCK);
        this.applyGravity ()
        this.animate()
    }

    
    animate(){

        setInterval(() =>{
            if (this.world.keyboard.RIGTH && this.x < this.world.level.level_end_x) {
               this.moveRight();
        }

        if (this.world.keyboard.SPACE && !this.isAttacking) {
            this.attack();
            
            
        }
        if (this.world.keyboard.E && this.blockEnergy > 0 && !this.isBlocking) {
            this.startBlock();
            
            
        }
        
        
                if (this.world.keyboard.LEFT && this.x > 0 ) {
                    this.moveLeft(true)
                }

                if (this.world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                }

                this.world.camera_x = -this.x +25;
                this.updateBlockStatus();
            }, 1000/60)
        
            setInterval(() => {

                if (this.isBlocking) {
                    this.playAnimation(this.IMAGES_BLOCK, "BLOCK");
                
                    if (this.currentImage >= 4) {
                        this.blockActive = true;
                        this.blockHoldTime += 100;
                
                        this.currentImage = 4; // Blockbild bleibt bestehen
                
                        if (this.blockHoldTime >= 3000 || this.blockEnergy <= 0) {
                            this.isBlocking = false;
                            this.blockActive = false;
                            this.blockHoldTime = 0;
                            this.currentImage = 0;
                        }
                    }
                }
                
                
                
                else if (this.isAttacking) {
                    this.playAnimation(this.IMAGES_ATTACK, "ATTACK");
                } 
                else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMP, "JUMP");
                } 
                else {
                    if (this.world.keyboard.RIGTH || this.world.keyboard.LEFT) {
                        this.playAnimation(this.IMAGES_RUN, "RUN");
                    } else {
                        this.playAnimation(this.IMAGES_IDEL,"IDLE");
                    }
                }
            
            }, 100);
            
            
            
            
    }

    startBlock() {
    if (!this.isBlocking && this.blockEnergy > 0) {
        this.isBlocking = true;
        this.blockStartTime = Date.now();
        console.log("Block gestartet");
    }
}

updateBlockStatus() {
    if (this.isBlocking) {
        let currentTime = Date.now();
        if (currentTime - this.blockStartTime >= this.blockDuration || this.blockEnergy <= 0) {
            this.isBlocking = false;
            console.log("Block beendet");
        }
    }
}
}