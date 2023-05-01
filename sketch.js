var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bart, bart_correndo, bart_parado;
var fundo, fundoInvisivel, fundoImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score;
var gameOverImg,restartImg

function preload(){
  bart_correndo = loadAnimation("bart-1-removebg-preview.png","bart-2-removebg-preview.png","bart-3-removebg-preview.png",
  "bart-4-removebg-preview.png","bart-5-removebg-preview (1).png","bart-6-removebg-preview.png","bart-7-removebg-preview.png",
  "bart-8-removebg-preview.png");

  bart_parado = loadAnimation("bart-1-removebg-preview.png");
  
  fundoImage = loadImage("fundo.png");
  
  
  obstacle1 = loadImage("obstaculo1-removebg-preview.png");
  obstacle2 = loadImage("obstaculo2-removebg-preview.png");
  obstacle3 = loadImage("obstaculo3-removebg-preview.png");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bart = createSprite(50,height-200,20,50);
  bart.addAnimation("running", bart_correndo);
  bart.addAnimation("collided", bart_parado );
 
  bart.setCollider("circle",0,0,100);
  bart.scale = 1;
  
  fundo = createSprite(200,180);
  fundo.addImage("fundo",fundoImage);
  fundo.x = fundo.width /2;
  fundo.scale = 5;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+100);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1;
  restart.scale = 1;
  
  fundoInvisivel = createSprite(width/2,height-100,width,10);
  fundoInvisivel.visible = false;
  

  obstaclesGroup = createGroup();


  
  bart.debug = true
  bart.depth = fundo.depth;
  bart.depth +=1;
  score = 0;
  
}

function draw() {
  
  background(180);
  
  text("Pontuação: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    fundo.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    
    if (fundo.x < 0){
      fundo.x = fundo.width/2;
    }
    
    
    if(keyDown("space")&& bart.y >= 100) {
        bart.velocityY = -12;
    }
    
   
    bart.velocityY = bart.velocityY + 0.8
  
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(bart)){
        gameState = END;
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      bart.changeAnimation("collided", bart_parado);
    
     
     
      fundo.velocityX = 0;
      bart.velocityY = 0
      
     
    obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);  
   }
  
 
  bart.collide(fundoInvisivel);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  bart.changeAnimation("running");
  score = 0;

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(900,height-200,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
              
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

