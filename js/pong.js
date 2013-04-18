var p1score = 0; //player 1 score
var p2score = 0; //player 2 score
var dx = (Math.random() + 1.7) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
var dy = (Math.random() + 1.5) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
var layer1 = new Kinetic.Layer();
var layer2 = new Kinetic.Layer();
var w = 600;
var h = 400;
var half_w = w/2;
var half_h = h/2;

var stage = new Kinetic.Stage({
  container: 'container',
  width: w,
  height: h
});

var background1 = new Kinetic.Rect({
  x: 0,
  y: 0,
  width: half_w,
  height: h,
  fill: 'white'
});

var background2 = new Kinetic.Rect({
  x: half_w,
  y: 0,
  width: half_w,
  height: h,
  fill: 'white'
});

var score1 = new Kinetic.Label({
  text: {
    text: p1score.toString(),
    fill: 'black',
    fontSize: 30
  },
  x: 130,
  y: 10,
  height: 50,
  width: 50
});

var score2 = new Kinetic.Label({
  text: {
    text: p2score.toString(),
    fill: 'black',
    fontSize: 30
  },
  x: 450,
  y: 10,
  height: 50,
  width: 50
});

var centerLine = new Kinetic.Line({
  points: [half_w, 0, half_w, h],
  stroke: 'black'
});

var player1 = new Kinetic.Rect({
  x: 10,
  y: half_h,
  width: 10,
  height: 50,
  fill: 'black',
  offset : {
    x: 5,
    y: 25
  }
});

var player2 = new Kinetic.Rect({
  x: 580,
  y: half_h,
  width: 10,
  height: 50,
  fill: 'black',
  offset : {
    x: 5,
    y: 25
  }
});

var ball = new Kinetic.Circle({
  x: half_w,
  y: half_h,
  radius: 10,
  fill: 'black',
  offset : {
    x : 5,
    y : 5
  }
});

background1.on('mousemove', function() {
  player1.setY(stage.getMousePosition().y);
  layer2.draw();
});

background2.on('mousemove', function() {
  player2.setY(stage.getMousePosition().y);
  layer2.draw();
});

function resetBall() {
  ball.setX(half_w);
  ball.setY(half_h);
  dx = (Math.random() + 1.7) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
  dy = (Math.random() + 1.5) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
}

function tick() {
  //calc new x and y (x2 and y2)
  var x2 = ball.getX() + dx;
  var y2 = ball.getY() + dy;

  //paddles and back walls
  if(x2 < 0) {
    //player 2 gets a point!
    p2score++;
    score2.getText().setText(p2score.toString());
    layer1.draw();
    resetBall();
  }
  else if(x2 > w) {
    //player 1 gets a point!
    p1score++;
    score1.getText().setText(p1score.toString());
    layer1.draw();
    resetBall();
  }
  else if(x2 < 25 && x2 > 20) {
    var p1y = player1.getY();
    if(y2 > p1y - 25 && y2 < p1y + 25) {
      dx = dx * -1.1;
    }
  }
  else if(x2 > (w - 25) && x2 < (w - 20)) {
    var p2y = player2.getY();
    if(y2 > p2y - 25 && y2 < p2y + 25) {
      dx = dx * -1.1;
    }
  }

  // top and bottom of game walls
  if(y2 < 0) {
    dy = -dy;
  }
  else if(y2 > h) {
    dy = -dy;
  }

  ball.move(dx, dy);
  layer2.draw();
}

function updateBall() {
  setTimeout(function(){
    tick();
    updateBall();
  }, 20);
}

layer1.add(background1).add(background2).add(score1).add(score2).add(centerLine);
layer2.add(player1).add(player2).add(ball);

stage.add(layer1);
stage.add(layer2);

updateBall();
