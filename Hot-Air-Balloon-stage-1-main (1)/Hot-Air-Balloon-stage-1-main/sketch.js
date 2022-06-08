var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var building, buildingImg, building2, building2Img, lampost, lampostImg , balloon,bird,ballonImg,birdImg,obstacletop
var canvas
var buildingGrp , obstacletopGrp, barGrp
var score=0
var PLAY=1;
var END=0;
var gameState= PLAY;
var gameover,gameoverImg , restart,restartImg;
;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

buildingImg = loadImage("assets/obsBottom1.png");
building2Img = loadImage("assets/obsBottom2.png");
lampostImg = loadImage("assets/obsBottom3.png");

ballonImg = loadImage("assets/obsTop1.png");
birdImg = loadImage("assets/obsTop2.png");

gameoverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");
}

function setup(){

createCanvas(400,400);

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

buildingGrp = new Group ()
obstacletopGrp = new Group ()
barGrp = new Group()

gameover = createSprite(220,200)
gameover.addImage("gamover", gameoverImg);
gameover.scale = 0.5;
gameover.visible = false;

restart = createSprite(220,240);
restart.addImage("restart", restartImg);
restart.scale =0.5;
restart.visible= false;
}

function draw() {
  
  background("black");
  textSize(30);
  text("balloon game" , 200,200);
  
        
          //making the hot air balloon jump
          

          //adding gravity
           
           
           
           if(gameState === PLAY)
           {
            if(keyDown("space")) {
              balloon.velocityY = -6 ;
              
            }
            balloon.velocityY = balloon.velocityY + 2;
            

            Bar ();

            spawnobsBottom();
            spawnobsTop();

            if(buildingGrp.isTouching(balloon) || obstacletopGrp.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround))
           {
             gameState = END;
           } 
          }

           
           if(gameState === END)
           {
             gameover.visible= true;
             restart.visible = true;
             balloon.velocityX = 0;
             balloon.velocityY = 0;

             obstacletopGrp.setVelocityXEach(0);
             buildingGrp.setVelocityXEach(0);
             barGrp.setVelocityXEach(0);

             obstacletopGrp.setLifetimeEach(-1);
             buildingGrp.setLifetimeEach(-1);

             balloon.y = 200;
              
             if(mousePressedOver(restart))
             {
               reset();
             }


           }
           Points();
           drawSprites();
        
          }
           
           
          
         
           
           
        


function spawnobsBottom()
{  if(frameCount % 60 === 0 )
  {
    building= createSprite(400,350,30,40);
    
    building.scale =0.06;
    building.lifetime = 200;
    building.velocityX = -2;

    var rand = Math.round(random(1,3))

    switch (rand)
{
  case 1: building.addImage("building", buildingImg);
  break;

  case 2: building.addImage("buildiing2", building2Img);
  break;

  case 3: building.addImage("lampost", lampostImg);
  break;

  default:
    break;

}
balloon.depth = balloon.depth +1;

buildingGrp.add(building);
  }  

}

function spawnobsTop()
{
  if (frameCount % 60 === 0)
  {
    obstacletop = createSprite(400,50,40,50);

    obstacletop.scale = 0.06;
    obstacletop.lifetime = 200;
    obstacletop.velocityX = -2;
    obstacletop.y = Math.round(random(10,100));

    var rand = Math.round(random(1,2))

    switch(rand)
  {

    case 1: obstacletop.addImage("ballon", ballonImg);
    break;

    case 2:obstacletop.addImage("bird", birdImg);
    break;

    default: break;
  }
  balloon.depth = balloon.depth + 1;
  obstacletopGrp.add(obstacletop);
  
  }
}

function Bar ()
{
  if (World.frameCount % 60 === 0)
  {
    var bar = createSprite(400,200,20,800);
    bar.velocityX = -6;
    bar.depth = balloon.depth;
    bar.lifetime= 70;
  
    bar.visible = false;
    barGrp.add(bar);
  }
}

function Points ()
{
  if(balloon.isTouching(barGrp))
  {
    score = score +5;
  }
   textFont("algerian");
   textSize(30);
   fill("yellow");
   text("score:"+score, 250,50);
}

function reset()
{
gameState = PLAY;
gameover.visible= false;
restart.visible= false;
obstacletopGrp.destroyEach();
buildingGrp.destroyEach();
score = 0;


}