const display = document.querySelector(".display");
const operation = document.querySelector(".op");
display.value = "";
let a = null;
let b = null;
let operator = null;

function appendToScreen(input) {
    display.value += input;
}

function setActive(input) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));
    
    const element = document.querySelector(`.${input}`);
    element.classList.add('active');

    operator = input; 
    if (a === null) {
        a = parseFloat(display.value);
        clearDisplay();
    }
}

function getResult() {
    if (a !== null && operator !== null) {
        b = parseFloat(display.value);
        let result = 0;

        switch (operator) {
            case 'opPlus':
                result = a + b;
                break;
            case 'opMin':
                result = a - b;
                break;
            case 'opMul':
                result = a * b;
                break;
            case 'opDiv':
                result = a / b;
                break;
        }

        display.value = result;

        a = null;
        b = null;
        operator = null;
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.classList.remove('active'));
    }
}

function clearDisplay() {
    display.value = "";
}
