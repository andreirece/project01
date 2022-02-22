const gameArea = {
  canvasGameElement: document.getElementById("canvasGame"),
  frames: 0,
};
const ctx = gameArea.canvasGameElement.getContext("2d");

const imgBackground = new Image();
imgBackground.src = "../Images/background.png";

const imgGround = new Image();
imgGround.src = "../Images/ground.png"; // Por hora não foi usado

const imgBird0 = new Image();
imgBird0.src = "../Images/bird_0.png";
const imgBird1 = new Image();
imgBird1.src = "../Images/bird_1.png";
const imgBird2 = new Image();
imgBird2.src = "../Images/bird_2.png";

const imgPipe = new Image();
imgPipe.src = "../Images/pipe.png";
const imgPipeTop = new Image();
imgPipeTop.src = "../Images/pipe_top.png";

const myObstacles = [];

let gravity = 0.1;

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
  }

  draw1() {
    ctx.drawImage(this.img2, this.x, this.y - 980, this.width, this.height);
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
    ctx.drawImage(imgBird1, this.x, this.y, this.width, this.height);
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
      !(
        this.bottom() < newObs.top() ||
        this.top() > newObs.bottom() ||
        this.right() < newObs.left() ||
        this.left() > newObs.right()
      )
    ) {
      console.log("bateu");
    }
  };
}

const player = new PlayerComponent(100, 320, 70, 47, imgBird1, 4);

function interactionGravity() {
  player.draw();
  player.vy += gravity;
  player.y += player.vy;
  document.addEventListener("keydown", (spacebar) => {
    gravity = -0.3;
  });
  document.addEventListener("keyup", (spacebar) => {
    gravity = 0.3;
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

let newObs = {}
function newObstacle() {
  gameArea.frames++;
  if (gameArea.frames % 120 === 0) {
    newObs = new GameObject(
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
    myObstacles[i].draw1();
  }
}
function checkGameOver() {
  

  myObstacles.forEach((newObs) => {
    console.log(player.crashWith(newObs));
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

  interactionGravity();

  newObstacle();
  checkGameOver();

  requestAnimationFrame(updateCanvas);
}
updateCanvas();
