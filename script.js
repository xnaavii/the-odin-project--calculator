const calculator = document.querySelector('#calculator');

let a = 0;
let b = 0;
let operator = 0;

const operate = (operator, a, b) => operator(a, b);

// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
