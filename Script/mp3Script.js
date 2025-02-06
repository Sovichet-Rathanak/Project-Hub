const playButton = document.querySelector(".famicons--play");
const pauseButton = document.querySelector(".material-symbols--pause-rounded");
const forwardButton = document.querySelector(".f7--forward-fill");
const backwardButton = document.querySelector(".f7--backward-fill");
const disk = document.querySelector(".disk");
const musicInfo = document.querySelector(".music-info");

let trackList = [

]

playButton.addEventListener('click', function(){
    disk.classList.add("disk-spin");
    disk.style.animationPlayState = "running";

    musicInfo.classList.remove("info-inactive");
    musicInfo.classList.add("info-active");
    if(!playButton.classList.contains("hide-btn")){
        playButton.classList.add("hide-btn");
        playButton.classList.remove("show-btn");
        pauseButton.classList.remove("hide-btn");
        pauseButton.classList.add("show-btn");
    }
})

pauseButton.addEventListener('click', function(){
    disk.style.animationPlayState = "paused";

    musicInfo.classList.add("info-inactive");
    musicInfo.classList.remove("info-active");
    if(pauseButton.classList.contains("show-btn")){
        playButton.classList.remove("hide-btn");
        playButton.classList.add("show-btn");
        pauseButton.classList.remove("show-btn");
        pauseButton.classList.add("hide-btn");
    }
})