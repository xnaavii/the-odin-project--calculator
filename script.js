const calculator = document.querySelector('#calculator');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const currentOperator = document.querySelector('#currentOperator');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');

let firstNum = 0;
let secondNum = 0;
let operator = '';

const updateFirstNumber = (value) => {
  firstNum = value;
  firstNumber.textContent = firstNum;
};

const updateSecondNumber = (value) => {
  secondNum = value;
  secondNumber.textContent = secondNum;
};

const updateOperator = (o) => {
  operator = o;
  currentOperator.textContent = operator;
};

digits.forEach((d) =>
  d.addEventListener('click', (e) => {
    const value = Number(d.dataset.value);
    if (!firstNum) {
      updateFirstNumber(value);
    } else {
      updateSecondNumber(value);
    }
  }),
);

operators.forEach((o) =>
  o.addEventListener('click', (e) => {
    const value = o.dataset.value;

    if (firstNum && operator && secondNum) {
      if (value === '=') {
        let result = operate(operator, firstNum, secondNum);
        console.log(result);
        return;
      }
      return;
    }

    if (firstNum) {
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
