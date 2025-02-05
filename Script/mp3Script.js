const playButton = document.querySelector(".famicons--play");
const pauseButton = document.querySelector(".material-symbols--pause-rounded");
const forwardButton = document.querySelector(".f7--forward-fill");
const backwardButton = document.querySelector(".f7--backward-fill");

playButton.addEventListener('click', function(){
    if(!playButton.classList.contains("hide-btn")){
        playButton.classList.add("hide-btn");
        playButton.classList.remove("show-btn");
        pauseButton.classList.remove("hide-btn");
        pauseButton.classList.add("show-btn");
    }

    document.querySelector(".disk").classList.add("goUp");
})

pauseButton.addEventListener('click', function(){
    if(pauseButton.classList.contains("show-btn")){
        playButton.classList.remove("hide-btn");
        playButton.classList.add("show-btn");
        pauseButton.classList.remove("show-btn");
        pauseButton.classList.add("hide-btn");
    }
})

function pauseANDplay(){
    playButton.classList.toggle("hide-btn")
}