var stage = new Kinetic.Stage({
  container: 'container',
  width: 600,
  height: 400
});

var p1score = 0; //player 1 score
var p2score = 0; //player 2 score
var dx = (Math.random() + 0.7) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
var dy = (Math.random() + 0.5) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
var layer1 = new Kinetic.Layer();
var layer2 = new Kinetic.Layer();

var background1 = new Kinetic.Rect({
  x:0,
  y:0,
  width: 300,
  height: 400,
  fill: 'white'
});

var background2 = new Kinetic.Rect({
  x:300,
  y:0,
  width: 300,
  height: 400,
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
  points: [300, 0, 300, 400],
  stroke: 'black'
});

var player1 = new Kinetic.Rect({
  x: 10,
  y: 190,
  width: 10,
  height: 50,
  fill: 'black'
});

var player2 = new Kinetic.Rect({
  x: 580,
  y: 190,
  width: 10,
  height: 50,
  fill: 'black'
});

var ball = new Kinetic.Circle({
  x: 300,
  y: 200,
  radius: 10,
  fill: 'black'
});

background1.on('mousemove', function() {
  var mousePos = stage.getMousePosition();
  var x = mousePos.x;
  var y = mousePos.y;
  player1.setY(y);
  layer.draw();
});

background2.on('mousemove', function() {
  var mousePos = stage.getMousePosition();
  var x = mousePos.x;
  var y = mousePos.y;
  player2.setY(y);
  layer.draw();
});

function resetBall() {
  dx = 0;
  dy = 0;
  ball.setX(300);
  ball.setY(200);
  dx = (Math.random() + 0.7) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
  dy = (Math.random() + 0.5) * (Math.random() > 0.5 ? -1 : 1); // direction of ball's next move
}

function tick() {
  var x = ball.getX();
  var y = ball.getY();
  var x2 = x + dx;
  var y2 = y + dy;
  var offsetx = 0;
  var offsety = 0;

  //offset for ball edge collision
  //TODO: make -5 / +5 equal to radius / 2
  if(dx > 0) offsetx = 5;
  else offsetx = -5;
  if(dy > 0) offsety = 5;
  else offsety = -5;

  //paddles and back walls
  if(x2 + offsetx < 0) {
    //player 2 gets a point!
    p2score++;
    score2.getText().setText(p2score.toString());
    layer1.draw();
    resetBall();
  }
  else if(x2 + offsetx > 600) {
    //player 1 gets a point!
    p1score++;
    score1.getText().setText(p1score.toString());
    layer1.draw();
    resetBall();
  }
  else if(x2 + offsetx < 20 && x2 + offsetx > 15) {
    var p1y = player1.getY();
    if(y2 < p1y + 60 && y2 > p1y) {
      dx = dx * -1.1;
    }
  }
  else if(x2 + offsetx > 580 && x2 + offsetx < 585) {
    var p2y = player2.getY();
    if(y2 < p2y + 60 && y2 > p2y) {
      dx = dx * -1.1;
    }
  }

  // top and bottom of game walls
  if(y2 + offsety < 0) {
    dy = -dy;
  }
  else if(y2 + offsety > 400) {
    dy = -dy;
  }

  ball.move(dx, dy);
}

function updateBall() {
  setTimeout(function(){
    tick();
    updateBall();
    layer2.draw();
  }, 10);
}

layer1.add(background1).add(background2).add(score1).add(score2).add(centerLine);
layer2.add(player1).add(player2).add(ball);

stage.add(layer1);
stage.add(layer2);

updateBall();
