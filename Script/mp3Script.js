const playButton = document.querySelector(".famicons--play");
const pauseButton = document.querySelector(".material-symbols--pause-rounded");
const forwardButton = document.querySelector(".f7--forward-fill");
const backwardButton = document.querySelector(".f7--backward-fill");
const disk = document.querySelector(".disk");
const musicInfo = document.querySelector(".music-info");
const musicTitle = document.querySelector(".title");
const musicSubtitle = document.querySelector(".subtitle");
const albumArt = document.querySelector(".album-art");
const musicSrc = document.querySelector(".music")
const trackLength = document.querySelector(".tracktime-length");
const currentTrackTime = document.querySelector(".tracktime-current");
let currentIndex = 1;

let trackList = [
    {
        trackName: "No One Noticed",
        artistName: "The Marias",
        albumName: "Submarine",
        albumCover: "/Assets/AlbumArt/submarine_alb.jpg",
        trackURL: "/Assets/Audio/no_one_noticed.mp3",
    },
    {
        trackName: "ផ្អែក",
        artistName: "Nickit",
        albumName: "Cover",
        albumCover: "/Assets/AlbumArt/paek.jpg",
        trackURL: "/Assets/Audio/ផ្អែក.mp3",
    },
    {
        trackName: "No One Noticed",
        artistName: "The Marias",
        albumName: "Submarine",
        albumCover: "/Assets/submarine_alb.jpg",
        trackURL: "MP3 TRACK",
    },
    {
        trackName: "No One Noticed",
        artistName: "The Marias",
        albumName: "Submarine",
        albumCover: "/Assets/submarine_alb.jpg",
        trackURL: "MP3 TRACK",
    },
    {
        trackName: "No One Noticed",
        artistName: "The Marias",
        albumName: "Submarine",
        albumCover: "/Assets/submarine_alb.jpg",
        trackURL: "MP3 TRACK",
    }
]
musicSrc.src = trackList[currentIndex].trackURL;

musicSrc.addEventListener("loadedmetadata", function(){
    trackLength.textContent = formatTime(musicSrc.duration);        
})

musicSrc.addEventListener("timeupdate", function(){
    currentTrackTime.textContent = formatTime(musicSrc.currentTime);

    const progressPercent = (musicSrc.currentTime / musicSrc.duration) * 100;
    const progressBar = document.querySelector(".seek-bar").style.width = progressPercent + "%";
})

function formatTime(seconds){
    const minutes = Math.floor(seconds/60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0'+secs:secs}`;
}

playButton.addEventListener('click', function(){
    //Animation
    setTimeout(function(){
        albumArt.src = trackList[currentIndex].albumCover;
        disk.classList.add("disk-spin");
        disk.style.animationPlayState = "running";
        musicSrc.play();
    }, 300);
    musicTitle.textContent = trackList[currentIndex].trackName;
    musicSubtitle.textContent = `${trackList[currentIndex].artistName} - ${trackList[currentIndex].albumName}`;

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
    //Animation
    disk.style.animationPlayState = "paused";
    musicSrc.pause();

    musicInfo.classList.add("info-inactive");
    musicInfo.classList.remove("info-active");
    if(pauseButton.classList.contains("show-btn")){
        playButton.classList.remove("hide-btn");
        playButton.classList.add("show-btn");
        pauseButton.classList.remove("show-btn");
        pauseButton.classList.add("hide-btn");
    }
})
