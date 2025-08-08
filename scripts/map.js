import { Surface } from "./sprites.js";
import ColliderBody from "./collider.js";

// tileset should be of type 'Spritesheet'
async function getTilemapImgs(tilemapJSONpath, tile) {
    const mapRes = await fetch(tilemapJSONpath);
    const mapData = await mapRes.json();

    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;

    const layerImgs = []
    for (const layer of mapData.layers) {
        const layerImg = new Surface(layer.width * tileWidth, layer.height * tileHeight);

        let x = 0;
        let y = 0;
        for (const tileID of layer.data) {
            x++
            if (x >= layer.width) { y++; x = 0; }

            if (tileID !== 0) { // 0 is for void
                tile.index = tileID - 1; // First tile in tilemap starts from 1
                tile.x = x * tile.w;
                tile.y = y * tile.h;
                tile.render(layerImg.ctx);
                if (layer.name == "wall") {
                    window.tiles.push(new ColliderBody(tile.x, tile.y, tile.w, tile.h));
                }
            }
        }

        layerImg.z = layer.z;
        layerImgs.push(layerImg)
    }

    return layerImgs;
}

export { getTilemapImgs };