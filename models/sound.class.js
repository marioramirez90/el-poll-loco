class PlaySounds {
    isMuted = false;

    sounds = {
        'sleep': new Audio("audio/character/characterSnoring.mp3"),
        'walking': new Audio("audio/character/characterRun.mp3"),
        'jump': new Audio("audio/character/characterJump.wav"),
        'damage': new Audio("audio/character/characterRun.mp3"),
        'dead': new Audio("audio/character/characterDead.wav"),
        'dead2': new Audio("audio/character/alder-ay-dios-mio.mp3"),
        'coin': new Audio("audio/collectibles/collectSound.wav"),
        'bottle': new Audio("audio/collectibles/bottleCollectSound.wav"),
        'endgame': new Audio('audio/endboss/gregorquendel-cinematic-music-sketches-10-cinematic-cello-arpeggio-sketch-116187.mp3'),
        'chicken': new Audio('audio/endboss/ribhavagrawal-chicken-cluking-type-3-293320.mp3'),
        'dead_small_chicken': new Audio('audio/chicken/chickenDead2.mp3'),
        'dead_chicken': new Audio("audio/chicken/chickenDead.mp3"),
        'bottle_hit': new Audio('audio/throwable/bottleBreak.mp3')
    };

    play(name) {
        let sound = this.sounds[name];
        if (sound && !this.isMuted) {
            sound.currentTime = 0; 
            sound.play();
        }
    }

   pause(name) {
    let sound = this.sounds[name];
    if (sound) {
        sound.pause();
    }
}

    toggleMute() {
        this.isMuted = !this.isMuted;
        Object.values(this.sounds).forEach(s => {
            s.muted = this.isMuted;
        });
    }
}


const playsound = new PlaySounds();