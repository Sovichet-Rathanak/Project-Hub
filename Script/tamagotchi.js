//Controllers
const sleepBtn = document.querySelector(".button-sleep");
const eatBtn = document.querySelector(".button-eat");
const walkBtn = document.querySelector(".button-walk");
const bathroomBtn = document.querySelector(".button-bathroom");
const livingroomBtn = document.querySelector(".button-living");
//Scenes and Screen
const bedroom = "/Assets/Tamagotchi/bedroom.png";
const kitchen = "/Assets/Tamagotchi/food.jpg";
const outside = "/Assets/Tamagotchi/walk.jpg";
const bathroom = "/Assets/Tamagotchi/bathroom.jpg";
const livingroom = "/Assets/Tamagotchi/livingRoom.jpg";
const screenScene = document.querySelector(".scene");
const loadingScreen = document.querySelector(".loading-screen");
//Stats
let sleepiness = 100;
let hunger = 100;
let boredom = 100;
let cleanliness = 100;
const statsArray = [sleepiness, hunger, boredom, cleanliness]; //I think we need to change this into an array of object instead
let gameRunning = false;

window.onload = firstLoad();

sleepBtn.addEventListener('click', function(){
    loadScene(bedroom);
})

eatBtn.addEventListener('click', function(){
    loadScene(kitchen);
})

walkBtn.addEventListener('click', function(){
    loadScene(outside);
})

bathroomBtn.addEventListener('click', function(){
    loadScene(bathroom);
    let randNum = Math.ceil(Math.random() * statsArray.length - 1);
    statsArray[randNum] -= 1;
    console.log(statsArray);
})


function loadScene(scene){
    loadingScreen.style.display = "flex";
    setTimeout(function () {
        loadingScreen.style.display = "none";
        screenScene.src = scene;
    }, 500);
}

function firstLoad(){
    setTimeout(function(){
        loadingScreen.style.display = "none";
        loadScene(livingroom);
    }, 1000)
}

function randomiser() {
    while(gameRunning){
        let randNum = Math.ceil((Math.random() * statsArray.length - 1));
        statsArray[randNum] -= 1;
    }
}

randomiser();

//TODO: Add SFX
//TODO: Randomly decrease the stat percentage
//TODO: Return to living room after completing the task
//TODO: Increment stat after completing the task
//TODO: Game over function