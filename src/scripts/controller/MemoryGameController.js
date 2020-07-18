import {Helpers} from "../util/Helpers";
import {Card} from "../shapes/Card";
import {EVENTS} from "../constants/events";

export class MemoryGameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.postponed = false;
        this.initialize();
    }

    initialize() {
        this.initRandomCards();
        this.draw();
        this.addListeners();
    }

    initRandomCards() {
        const {images} = this.view.nodes;
        const shuffledImages = Helpers.shuffle(images).slice(0, this.model.maxCardsLength / 2);
        const originalCards = shuffledImages.map(image => new Card(image));
        const duplicateCards = originalCards.map(card => new Card(card.image));
        this.model.cards = Helpers.shuffle(originalCards.concat(duplicateCards));
    }

    addListeners() {
        this.view.on(EVENTS.CLICK_ON_STAGE, (x, y) => {
            this.model.cards.forEach(card => {
                if (card.isIntersect(x, y)) {
                    this.onCardClick(card);
                }
            });
        });
    }

    onCardClick(card) {
        if (card.isSelected || this.postponed) {
            return;
        }
        card.isSelected = true;
        if (this.model.selectedCard !== null) {
            // card selected
            if (card.key === this.model.selectedCard.key && card.id !== this.model.selectedCard.id) {
                // cards matched
                this.model.addMatchedCards(card, this.model.selectedCard);
                this.model.selectedCard = null;
            } else {
                // cards not matched
                this.postponed = true;
                setTimeout(() => {
                    if (this.model.selectedCard) {
                        this.model.selectedCard.isSelected = false;
                        this.model.selectedCard = null;
                    }
                    card.isSelected = false;
                    this.postponed = false;
                    this.update();
                }, this.model.nonMatchingCardTime);
            }
        } else {
            // any card not selected
            this.model.selectedCard = card;
        }
        this.update();
    }

    draw() {
        const {cards, rows, cols} = this.model;
        this.view.drawCards(cards, rows, cols);
    }

    update() {
        this.view.clear();
        this.draw();
    }
}
