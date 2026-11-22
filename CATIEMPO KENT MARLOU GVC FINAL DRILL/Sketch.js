
let lavaTop = 340;        
let isPaused = false;    
let time = 0;             
let isClockOn = true;  


let fish1X = 100;
let fish1Speed = 1.5;
let fish2X = 300;
let fish2Speed = -1;     
let fish3X = 480;
let fish3Speed = 2;

let bubble1Y = 300;
let bubble2Y = 200;
let bubble3Y = 340;


function setup() {

    createCanvas(600, 400);

}


function draw() {
  background(40, 130, 200);   


  if (!isPaused) {
    if (isClockOn) {
    time = time + 0.05;
  }
    
    fish1X = fish1X + fish1Speed;
    fish2X = fish2X + fish2Speed;
    fish3X = fish3X + fish3Speed;

    // 2) Bounce at the walls: flip the speed (multiply by -1)
    if (fish1X > 570 || fish1X < 30) {
      fish1Speed = fish1Speed * -1;
    }
    if (fish2X > 570 || fish2X < 30) {
      fish2Speed = fish2Speed * -1;
    }
    if (fish3X > 570 || fish3X < 30) {
      fish3Speed = fish3Speed * -1;
    }

    
    bubble1Y = bubble1Y - 1;
    bubble2Y = bubble2Y - 1.5;
    bubble3Y = bubble3Y - 0.8;

 
    if (bubble1Y < 0) {
      bubble1Y = lavaTop;
    }
    if (bubble2Y < 0) {
      bubble2Y = lavaTop;
    }
    if (bubble3Y < 0) {
      bubble3Y = lavaTop;
    }
  }

  drawLava();

  drawKelp(80);
  drawKelp(300);
  drawKelp(520);

  drawFish(fish1X, 100, fish1Speed, color(255, 140, 40));
  drawFish(fish2X, 180, fish2Speed, color(240, 80, 160));
  drawFish(fish3X, 80, fish3Speed, color(255, 220, 50));

  drawBubble(150, bubble1Y);
  drawBubble(300, bubble2Y);
  drawBubble(450, bubble3Y);

  drawInstructions();
}

function drawLava() {
  noStroke();
  fill(230, 70, 10);
  rect(0, lavaTop + 10, width, 60);

  // Row of circles; each one moves up and down using sin()
  fill(255, 140, 20);
  
  for (let x = 0; x <= width; x = x + 20) {
    let waveY = lavaTop + 10 + sin(x * 0.05 + time * 2) * 5;
    ellipse(x, waveY, 36, 24);
  }

}

function drawKelp(baseX) {
  stroke(30, 150, 75);
  strokeWeight(6);
  noFill();

  beginShape();
  for (let part = 0; part <= 6; part++) {
    let swayAmount = part * 2;
    let kelpX = baseX + sin(time * 2 + part * 0.5) * swayAmount;
    let kelpY = lavaTop - part * 20;
    vertex(kelpX, kelpY);
  }
  endShape();

}

function drawFish(fishX, baseY, speed, fishColor) {
  let fishY = baseY + sin(time * 2 + baseY) * 20;

  let facing = 1; 
  if (speed < 0) {
    facing = -1;
  }

  push();
  translate(fishX, fishY);
  scale(facing, 1);             
  noStroke();

  fill(fishColor);
  ellipse(0, 0, 50, 28);                    // body
  triangle(-22, 0, -42, -12, -42, 12);      // tail
  fill(255);
  ellipse(14, -4, 8, 8);                    // eye
  fill(0);
  ellipse(16, -4, 4, 4);                    // pupil
  pop();
}


function drawBubble(baseX, bubbleY) {
  let bubbleX = baseX + sin(time * 2 + baseX) * 80;

  stroke(255);
  strokeWeight(1.5);
  fill(255, 255, 255, 70);
  ellipse(bubbleX, bubbleY, 18, 18);
}

function drawInstructions() {
  noStroke();
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);

  if (isPaused) {
    text("SPACE: play   (PAUSED)", 10, 10);
  } else {
    text("SPACE: pause", 10, 10);
  }

  text("T: clock on/off", 10, 32);
if (isClockOn) {
  text("Clock: ON", 10, 54);
} else {
  text("Clock: OFF (no sway)", 10, 54);
}
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
  }
  if (key === 't' || key === 'T') {
    isClockOn = !isClockOn;
  }
}