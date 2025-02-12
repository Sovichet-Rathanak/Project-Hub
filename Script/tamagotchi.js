const sleepBtn = document.querySelector(".button-sleep");
const eatBtn = document.querySelector(".button-eat");
const walkBtn = document.querySelector(".button-walk");
const bathroomBtn = document.querySelector(".button-bathroom");
const screenScene = document.querySelector(".scene");

sleepBtn.addEventListener('click', function(){
    screenScene.src = "/Assets/Tamagotchi/bedroom.png"
})

eatBtn.addEventListener('click', function(){
    screenScene.src = "/Assets/Tamagotchi/food.jpg"
})

walkBtn.addEventListener('click', function(){
    screenScene.src = "/Assets/Tamagotchi/walk.jpg"
})

bathroomBtn.addEventListener('click', function(){
    screenScene.src = "/Assets/Tamagotchi/bathroom.jpg"
})