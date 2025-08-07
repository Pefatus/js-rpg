import AnimatedBody from "./animator.js";
import { normalizedVec, boxesCollide } from "./utils.js";

class Player extends AnimatedBody {
    constructor(x, y, spritesheet, speed) {
        super(x, y, spritesheet);
        this.speed = speed;

        this.motion = [0, 0];
        this.collidedTile = null;
    }

    moveAndCollide() {
        this.motion[0] = window.keys.right - window.keys.left;
        this.motion[1] = window.keys.down - window.keys.up; // Not like Cartesian system

        this.motion = normalizedVec(this.motion) // No more faster diagonal movement

        if (window.keys.up) { this.anim = "walkUp" }
        else if (window.keys.down) { this.anim = "walkDown" }
        else if (window.keys.right) {
            this.flip = false;
            this.anim = "walkRight";
        } else if (window.keys.left) {
            this.flip = true;
            this.anim = "walkRight";
        } else {
            if (this.anim == "walkRight") this.anim = "faceRight";
            if (this.anim == "walkUp") this.anim = "faceUp";
            if (this.anim == "walkDown") this.anim = "faceDown";
        }

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