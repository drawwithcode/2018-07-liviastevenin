var mic;
var flame;
var cake;
var arms;
var myArms;
var larm;
var rarm;
var myFlame;
var cam;
var light = 0;
var confete;
var happy;
var birthday;
var back;


function preload() {
  // put preload code here
  cake = loadImage('./assets/cake.png');
  arms = loadImage('./assets/arms.png');
  rarm = loadImage('./assets/rarm.png');
  larm = loadImage('./assets/larm.png');
  flame = loadImage('./assets/flame.png');
  confete = loadImage('./assets/confete.png');
  happy = loadImage('./assets/happy.png');
  birthday = loadImage('./assets/birth.png');

}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  myArms = new Arms(width / 2, height / 2);
  myFlame = new Flame(width / 2 + 5, height / 2 - 190, 50, 80);
  cam = createCapture(VIDEO);
  cam.size(200, 200);
  cam.hide();
  x = width / 2;
  y = height;
  back = loadImage('./assets/back.png');
}

function draw() {
  // put drawing code here
  from = color('#00cc99');
  to = color('#dab3ff');
  col = lerpColor(from, to, .80);
  background(col);
  var number = 150;
  for (var i = 0; i < number; i++) {
    fill(255, 30);
    ellipse(random(0, width), random(0, height), random(5, 50));
  }

  var vol = mic.getLevel();
  console.log(vol);
  imageMode(CENTER);
  image(happy, width / 2, height / 2 - 170, happy.width / 7, happy.height / 7);
  image(cake, width / 2, height / 2, 500, 500);
  image(birthday, width / 2, height / 2 + 280, birthday.width / 5, birthday.height / 5);


  myArms.display();
  myArms.move();
  myFlame.display();
  myFlame.move();


  // textSize(50);
  textFont('Georgia');
  // var s = 'Happy Birthday to you!';
  fill(0);
  // text(s, 50, 50, 400, 250);

  textSize(25);
  text('Blow the candle!', 50, height / 2 + 250, 250, 250);

  if (vol > 0.2) {
    myFlame.blow();
    light = 1;
  }

  if (light == 1) {
    imageMode(CENTER);
    var myImage = cam.loadPixels();
    var me = cam.get();
    image(cam, width / 2 + 500, 200, 200, 200);
    image(confete, x, y, confete.width, confete.height);
    x = x + random(-1, 1);
    // Moving up at a constant speed
    y = y + 5;
  }

}

function Flame(_x, _y, _w, _h) {
  this.w = _w;
  this.h = _h
  this.x = _x;
  this.y = _y;
  //this.name = _name;
  this.speed = 2;


  // Methods
  this.display = function() {
    noStroke();
    fill('#ff6600');
    image(flame, this.x, this.y, this.w, this.h);

  }

  this.move = function() {
    this.x = this.x + random(-0.1, 0.1);
    //this.y = this.y + random(-1, 1);
  }


  this.blow = function() {
    this.display = function() {
      fill(0, 0, 0, 0)
      // image(this.img, this.x, this.y, 300, 500);

    }
  }

}

function Arms(_x, _y) {
  this.x = _x;
  this.y = _y;

  var rot = -1;

  this.display = function() {
    imageMode(CENTER);
    image(arms, this.x, this.y, 500, 500);
  }

  this.move = function() {
    // this.x = this.x + random(-0.1, 0.1);
    this.y = this.y + random(-0.8, 0.8);
  }

}
