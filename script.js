const curr = document.getElementById('curr');
const prev = document.getElementById('prev');
let expression = '';

function updateDisplay() {
  curr.innerText = expression || '0';
}

function appendChar(char) {
  if (curr.innerText === '0' && char !== '.') {
    expression = '';
  }
  expression += char;
  updateDisplay();
}

function setOp(op) {
  if (!expression) return;
  const last = expression.slice(-1);
  if ('+-*/'.includes(last)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function clearCalc() {
  expression = '';
  prev.innerText = '';
  updateDisplay();
}

function delChar() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function evaluateExpr() {
  try {
    prev.innerText = expression;
    const result = eval(expression);
    expression = result.toString();
    updateDisplay();
  } catch {
    expression = 'Error';
    updateDisplay();
    setTimeout(() => clearCalc(), 1000);
  }
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendChar(e.key);
  else if (['+', '-', '*', '/'].includes(e.key)) setOp(e.key);
  else if (e.key === '.') appendChar('.');
  else if (e.key === 'Enter') evaluateExpr();
  else if (e.key === 'Backspace') delChar();
  else if (e.key === 'Escape') clearCalc();
  else if (e.key === '(' || e.key === ')') appendChar(e.key);
});
