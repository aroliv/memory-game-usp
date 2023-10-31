import DataBase from "./DataBase";

export default class Results {
    constructor(){
        this.gameOverOverlay = document.getElementById('game-over-text')
        this.scoreList = document.querySelector('.score-list')
        this.victoryOverlay = document.getElementById('victory-game-text')
    }

    gameOverFunction(timer, music){
        clearInterval(timer);
        music;
        this.gameOverOverlay.classList.add('overlay-text--visible');
    }

    victoryFunction(timer, music) {
        clearInterval(timer);
        music;
        this.cloneScoreList = this.scoreList.cloneNode(true);
        this.victoryOverlay.classList.add('overlay-text--visible');
        if(this.victoryOverlay.childNodes.length <= 5){
             this.victoryOverlay.insertBefore(this.cloneScoreList, this.victoryOverlay.children[1]);
        } else {
            return;
        }
    }
}