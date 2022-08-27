var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1
var END=0
var gamestate=PLAY
var score=0






function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png")
  
  pinkimage1=loadImage("obstacle1.png")
  pinkimage2=loadImage("obstacle2.png")
  pinkimage3=loadImage("obstacle3.png")
  pinkimage4=loadImage("obstacle4.png")
  pinkimage5=loadImage("obstacle5.png")
  pinkimage6=loadImage("obstacle6.png")
  trex_pink=loadAnimation("trex_collided.png")
  gamepink=loadImage("gameOver.png")
  resetpink=loadImage("restart.png")
  pinksound1=loadSound("die.mp3")
  SUPERPINK=loadSound("checkpoint.mp3")
  extrememepink=loadSound("jump.mp3")
  
  
 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
    trex.addAnimation("stop", trex_pink);
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,40,trex.height)
  trex.debug=true
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  gameover=createSprite(300,100)
gameover.addImage(gamepink)
reset=createSprite(300,150)
reset.addImage(resetpink)
gameover.scale=2
reset.scale=0.5
gameover.visible=false
reset.visible=false
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstacleGroup=new Group()
    cloudsGroup=new Group()
  
 
}

function draw() {
  //set background color
  background("pink");
  text("Pink Score: " +score, 500,50) 
  if(gamestate===PLAY){
ground.velocityX=-(4+3*score/100)
score=score+Math.round(frameCount/260)
// jump when the space key is pressed
if(keyDown("space")&& trex.y >= 100) {
  trex.velocityY = -10;
  extrememepink.play()
}
trex.velocityY = trex.velocityY + 0.8
if (ground.x < 0){
  ground.x = ground.width/2;
} 
if(score>0 && score%1000===0){
SUPERPINK.play()
}
createClouds();
createobstacles()
if(obstacleGroup.isTouching(trex)){
gamestate=END
pinksound1.play()
}
  }
  else if(gamestate===END){
    trex.changeAnimation("stop",trex_pink)
    ground.velocityX=0
    obstacleGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    cloudsGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    trex.velocityY=12
    gameover.visible=true
    reset.visible=true
  }
  //stop trex from falling down
  trex.collide(invisibleGround);

   if(mousePressedOver(reset)){
    console.log("restart the game")
    restart()
   }
  








  drawSprites();
  
}
function createClouds(){
if(frameCount%60===0){


cloud=createSprite(600,100,40,10)
cloud.velocityX=-4
cloud.lifetime=150
cloud.addImage(cloudImage)
cloud.scale===0.5
cloud.y=Math.round(random(10,100))
cloud.depth=trex.depth
trex.depth+=1
cloudsGroup.add(cloud)
}
}
function createobstacles(){
if(frameCount%60===0){
  obstacle=createSprite(600,165,10,40)
  obstacle.velocityX=-(5+score/100)
  obstacle.scale=0.5
  num=Math.round(random(1,6))
  switch(num){
    case 1:
      obstacle.addImage(pinkimage1)
      break
      case 2: 
      obstacle.addImage(pinkimage2)
      break
      case 3: 
      obstacle.addImage(pinkimage3)
      break
      case 4: 
      obstacle.addImage(pinkimage4)
      break
      case 5: 
      obstacle.addImage(pinkimage5)
      break
      case 6: 
      obstacle.addImage(pinkimage6)
      break
      
  }
  obstacle.lifetime=150
  obstacleGroup.add(obstacle)
  

  
}
}
function restart(){
  gamestate=PLAY
  gameover.visible=false
  reset.visible=false
  trex.changeAnimation("running",trex_running)
  obstacleGroup.destroyEach()
  cloudsGroup.destroyEach()
  score=0
}
