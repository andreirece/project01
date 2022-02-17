const canvasGameElement = document.getElementById("canvasGame");
const ctx = canvasGameElement.getContext("2d");

const imgBackground = new Image();
imgBackground.src = "../Images/background.png";

const imgGround = new Image();
imgGround.src = "../Images/ground.png";

const imgBird = new Image();
imgBird.src = "../Images/bird.png";

const imgPipe = new Image();
imgPipe.src = "../Images/pipe.png";

imgBackground.onload = function (x) {
  ctx.drawImage(imgBackground, 0, 0, 480, 520);
};

const moveGround = {
  img: imgGround,
  x: 480,
  speed: 33,

  move: function () {
    this.x -= this.speed;
  },

  draw: function () {
    ctx.drawImage(this.img, this.x, 520);
  },
};

const movePipe = {
  img: imgPipe,
  x: 480,
  speed: 150,

  move: function () {
    this.x -= this.speed;
    // this.x %= canvasGameElement.width;
  },

  draw: function () {
    ctx.drawImage(this.img, this.x, 440);
  },
};

function updateCanvas() {
  moveGround.move();

  //   ctx.clearRect(480, 520, canvasGameElement.width, canvasGameElement.height);
  moveGround.draw();
  ctx.drawImage(imgBird, 100, 320, 172.5, 40);

  movePipe.move();
  movePipe.draw();
  requestAnimationFrame(updateCanvas);
}

imgGround.onload = updateCanvas;
