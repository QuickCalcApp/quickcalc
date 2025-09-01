function showSection(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add('active');
  event.target.classList.add('active');
}

// Scientific Calculator Functions
let calcExpression = '';

function addToCalc(value) {
  if (value === 'Math.PI') {
    calcExpression += Math.PI;
  } else {
    calcExpression += value;
  }
  document.getElementById('calcDisplay').value = calcExpression;
}

function clearCalc() {
  calcExpression = '';
  document.getElementById('calcDisplay').value = '';
  document.getElementById('calcResult').innerText = '';
}

function backspace() {
  calcExpression = calcExpression.slice(0, -1);
  document.getElementById('calcDisplay').value = calcExpression;
}

function calculate() {
  const resultElement = document.getElementById('calcResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  try {
    // Replace trigonometric functions
    let expression = calcExpression
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(');
    
    const result = eval(expression);
    resultElement.innerText = `Result: ${result}`;
    resultElement.classList.add('success');
    calcExpression = result.toString();
    document.getElementById('calcDisplay').value = calcExpression;
  } catch (error) {
    resultElement.innerText = 'Error: Invalid expression';
    resultElement.classList.add('error');
  }
}

// Exponent Calculator Functions
function calculateExponent() {
  const base = parseFloat(document.getElementById('base').value);
  const exponent = parseFloat(document.getElementById('exponent').value);
  const resultElement = document.getElementById('exponentResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(base) || isNaN(exponent)) {
    resultElement.innerText = 'Please enter valid numbers for both base and exponent';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.pow(base, exponent);
  resultElement.innerText = 
    `${base}^${exponent} = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

function calculateFractionalExponent() {
  const base = parseFloat(document.getElementById('baseFrac').value);
  const numerator = parseFloat(document.getElementById('numerator').value);
  const denominator = parseFloat(document.getElementById('denominator').value);
  const resultElement = document.getElementById('fractionalExponentResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(base) || isNaN(numerator) || isNaN(denominator)) {
    resultElement.innerText = 'Please enter valid numbers for base, numerator, and denominator';
    resultElement.classList.add('error');
    return;
  }
  
  if (denominator === 0) {
    resultElement.innerText = 'Denominator cannot be zero';
    resultElement.classList.add('error');
    return;
  }
  
  const exponent = numerator / denominator;
  const result = Math.pow(base, exponent);
  resultElement.innerText = 
    `${base}^(${numerator}/${denominator}) = ${base}^${exponent.toFixed(4)} = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

function calculateNegativeExponent() {
  const base = parseFloat(document.getElementById('baseNeg').value);
  const exponent = parseFloat(document.getElementById('exponentNeg').value);
  const resultElement = document.getElementById('negativeExponentResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(base) || isNaN(exponent)) {
    resultElement.innerText = 'Please enter valid numbers for both base and exponent';
    resultElement.classList.add('error');
    return;
  }
  
  if (base === 0) {
    resultElement.innerText = 'Base cannot be zero for negative exponents';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.pow(base, exponent);
  resultElement.innerText = 
    `${base}^${exponent} = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

// Log Calculator Functions
function calculateNaturalLog() {
  const value = parseFloat(document.getElementById('lnValue').value);
  const resultElement = document.getElementById('naturalLogResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value) || value <= 0) {
    resultElement.innerText = 'Please enter a valid positive number';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.log(value);
  resultElement.innerText = `ln(${value}) = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

function calculateCommonLog() {
  const value = parseFloat(document.getElementById('log10Value').value);
  const resultElement = document.getElementById('commonLogResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value) || value <= 0) {
    resultElement.innerText = 'Please enter a valid positive number';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.log10(value);
  resultElement.innerText = `log₁₀(${value}) = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

function calculateCustomLog() {
  const base = parseFloat(document.getElementById('logBase').value);
  const value = parseFloat(document.getElementById('logValue').value);
  const resultElement = document.getElementById('customLogResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(base) || isNaN(value) || base <= 0 || base === 1 || value <= 0) {
    resultElement.innerText = 'Please enter valid numbers (base > 0, base ≠ 1, value > 0)';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.log(value) / Math.log(base);
  resultElement.innerText = `log_${base}(${value}) = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

// Root Calculator Functions
function calculateSquareRoot() {
  const value = parseFloat(document.getElementById('squareRootValue').value);
  const resultElement = document.getElementById('squareRootResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value)) {
    resultElement.innerText = 'Please enter a valid number';
    resultElement.classList.add('error');
    return;
  }
  
  if (value < 0) {
    resultElement.innerText = 'Cannot calculate square root of negative number';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.sqrt(value);
  resultElement.innerText = `√${value} = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

function calculateCubeRoot() {
  const value = parseFloat(document.getElementById('cubeRootValue').value);
  const resultElement = document.getElementById('cubeRootResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value)) {
    resultElement.innerText = 'Please enter a valid number';
    resultElement.classList.add('error');
    return;
  }
  
  const result = Math.cbrt(value);
  resultElement.innerText = `∛${value} = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

function calculateNthRoot() {
  const value = parseFloat(document.getElementById('nthRootValue').value);
  const degree = parseFloat(document.getElementById('nthRootDegree').value);
  const resultElement = document.getElementById('nthRootResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value) || isNaN(degree)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (degree === 0) {
    resultElement.innerText = 'Degree cannot be zero';
    resultElement.classList.add('error');
    return;
  }
  
  // FIXED: Better handling of negative numbers with odd roots
  if (value < 0 && degree % 2 === 0) {
    resultElement.innerText = 'Error: Even root of negative number is not a real number';
    resultElement.classList.add('error');
    return;
  }
  
  // FIXED: Handle negative numbers with odd roots properly
  let result;
  if (value < 0 && degree % 2 === 1) {
    // Odd root of negative number
    result = -Math.pow(Math.abs(value), 1/degree);
  } else {
    result = Math.pow(value, 1/degree);
  }
  
  resultElement.innerText = `${degree}th root of ${value} = ${result.toFixed(6)}`;
  resultElement.classList.add('success');
}

// Scientific Notation Calculator Functions
function convertToScientificNotation() {
  const number = parseFloat(document.getElementById('numberToNotation').value);
  
  if (isNaN(number)) {
    document.getElementById('toNotationResult').innerText = 'Please enter a valid number';
    return;
  }
  
  const scientific = number.toExponential();
  const parts = scientific.split('e');
  const mantissa = parseFloat(parts[0]).toFixed(6);
  const exponent = parts[1];
  
  document.getElementById('toNotationResult').innerText = 
    `${number} = ${mantissa} × 10^${exponent} = ${scientific}`;
}

function convertFromScientificNotation() {
  const notation = document.getElementById('notationNumber').value.trim();
  
  if (!notation) {
    document.getElementById('fromNotationResult').innerText = 'Please enter a number in scientific notation';
    return;
  }
  
  try {
    const number = parseFloat(notation);
    if (isNaN(number)) {
      document.getElementById('fromNotationResult').innerText = 'Invalid scientific notation format';
      return;
    }
    
    document.getElementById('fromNotationResult').innerText = 
      `${notation} = ${number.toLocaleString()}`;
  } catch (error) {
    document.getElementById('fromNotationResult').innerText = 'Invalid scientific notation format';
  }
}

function calculateNotationOperation() {
  const notation1 = document.getElementById('notation1').value.trim();
  const notation2 = document.getElementById('notation2').value.trim();
  const operation = document.getElementById('notationOperation').value;
  
  if (!notation1 || !notation2) {
    document.getElementById('notationOperationResult').innerText = 'Please enter both numbers';
    return;
  }
  
  try {
    const num1 = parseFloat(notation1);
    const num2 = parseFloat(notation2);
    
    if (isNaN(num1) || isNaN(num2)) {
      document.getElementById('notationOperationResult').innerText = 'Invalid number format';
      return;
    }
    
    let result;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          document.getElementById('notationOperationResult').innerText = 'Error: Division by zero';
          return;
        }
        result = num1 / num2;
        break;
      default:
        document.getElementById('notationOperationResult').innerText = 'Invalid operation';
        return;
    }
    
    const scientific = result.toExponential();
    document.getElementById('notationOperationResult').innerText = 
      `${notation1} ${getOperationSymbol(operation)} ${notation2} = ${result.toLocaleString()} = ${scientific}`;
  } catch (error) {
    document.getElementById('notationOperationResult').innerText = 'Error in calculation';
  }
}

function getOperationSymbol(operation) {
  switch (operation) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    default: return '?';
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first calculator by default
  showSection('scientific');
});
