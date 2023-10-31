import bgMusic from '../audio/bgMusic.mp3';
import flip from '../audio/flip.wav';
import gameOver from '../audio/gameOver.wav';
import match from '../audio/match.wav';
import victory from '../audio/victory.wav';

export default class AudioController{
    constructor(){
       this.bgMusic = new Audio(bgMusic);
       this.flipMusic = new Audio(flip);
       this.gameOverMusic = new Audio(gameOver);
       this.matchMusic = new Audio(match);
       this.victoryMusic = new Audio(victory);
       this.bgMusic.volume = 0.1;
    }

    startMusic(){
        this.bgMusic.play();
    }

    stopMusic(){
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    flip(){
        this.flipMusic.play();
    }

    match(){
        this.matchMusic.play();
    }

    victory(){
        this.stopMusic();
        this.victoryMusic.play();
    }
    gameOver(){
        this.stopMusic();
        this.gameOverMusic.play();
    }
    pauseMusic(){
        this.bgMusic.pause();
    }
}
