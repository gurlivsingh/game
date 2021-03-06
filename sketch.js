var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player,cactus,snake,playerimage,obstacle2Image,boy1Image;
var edges,background,bg,score,obstacleGroup,waterGroup,restart,restartImage;

function preload(){
  obstacle1Image=loadImage("obstacle1.png")
  obstacle2Image=loadImage("obstacle2.png")
    boy1Image=loadImage("boy1.png")
  backgroundImage=loadImage("background.jpg")
  snake1Image=loadImage("snake1.png")
  snake2Image=loadImage("snake2.png")
  waterdropletImage=loadImage("water-droplet.png")
  restartImage=loadImage("restart.png")

}
function setup(){
  createCanvas(600,600);
  score=0
  bg=createSprite(0,0,50,50)
   bg.addImage(backgroundImage)
  bg.velocityX=-3
  
  bg.scale=6.7
 // restart = createSprite(300,140);
  //restart.addImage(restartImage);
  
 player=createSprite(50,400,50,40)
  player.addImage(boy1Image)
  player.scale=0.2
  edges=createEdgeSprites()
ground=createSprite(300,580,600,20)
  ground.visible=false
  obstacleGroup=createGroup()
   waterGroup=createGroup()

  
  restart = createSprite(300,140);
 restart.addImage("restart",restartImage)
    restart.scale=0.5
}
function draw(){
  background("green")
  
 if(gameState === PLAY){
  score = score + Math.round(frameCount/120);
  if(keyDown("space")){
     player.velocityY=-5
     }
  player.velocityY=player.velocityY+0.5
  player.collide(ground)
   restart.visible = false
  if(bg.x<0){
    bg.x=bg.width/2
  }
  spawnObstacles()
   spawnWater()
 if(obstacleGroup.isTouching(player)){
   gameState=END
 }  
 }
else if(gameState===END) {
  bg.velocityX=0

      player.velocityY = 0
     restart.visible=true
  
      //change the trex animation
     // trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    waterGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     waterGroup.setVelocityXEach(0);
  if(mousePressedOver(restart)) {
      reset();
    }
   }
 
  
  
  
  drawSprites()
  //textSize(18)
   text("Score: "+ score, 500,50);
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,550,10,40);
   obstacle.velocityX = -6;
   obstacle.scale=0.2
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
     case 3: obstacle.addImage(snake1Image);
              break;
     case 4: obstacle.addImage(snake2Image);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }

 
}
function spawnWater() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    water = createSprite(600,100,40,10);
    water.y = Math.round(random(250,350));
    water.addImage(waterdropletImage);
    water.scale = 0.09;
    water.velocityX = -3;
    
     //assign lifetime to the variable
    water.lifetime = 134;
    
    //adjust the depth
    water.depth = player.depth;
    player.depth = player.depth + 1;
    
    //adding cloud to the group
   waterGroup.add(water);
    }
}
function reset(){
  gameState=PLAY
//gameOver.visible=false
  restart.visible=false
  obstacleGroup.destroyEach();
  waterGroup.destroyEach();
  //player.changeAnimation("running",trex_running)
  score=0
}

