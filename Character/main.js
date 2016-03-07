var context = document.getElementById("canvas").getContext("2d");
var images = {};
var totalResources = 9;
var numResourcesLoaded = 0;
var fps = 30;
var charX = 245;
var charY = 185;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var jumping = false;


loadImage("leftArm");
loadImage("legs");
loadImage("torso");
loadImage("rightArm");
loadImage("head");
loadImage("hair");
loadImage("leftArm-jump");
loadImage("legs-jump");
loadImage("rightArm-jump");

function jump() {
                        
  if (!jumping) {
    jumping = true;
    setTimeout(land, 500);
  }
}

function land() {
                        
  jumping = false;
}

//On pressing a key during game, the event "onkeydown" occurs, and 
//during the occurance, this function is called.
        	document.onkeydown=function(e)
			{
				var key = e.which || e.keyCode;//gives ascii code of key
				// 37 is ascii value of left arrow key.
				// 38 is ascii value of up arrow key.
				// 39 is ascii value of right arrow key.
				// 40 is the ascii value of down arrow key.
				if(key==38)
				{jump();}
			}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
      resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}//saving images in an array by their names.

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

function drawEllipse(centerX, centerY, width, height) {
	
  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
    centerX + width/2, centerY - height/2,
    centerX + width/2, centerY + height/2,
    centerX, centerY + height/2);

  context.bezierCurveTo(
    centerX - width/2, centerY + height/2,
    centerX - width/2, centerY - height/2,
    centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();	
}

function updateBreath() { 
                        
  if (breathDir === 1) {  // breath in
    breathAmt -= breathInc;
    if (breathAmt < -breathMax) {
      breathDir = -1;
    }
  } else {  // breath out
    breathAmt += breathInc;
    if(breathAmt > breathMax) {
      breathDir = 1;
    }
  }
}
function updateBlink() { 
                        
  eyeOpenTime += blinkUpdateTime;
	
  if(eyeOpenTime >= timeBtwBlinks){
    blink();
  }
}

function blink() {

  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
    eyeOpenTime = 0;
    curEyeHeight = maxEyeHeight;
  } else {
    setTimeout(blink, 10);
  }
}

function redraw() {

  var x = charX;
  var y = charY;
  var jumpHeight = 45;
  

  canvas.width = canvas.width; // clears the canvas 
  
  if (jumping) {
    drawEllipse(x + 40, y + 29, 100 - breathAmt, 4);
  } else {
    drawEllipse(x + 40, y + 29, 160 - breathAmt, 6);
  }

  if (jumping) {
    y -= jumpHeight;
  }

	if (jumping) {
    context.drawImage(images["leftArm-jump"], x + 40, y - 42 - breathAmt);
  } else {
    context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);
  }
if (jumping) {
    context.drawImage(images["rightArm-jump"], x - 35, y - 42 - breathAmt);
  } else {
    context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);
  }
if (jumping) {
    context.drawImage(images["legs-jump"], x, y-6 );
  } else {
    context.drawImage(images["legs"], x, y);
  }
    
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  
  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight);
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight);
}
