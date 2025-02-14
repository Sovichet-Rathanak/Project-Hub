const container = document.querySelector(".parent-container");
const selector = document.querySelector(".selector");
const buttons = document.querySelectorAll(".answers button");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".question-asked");
let selectCurrent = 0;
let answers = [];
let correctAnswer = "";

function updateSelector(){
    const selectedButton = buttons[selectCurrent];
    selector.style.top = `${selectedButton.offsetTop}px`;
}

updateSelector();

window.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowUp" && selectCurrent > 0) {
        selectCurrent--;
    } else if (ev.key === "ArrowDown" && selectCurrent < buttons.length - 1) {
        selectCurrent++;
    } else if (ev.key === "Enter") {
        buttons[selectCurrent].click(); 
    }
    updateSelector();
});

document.addEventListener("mousemove", (ev) => {
    rotateCard(ev, container);
})

function rotateCard(event, element){
    const x = event.clientX;
    const y = event.clientY;

    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;

    const offsetX =  ((x - midX) / midX) * 45;
    const offsetY =  ((y - midY) / midY) * 45;

    element.style.setProperty("--rotateX", -1* offsetX + "deg");
    element.style.setProperty("--rotateY", offsetY + "deg");
}

getData();

async function getData() {
    try{
        const response = await fetch("https://opentdb.com/api.php?amount=50&category=18&type=multiple");

        if(!response.ok){
            throw new Error("Error fetching Trivia API")
        }
        const responseJson = await response.json();
        const randNum = Math.floor(Math.random());
        const data = responseJson.results[randNum];
        console.log(data);

        correctAnswer = data.correct_answer;
        const incorrectAnswer = data.incorrect_answers;
        const allAnswer = [correctAnswer, ...incorrectAnswer];

        console.log("All available answer: ", allAnswer);
        shuffleArray(allAnswer);
        difficulty.textContent = `(${data.difficulty})`;
        question.textContent = decodeHTML(data.question);
        selector.style.display = "flex";
        buttons.forEach((button, index) => {
            button.textContent = decodeHTML(allAnswer[index]);

            button.addEventListener('click', () => {
                validateAnswer(button.textContent);
            })
        });
    }catch(error){
        console.log("Fetch data error: ", error);
    }
}

// Function to shuffle the answers array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function validateAnswer(textContent){
    if(textContent === correctAnswer){
        alert("Yayyy")
    }else{
        alert("womp")
    }
}

function decodeHTML(string){
    const element = document.createElement("div");
    element.innerHTML = string;
    return element.textContent || element.innerText;
}

//TODO: Score system
//TODO: Jump to next question
//TODO: Highest score system
//TODO: Timer system