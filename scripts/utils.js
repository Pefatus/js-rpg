import Camera from "./camera.js";

class Box {
    constructor(x, y, width, height, color = "red", borderSize = 0) {
        this.x = x, this.y = y;
        this.w = width, this.h = height;
        this.color = color;
        this.borderSize = borderSize;
    }

    render(context) {
        context.save()
        if (this.boderSize === 0) {
            context.fillStyle = this.color;
            context.fillRect(this.x - Camera.x, this.y - Camera.y, this.w, this.h);
        } else {
            context.strokeStyle = this.color;
            context.lineWidth = this.borderSize;
            context.strokeRect(this.x - Camera.x, this.y - Camera.y, this.w, this.h);
        }
        context.restore()
    }
}

const boxesCollide = (box1, box2) => {
    return (box1.x < (box2.x + box2.w) && (box1.x + box1.w) > box2.x) &&
        (box1.y < (box2.y + box2.h) && (box1.y + box1.h) > box2.y)
}

const normalizedVec = (vector) => {
    let magnitude = Math.hypot(...vector);
    if (magnitude !== 0) return vector.map((component) => component / magnitude);
    else return vector
}

export { Box, boxesCollide, normalizedVec };