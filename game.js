// Board
let board;
let boardwidth = 360;
let boardHeight = 640;
let context;

// Bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardwidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

// Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardwidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics
let velocityX = -2;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardwidth;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "images/bird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeImg = new Image();
  topPipeImg.src = "images/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "images/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  // Draw bird
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  // Draw pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  }
}

function placePipes() {
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let gap = 150;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + gap,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipe);
  pipeArray.push(bottomPipe);
}
