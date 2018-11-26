var parts = [];
var triangles = [];
var NB_PARTS;
var NB_TRIANGLES;
var DIST_MAX;
var DIST_MIN;
var SPEED_MAX;
var attractor;

function setup() {
  // put setup code here
  createCanvas(800,400);
  DIST_MAX = width / 2;
  DIST_MIN = width/4;
  SPEED_MAX = 3;
  NB_PARTS = 10;
  for (var i = 0; i < NB_PARTS; i++) {
    parts[i] = new part(random(width), random(height));
  }

}

 function draw() {
  noStroke();
  background(255);
  triangles = [];
  for (var h = 0; h < NB_PARTS; h++) {

    parts[h].move();
  }

  // put drawing code here
  for (var i = 0; i < NB_PARTS; i++) {
    p1 = parts[i];
    p1.neighboors = [];
    p1.neighboors.push(p1);
    for (var j = i + 1; j < NB_PARTS; j++) {
      p2 = parts[j];
      d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      
      if (d > 0 && d < DIST_MAX) {
        p1.neighboors.push(p2);
      }
      if (d<DIST_MIN){
        var froce = p5.Vector.sub(p2.pos, p1.pos);
        var dsquared = froce.magSq();
        dsquared = constrain(dsquared,25,500);
        var G = 7;
        var strength = G / dsquared;
        froce.setMag(strength);
        // froce.mult(-1);
        p1.acc.add(froce);
      }
      if (p1.neighboors.length > 2) {
        addTriangles(p1.neighboors);
      }
    }
  }
  drawTriangles();
}


function mousePressed() {
  for (var i = 0; i < parts.length; i++) {
    attractor = createVector(mouseX,mouseY);
    parts[i].attracted(attractor);
       // console.log(parts[i].acc);
  }
}

function drawTriangles() {
  noStroke();
  fill('rgba(0,121,230, 0.05)');
  stroke('rgba(0,121,230, 0.01)');
  
  beginShape(TRIANGLES);
  for (i = 0; i < triangles.length; i++) {
    triangles[i].display();
  }
  endShape();
}

function addTriangles(p_neighboors) {
  s = p_neighboors.length;
  if (s > 2) {
    for (var i = 1; i < s - 1; i++) {
      for (var j = i + 1; j < s; j++) {
        triangles.push(new Triangle(p_neighboors[0].pos, p_neighboors[i].pos, p_neighboors[j].pos));
      }
    }
  }
}

function Triangle(p1, p2, p3) {
  
  this.display = function() {
    vertex(p1.x, p1.y);
    vertex(p2.x, p2.y);
    vertex(p3.x, p3.y);
  };
  return this;
}

function part(x, y) {
  this.neighboors = [];
  this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.limit(SPEED_MAX);
  this.acc = createVector(0, 0);


  this.display = function() {
    noFill();
    stroke(4, 4);
    ellipse(this.pos.x, this.pos.y, 4, 4);
  };

  this.move = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 1;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -1;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 1;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -1;
    }
  };

  this.attracted = function(target) {
    var froce = p5.Vector.sub(target, this.pos);
    var dsquared = froce.magSq();
    dsquared = constrain(dsquared,25,500);
    var G = 5;
    var strength = G / dsquared;
    froce.setMag(strength);
    this.acc.add(froce);
  };

  return this;

}
