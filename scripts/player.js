import ColliderBody from "./collider.js";
import { AnimatedSprite } from "./sprites.js";
import { normalizedVec, boxesCollide } from "./utils.js";

class Player extends ColliderBody {
    constructor(x, y, spritesheet, speed) {
        super(x, y, 36, 20);
        this.speed = speed;

        this.sprite = new AnimatedSprite(spritesheet);

        this.motion = [0, 0];
        this.collidedTile = null;
    }

    set x(val) {
        this.rect.x = val;
        this.sprite.x = val - (this.sprite.w - this.rect.w) / 2;
    }
    set y(val) {
        this.rect.y = val;
        this.sprite.y = val - (this.sprite.h - this.rect.h) / 2 - 16;
    }
    get x() { return this.rect.x; }
    get y() { return this.rect.y; }

    get w() { return this.sprite.w; }
    get h() { return this.sprite.h; }

    moveAndCollide() {
        this.motion[0] = window.keys.right - window.keys.left;
        this.motion[1] = window.keys.down - window.keys.up; // Not like Cartesian system

        this.motion = normalizedVec(this.motion) // No more faster diagonal movement


        this.x += this.motion[0] * this.speed;
        this.collidedTile = this.checkCollision()

        if (this.collidedTile) {
            if (this.motion[0] > 0) this.x = this.collidedTile.x - this.rect.w;
            if (this.motion[0] < 0) this.x = this.collidedTile.x + this.collidedTile.rect.w;
        }

        this.y += this.motion[1] * this.speed;
        this.collidedTile = this.checkCollision()

        if (this.collidedTile) {
            if (this.motion[1] > 0) this.y = this.collidedTile.y - this.rect.h;
            if (this.motion[1] < 0) this.y = this.collidedTile.y + this.collidedTile.rect.h;
        }
    }

    checkCollision() {
        for (const tile of window.tiles) {
            if (boxesCollide(this.rect, tile.rect)) {
                return tile
            }
        }
    }
}

export default Player;