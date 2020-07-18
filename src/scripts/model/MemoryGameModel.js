export class MemoryGameModel {
    constructor() {
        this.nonMatchingCardTime = 1000;
        this.cards = [];
        this.matchedCards = [];
        this.selectedCard = null;
        this.maxCardsLength = 16;
        this.rows = 4;
        this.cols = 4;
    }

    addMatchedCards(...args) {
        this.matchedCards.push(...args);
    }
}

