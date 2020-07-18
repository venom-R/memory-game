import { v4 as uuid } from 'uuid';
import {RoundedRect} from "./RoundedRect";

export class Card extends RoundedRect {
    constructor(image, width, height) {
        super(5, width, height)
        this.margin = 20;
        this.image = image;
        this.color = "#ffde27";
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
        super.draw(ctx, this.x, this.y);
    }

    drawFront(ctx) {
        ctx.save();
        super.draw(ctx, this.x, this.y);
        ctx.clip();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    isIntersect(pointX, pointY) {
        const x = this.x + this.margin;
        const y = this.y + this.margin;
        return (pointX >= x && pointX <= x + this.width) && (pointY >= y && pointY <= y + this.height);
    }
}
