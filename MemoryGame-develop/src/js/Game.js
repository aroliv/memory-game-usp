import Mix from "./Mix";
import AudioController from "./AudioController";
import Results from "./Results";
import Match from "./Match";
import DataBase from "./DataBase";

export default class Game {
    constructor(totalTime){
        this.overlays = document.querySelectorAll('.overlay-text');
        this.overlaysBtn = document.querySelectorAll('.overlay-text__btn');
        this.cards = document.querySelectorAll('.card');
        this.flipCounter = document.querySelector('.game-info__flips');
        this.timeCounter = document.querySelector('.game-info__time');
        this.imgBtn = document.querySelector('.btn__img--audio');
        this.muteBtn = document.querySelector('.btn--audio');
        this.scoreBtn = document.querySelector('.btn--score');
        this.scoreOverlay = document.getElementById('score-game-text');
        this.backToGame = document.querySelector('.back-to-game-btn')
        this.muteBtn.addEventListener('click', this.muteMusic.bind(this));
        this.totalTime = totalTime;
        this.mix = new Mix();
        this.audio = new AudioController();
        this.results = new Results();
        this.match = new Match();
        this.data = new DataBase();
        this.nickName = document.getElementById('email');
    }

    muteMusic(){
        if (this.muteBtn.classList.contains("btn--audio-on")) {
            this.audio.pauseMusic();
            this.muteBtn.classList.remove('btn--audio-on');
            this.imgBtn.setAttribute("src", `./images/sound.svg`);
        } else{
            this.audio.startMusic();
            this.muteBtn.classList.add('btn--audio-on')
            this.imgBtn.setAttribute("src", `./images/mute.svg`);
        }
    }

    flipCard(card){
        if(this.canFlipCard(card)){
            card.classList.add('card--active')
            this.audio.flip();
            this.totalClick--;
            this.flipCounter.textContent = this.totalClick;
            if (this.match.cardToCheck) {
                this.match.checkCardForMatch(card)
            } else {
                this.match.cardToCheck = card;
            }
        }
        this.data = new DataBase(this.totalClick, this.timeRemainig);
    }


    canFlipCard(card){
        return !this.match.busy && !this.match.matchedCards.includes(card) && card !== this.match.cardToCheck;
    }

    hideCards() {
            this.cards.forEach((card) => {
                card.classList.remove('card--active');
            })
    }

    startGame(){
        this.totalClick = 50;
        this.timeRemainig = this.totalTime;
        this.match.cardToCheck = null;
        this.match.matchedCards = [];
        this.match.busy = true;
        setTimeout(() => {
            this.audio.startMusic();
            this.mix.shuffleCards();
            this.timer();
            this.match.busy = false;
            this.scoreBtn.addEventListener('click', () => {
                this.scoreOverlay.classList.add('overlay-text--visible');
                clearInterval(this.timerCountdown);
                this.audio.pauseMusic();
            })
        }, 500);
        this.hideCards();
        this.flipCounter.textContent = this.totalClick;
        this.timeCounter.textContent = this.timeRemainig;
    }


    timer() {
        this.timerCountdown = setInterval(() => {
            this.timeRemainig--;
            this.timeCounter.textContent = this.timeRemainig;
            if (this.timeRemainig === 0) {
                this.results.gameOverFunction(this.timerCountdown, this.audio.gameOver());
            }
            if(this.totalClick === 0){
                this.results.gameOverFunction(this.timerCountdown, this.audio.gameOver());
            }
            if (this.match.matchedCards.length === this.cards.length && this.timeRemainig > 0) {
                this.results.victoryFunction(this.timerCountdown, this.audio.victory())
                this.data.showNickName();
            }

        }, 1000);
    }

    render(){
        this.overlaysBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                if(this.nickName.value.length === 0){
                    alert('Informe o e-mail')
                } else if(this.nickName.value.length > 90){
                    alert('E-mail muito longo')
                } else {
                    this.overlays.forEach((overlay) => {
                        overlay.classList.remove('overlay-text--visible');
                    })
                    this.startGame();
                }
            })
        })
        this.cards.forEach(card=>{
            card.addEventListener('click', ()=>{
                this.flipCard(card);
            })
        })
        this.backToGame.addEventListener('click', ()=>{
            this.scoreOverlay.classList.remove('overlay-text--visible');
            this.timer();
            this.audio.startMusic();
        })
    }
}