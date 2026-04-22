const calculator = document.querySelector('#calculator');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const digits = document.querySelectorAll('.digit');

let firstNum = 0;
let secondNum = 0;
let operator = 0;

const updateFirstNumber = (value) => {
  firstNum = value;
  firstNumber.textContent = firstNum;
};

const updateSecondNumber = (value) => {
  secondNum = value;
  secondNumber.textContent = secondNum;
};

digits.forEach((d) =>
  d.addEventListener('click', (e) => {
    const value = d.dataset.value;
    if (!firstNum) {
      updateFirstNumber(value);
    } else {
      updateSecondNumber(value);
    }
  }),
);

const operate = (operator, a, b) => operator(a, b);

// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
