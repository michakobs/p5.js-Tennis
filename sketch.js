let canvasX = window.innerWidth/2
let canvasY = window.innerHeight/2
console.log(canvasX, canvasY)

window.addEventListener('resize', ()=>{
  canvasX = window.innerWidth/2;
  canvasY = window.innerHeight/2;
  resizeCanvas(canvasX, canvasY)
  // canvasElement.style.width = canvasX
  // canvasElement.style.height = canvasY
  console.log(canvasX, canvasY)
  player1posY = canvasY/2 - playerHeight/2
  player2posY = canvasY/2 - playerHeight/2
});
const menu = document.getElementById('menu')
console.log(menu)




let player1Y = 0;
let player2Y = 0;
let statusKeyW = false;
let statusKeyS = false;
let statusKeyP = false;
let statusKeyL = false;
let spin = 0.1
let newYvec1 = 0
let newYvec2 = 0
let maxSpeed = 8

window.addEventListener('keydown', e => { 
    console.log(e.keyCode);
    if(e.keyCode === 87){ // && statusKeyW != true) {
      console.log('W - player1 up')
      statusKeyW = true;
      statusKeyS = false;
      //newYvec1 = newYvec + spin
    }
    if(e.keyCode === 83){ // && statusKeyS != true) {
      console.log('S - player1 down')
      statusKeyS = true;
      statusKeyW =false;
      //newYvec1 = newYvec - spin
    }
    if(e.keyCode === 80){ // && statusKeyP != true) {
      console.log('P - player2 up')
      statusKeyP = true;
      statusKeyL = false;
      //newYvec2 = newYvec + spin
    }
    if(e.keyCode === 76){ //  && statusKeyL != true) {
      console.log('L - player2 down')
      statusKeyL = true;
      statusKeyP = false;
      //newYvec2 = newYvec - spin
    }
    if(e.keyCode === 32) {
      console.log('SPEED')
      ballSpeed = 5  
      ballXvec > 0 ? ballYvec = player1spin : ballYvec = player2spin
    }
  })
window.addEventListener('keyup', e => { 
    console.log(e.keyCode);
    if(e.keyCode === 87) {
      console.log('W - player1 up')
      statusKeyW = false;
    }
    if(e.keyCode === 83) {
      console.log('S - player1 up')
      statusKeyS = false;
    }
    if(e.keyCode === 80) {
      console.log('P - player2 up')
      statusKeyP = false;
    }
    if(e.keyCode === 76) {
      console.log('L - player2 up')
      statusKeyL = false;
    }
  })

let canvasElement = null

function setup() {
  createCanvas(canvasX,canvasY);
  canvasElement = document.getElementById('defaultCanvas0')
  document.getElementById('menu').innerHTML = `Goals ${0} : ${0}`

}

function draw() {

  background(0,90,30);
  drawPlayer1()
  drawPlayer2()
  drawBall()
  


  // strokeWeight(20); 
  // stroke(255, 204, 0);
  // line(canvasX/2,canvasY/2, cos(frameCount/100)*100+canvasX/2, sin(frameCount/100)*100+canvasY/2)
  //console.log(frameCount)
}

let ballSpeed = 5;
let ballXvec = 1;
let ballYvec = 0;
let ballX = canvasX/2;
let ballY = canvasY/2;
let ballRadius = 10;
let goalPlayer1 = 0
let goalPlayer2 = 0
let ballAcceleration = 0.01

let drawBall =() => {

  // ballSpeed is 0 after a Goal
  if(ballSpeed === 0){
    // ballX-Vector indicates who shot the goal
    // 1 - player1 (left side)
    // -1 - player2 (right side)
    if(ballXvec === 1){
      ballY = player1posY + playerHeight/2;
    }
    if(ballXvec === -1){
      ballY = player2posY + playerHeight/2;
    }
    strokeWeight(2); // stroke width px
    stroke(255); // grayscale integer
    fill(200,0,0)
    ellipse(ballX, ballY,  ballRadius*2,  ballRadius*2);
    return

  }

  // if no goal was shot, calculate next ball position
  let newBallX = ballX + ballSpeed * ballXvec;
  let newBallY = ballY + ballSpeed * ballYvec;

  // if ball-Position reaches player1-x-edge
  if(newBallX <= 10 + playerWidth ){
    // and ball also is in the y-range of the player1
    if(newBallY >= player1posY && newBallY <= player1posY+playerHeight){ 
      // change x-direction
      ballXvec = ballXvec * -1;
      //alert('newYvec2: ' + newYvec2)
      console.log('player1spin: ' + player1spin)
      ballYvec = player1spin
      // calculate next ball position
      newBallX = ballX + ballSpeed * ballXvec;
    }
  }
  // if ball-Position reaches player2-x-edge
  if(newBallX >= canvasX - 10 - playerWidth ){
    // and ball also is in the y-range of player2
    if(newBallY >= player2posY && newBallY <= player2posY+playerHeight){
      // change x-direction
      ballXvec = ballXvec * -1;
      //alert('newYvec2: ' + newYvec2)
      console.log('player2spin: ' + player1spin)
      ballYvec = player2spin
      // calculate next ball position
      newBallX = ballX + ballSpeed * ballXvec;
    }
  }
  // if the next ball position doesn't reach a vertical wall
  if(newBallX > ballRadius && newBallX < canvasX-ballRadius){
    // then the ball position can be used
    ballSpeed < maxSpeed ? ballSpeed += ballAcceleration : null
    ballX = newBallX
  } else {
    // Otherwise
    // if the ball reaches a vertical wall then it's a goal
    // GOAL 1
    if(newBallX <= ballRadius){
      // Goal Counter
      goalPlayer2 += 1
      // show it in the MENU div
      document.getElementById('menu').innerHTML = `Goals ${goalPlayer1} : ${goalPlayer2}`
      // stop the ball and give it to the Player
      ballSpeed = 0
      ballYvec = 0
      
      newBallY = player1posY + playerHeight/2;
      newBallX = playerWidth + 10 + ballRadius;
      ballXvec = 1;
      ballX = newBallX;
      ballY = newBallY;
      return
    }

    // GOAL 2
    if(newBallX >= canvasX-ballRadius){
      goalPlayer1 += 1
      console.log(`Goals ${goalPlayer1} : ${goalPlayer2}`)
      document.getElementById('menu').innerHTML = `Goals ${goalPlayer1} : ${goalPlayer2}`
      ballSpeed = 0
      ballYvec = 0
      
      newBallY = player2posY + playerHeight/2;
      newBallX = canvasX - playerWidth - 10 - ballRadius;
      console.log(ballY, ballX)
      ballXvec = -1;
      ballX = newBallX;
      ballY = newBallY;
      return
    }
    
    // the impossible case
    // if the ball reaches a vertical wall but
    // for any reason wasn't recognized as a goal the
    // just push it back
    // (code rudiment from before the goals were implemented)
    // newBallX = ballX + ballSpeed * ballXvec;
    // ballXvec = ballXvec * -1;
    
  }


  if(newBallY > ballRadius && newBallY < canvasY-ballRadius){
    ballY = newBallY
  } else {
    ballYvec = ballYvec * -1;
    newBallY = ballY + ballSpeed * ballYvec;
  }
  
  //console.log('Xvec', ballXvec )

  strokeWeight(2); // stroke width px
  stroke(255); // grayscale integer
  fill(200)
  ellipse(ballX, ballY,  ballRadius*2,  ballRadius*2);
}


let playerSpeed = 10
let playerHeight = 100
let playerWidth = 15
let player1posY = canvasY/2 - playerHeight/2
let player2posY = canvasY/2 - playerHeight/2
let player1spin = 0
let player2spin = 0

let drawPlayer1 =()=> {

  if (statusKeyW){
    if(player1posY >= 0){
      player1posY = player1posY - playerSpeed
      player1spin += 0.01 
    }
  } else if (statusKeyS){
    if(player1posY <= canvasY - playerHeight){
      player1posY = player1posY + playerSpeed
      player1spin -= 0.01
    }
  } else {
    player1spin = ballYvec
  }

  strokeWeight(2); 
  stroke(255); // RGB 
  fill(200)
  rect(10, player1posY, playerWidth, playerHeight)
}

let drawPlayer2 =()=> {

  if (statusKeyP){
    if(player2posY >= 0){
      player2posY = player2posY - playerSpeed
      player2spin += 0.01 
    }
  } else if (statusKeyL){
    if(player2posY <= canvasY - playerHeight){
      player2posY = player2posY + playerSpeed
      player2spin -= 0.01 
    }
  } else {
    player2spin = ballYvec
  }

  strokeWeight(2); 
  stroke(255); // RGB 
  fill(200)
  rect(canvasX-10-playerWidth, player2posY, playerWidth, playerHeight)
}

