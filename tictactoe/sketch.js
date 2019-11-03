//Dependencies TicTacToe.js

let game;
function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);
  game = new TicTacToe();
  game.createButtons();
  game.createArray();
  createCanvas(400, 400);
  frameRate(20);
}
function draw() {
  background(200);
  // textSize(32);
  // text("Hello", 100, 100);
  game.show();
  game.pick();
}
// Functions
