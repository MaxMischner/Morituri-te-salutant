class SoundManager {
constructor() {
    this.sounds = {
        attack: new Audio("audio/616502__empiremonkey__strikec.wav"),
        jump: new Audio("audio/667291__pekena_larva__voc_male_jump_03.wav"),
        block: new Audio("audio/791953__artninja__tmnt_2012_inspired_heavy_kick_03092025.wav"),
        death: new Audio("audio/695389__fmaudio__male-death-cry-6.wav"),
        magic: new Audio("audio/572141__eminyildirim__water-elemantal-magic-skill.wav"),
        deathEnemy: new Audio("audio/535297__alejandrodiaz17__oof-death-sound.m4a"),
    };
    const storedState = localStorage.getItem("soundEnabled");
    this.enabled = storedState === null ? true : storedState === "true";
    this.music = new Audio("audio/732743__szegvari__jungle-warriors.wav");
    this.music.loop = true;
    this.music.volume = 0.1;
    for (const sound of Object.values(this.sounds)) {
        sound.volume = 0.15;
    }
    if (this.enabled) {
        this.music.play();
    }
}

/**
 * Plays the specified sound by name if sound is enabled and the sound exists.
 * Resets the sound to the beginning before playing.
 * @param {string} name - The name of the sound to play.
 * @public
 */
play(name) {
    if (!this.enabled || !this.sounds[name]) return;
    this.sounds[name].currentTime = 0;
    this.sounds[name].play();
}

/**
 * Toggles the sound system on or off.
 * Plays or pauses the background music accordingly.
 * @public
 */
toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem("soundEnabled", this.enabled); 
    if (this.enabled) {
        this.music.play();
    } else {
        this.music.pause();
    }
}
}

const soundManager = new SoundManager();
