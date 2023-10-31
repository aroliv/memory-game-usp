import AudioController from "./AudioController";
export default class Match {
    constructor(){
        this.matchedCards = [];
        this.cardToCheck = null;
        this.busy;
        this.audioController = new AudioController();
    }
    checkCardForMatch(card){
        if(this.getCardType(card)===this.getCardType(this.cardToCheck)){
            this.cardMatch(card, this.cardToCheck)
        } else {
            this.cardMissMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    getCardType(card){
        return card.getElementsByClassName('card__img--back')[0].src;
    }

    cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        this.audioController.match();
    }

    cardMissMatch(card1, card2){
        this.busy = true;
        setTimeout(()=>{
            card1.classList.remove('card--active');
            card2.classList.remove('card--active');
            this.busy = false;
        },1000)
    }
}