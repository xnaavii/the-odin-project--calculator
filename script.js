const calculator = document.querySelector('#calculator');
const firstNumber = document.querySelector('#firstNumber');
const digits = document.querySelectorAll('.digit');

let a = 0;
let b = 0;
let operator = 0;

const updateFirstNumber = (value) => {
  a = value;
  firstNumber.textContent = a;
};

digits.forEach((d) =>
  d.addEventListener('click', (e) => {
    const value = d.dataset.value;
    updateFirstNumber(value);
  }),
);

const operate = (operator, a, b) => operator(a, b);

// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
