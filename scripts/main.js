import loadSprites from './loader.js';
import { Spritesheet, AtlasSprite } from './sprites.js';
import Player from './player.js';
import { getTilemapImgs } from './map.js';
import Camera from './camera.js';
import './input.js'

window.debug = true;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // No blurry pixel art after scalling.. yay

const sprites = await loadSprites();

// const player = new Player(400, 200, new Spritesheet(sprites.guy, 3, 3, 3));
// player.speed = 4;

Camera.w = canvas.width, Camera.h = canvas.height;

window.tiles = []

const tilesheet = new Spritesheet(sprites.tiles, 17, 5, 0.5)
const mapLayers = await getTilemapImgs("./data/test.json", new AtlasSprite(tilesheet))

const player = new Player(200, 300, new Spritesheet(sprites.guy, 3, 3, 3), 4)
player.sprite.tracks = {
    default: [0],
    walkDown: [3, 0, 6, 0],
    walkRight: [4, 1, 7, 1],
    walkUp: [5, 2, 8, 2],
    faceDown: [0], faceUp: [2], faceRight: [1],
};

const renderQueue = []
renderQueue.push(...mapLayers, player.sprite)
renderQueue.sort((a, b) => a.z - b.z)

function update() {
    player.moveAndCollide();
    Camera.follow(player);

    if (window.keys.down) {
        player.sprite.track = "walkDown"
    } else if (window.keys.up) {
        player.sprite.track = "walkUp"
    } else if (window.keys.right) {
        player.sprite.track = "walkRight"
        player.sprite.flip = false
    } else if (window.keys.left) {
        player.sprite.track = "walkRight"
        player.sprite.flip = true
    } else {
        if (player.sprite.track == "walkDown") { player.sprite.track = "faceDown"; }
        if (player.sprite.track == "walkUp") { player.sprite.track = "faceUp"; }
        if (player.sprite.track == "walkRight") { player.sprite.track = "faceRight"; }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderQueue.forEach((x) => x.render(ctx));
}

function gameLoop() {
    update()
    draw()

    requestAnimationFrame(gameLoop);
}

gameLoop()