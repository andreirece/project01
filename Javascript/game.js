const gameArea = {
  canvasGameElement: document.getElementById("canvasGame"),
  frames: 0,
};
const ctx = gameArea.canvasGameElement.getContext("2d");

const imgBackground = new Image();
imgBackground.src = "../Images/background.png";

const imgBird = new Image();
imgBird.src = "../Images/bird_1.png";

const imgPipe = new Image();
imgPipe.src = "../Images/pipe.png";

const imgPipeTop = new Image();
imgPipeTop.src = "../Images/pipe_top.png";

let myObstacles = [];

let gravity = 0.1;
let total = 0;

class GameObject {
  constructor(x, y, width, height, img, img2, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.img2 = img2;
    this.speed = speed;
  }
  move() {
    this.x += this.speed;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img2, this.x, this.y - 980, this.width, this.height);
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y - 180;
  }
}

class PlayerComponent {
  constructor(x, y, width, height, img, vy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.vy = vy;
  }
  draw() {
    ctx.drawImage(imgBird, this.x, this.y, this.width, this.height);
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith = (newObs) => {
    if (
      this.right() >= newObs.left() &&
      this.left() <= newObs.right() &&
      (this.bottom() > newObs.top() || this.top() < newObs.bottom())
    ) {
      ctx.clearRect(
        0,
        0,
        gameArea.canvasGameElement.width,
        gameArea.canvasGameElement.height
      );
      document.location.reload(true);
      frames = 0;
    }
    if (this.left() > newObs.right()) {
      total = myObstacles.length - 1;
    }
  };
}

const player = new PlayerComponent(100, 320, 70, 47, imgBird, 4);

function interactionGravity() {
  player.draw();
  player.vy += gravity;
  player.y += player.vy;
  document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      gravity = -0.3;
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === " ") {
      gravity = 0.3;
    }
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

function writeTotal() {
  ctx.font = "50px Garamond";
  ctx.fillStyle = "black";
  ctx.fillText(`Total: ${total}`, 150, 100);
}

function newObstacle() {
  gameArea.frames++;
  if (gameArea.frames % 120 === 0) {
    const newObs = new GameObject(
      480,
      Math.random() * (570 - 300) + 300,
      100,
      800,
      imgPipe,
      imgPipeTop,
      -3
    );
    myObstacles.push(newObs);
  }
  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].move();
    myObstacles[i].draw();
  }
}

function checkGameOver() {
  myObstacles.forEach((newObs) => {
    player.crashWith(newObs);
  });
}

function updateCanvas() {
  ctx.clearRect(
    0,
    0,
    gameArea.canvasGameElement.width,
    gameArea.canvasGameElement.height
  );
  moveBackground.move();
  moveBackground.draw();
  writeTotal();

  interactionGravity();

  newObstacle();
  checkGameOver();

  requestAnimationFrame(updateCanvas);
}

function startCanvas() {
  moveBackground.draw();
  player.draw();
  ctx.font = "30px Garamond";
  ctx.fillStyle = "black";
  ctx.fillText(`Press ENTER to Start Game`, 70, 100);
  ctx.fillText(`Press SPACEBAR for the bird to fly`, 35, 150);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      updateCanvas();
    }
  });
}

window.onload = () => {
  startCanvas();
};
