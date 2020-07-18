import { v4 as uuid } from 'uuid';

export class Card {
    constructor(image) {
        this.width = 230;
        this.height = 168;
        this.margin = 20;
        this.image = image;
        this.key = image.dataset.key;
        this.isSelected = false;
        this.id = uuid();
    }

    draw(ctx, x, y) {
        this.x = x;
        this.y = y;
        if (this.isSelected) {
            this.drawFront(ctx);
        } else {
            this.drawBack(ctx);
        }
    }

    drawBack(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawFront(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isIntersect(pointX, pointY) {
        const x = this.x + this.margin;
        const y = this.y + this.margin;
        return (pointX >= x && pointX <= x + this.width) && (pointY >= y && pointY <= y + this.height);
    }
}
