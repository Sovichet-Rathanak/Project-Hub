const words = 'Apple Horizon Whisper Marble Lantern River Echo Feather Galaxy Cinnamon Puzzle Velvet Thunder Meadow Crystal Breeze Compass Blossom Starlight Harmony Cactus Mirror Cascade Tundra Eclipse Serpent Gemstone Driftwood Twilight Fern Infinity Shadow Snowflake Labyrinth Orchard Quiver Sapphire Phoenix Paradox Zenith Firefly Mistral Oasis Cobblestone Dandelion Nebula Parchment Sphinx Gossamer Ripple Sundial Inkling Mirage Thistle Moonstone Tapestry Fossil Ember Hummingbird Mosaic Whisper Lantern Stream Wanderlust Equinox Juniper Zircon Mandala Radiance Echo Serendipity Whimsy Constellation Dreamscape Quasar Prism Sequoia Solstice Haze Tranquility Fable Obsidian Petal Euphoria Nomad Firework Cascade Fragment Lantern Breeze Cinnamon Puzzle Serpent Velvet Eclipse Driftwood Blossom Thunder Dandelion Horizon Galaxy Tundra Starlight Sphinx Quiver Compass Snowflake Serenade Nomad Nebula Firework Harmonic'.toLowerCase().split(' ');
const wordLength = words.length;
const gameTime = 2*1000;
const textContainer = document.querySelector('.text-container');
const mainContainer = document.querySelector('.main-container')
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;
let gameActive = true;

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
    return `<div class="text"><span class='letter'>${word.split('').join("</span><span class='letter'>")}</span></div>`;
}

function newGame(){
    textContainer.innerHTML = '';
    for(let i = 0; i < wordLength - 1; i++){
        textContainer.innerHTML += formatWord(randomWord());  //inject the .text to the text-container (each word is a div)
    }
    document.querySelector('.cursor').style.display = "block";
    addClass(document.querySelector('.text'), 'current'); 
    addClass(document.querySelector('.letter'), 'current');
}

function getWPM(){
    const words = [...document.querySelectorAll('.text')];
    const lastTypedWord = document.querySelector('.text.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex)
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    })
    return correctWords.length /gameTime * 60000;
}

function resetGame() {
    window.timer = null;
    window.gameStart = null;
    window.pauseTime = 0;
    document.querySelector('.timer').innerHTML = (gameTime / 1000).toString(); 
    gameActive = true;
    randomWord();
    newGame(); 
}

function gameOver() {
    clearInterval(window.timer);
    gameActive = false;
    const result = getWPM();

    const resultScreen = document.createElement('div');
    resultScreen.className = 'result-screen';

    const title = document.createElement('h1');
    title.innerHTML = "Result";
    resultScreen.appendChild(title)

    const wpmResult = document.createElement('p');
    wpmResult.innerHTML = `Words Per Minute: <strong>${result.toFixed(2)}</strong>`;
    resultScreen.appendChild(wpmResult);
    
    document.querySelector('.cursor').style.display = "none";
    const exitButton = document.createElement('button');
    exitButton.innerHTML = 'Exit';
    exitButton.onclick = () => {
        resultScreen.remove(); 
        resetGame();
    };
    resultScreen.appendChild(exitButton);
    mainContainer.appendChild(resultScreen);
}

mainContainer.addEventListener('keyup', (ev) => {
    if (!gameActive) return;

    const key = ev.key;
    const currentText = document.querySelector('.text.current');
    const currentLetter = document.querySelector('.letter.current');
    const expectedKey = currentLetter?.innerHTML || ' '; 
    const isLetter = key.length === 1 && key !== ' ';
    const isSpaced = key === ' ';
    const isBackspaced = key === 'Backspace';
    const firstLetter = currentLetter === currentText.firstChild; //if the active letter is the first child of an element

    console.log({key, expectedKey});
    if (!window.timer && isLetter) {
        window.timer = setInterval(() => {
          if (!window.gameStart) {
            window.gameStart = (new Date()).getTime();
          }
          const currentTime = (new Date()).getTime();
          const msPassed = currentTime - window.gameStart;
          const sPassed = Math.round(msPassed / 1000);
          const sLeft = Math.round((gameTime / 1000) - sPassed);
          if (sLeft <= 0) {
            gameOver();
            return;
          }
          document.querySelector('.timer').innerHTML = sLeft + '';
        }, 1000);
    }
    
    if(isLetter){
        if(currentLetter){
            addClass(currentLetter, key === expectedKey ? 'correct': 'incorrect');
            removeClass(currentLetter, 'current'); 
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }
        }else{
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra';
            currentText.appendChild(incorrectLetter);
        }
    }

    if(isSpaced){
        if(expectedKey !== ' '){
            const lettersToInvalidate = [...document.querySelectorAll(".text.current .letter:not(.correct)")]
            lettersToInvalidate.forEach(letter =>{
                addClass(letter, 'incorrect')
            })
        }
        removeClass(currentText, 'current');
        addClass(currentText.nextSibling, 'current');
        if(currentLetter){
            removeClass(currentLetter, 'current');
        }
        addClass(currentText.nextSibling.firstElementChild, 'current');
    }

    if (isBackspaced) {
        if (currentLetter && firstLetter) { // If the active letter is also the first letter, go back one word
            removeClass(currentText, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentText.previousSibling, 'current');
            addClass(currentLetter.previousSibling.lastChild, 'current'); 
            removeClass(currentLetter.previousSibling.lastChild, 'incorrect');
            removeClass(currentLetter.previousSibling.lastChild, 'correct');
        } else if (currentLetter && !firstLetter) { // Move back one letter
            removeClass(currentLetter, 'current');
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
            addClass(currentLetter.previousSibling, 'current');
        } else if (!currentLetter && currentText) { //Handle case when currentLetter is null
            const lastChild = currentText.lastChild;
            if (lastChild) {
                addClass(lastChild, 'current');
                removeClass(lastChild, 'incorrect');
                removeClass(lastChild, 'correct');
            }
        } 

        const extraLetters = [...currentText.querySelectorAll('.letter.extra')];
        if(extraLetters.length > 0){
            extraLetters[extraLetters.length - 1].remove();
        }
    }

    // handle cursor
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.text.current');
    const cursor = document.querySelector('.cursor');
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 25 + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
})


newGame();
