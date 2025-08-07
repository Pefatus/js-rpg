const Camera = {
    x: 0, y: 0,
    w: 0, h: 0,
    damping: 8,
    follow(obj) {
        this.x += Math.floor((obj.x - this.w / 2 + obj.w - this.x) / this.damping);
        this.y += Math.floor((obj.y - this.h / 2 + obj.h - this.y) / this.damping);
    }
}

export default Camera;