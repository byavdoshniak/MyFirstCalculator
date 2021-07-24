"use strict"
// DOM selectors
let button = document.querySelector(".button");
let numbers = document.querySelectorAll(".numbers");
let operators = document.querySelectorAll('.operators');
let equal = document.querySelector('.equal');
let coma = document.querySelector('.coma');
let clear = document.querySelector('.clear');
let changeToNegative = document.querySelector('.change-to-negative');
let prevInput = document.querySelector('.current-equitation');
let currentInput = document.querySelector('.current-input');
let prevResult = document.querySelector('.prev-result');

// script elements
let currentOperand;
let previusOperand;
let operation;

//clear button
clear.addEventListener ('click', () => {
    currentInput.innerText = '';
    prevInput.innerText = '';
})

// functions
function appendCurrentInput (number) {
    if (prevInput.innerText.toString().slice(-1) == operation) {
        currentInput.innerText = '';
    } 
    
    if (number === '.' && currentInput.innerText.includes('.')) { 
    return;
    } 

    if (currentInput.innerText == '0') {
        currentInput.innerText = '';
        prevInput.innerText = prevInput.innerText.toString().slice(0, prevInput.innerText.length - 1);
    }

    if (currentInput.innerText == '' && number === '.') { 
        currentInput.innerText = '0';
        prevInput.innerText = prevInput.innerText.toString() + '0.';
    } 

    
    currentInput.innerText = currentInput.innerText.toString() + number.toString();
    currentOperand = currentInput.innerText;
}

function appendPrevInput (number) {
    if (number === '.' && prevInput.innerText.includes('.', prevInput.innerText.length - 1)) return;
    prevInput.innerText = prevInput.innerText.toString() + number.toString();
}

function choseOperator (operator) {
    if (currentInput.innerText == '') return;
    if (prevInput.innerText.toString().slice(-1) == operation) {
        prevInput.innerText = prevInput.innerText.toString().slice(0, prevInput.innerText.length - 1);
    };
    if (prevInput.innerText.includes(operation)) calculate();
    prevInput.innerText += operator.toString();
    previusOperand = currentInput.innerText;
    operation = operator.toString();
}

function backspace () {
    if(prevInput.innerText.toString().slice(-1) != operation) {
        currentInput.innerText = currentInput.innerText.toString().slice(0, -1);
    } else {
        operation = '';
    }
    
    prevInput.innerText = prevInput.innerText.toString().slice(0, -1);
    currentOperand = currentInput.innerText;

    if (currentInput.innerText =='' && prevInput.innerText.toString().length > 0) { 
        currentInput.innerText = previusOperand;
    }
}

function change () {
    
}

function calculate () {
    let result;
    let prev = parseFloat(previusOperand);
    let current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return

    switch (operation) {
        case '+':
            result = prev + current;
            break
        case '-':
            result = prev - current;
            break
        case 'x':
            result = prev * current;
            break
        case '÷':
            result = prev / current;
            break
        case '%':
            result = prev / 100 * current;
            break
        default: return
    }

    currentInput.innerText = result;
    prevResult.style.opacity = '1';
    prevResult.innerText = result.toFixed(10).toString();
    prevInput.innerText = prevInput.innerText.toString() + '=' + result;
}

// callbacks
numbers.forEach(number => { 
    number.addEventListener('click', () => {
      appendCurrentInput(number.innerText)
      appendPrevInput(number.innerText)
  })
})

operators.forEach(operator => { 
    operator.addEventListener('click', () => {
      choseOperator(operator.innerText);
  })
})

equal.addEventListener ('click', () => {
    calculate();
})

button.addEventListener ('click', () => {
    backspace();
})

changeToNegative.addEventListener ('click', () => {
    change();
})
