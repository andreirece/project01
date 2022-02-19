const gameArea = {
  canvasGameElement: document.getElementById("canvasGame"),
  frame: 0,
};
const ctx = gameArea.canvasGameElement.getContext("2d");

const imgBackground = new Image();
imgBackground.src = "../Images/background.png";

const imgGround = new Image();
imgGround.src = "../Images/ground.png";

const imgBird = new Image();
imgBird.src = "../Images/bird.png";

const imgPipe = new Image();
imgPipe.src = "../Images/pipe.png";
const imgPipeTop = new Image();
imgPipeTop.src = "../Images/pipe_top.png";

let gravity = 0.1;

const player = {
  x: 100,
  y: 320,
  vy: 4,
  draw: function () {
    ctx.beginPath();
    ctx.drawImage(imgBird, this.x, this.y, 172.5, 40);
    // fazer três imagens para aparecerem em sequencia, para dar efeito de asas batendo
    ctx.closePath();
  },
};

function interationGravity() {
  player.draw();
  player.vy += gravity;
  player.y += player.vy;
  document.addEventListener("keydown", (spacebar) => {
    gravity = -0.5;
  });
  document.addEventListener("keyup", (spacebar) => {
    gravity = 0.5;
  });
}

const moveBackground = {
  img: imgBackground,
  x: 0,
  speed: -1,

  move: function () {
    this.x += this.speed;
    this.x %= gameArea.canvasGameElement.width;
  },

  draw: function () {
    ctx.drawImage(this.img, this.x, 0, 480, 640);
    if (this.speed < 0) {
      ctx.drawImage(
        this.img,
        this.x + gameArea.canvasGameElement.width,
        0,
        480,
        640
      );
      return;
    }
  },
};

const movePipe = {
  img: imgPipe,
  img2: imgPipeTop,
  x: 480,
  y: Math.random() * (570 - 300) + 300,
  speed: 5,

  move: function () {
    this.x -= this.speed;
  },
  draw: function () {
    ctx.drawImage(this.img, this.x, this.y);
    ctx.drawImage(this.img2, this.x, this.y - 980);
  },
};

function newObstacle () {
  gameArea.frame = +1;
  if (gameArea.frame % 120 === 0) {
    movePipe.move();
    movePipe.draw();
  }
}

function updateCanvas() {
  moveBackground.move();

  ctx.clearRect(
    0,
    0,
    gameArea.canvasGameElement.width,
    gameArea.canvasGameElement.height
  );
  moveBackground.draw();

  interationGravity();

  movePipe.move();
  movePipe.draw();
  newObstacle ()
  requestAnimationFrame(updateCanvas);
}
updateCanvas ();
