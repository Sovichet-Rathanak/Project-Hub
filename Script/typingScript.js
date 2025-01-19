const words = 'Apple Horizon Whisper Marble Lantern River Echo Feather Galaxy Cinnamon Puzzle Velvet Thunder Meadow Crystal Breeze Compass Blossom Starlight Harmony Cactus Mirror Cascade Tundra Eclipse Serpent Gemstone Driftwood Twilight Fern Infinity Shadow Snowflake Labyrinth Orchard Quiver Sapphire Phoenix Paradox Zenith Firefly Mistral Oasis Cobblestone Dandelion Nebula Parchment Sphinx Gossamer Ripple Sundial Inkling Mirage Thistle Moonstone Tapestry Fossil Ember Hummingbird Mosaic Whisper Lantern Stream Wanderlust Equinox Juniper Zircon Mandala Radiance Echo Serendipity Whimsy Constellation Dreamscape Quasar Prism Sequoia Solstice Haze Tranquility Fable Obsidian Petal Euphoria Nomad Firework Cascade Fragment Lantern Breeze Cinnamon Puzzle Serpent Velvet Eclipse Driftwood Blossom Thunder Dandelion Horizon Galaxy Tundra Starlight Sphinx Quiver Compass Snowflake Serenade Nomad Nebula Firework Harmonic'.toLowerCase().split(' ');
const wordLength = words.length;
const textContainer = document.querySelector('.text-container');
const mainContainer = document.querySelector('.main-container')

function addClass(element, class_name){ //add class to an element
    element.className += ' ' + class_name;
}

function removeClass(element, class_name){ //remove class from an element
    element.className = element.className.replace(class_name, '')
}

function randomWord(){ //take random word from the words variable
    const randomIndex = Math.ceil(Math.random() * wordLength - 1);
    return words[randomIndex];
}

function formatWord(word){ //this will cut up letter and then rejoin them with span, so each letter will be inside a span
    return `<div class="text">
                <span class='letter'>${word.split('').join("</span><span class='letter'>")}</span>
            </div>`;
}

function newGame(){
    textContainer.innerHTML = '';
    for(let i = 0; i < wordLength - 1; i++){
        textContainer.innerHTML += formatWord(randomWord());  //inject the .text to the text-container (each word is a div)
    }
    addClass(document.querySelector('.text'), 'current'); 
    addClass(document.querySelector('.letter'), 'current');
}

mainContainer.addEventListener('keyup', (ev) => {
    const key = ev.key;
    const currentLetter = document.querySelector('.text .current')
    const expectedKey = currentLetter.innerHTML;
    const isLetter = key.length === 1 && key === ' ';

    if(isLetter){
        if(key === expectedKey){
            
        }
    }
})


newGame();
