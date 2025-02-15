const container = document.querySelector(".parent-container");
const selector = document.querySelector(".selector");
const buttons = document.querySelectorAll(".answers button");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".question-asked");
const currentScore = document.querySelector(".current-score");
const endScreen = document.querySelector(".over-screen");
const restartButton = document.querySelector(".restart-button")
let selectCurrent = 0;
let correctAnswer = "";
let incorrectAnswer = [];
let score = 0;
let allQuestions = [];
let lvl = 0;

// Update selector position
function updateSelector() {
    const selectedButton = buttons[selectCurrent];
    selector.style.top = `${selectedButton.offsetTop}px`;
}

// Keyboard navigation
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

// Handle button clicks using event delegation
document.querySelector(".answers").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        handleAnswerClick(event.target);
    }
});

// Handle mouse movement for rotation effect
document.addEventListener("mousemove", (ev) => {
    rotateCard(ev, container);
});

function rotateCard(event, element) {
    const x = event.clientX;
    const y = event.clientY;
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;
    const offsetX = ((x - midX) / midX) * 45;
    const offsetY = ((y - midY) / midY) * 45;

    element.style.setProperty("--rotateX", -1 * offsetX + "deg");
    element.style.setProperty("--rotateY", offsetY + "deg");
}

// Fetch questions from API
async function getData() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=50&category=18&type=multiple");
        if (!response.ok) {
            throw new Error("Error fetching Trivia API");
        }
        const responseJson = await response.json();
        allQuestions = responseJson.results;
    } catch (error) {
        console.log("Fetch data error: ", error);
    }
    endScreen.style.display = "none";
    updateQuestion();
}

// Update question and answers
function updateQuestion() {
    if (lvl < allQuestions.length) {
        selectCurrent = 0;
        updateSelector();
        
        let data = allQuestions[lvl];
        correctAnswer = data.correct_answer;
        incorrectAnswer = data.incorrect_answers;
        let allAnswers = [correctAnswer, ...incorrectAnswer];

        shuffleArray(allAnswers);
        difficulty.textContent = `(${data.difficulty})`;
        question.textContent = decodeHTML(data.question);
        selector.style.display = "flex";

        // Update button text only, do not replace elements
        buttons.forEach((button, index) => {
            button.style.color = "Black";
            button.style.fontWeight = "500";
            button.textContent = decodeHTML(allAnswers[index]);
        });
    }else{
        endScreen.style.display = "flex";
    }
}

// Handle answer selection
function handleAnswerClick(button) {
    if (button.textContent === decodeHTML(correctAnswer)) {
        score += 1;
        currentScore.textContent = `Score: ${score}/50`;
        button.style.color = "Green";
        button.style.fontWeight = "Bold";
    } else {
        buttons.forEach((btn) => {
            if (decodeHTML(incorrectAnswer).includes(btn.textContent)) {
                btn.style.color = "Red";
                btn.style.fontWeight = "Bold";
            } else {
                btn.style.color = "Green";
                btn.style.fontWeight = "Bold";
            }
        });
    }
    lvl++;
    setTimeout(updateQuestion, 1000);
}

// Function to shuffle answers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Decode HTML entities
function decodeHTML(string) {
    const element = document.createElement("div");
    element.innerHTML = string;
    return element.textContent || element.innerText;
}

function restartGame(){
    lvl = 0;
    score = 0;
    selectCurrent = 0;
    currentScore.textContent = "";

    endScreen.style.display = "none";
    updateQuestion();
}

restartButton.addEventListener("click", restartGame);

getData();