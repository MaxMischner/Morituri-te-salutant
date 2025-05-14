class Hero2 extends Character {
  IMAGES_BLOCK = [
    'img/Heros/Gladiator_2/Block/tile000.png',
    'img/Heros/Gladiator_2/Block/tile001.png',
    'img/Heros/Gladiator_2/Block/tile002.png',
    'img/Heros/Gladiator_2/Block/tile003.png'
    
];

IMAGES_RUN = [
    'img/Heros/Gladiator_2/Run/tile000.png',
    'img/Heros/Gladiator_2/Run/tile001.png',
    'img/Heros/Gladiator_2/Run/tile002.png',
    'img/Heros/Gladiator_2/Run/tile003.png',
    'img/Heros/Gladiator_2/Run/tile004.png',
    'img/Heros/Gladiator_2/Run/tile005.png',
    'img/Heros/Gladiator_2/Run/tile006.png',
    'img/Heros/Gladiator_2/Run/tile007.png',
    'img/Heros/Gladiator_2/Run/tile008.png',
    'img/Heros/Gladiator_2/Run/tile009.png'
];

IMAGES_IDEL = [
    'img/Heros/Gladiator_2/Idel/tile000.png',
    'img/Heros/Gladiator_2/Idel/tile001.png',
    'img/Heros/Gladiator_2/Idel/tile002.png',
    'img/Heros/Gladiator_2/Idel/tile003.png',
    'img/Heros/Gladiator_2/Idel/tile004.png',
    'img/Heros/Gladiator_2/Idel/tile005.png'
];

IMAGES_IDEL2 = [
    'img/Heros/Gladiator_2/Idle_2/tile000.png',
    'img/Heros/Gladiator_2/Idle_2/tile001.png',
    'img/Heros/Gladiator_2/Idle_2/tile002.png',
    'img/Heros/Gladiator_2/Idle_2/tile003.png',
    'img/Heros/Gladiator_2/Idle_2/tile004.png',
    'img/Heros/Gladiator_2/Idle_2/tile005.png',
    'img/Heros/Gladiator_2/Idle_2/tile006.png'
];

IMAGES_JUMP = [
    'img/Heros/Gladiator_2/Jump/tile000.png',
    'img/Heros/Gladiator_2/Jump/tile001.png',
    'img/Heros/Gladiator_2/Jump/tile002.png',
    'img/Heros/Gladiator_2/Jump/tile003.png',
    'img/Heros/Gladiator_2/Jump/tile004.png',
    'img/Heros/Gladiator_2/Jump/tile005.png',
    'img/Heros/Gladiator_2/Jump/tile006.png',
    'img/Heros/Gladiator_2/Jump/tile007.png',
    'img/Heros/Gladiator_2/Jump/tile008.png',
    'img/Heros/Gladiator_2/Jump/tile009.png'
];

IMAGES_ATTACK = [
    'img/Heros/Gladiator_2/Attak_1/tile000.png',
    'img/Heros/Gladiator_2/Attak_1/tile001.png',
    'img/Heros/Gladiator_2/Attak_1/tile002.png',
    'img/Heros/Gladiator_2/Attak_1/tile003.png',
    'img/Heros/Gladiator_2/Attak_1/tile004.png'
];

IMAGES_HURT = [
    'img/Heros/Gladiator_2/Hurt/tile000.png',
    'img/Heros/Gladiator_2/Hurt/tile001.png',
    'img/Heros/Gladiator_2/Hurt/tile002.png',
    'img/Heros/Gladiator_2/Hurt/tile003.png'
];

IMAGES_DEAD = [
    'img/Heros/Gladiator_2/Dead/tile000.png',
    'img/Heros/Gladiator_2/Dead/tile001.png',
    'img/Heros/Gladiator_2/Dead/tile002.png'
];


  
    constructor(){
        super();
        
        this.loadImage('img/Heros/Gladiator_2/Idle_2/tile000.png')
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
}