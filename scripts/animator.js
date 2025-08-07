import ColliderBody from "./collider.js";
import Camera from './camera.js';

class AnimatedBody extends ColliderBody {
    constructor(x, y, spritesheet) {
        const width = spritesheet.img.width / spritesheet.hframes;
        const height = spritesheet.img.height / spritesheet.vframes;
        const scale = spritesheet.scale;

        super(x, y, width * scale, height * scale);

        this.sprite = spritesheet.img;
        this.hframes = spritesheet.hframes;
        this.vframes = spritesheet.vframes;

        this.w = width, this.h = height;
        this.scale = spritesheet.scale;

        this.frame = 0; // Current frame
        this.flip = false

        this.anims = {
            idle: [0],
            walkDown: [3, 0, 6, 0],
            walkRight: [4, 1, 7, 1],
            walkUp: [5, 2, 8, 2],
            faceDown: [0], faceUp: [2], faceRight: [1],
        };
        this.anim = "walkRight"
        this.i = 0;

        this.last = Date.now();
        this.frameDuration = 200 //ms
    }

    set anim(newAnim) {
        if (newAnim != this._anim) {
            this._anim = newAnim
            this.i = 0;
            this.last = Date.now()
        } else {
            if (Date.now() - this.last >= this.frameDuration) {
                this.i++;
                this.last = Date.now()
            }
            if (this.i >= this.anims[this.anim].length) this.i = 0;
        }
    }

    get anim() {
        return this._anim
    }

    render(context) {
        this.frame = this.anims[this.anim][this.i];

        let frameX = this.frame % this.hframes;
        let frameY = Math.floor(this.frame / this.vframes);

        if (this.flip) {
            context.save();
            context.translate((this.x - Camera.x) * 2 + this.w * this.scale, 0);
            context.scale(-1, 1);
        }

        context.drawImage(this.sprite,
            this.w * frameX, this.h * frameY, this.w, this.h,
            this.x - Camera.x, this.y - Camera.y,
            this.w * this.scale, this.h * this.scale);

        if (this.flip) context.restore();

        if (window.debug) this.rect.render(context);
    }
}

export default AnimatedBody;


// const now = Date.now();
// if (now - lastTime >= 200) {
//     animate()
//     lastTime = now;