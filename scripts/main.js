import loadSprites from './loader.js';
import { Spritesheet } from './utils.js';
import Player from './player.js';
import Tile from './tile.js';
import Camera from './camera.js';
import './input.js'

window.debug = true;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // No blurry pixel art after scalling.. yay

const sprites = await loadSprites();

const player = new Player(264, 440, new Spritesheet(sprites.guy, 3, 3, 3));
player.speed = 4;

Camera.w = canvas.width, Camera.h = canvas.height;

window.tiles = []

sprites.block.scale = 0.5;
const b1 = new Tile(320, 512, sprites.block);
const b2 = new Tile(340, 600, sprites.block);
const b3 = new Tile(360, 650, sprites.block);

window.tiles.push(b1, b2, b3);

function update() {
    player.moveAndCollide();
    Camera.follow(player);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(sprites.maze, - Camera.x, - Camera.y, 3200, 1216);
    player.render(ctx);
    b1.render(ctx);
    b2.render(ctx);
    b3.render(ctx);
}

function gameLoop() {
    update()
    draw()

    requestAnimationFrame(gameLoop);
}

gameLoop()

// trash code
document.getElementById("btn1").addEventListener("click", () => {
    if (player.sprite == sprites.guy) player.sprite = sprites.gal;
    else if (player.sprite == sprites.gal) player.sprite = sprites.guy;
});
document.getElementById("btn2").addEventListener("click", () => player.speed++);
document.getElementById("btn3").addEventListener("click", () => player.speed--);