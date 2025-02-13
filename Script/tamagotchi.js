//Controllers
const sleepBtn = document.querySelector(".button-sleep");
const eatBtn = document.querySelector(".button-eat");
const walkBtn = document.querySelector(".button-walk");
const bathroomBtn = document.querySelector(".button-bathroom");
const livingroomBtn = document.querySelector(".button-living");
const buttonArray = [sleepBtn, eatBtn, walkBtn, bathroomBtn, livingroomBtn];
//Scenes and Screen
const bedroom = "/Assets/Tamagotchi/bedroom.png";
const kitchen = "/Assets/Tamagotchi/food.jpg";
const outside = "/Assets/Tamagotchi/walk.jpg";
const bathroom = "/Assets/Tamagotchi/bathroom.jpg";
const livingroom = "/Assets/Tamagotchi/livingRoom.jpg";
const screenScene = document.querySelector(".scene");
const loadingScreen = document.querySelector(".loading-screen");
//Stats
const stats = [
    {
        state: "Sleepiness",
        currentStat: 100,
    },
    {
        state: "Hunger",
        currentStat: 100,
    },    {
        state: "Boredom",
        currentStat: 100,
    },    {
        state: "Cleanliness",
        currentStat: 100,
    },
]; 
let gameRunning = true;
//Miscellaneous
const buttonSfx = new Audio("/Assets/Tamagotchi/button.mp3");
window.onload = firstLoad();

function actionHandler(index, scene){
    buttonSfx.play();
    loadScene(scene);
    if(stats[index]["currentStat"] < 100){
        stats[index]["currentStat"] += Math.floor(Math.random() * (3-1) + 1);
    }
    updateUI();
}

sleepBtn.addEventListener('click', function(){
    actionHandler(0, bedroom);
})

eatBtn.addEventListener('click', function(){
    actionHandler(1, kitchen);
})

walkBtn.addEventListener('click', function(){
    actionHandler(2, outside);
})

bathroomBtn.addEventListener('click', function(){
    actionHandler(3, bathroom);
})

function loadScene(scene){
    loadingScreen.style.display = "flex";
    setTimeout(function () {
        loadingScreen.style.display = "none";
        screenScene.src = scene;
    }, 500);

    if(scene && scene != livingroom){
        setTimeout(function() {
            screenScene.src = livingroom;
        }, 3000);
    }
}

function firstLoad(){
    setTimeout(function(){
        loadingScreen.style.display = "none";
        loadScene(livingroom);
        randomiser();
    }, 1000)
}

function randomiser() {
    if(!gameRunning) return;
    
    let randNum = Math.floor((Math.random() * stats.length));
    stats[randNum]["currentStat"] -= Math.ceil(Math.random() * (5 - 1) + 1);

    updateUI();

    let randomTick = Math.random() * (4000 - 1000) + 1000;
    setTimeout(randomiser, randomTick);
}

function updateUI() {
    document.querySelector(".sleep-percent").textContent = `${stats[0]["currentStat"]}%`;
    document.querySelector(".hunger-percent").textContent = `${stats[1]["currentStat"]}%`;
    document.querySelector(".boredom-percent").textContent = `${stats[2]["currentStat"]}%`;
    document.querySelector(".clean-percent").textContent = `${stats[3]["currentStat"]}%`;
}

//TODO: Game over function