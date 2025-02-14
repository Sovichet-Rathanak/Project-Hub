// Controllers
const sleepBtn = document.querySelector(".button-sleep");
const eatBtn = document.querySelector(".button-eat");
const walkBtn = document.querySelector(".button-walk");
const bathroomBtn = document.querySelector(".button-bathroom");
const livingroomBtn = document.querySelector(".button-living");
const buttonArray = [sleepBtn, eatBtn, walkBtn, bathroomBtn, livingroomBtn];

// Scenes and Screen
const bedroom = "/Assets/Tamagotchi/bedroom.png";
const kitchen = "/Assets/Tamagotchi/food.jpg";
const outside = "/Assets/Tamagotchi/walk.jpg";
const bathroom = "/Assets/Tamagotchi/bathroom.jpg";
const livingroom = "/Assets/Tamagotchi/livingRoom.jpg";
const screenScene = document.querySelector(".scene");
const loadingScreen = document.querySelector(".loading-screen");

// Stats
const stats = [
    { state: "Sleepiness", currentStat: 100 },
    { state: "Hunger", currentStat: 100 },
    { state: "Boredom", currentStat: 100 },
    { state: "Cleanliness", currentStat: 100},
];

let gameRunning = true;
let buttonCoolDown = false;

// Miscellaneous
const buttonSfx = new Audio("/Assets/Tamagotchi/button.mp3");
const gameOverSfx = new Audio("/Assets/Tamagotchi/gameOver.mp3");
const bgmMusic = new Audio("/Assets/Tamagotchi/bgm.mp3");
bgmMusic.volume = .3;
window.onload = firstLoad();

function actionHandler(index, scene) {
    if (!gameRunning || buttonCoolDown) return; 

    buttonCoolDown = true; 
    setTimeout(() => { buttonCoolDown = false; }, 3000); 

    buttonSfx.play();
    loadScene(scene);
    
    if (stats[index].currentStat < 100) {
        stats[index].currentStat += Math.floor(Math.random() * 3) + 1; 
    }

    updateUI();
    checkGameOver();
}

// Event Listeners
sleepBtn.addEventListener("click", () => actionHandler(0, bedroom));
eatBtn.addEventListener("click", () => actionHandler(1, kitchen));
walkBtn.addEventListener("click", () => actionHandler(2, outside));
bathroomBtn.addEventListener("click", () => actionHandler(3, bathroom));

function loadScene(scene) {
    loadingScreen.style.display = "flex";
    setTimeout(() => {
        loadingScreen.style.display = "none";
        screenScene.src = scene;
    }, 500);

    if (scene !== livingroom) {
        setTimeout(() => {
            screenScene.src = livingroom;
        }, 3000);
    }
}

function firstLoad() {
    loadingScreen.style.display = "none";
    loadScene(livingroom);
    bgmMusic.play();
    setTimeout(randomiser, 1000);
}

function loopMusicWithDelay() {
    bgmMusic.addEventListener("ended", function () {
        if (gameRunning) {
            setTimeout(() => {
                if (gameRunning) {
                    bgmMusic.play();
                }
            }, 15000); 
        }
    });
}

loopMusicWithDelay();

function randomiser() {
    if (!gameRunning) return;
    
    let randIndex = Math.floor(Math.random() * stats.length);
    stats[randIndex].currentStat -= Math.floor(Math.random() * 4) + 1;

    updateUI();
    checkGameOver();

    let randomTick = Math.random() * (4000 - 1000) + 1000;
    setTimeout(randomiser, randomTick);
}

function updateUI() {
    document.querySelector(".sleep-percent").textContent = `${stats[0].currentStat}%`;
    document.querySelector(".hunger-percent").textContent = `${stats[1].currentStat}%`;
    document.querySelector(".boredom-percent").textContent = `${stats[2].currentStat}%`;
    document.querySelector(".clean-percent").textContent = `${stats[3].currentStat}%`;
}

function checkGameOver() {
    if (stats.some(stat => stat.currentStat <= 0)) {
        gameOverSfx.play();
        bgmMusic.pause();
        bgmMusic.currentTime = 0;
        gameRunning = false;
        showGameOverScreen();
    }
}

function showGameOverScreen() {
    loadingScreen.style.display = "flex";
    loadingScreen.innerHTML = `
        <div class="game-over">
            <h1>Game Over</h1>
            <p>Your Tamagotchi didn't survive...</p>
            <button onclick="restartGame()">Restart</button>
        </div>
    `;
}

function restartGame() {
    stats.forEach(stat => stat.currentStat = 100);
    gameRunning = true;
    loadingScreen.style.display = "none";
    loadScene(livingroom);
    setTimeout(randomiser, 1000);
}
