import {Emitter} from "../util/Emitter";
import {EVENTS} from "../constants/events";

export class MemoryGameView extends Emitter {
    constructor() {
        super();
        this.nodes = {
            canvas: document.getElementById("stage"),
            images: Array.from(document.querySelectorAll("#images img")),
        };
        this.initialize();
        this.drawInitState();
    }

    initialize() {
        const {canvas} = this.nodes;
        if (canvas && canvas.getContext) {
            this.ctx = canvas.getContext("2d");
            this.addEventListeners();
        } else {
            throw new Error("Canvas API does not support");
        }
    }

    addEventListeners() {
        this.nodes.canvas.addEventListener("click", event => {
            const pointX = event.clientX - this.nodes.canvas.offsetLeft;
            const pointY = event.clientY - this.nodes.canvas.offsetTop;
            this.emit(EVENTS.CLICK_ON_STAGE, pointX, pointY);
        });
    }

    drawInitState() {
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 6;
        this.ctx.save();
    }

    drawCards(cards, rows, cols) {
        let index = 0;
        this.ctx.save();
        this.ctx.translate(20, 20);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const card = cards[index++];
                const x = j * (card.width + card.margin);
                const y = i * (card.height + card.margin);
                card.draw(this.ctx, x, y);
            }
        }
        this.ctx.restore();
    }

    clear() {
        const {height, width} = this.nodes.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

}
