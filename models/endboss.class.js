class Endboss extends Enemy{

    height = 200;
    width = 200; 

    offset = {
        top: 40,
        bottom: 0,
        left: 50,
        right: 50
    }
    

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


    constructor(){
        super().loadImage('img/Boss/Minotaur_1/Walk/tile000.png')
        this.x = 350;
        this.y = 250;
        this.speed = 0.15;

        this.loadImages(this.IMAGES_RUN);
        
        

        this.animate()
    }

    animate(){
        setInterval(()=>{
            this.moveLeft(true)
        },1000/60);
        setInterval(() =>{
            this.playAnimation(this.IMAGES_RUN)
    },7000/60);
    }
}

           