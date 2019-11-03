//Dependencies Grit.js

class TicTacToe {
  constructor(wWidth = 400, wHeight = 400, tiles = [3, 3]) {
    this.wWidth = wWidth;
    this.wHeight = wHeight;
    this.tiles = tiles;
    this.field = [];
    this.index = [];
    this.players = ["X", "O"];
    this.currentPlayer = floor(random(this.players.length));
    this.num = 0;
    this.winField = [];
    this.gameMode = [0, 1];
    this.currentGameMode = 0;
    this.tWidth = this.wWidth / this.tiles[0];
    this.tHeight = this.wHeight / this.tiles[1];
  }
  createButtons() {
    let div = document.createElement("div");
    document.body.appendChild(div);
    for (let x = 0; x < this.gameMode.length; x++) {
      let button = document.createElement("button");
      button.style.width = "10em";
      button.style.height = "4em";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.innerHTML = x == 0 ? "Computer Vs. Computer" : "Player Vs. Player";
      button.setAttribute("value", x == 0 ? 0 : 1);
      button.addEventListener("click", this.changeGameMode.bind(this));
      div.appendChild(button);
    }
  }

  checkGameMode(value) {
    return this.currentGameMode == value;
  }
  gameModeComp() {
    let rIndex = random(this.index.length);
    let spot = this.index.splice(rIndex, 1);
    this.field[spot[0][0]][spot[0][1]] = this.players[this.currentPlayer];
    this.nextPlayer();
  }
  nextPlayer() {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  }
  gameModePlayer() {
    let insideRect =
      mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    if (mouseIsPressed && insideRect) {
      let indexX = floor(mouseX / this.tWidth);
      let indexY = floor(mouseY / this.tHeight);
      let indexField = this.index.findIndex(
        element => element[0] == indexY && element[1] == indexX
      );
      if (indexField !== -1) {
        this.index.splice(indexField, 1);
        this.field[indexY][indexX] = this.players[this.currentPlayer];
        this.nextPlayer();
      } else return;
    }
  }

  pick() {
    let winner = this.isWinner();
    if (winner == null && this.index.length > 0) {
      let gameMode1 = this.gameMode[0];
      let gameMode2 = this.gameMode[1];
      if (this.checkGameMode(gameMode1)) this.gameModeComp();
      if (this.checkGameMode(gameMode2)) this.gameModePlayer();
      return;
    } else {
      if (winner) {
        this.displayWinner(`Winner is "${winner}"`);
        this.victoryLine();
      } else if (this.index.length == 0) {
        this.displayWinner("a tie");
      }
    }
  }

  show() {
    noFill();
    strokeWeight(3);
    let lengthX = this.tiles[0];
    let lengthY = this.tiles[1];
    let w = this.tWidth;
    let h = this.tHeight;

    for (let y = 1; y < lengthY; y++) {
      line(y * w, 0, y * w, this.wHeight);
    }
    for (let x = 1; x < lengthX; x++) {
      line(0, h * x, this.wWidth, h * x);
    }
    for (let i = 0; i < lengthY; i++) {
      for (let j = 0; j < lengthX; j++) {
        let x = w * j + w / 2;
        let y = h * i + h / 2;
        let rx = w / 4;
        if (this.field[i][j] == "X") {
          line(x - rx, y - rx, x + rx, y + rx);
          line(x + rx, y - rx, x - rx, y + rx);
        } else if (this.field[i][j] == "O") {
          ellipse(x, y, h - rx);
        }
      }
    }
  }

  victoryLine() {
    let y1 = this.winField[0][0][0];
    let x1 = this.winField[0][0][1];
    let y2 = this.winField[0][2][0];
    let x2 = this.winField[0][2][1];
    let x = this.tWidth;
    let y = this.tHeight;
    let w = x / 2;
    let h = y / 2;
    strokeWeight(10);
    stroke(20, 200, 50, 150);
    line(x * x1 + w, y * y1 + h, x * x2 + w, y * y2 + h);
    stroke(0);
  }

  displayWinner(value = "") {
    let p = document.querySelector("p") || null;
    if (p == null) {
      return createP(value).style("font-size", "30");
    } else {
      p.innerHTML = value;
    }
  }

  createArray() {
    for (let y = 0; y < this.tiles[1]; y++) {
      let rows = [];
      for (let x = 0; x < this.tiles[0]; x++) {
        rows.push([]);
        this.pushIndex(y, x);
      }
      this.field.push(rows);
    }
  }

  pushIndex(y, x) {
    this.index.push([y, x]);
  }
  equals3(a, b, c) {
    return a == b && a == c;
  }

  isWinner() {
    let field = this.field;
    for (let y = 0; y < this.tiles[0]; y++) {
      if (this.equals3(field[y][0], field[y][1], field[y][2])) {
        this.winField.splice(0, 1, [[y, 0], [y, 1], [y, 2]]);
        return field[y][0];
      }
      if (this.equals3(field[0][y], field[1][y], field[2][y])) {
        this.winField.splice(0, 1, [[0, y], [1, y], [2, y]]);
        return field[0][y];
      }
    }
    if (this.equals3(field[0][0], field[1][1], field[2][2])) {
      this.winField.splice(0, 1, [[0, 0], [1, 1], [2, 2]]);
      return field[0][0];
    }
    if (this.equals3(field[0][2], field[1][1], field[2][0])) {
      this.winField.splice(0, 1, [[0, 2], [1, 1], [2, 0]]);
      return field[0][2];
    }
  }

  startLoop() {
    loop();
  }

  stopLoop() {
    noLoop();
  }

  reset() {
    this.field = [];
    this.index = [];
    this.winField = [];
  }

  changeGameMode({ target: { value } }) {
    this.reset();
    this.createArray();
    this.currentGameMode = value;
    this.startLoop();
  }
}
