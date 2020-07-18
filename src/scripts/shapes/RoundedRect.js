export class RoundedRect {
    constructor(radius, width, height) {
        this.radius = radius;
        this.width = width;
        this.height = height;
        this.color = "black";
    }

    draw(ctx, x, y) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + this.radius, y);
        ctx.lineTo(x + this.width - this.radius, y);
        ctx.quadraticCurveTo(x + this.width, y, x + this.width, y + this.radius);
        ctx.lineTo(x + this.width, y + this.height - this.radius);
        ctx.quadraticCurveTo(x + this.width, y + this.height, x + this.width - this.radius, y + this.height);
        ctx.lineTo(x + this.radius, y + this.height);
        ctx.quadraticCurveTo(x, y + this.height, x, y + this.height - this.radius);
        ctx.lineTo(x, y + this.radius);
        ctx.quadraticCurveTo(x, y, x + this.radius, y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}
