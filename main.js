const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const vikingScore = document.querySelector('#viking');
const marioScore = document.querySelector('#mario');

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.direction = 'down';
  }
  moveUp() {
    return (this.row -= 50);
  }
  moveRight() {
    return (this.col += 50);
  }
  moveDown() {
    return (this.row += 50);
  }
  moveLeft() {
    return (this.col -= 50);
  }
}

class Treasure {
  constructor() {
    this.col = 0;
    this.row = 0;
    this.setRandomPosition();
  }
  setRandomPosition() {
    let randomNum = Math.floor(Math.random() * 10);
    this.col = 50 * randomNum;
    this.row = 50 * randomNum;
  }
}

const tres = new Treasure();
const player = new Character(0, 0);
const player2 = new Character(50, 50);

// Iteration 1
function drawGrid() {
  for (let column = 0; column < 11; column++) {
    context.beginPath();
    context.moveTo(column * 50, 0);
    context.lineTo(column * 50, height);
    context.stroke();
    context.closePath;
  }

  for (let row = 0; row < 11; row++) {
    context.beginPath();
    context.moveTo(0, row * 50);
    context.lineTo(width, row * 50);
    context.stroke();
    context.closePath;
  }
}

function drawPlayer() {
  const viking = new Image();
  if (player.direction === 'down') {
    viking.src = 'character-down.png';
  } else if (player.direction === 'up') {
    viking.src = '/images/character-up.png';
  } else if (player.direction === 'right') {
    viking.src = '/images/character-right.png';
  } else if (player.direction === 'left') {
    viking.src = '/images/character-left.png';
  }

  viking.addEventListener('load', () => {
    context.drawImage(viking, player.col, player.row);
  });

  const mario = new Image();
  mario.src = '/images/mario.png';

  mario.addEventListener('load', () => {
    context.drawImage(mario, player2.col, player2.row, 50, 50);
  });
}

function drawTreasure() {
  const treasure = new Image();
  treasure.src = '/images/treasure.png';
  treasure.addEventListener('load', () => {
    context.drawImage(treasure, tres.col, tres.row, 50, 50);
  });
}

function drawEverything() {
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();

window.addEventListener('keydown', event => {
  event.preventDefault();

  switch (event.keyCode) {
    case 37:
      console.log('left');
      if (player.col > 0) {
        player.moveLeft();
      }
      player.direction = 'left';
      break;
    case 38:
      if (player.row > 0) {
        console.log('up');
        player.moveUp();
      }
      player.direction = 'up';

      break;
    case 39:
      if (player.col < 450) {
        player.moveRight();
      }
      console.log('right');
      player.direction = 'right';

      break;
    case 40:
      if (player.row < 450) {
        console.log('down');
        player.moveDown();
      }
      player.direction = 'down';

      break;
  }
  if (player.col === tres.col && player.row === tres.row) {
    vikingScore.innerText++;

    context.clearRect(0, 0, width, height);
    tres.setRandomPosition();
    drawEverything();
  }

  //player 2
  switch (event.keyCode) {
    case 65:
      console.log('left');
      if (player2.col > 0) {
        player2.moveLeft();
      }
      player2.direction = 'left';
      break;
    case 87:
      if (player2.row > 0) {
        console.log('up');
        player2.moveUp();
      }
      player2.direction = 'up';

      break;
    case 69:
      if (player2.col < 450) {
        player2.moveRight();
      }
      console.log('right');
      player2.direction = 'right';

      break;
    case 83:
      if (player2.row < 450) {
        console.log('down');
        player2.moveDown();
      }
      player2.direction = 'down';

      break;
  }
  if (player2.col === tres.col && player2.row === tres.row) {
    marioScore.innerText++;

    context.clearRect(0, 0, width, height);
    tres.setRandomPosition();
    drawEverything();
  }

  context.clearRect(0, 0, width, height);
  drawEverything();
});
