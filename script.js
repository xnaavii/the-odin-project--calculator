const calculator = document.querySelector('#calculator');
const containers = document.querySelectorAll('.container');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const resultEl = document.querySelector('#result');
const currentOperator = document.querySelector('#currentOperator');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const errorEl = document.querySelector('#error');

let firstNum = '';
let secondNum = '';
let result = '';
let operator = '';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

const updateFirstNumber = (value) => {
  firstNum = firstNum === '' ? value : firstNum + value;
  firstNumber.textContent = firstNum;
};

const updateSecondNumber = (value) => {
  secondNum = secondNum === '' ? value : secondNum + value;
  secondNumber.textContent = secondNum;
};

const updateOperator = (value) => {
  operator = value;
  currentOperator.textContent = operator;
};

const updateResult = (value) => {
  result = String(Math.round(value * 1e10) / 1e10);
  resultEl.textContent = result;
};

const clear = () => {
  firstNum = '';
  secondNum = '';
  result = '';
  operator = '';
  firstNumber.textContent = '';
  secondNumber.textContent = '';
  currentOperator.textContent = '';
  resultEl.textContent = '';
  errorEl.textContent = '';
};

const handleDigitInput = (input) => {
  if (result || errorEl.textContent !== '') {
    clear();
  }

  if (firstNum && operator) {
    updateSecondNumber(input);
  } else {
    updateFirstNumber(input);
  }
};

const tryOperate = () => {
  if (secondNum === '') return null;

  if (operator === '/' && +secondNum === 0) {
    clear();
    errorEl.textContent = 'You shall not pass!';
    return null;
  }

  const newResult = operate(operator, +firstNum, +secondNum);

  if (isNaN(newResult)) {
    clear();
    errorEl.textContent = 'Something went wrong.';
    return null;
  }

  return newResult;
};

const handleOperatorInput = (input) => {
  if (input === '=' && !secondNum) return;

  if (input === 'c') {
    clear();
    return;
  }

  if (firstNum && operator && secondNum) {
    const newResult = tryOperate();
    if (newResult === null) return;

    clear();

    if (input === '=') {
      updateResult(newResult);
    } else {
      updateFirstNumber(String(newResult));
      updateOperator(input);
    }

    return;
  }

  if (firstNum && input !== '=') {
    updateOperator(input);
  }
};

containers.forEach((container) => {
  container.addEventListener('click', (e) => {
    const value = e.target.dataset.value;

    if (e.target.classList.contains('digit')) {
      handleDigitInput(value);
    }

    if (e.target.classList.contains('operator')) {
      handleOperatorInput(value);
    }
  });
});

document.addEventListener('keydown', (e) => {
  digits.forEach((d) => {
    const value = d.dataset.value;
    if (e.key === value) handleDigitInput(value);
  });

  operators.forEach((o) => {
    const value = o.dataset.value;
    if (e.key === value) handleOperatorInput(value);
  });

  if (e.key === 'Backspace') {
    if (secondNum) {
      secondNum = secondNum.slice(0, -1);
      secondNumber.textContent = secondNum;
      return;
    }

    if (operator) {
      operator = operator.slice(0, -1);
      currentOperator.textContent = operator;
      return;
    }

    if (firstNum) {
      firstNum = firstNum.slice(0, -1);
      firstNumber.textContent = firstNum;
      return;
    }
  }

  if (e.key === 'Enter') {
    const newResult = tryOperate();
    if (newResult === null) return;
    clear();
    updateResult(newResult);
  }
});
