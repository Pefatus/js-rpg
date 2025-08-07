import ColliderBody from "./collider.js";
import Camera from "./camera.js";

class Tile extends ColliderBody {
    constructor(x, y, sprite) {
        if (!sprite.scale) sprite.scale = 1;
        super(x, y, sprite.width * sprite.scale, sprite.height * sprite.scale)
        this.rect.color = "blue";

        this.w = sprite.width * sprite.scale;
        this.h = sprite.height * sprite.scale;

        this.sprite = sprite;
    }

    render(context) {
        context.drawImage(this.sprite, this.x - Camera.x, this.y - Camera.y, this.w, this.h);
        if (window.debug) this.rect.render(context);
    }
}

export default Tile;