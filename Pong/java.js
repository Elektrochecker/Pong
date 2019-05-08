//Pong in Javascript
//von Timon Lilje

var sLength = 50;
var sWidth = 5;
var scoreL = 0;
var scoreR = 0;
var auto = 0;
var autoR = 0;
var canvasWidth = 800;
var ball = {
  posX: 0,
  posY: 0,
  size: 12,
  dir: "L",
  ang: 0,
  vel: 3,
  col: [255],
}
var sl = {
  posX: 5,
  posY: 1,
  vel: 4,
}
var sr = {
  posX: 5 + sWidth,
  posY: 1,
  vel: 4,
}

function setup() {
  if (windowWidth < canvasWidth) {
    canvasWidth = windowWidth-20;
  }
  createCanvas(canvasWidth, 500);
  //createCanvas(windowWidth-20, windowHeight-100);
  sl.posY = height / 2 - sLength / 2;
  sr.posX = width - sr.posX;
  sr.posY = height / 2 - sLength / 2;
  ball.posY = height / 2;
  ball.posX = width / 2;
}

function draw() {
  background(50);
  noStroke();

  move();
  score();
  render();
  //console.log(collide());
  //console.log("R" + scoreR + " L" + scoreL)
}

function render() {
  textSize(20);
  fill(ball.col);
  rect(ball.posX, ball.posY, ball.size, ball.size, 10);

  fill(0, 0, 255);
  rect(sl.posX, sl.posY, sWidth, sLength);
  text(scoreL, 20 + 5, 25);

  fill(255, 0, 0);
  rect(sr.posX, sr.posY, sWidth, sLength);
  text(scoreR, width - 28 - 5, 25);
}

function collide() {
  if (ball.posY+ball.size > sl.posY && ball.posY < sl.posY+sLength) {
    if (ball.posX < sl.posX+sWidth && ball.posX > sl.posX) {
      return "left";
    }
  }

  if (ball.posY+ball.size > sr.posY && ball.posY < sr.posY+sLength) {
    if (ball.posX+ball.size < sr.posX+sWidth && ball.posX+ball.size > sr.posX) {
      return "right";
    }
  }
  return false;
}

function move() {
  switch(ball.dir){
    case "L":
      ball.posX -= ball.vel;
      break;
    case "R":
      ball.posX += ball.vel;
      break;
  }

  if (collide() == "left") {
    ball.ang = Math.random() * 2 - 1;
    ball.dir = "R";
    ball.col = [0, 0, 255];
    //ball.vel += 0.2;
  } else if (collide() == "right") {
    ball.ang = Math.random() * 2 - 1;
    ball.dir = "L";
    ball.col = [255, 0, 0];
    //ball.vel += 0.2;
  }

  if (ball.posY <= 0) {
    ball.ang = 1;
  }
  if (ball.posY+ball.size >= height) {
    ball.ang = -1;
  }


  ball.posY += ball.ang;

  switch(auto) {
    case 0:
    if (keyIsDown(87)) {
      sl.posY -= sl.vel;
    } else if (keyIsDown(83)) {
      sl.posY += sl.vel;
    }
    break;
    case 1:
    sl.posY = ball.posY - sLength/2;
  }
  switch(autoR) {
    case 0:
    if (keyIsDown(UP_ARROW)) {
    	sr.posY -= sr.vel;
    } else if (keyIsDown(DOWN_ARROW)) {
    	sr.posY += sr.vel;
    }
    break;
    case 1:
    sr.posY = ball.posY - sLength/2;
  }

}

function score() {
  if (ball.posX < 0) {
    scoreR++;
    ball.posX = width/2;
    ball.posY = height/2;
    ball.col = [255];
    ball.ang = Math.random() * 2 - 1;
    //ball.vel = 2;
  }
  if (ball.posX+ball.size > width) {
    scoreL++;
    ball.posX = width/2;
    ball.posY = height/2;
    ball.col = [255];
    ball.ang = Math.random() * 2 - 1;
    //ball.vel = 2;
  }
}

function keyPressed() {
  if (keyCode === 90) {
    if (auto == 1) {
      auto = 0;
    }else{
      auto = 1;
    }
  }
  if (keyCode === 85) {
    if (autoR == 1) {
      autoR = 0;
    }else{
      autoR = 1;
    }
  }
}
