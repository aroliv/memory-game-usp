export default class Mix {
    constructor(){
        this.cards = [...document.querySelectorAll('.card')]
    }

    shuffleCards(){
        this.cards.forEach(card=>{
            let randIndex = Math.floor(Math.random() * this.cards.length);
            card.style.order = randIndex;
        })
    }
}