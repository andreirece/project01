const canvasGameElement = document.getElementById(
  "https://flappybird.io/img/score.png"
);
const ctx = canvasGameElement.getContext("2d");

const imgBackground = new Image();
imgBackground.src = "../Images/bird.png";

ctx.drawImage(imgBackground, 0, 0, 480, 640);
