var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;

function preload(){  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(50,350,30,30);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200,390,800,20);
  ground.shapeColor = "brown";
  ground.velocityX = -2;
  ground.x = ground.width/2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white");
  
  //to show Survival Time of Monkey
  score = Math.ceil(frameCount/frameRate());
  stroke("blue");
  textSize(20);
  fill("black");
  text("Survival Time: " + score + "sec", 100,50);
  
  //to make the monkey jump
  if(keyDown("SPACE") && monkey.y>=250){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  
  //to make the infinetly scrolling ground
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //to stop the game if monkey hits an obstacle
  if(monkey.isTouching(obstacleGroup)){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  food();
  rock();
  
  drawSprites();
}

function food(){
  if(frameCount%80 === 0){
    banana = createSprite(420,200,20,20);
    banana.y = Math.round(random(150,250));
    banana.addImage(bananaImage);
    banana.velocityX = -2;
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananaGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
  }
}

function rock(){
  if(frameCount%300 === 0) {
    obstacle = createSprite(800,360,30,30);
    obstacle.velocityX = -2;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    obstacle.lifetime = 400;
    obstacleGroup.add(obstacle);
  }
}