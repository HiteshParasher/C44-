//Game States
var START=0;
var PLAY=1;
var END=2;
var gameState=0;

var Knife,Knife2,knife3,Knife4,Knife5,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage,knife2Image,knife3Image,knife4Image,knife5Image , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,knife3Sound,go;

function preload(){
  knifeImage = loadImage("knife.png")
  knife2Image = loadImage("knife2.png")
  knife3Image = loadImage("knife3.jpg")
  knife4Image = loadImage("knife4.png")
  knife5Image = loadImage("knife5.png")
  monsterImage = loadAnimation("alien1.png","alien2.png")
  backgroundImg = loadImage("fruit ninja background.jpg")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  knifeSound = loadSound("mixkit-dagger-woosh-1487.wav")
  goSound = loadSound("mixkit-arcade-fast-game-over-233.wav")
}



function setup() {
  createCanvas(600, 600);
  bg=createSprite(300,300,300,300)
  bg.addImage(backgroundImg)
  
  
  //creating sword
  knife=createSprite(70,60,20,20)
  knife.addImage(knifeImage);
  knife.scale = 0.8
  
  knife2=createSprite(70,550,20,20)
  knife2.addImage(knife2Image);
  knife2.scale=0.05
  
  knife3=createSprite(70,165,20,20);
  knife3.addImage(knife3Image);
  knife3.scale=0.2
  
  knife4=createSprite(70,300,20,20)
  knife4.addImage(knife4Image);
  knife4.scale = 0.15
  
  knife5=createSprite(70,425,20,20)
  knife5.addImage(knife5Image);
  knife5.scale = 0.1

  //set collider for sword
  knife3.setCollider("rectangle",0,0,250,250);
  knife2.setCollider("rectangle",0,0,1250,1250);
  knife.setCollider("rectangle",0,0,65,65);
  knife4.setCollider("rectangle",0,0,300,300);
  knife5.setCollider("rectangle",0,0,325,325);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("white");
    
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    knife2.y=World.mouseY;
    knife2.x=World.mouseX;
    knife3.y=World.mouseY;
    knife3.x=World.mouseX;
    knife4.y=World.mouseY;
    knife4.x=World.mouseX;
    knife5.y=World.mouseY;
    knife5.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife3) || fruitGroup.isTouching(knife) || fruitGroup.isTouching(knife2) || fruitGroup.isTouching(knife4) || fruitGroup.isTouching(knife5)){
      fruitGroup.destroyEach();
      
      knifeSound.play();
      score = score+1
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife3) || fruitGroup.isTouching(knife) || fruitGroup.isTouching(knife2) || fruitGroup.isTouching(knife4) || fruitGroup.isTouching(knife5)){
        gameState=END;
        
        goSound.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
        
        knife2.addImage(gameOverImage);
        knife2.scale=2;
        knife2.x=300;
        knife2.y=300;
        
        knife3.addImage(gameOverImage);
        knife3.scale=2;
        knife3.x=300;
        knife3.y=300;
        
        knife4.addImage(gameOverImage);
        knife4.scale=2;
        knife4.x=300;
        knife4.y=300;
        
        knife5.addImage(gameOverImage);
        knife5.scale=2;
        knife5.x=300;
        knife5.y=300;
      }
    }
  }
  
  
  drawSprites();
  //Display score
  textSize(25);
  fill("green")
  text("Score : "+ score,250,50);

   if(gameState === START){
    fill("white")
    text("Choose your knife to begin playing.",180,440)
    text("Hi! Welcome to fruit ninja!",180,120) 
    text("The main goal here is to cut the fruits ",180,160) 
    text("without touching the monsters.",180,200)
    text("The catch is they can appear from",180,240)
    text("anywhere",180,280)
    text("Can you do it?",180,320) 
    text("If so, let's start.",180,360) 
    if(mousePressedOver(knife)){
       gameState = PLAY
       
       knife2.visible = false
       knife3.visible = false
       knife4.visible = false
       knife5.visible = false
      }
     if(mousePressedOver(knife2)){
        gameState = PLAY
       
        knife.visible = false
        knife3.visible = false
        knife4.visible = false
        knife5.visible = false
      }
     if(mousePressedOver(knife3)){
        gameState = PLAY
       
        knife.visible = false
        knife2.visible = false
        knife4.visible = false
        knife5.visible = false
      }
     if(mousePressedOver(knife4)){
       gameState = PLAY
       
       knife.visible = false
       knife2.visible = false
       knife3.visible = false
       knife5.visible = false
      }
     if(mousePressedOver(knife5)){
       gameState = PLAY
       
       knife.visible = false
       knife2.visible = false
       knife3.visible = false
       knife4.visible = false
      }
   }

}


function Monster(){
  if(World.frameCount%50===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.x = (0 || 600)
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(8 + score/10);
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-(7 + score/4)
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= (7 + score/4);
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}