const calculator = document.querySelector('#calculator');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const resultEl = document.querySelector('#result');
const currentOperator = document.querySelector('#currentOperator');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');

let firstNum = 0;
let secondNum = 0;
let result = 0;
let operator = '';

const updateFirstNumber = (value) => {
  if (!firstNum) {
    firstNum = value;
  } else {
    firstNum += value;
  }
  firstNumber.textContent = firstNum;
};

const updateSecondNumber = (value) => {
  if (!secondNum) {
    secondNum = value;
  } else {
    secondNum += value;
  }
  secondNumber.textContent = secondNum;
};

const updateOperator = (value) => {
  operator = value;
  currentOperator.textContent = operator;
};

const updateResult = (value) => {
  result = value;
  resultEl.textContent = result;
};

const clear = () => {
  firstNum = 0;
  secondNum = 0;
  result = 0;
  operator = '';
  firstNumber.textContent = '';
  secondNumber.textContent = '';
  currentOperator.textContent = '';
  resultEl.textContent = '';
};

digits.forEach((d) =>
  d.addEventListener('click', (e) => {
    const value = d.dataset.value;

    if (result) {
      clear();
    }

    if (firstNum && operator) {
      updateSecondNumber(value);
    } else {
      updateFirstNumber(value);
    }
  }),
);

operators.forEach((o) =>
  o.addEventListener('click', (e) => {
    const value = o.dataset.value;

    if (value === '=' && !secondNum) {
      return;
    }

    if (value === 'c') {
      clear();
      return;
    }

    if (firstNum && operator && secondNum) {
      // Chain multiple operands e.g. 1 + 1 - 1
      if (value === '+' || value === '-' || value === '*' || value === '/') {
        let newResult = operate(operator, +firstNum, +secondNum);
        clear();
        updateFirstNumber(newResult);
        updateOperator(value);
        return;
      }

      if (value === '=') {
        let newResult = operate(operator, +firstNum, +secondNum);
        clear();
        updateResult(newResult);
        return;
      }

      return;
    }

    if (firstNum && value !== '=') {
      updateOperator(value);
    }
  }),
);

const operate = (operator, a, b) => {
  switch (operator) {
    case '+':
      return add(a, b);
      break;
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      break;
  }
};

// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
