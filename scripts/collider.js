import { Box } from './utils.js';

class ColliderBody {
    constructor(x, y, width, height) {
        this.rect = new Box(x, y, width, height, "red", 1);
    }

    get x() { return this.rect.x; }
    set x(val) { this.rect.x = val; }
    get y() { return this.rect.y; }
    set y(val) { this.rect.y = val; }
}

export default ColliderBody;