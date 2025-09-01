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

// Percentage Calculator Functions
function calcPercentage() {
  const score = parseFloat(document.getElementById('score').value);
  const total = parseFloat(document.getElementById('total').value);
  const resultElement = document.getElementById('percentageResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(score) || isNaN(total) || total === 0) {
    resultElement.innerText = 'Please enter valid numbers (total cannot be zero)';
    resultElement.classList.add('error');
    return;
  }
  
  const percent = (score / total) * 100;
  let grade = '';
  
  if (percent >= 90) grade = 'A';
  else if (percent >= 80) grade = 'B';
  else if (percent >= 70) grade = 'C';
  else if (percent >= 60) grade = 'D';
  else grade = 'F';
  
  resultElement.innerText = `Percentage: ${percent.toFixed(2)}% (Grade: ${grade})`;
  resultElement.classList.add('success');
}

function calcPercentageChange() {
  const oldValue = parseFloat(document.getElementById('oldValue').value);
  const newValue = parseFloat(document.getElementById('newValue').value);
  const resultElement = document.getElementById('percentageChangeResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(oldValue) || isNaN(newValue)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  const change = newValue - oldValue;
  const percentChange = (change / oldValue) * 100;
  const direction = change >= 0 ? 'increase' : 'decrease';
  
  resultElement.innerText = 
    `Change: ${change.toFixed(2)} (${Math.abs(percentChange).toFixed(2)}% ${direction})`;
  resultElement.classList.add('success');
}

function calcPercentageOf() {
  const percentage = parseFloat(document.getElementById('percentageValue').value);
  const baseNumber = parseFloat(document.getElementById('baseNumber').value);
  const resultElement = document.getElementById('percentageOfResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(percentage) || isNaN(baseNumber)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  const result = (percentage / 100) * baseNumber;
  resultElement.innerText = 
    `${percentage}% of ${baseNumber} = ${result.toFixed(2)}`;
  resultElement.classList.add('success');
}

// Fraction Calculator Functions
function addFractions() {
  const num1 = parseInt(document.getElementById('num1').value);
  const den1 = parseInt(document.getElementById('den1').value);
  const num2 = parseInt(document.getElementById('num2').value);
  const den2 = parseInt(document.getElementById('den2').value);
  const resultElement = document.getElementById('fractionAddResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) {
    resultElement.innerText = 'Please enter valid fractions (denominators cannot be zero)';
    resultElement.classList.add('error');
    return;
  }
  
  const lcm = getLCM(den1, den2);
  const newNum1 = num1 * (lcm / den1);
  const newNum2 = num2 * (lcm / den2);
  const resultNum = newNum1 + newNum2;
  
  const simplified = simplifyFractionHelper(resultNum, lcm);
  const decimal = (resultNum / lcm).toFixed(4);
  
  resultElement.innerText = 
    `Result: ${simplified.numerator}/${simplified.denominator} = ${decimal}`;
  resultElement.classList.add('success');
}

function multiplyFractions() {
  const num1 = parseInt(document.getElementById('num3').value);
  const den1 = parseInt(document.getElementById('den3').value);
  const num2 = parseInt(document.getElementById('num4').value);
  const den2 = parseInt(document.getElementById('den4').value);
  const resultElement = document.getElementById('fractionMultiplyResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) {
    resultElement.innerText = 'Please enter valid fractions (denominators cannot be zero)';
    resultElement.classList.add('error');
    return;
  }
  
  const resultNum = num1 * num2;
  const resultDen = den1 * den2;
  
  const simplified = simplifyFractionHelper(resultNum, resultDen);
  const decimal = (resultNum / resultDen).toFixed(4);
  
  resultElement.innerText = 
    `Result: ${simplified.numerator}/${simplified.denominator} = ${decimal}`;
  resultElement.classList.add('success');
}

function simplifyFraction() {
  const num = parseInt(document.getElementById('numToSimplify').value);
  const den = parseInt(document.getElementById('denToSimplify').value);
  const resultElement = document.getElementById('fractionSimplifyResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(num) || isNaN(den) || den === 0) {
    resultElement.innerText = 'Please enter valid fraction (denominator cannot be zero)';
    resultElement.classList.add('error');
    return;
  }
  
  const simplified = simplifyFractionHelper(num, den);
  const decimal = (num / den).toFixed(4);
  
  resultElement.innerText = 
    `Simplified: ${simplified.numerator}/${simplified.denominator} = ${decimal}`;
  resultElement.classList.add('success');
}

// Helper functions for fractions
function getGCD(a, b) {
  return b === 0 ? a : getGCD(b, a % b);
}

function getLCM(a, b) {
  return (a * b) / getGCD(a, b);
}

function simplifyFractionHelper(num, den) {
  const gcd = getGCD(Math.abs(num), Math.abs(den));
  return {
    numerator: num / gcd,
    denominator: den / gcd
  };
}

// Random Number Generator Functions
function generateRandom() {
  const min = parseInt(document.getElementById('minValue').value);
  const max = parseInt(document.getElementById('maxValue').value);
  const count = parseInt(document.getElementById('count').value);
  const resultElement = document.getElementById('randomResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0 || count > 100) {
    resultElement.innerText = 'Please enter valid values (min < max, count 1-100)';
    resultElement.classList.add('error');
    return;
  }
  
  // FIXED: Use Math.random() properly and ensure inclusive range
  const results = [];
  for (let i = 0; i < count; i++) {
    // Generate random number between min and max (inclusive)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    results.push(randomNum);
  }
  
  resultElement.innerText = 
    `Generated ${count} random number(s): ${results.join(', ')}`;
  resultElement.classList.add('success');
}

function generateDice() {
  const resultElement = document.getElementById('quickRandomResult');
  const result = Math.floor(Math.random() * 6) + 1;
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  resultElement.innerText = `Dice roll: ${result}`;
  resultElement.classList.add('success');
}

function generateCoin() {
  const resultElement = document.getElementById('quickRandomResult');
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  resultElement.innerText = `Coin flip: ${result}`;
  resultElement.classList.add('success');
}

function generateLottery() {
  const resultElement = document.getElementById('quickRandomResult');
  const numbers = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 49) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  numbers.sort((a, b) => a - b);
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  resultElement.innerText = 
    `Lottery numbers: ${numbers.join(', ')}`;
  resultElement.classList.add('success');
}

// Rounding Calculator Functions
function roundNumber() {
  const number = parseFloat(document.getElementById('numberToRound').value);
  const type = document.getElementById('roundingType').value;
  const decimals = parseInt(document.getElementById('decimalPlaces').value);
  const resultElement = document.getElementById('roundingResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(number)) {
    resultElement.innerText = 'Please enter a valid number';
    resultElement.classList.add('error');
    return;
  }
  
  let result;
  switch (type) {
    case 'nearest':
      result = Math.round(number);
      break;
    case 'up':
      result = Math.ceil(number);
      break;
    case 'down':
      result = Math.floor(number);
      break;
    case 'decimal':
      result = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
      break;
    default:
      result = Math.round(number);
  }
  
  resultElement.innerText = 
    `Rounded result: ${result}`;
  resultElement.classList.add('success');
}

// Big Number Calculator Functions
function calculateBigNumbers() {
  const num1 = document.getElementById('bigNumber1').value.trim();
  const num2 = document.getElementById('bigNumber2').value.trim();
  const operation = document.getElementById('bigOperation').value;
  const resultElement = document.getElementById('bigNumberResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (!num1 || !num2) {
    resultElement.innerText = 'Please enter both numbers';
    resultElement.classList.add('error');
    return;
  }
  
  try {
    let result;
    const n1 = BigInt(num1);
    const n2 = BigInt(num2);
    
    switch (operation) {
      case 'add':
        result = n1 + n2;
        break;
      case 'subtract':
        result = n1 - n2;
        break;
      case 'multiply':
        result = n1 * n2;
        break;
      case 'divide':
        if (n2 === 0n) {
          resultElement.innerText = 'Error: Division by zero';
          resultElement.classList.add('error');
          return;
        }
        result = n1 / n2;
        break;
      default:
        resultElement.innerText = 'Invalid operation';
        resultElement.classList.add('error');
        return;
    }
    
    resultElement.innerText = 
      `Result: ${result.toString()}`;
    resultElement.classList.add('success');
  } catch (error) {
    resultElement.innerText = 
      'Error: Please enter valid numbers';
    resultElement.classList.add('error');
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first calculator by default
  showSection('percentage');
});
