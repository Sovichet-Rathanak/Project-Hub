const container = document.querySelector(".parent-container");
const selector = document.querySelector(".selector");
const buttons = document.querySelectorAll(".answers button");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".question-asked");
const currentScore = document.querySelector(".current-score");
let selectCurrent = 0;
let correctAnswer = "";
let incorrectAnswer = [];
let score = 0;
let allQuestions = [];
let lvl = 0;

function updateSelector(){
    const selectedButton = buttons[selectCurrent];
    selector.style.top = `${selectedButton.offsetTop}px`;
}

window.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowUp" && selectCurrent > 0) {
        selectCurrent--;
    } else if (ev.key === "ArrowDown" && selectCurrent < buttons.length - 1) {
        selectCurrent++;
    } else if (ev.key === "Enter") {
        buttons[selectCurrent].click(); 
        lvl++;
        setTimeout(updateQuestion, 1000);
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

async function getData() {
    try{
        const response = await fetch("https://opentdb.com/api.php?amount=50&category=18&type=multiple");

        if(!response.ok){
            throw new Error("Error fetching Trivia API")
        }
        const responseJson = await response.json();
        console.log('JSON', responseJson);
        allQuestions = responseJson.results;
    }catch(error){
        console.log("Fetch data error: ", error);
    }
    updateQuestion()
}

function updateQuestion(){
    if(allQuestions.length <= 50){
        selectCurrent = 0;
        updateSelector();
        data = allQuestions[lvl];
        console.log(lvl);
        console.log(allQuestions);

        correctAnswer = data.correct_answer;
        incorrectAnswer = data.incorrect_answers;
        const allAnswer = [correctAnswer, ...incorrectAnswer];

        console.log("All available answer: ", allAnswer);
        shuffleArray(allAnswer);
        difficulty.textContent = `(${data.difficulty})`;
        question.textContent = decodeHTML(data.question);
        selector.style.display = "flex";
        buttons.forEach((button, index) => {
            button.textContent = decodeHTML(allAnswer[index]);
            console.log('correct: ', correctAnswer);
            button.addEventListener('click', () => {
                if(button.textContent === decodeHTML(correctAnswer)){
                    score += 1;
                    console.log('text-content', button.textContent);
                    
                    currentScore.textContent = `Score: ${score}/50`
                    button.style.color = "Green";
                    button.style.fontWeight = "Bold";
                }else{
                    buttons.forEach((button) => {
                        if(decodeHTML(incorrectAnswer).includes(button.textContent)){
                            button.style.color = "Red";
                            button.style.fontWeight = "Bold";
                        }else{
                            button.style.color = "Green";
                            button.style.fontWeight = "Bold";
                        }
                    });
                }
            }, {once: true});
        });
    }else{
        return;
    }
    resetButton();
}

// Function to shuffle the answers array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function decodeHTML(string){
    const element = document.createElement("div");
    element.innerHTML = string;
    return element.textContent || element.innerText;
}

function resetButton(){
    buttons.forEach(button => {
        button.style.color = "Black";
        button.style.fontWeight = 500;
    })
}

getData();

//TODO: Score system
//TODO: Highest score system
//TODO: Timer system