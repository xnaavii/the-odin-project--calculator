const calculator = document.querySelector('#calculator');
const containers = document.querySelectorAll('.container');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const resultEl = document.querySelector('#result');
const currentOperator = document.querySelector('#currentOperator');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const errorEl = document.querySelector('#error');

let firstNum = 0;
let secondNum = 0;
let result = 0;
let operator = '';

// Basic arithmetic operations
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
  }
};

const updateFirstNumber = (value) => {
  firstNum = firstNum === 0 ? value : firstNum + value;
  firstNumber.textContent = firstNum;
};

const updateSecondNumber = (value) => {
  secondNum = secondNum === 0 ? value : secondNum + value;
  secondNumber.textContent = secondNum;
};

const updateOperator = (value) => {
  operator = value;
  currentOperator.textContent = operator;
};

const updateResult = (value) => {
  result = Math.round(value * 1e10) / 1e10;
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
  errorEl.textContent = '';
};

const handleDigitInput = (input) => {
  if (result) {
    clear();
  }

  if (firstNum && operator) {
    updateSecondNumber(input);
  } else {
    updateFirstNumber(input);
  }
};

const handleOperatorInput = (input) => {
  if (input === '=' && !secondNum) {
    return;
  }

  if (input === 'c') {
    clear();
    return;
  }

  if (isNaN(result)) {
    throw new Error('You bastard');
    clear();
    errorEl.textContent = 'You bastard.';
  }

  if (firstNum && operator && secondNum) {
    if (+firstNum === 0 && operator === '/' && +secondNum === 0) {
      try {
        let newResult = operate(operator, +firstNum, +secondNum);
        if (isNaN(newResult)) {
          clear();
          throw new Error('You shall not pass!');
        }
      } catch (error) {
        errorEl.textContent = error.message;
        return;
      }
    }

    if (input === '+' || input === '-' || input === '*' || input === '/') {
      // Chain multiple operands e.g. 1 + 1 - 1
      let newResult = operate(operator, +firstNum, +secondNum);
      clear();
      updateFirstNumber(newResult);
      updateOperator(input);
      return;
    }

    if (input === '=') {
      let newResult = operate(operator, +firstNum, +secondNum);

      clear();
      updateResult(newResult);
      return;
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

// Keyboard support
document.addEventListener('keydown', (e) => {
  digits.forEach((d) => {
    const value = d.dataset.value;
    if (e.key === value) {
      handleDigitInput(value);
    }
  });

  operators.forEach((o) => {
    const value = o.dataset.value;
    if (e.key === value) {
      handleOperatorInput(value);
    }
  });

  if (e.key === 'Backspace') {
    const index = -1;

    if (secondNum) {
      if (secondNum !== '') {
        secondNum = secondNum.slice(0, index);
        secondNumber.textContent = secondNum;
        return;
      }
    }

    if (operator) {
      if (operator !== '') {
        operator = operator.slice(0, index);
        currentOperator.textContent = operator;
        return;
      }
    }

    if (firstNum) {
      if (firstNum !== '') {
        firstNum = firstNum.slice(0, index);
        firstNumber.textContent = firstNum;
        return;
      }
    }
  }

  if (e.key === 'Enter') {
    let newResult = operate(operator, +firstNum, +secondNum);

    clear();
    updateResult(newResult);
    return;
  }
});
