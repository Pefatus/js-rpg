import Camera from "./camera.js";

class Surface {
    constructor(width, height) {
        this.canvas = new OffscreenCanvas(width, height);
        this.ctx = this.canvas.getContext("2d");

        this.x = 0, this.y = 0;
        this.z = 0;
    }

    render(context) {
        context.drawImage(this.canvas, this.x - Camera.x, this.y - Camera.y);
    }
}

class Sprite {
    constructor(img, scale = 1) {
        this.img = img;
        this.scale = scale;

        this.x = 0, this.y = 0;
        this.z = 0;

        this.w = img.width * scale;
        this.h = img.height * scale;
    }

    render(context) {
        context.drawImg(this.img, this.x - Camera.x, this.y - Camera.y, this.w, this.h);
    }
}

class Spritesheet extends Sprite {
    constructor(img, hframes, vframes, scale = 1) {
        super(img, scale)
        this.hframes = hframes;
        this.vframes = vframes;
    }
}

class AtlasSprite {
    constructor(spritesheet) {
        this.x = spritesheet.x, this.y = spritesheet.y;
        this.z = spritesheet.z;

        this.img = spritesheet.img;
        this.hframes = spritesheet.hframes;
        this.vframes = spritesheet.vframes;

        this.tileW = this.img.width / this.hframes;
        this.tileH = this.img.height / this.vframes;

        this.w = this.tileW * spritesheet.scale;
        this.h = this.tileH * spritesheet.scale;

        this.index = 0;
        this.queue = [];
    }
    get tileX() { return (this.index % this.hframes) }
    get tileY() { return (Math.floor(this.index / this.hframes)) }

    render(context) {
        context.drawImage(this.img,
            this.tileW * this.tileX, this.tileH * this.tileY, this.tileW, this.tileH,
            this.x - Camera.x, this.y - Camera.y, this.w, this.h);
    }
}

class AnimatedSprite extends AtlasSprite {
    constructor(spritesheet) {
        super(spritesheet);
        this.flip = false;
        this.tracks = { default: [0] };
        this.track = "default";
        this.frameDuration = 200
    }

    set track(newTrack) {
        if (newTrack != this._track) {
            this._track = newTrack;
            for (const id of this.queue) {
                clearInterval(id);
            }

            console.log("Now playing", this.track)
            let i = 0;
            this.index = this.tracks[this.track][i];
            const id = setInterval(() => {
                console.log(id)
                i += 1
                if (i >= this.tracks[this.track].length) i = 0;
                this.index = this.tracks[this.track][i];
            }, this.frameDuration)
            this.queue.push(id);
        }
    }
    get track() {
        return this._track;
    }

    render(context) {
        if (this.flip) {
            context.save();
            context.translate((this.x - Camera.x) * 2 + this.w, 0);
            context.scale(-1, 1);
        }
        super.render(context)
        if (this.flip) context.restore();
    }
}

export { Surface, Sprite, Spritesheet, AtlasSprite, AnimatedSprite };