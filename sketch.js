var dog,sadDog,happyDog;
var food,foodObj,foodStock;
var fedTime,lastFed,fed,addFoodbtn;
var updateFoodStock;


function preload(){
    sadDog = loadImage("dog.png");
    happyDog = loadImage("happy dog.png")
}

function setup(){
    database = firebase.database();
    createCanvas(1000,400);

    foodObj = new Food();

    foodStock = database.ref("Food");
    foodStock.on("value",readStock);

    dog = createSprite(800,200,50,50);
    dog.addImage(sadDog);
    dog.scale = 0.15;

    feed = createButton("feed dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFoodbtn = createButton("add food");
    addFoodbtn.position(800,95);
    addFoodbtn.mousePressed(addFood);
 
}

function draw(){
    background("brown");
   if(food!= undefined){
    foodObj.display();
    fedTime = database.ref("FedTime");
    fedTime.on("value",function(data){
        lastFed = data.val();
    })
    

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
        text("lastFed : ", + lastFed%12 + "PM",350,30 ) ;
    }else if(lastFed ==0){
        text("last fed : 12AM",350,30);
    }else{
        text("last fed :" + lastFed + "AM",350,30);
    }
    

    drawSprites();
  }
}
function readStock(data){
   food = data.val();
   foodObj.updateFoodStock(food);
}
function feedDog(){
dog.addImage(happyDog)


foodObj.updateFoodStock(foodObj.getFoodStock()-1);
console.log(foodObj.getFoodStock());
   database.ref("/").update({
       Food : foodObj.getFoodStock(),
       FedTime : hour()
   })
}
function addFood(){
    console.log(food);
    food++
    database.ref("/").update({
        Food : food
    })
}