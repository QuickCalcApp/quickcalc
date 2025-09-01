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

// Helper function to parse data from textarea
function parseData(dataString) {
  return dataString.split(/[\s,]+/)
    .map(item => parseFloat(item.trim()))
    .filter(item => !isNaN(item));
}

// Statistics Calculator Functions
function calculateStatistics() {
  const dataString = document.getElementById('dataSet').value;
  const data = parseData(dataString);
  const resultsDiv = document.getElementById('statisticsResults');
  
  // Clear previous classes
  resultsDiv.classList.remove('success', 'error');
  
  if (data.length === 0) {
    resultsDiv.innerHTML = '<p>Please enter valid numbers</p>';
    resultsDiv.classList.add('error');
    return;
  }
  
  if (data.length === 1) {
    resultsDiv.innerHTML = '<p>Need at least 2 numbers for meaningful statistics</p>';
    resultsDiv.classList.add('error');
    return;
  }
  
  const n = data.length;
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const sortedData = [...data].sort((a, b) => a - b);
  const median = n % 2 === 0 ? (sortedData[n/2 - 1] + sortedData[n/2]) / 2 : sortedData[Math.floor(n/2)];
  
  // Mode calculation
  const frequency = {};
  data.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
  const modeText = modes.length === 0 ? 'N/A' : modes.join(', ');
  
  // Variance and Standard Deviation
  const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  // Range
  const range = Math.max(...data) - Math.min(...data);
  
  // Quartiles - FIXED: Use proper interpolation instead of Math.floor
  const q1Index = (n - 1) * 0.25;
  const q3Index = (n - 1) * 0.75;
  
  let q1, q3;
  
  if (Number.isInteger(q1Index)) {
    q1 = sortedData[q1Index];
  } else {
    const lower = Math.floor(q1Index);
    const upper = Math.ceil(q1Index);
    const weight = q1Index - lower;
    q1 = sortedData[lower] * (1 - weight) + sortedData[upper] * weight;
  }
  
  if (Number.isInteger(q3Index)) {
    q3 = sortedData[q3Index];
  } else {
    const lower = Math.floor(q3Index);
    const upper = Math.ceil(q3Index);
    const weight = q3Index - lower;
    q3 = sortedData[lower] * (1 - weight) + sortedData[upper] * weight;
  }
  
  const iqr = q3 - q1;
  
  resultsDiv.innerHTML = `
    <h4>Statistical Results:</h4>
    <p><strong>Count:</strong> ${n}</p>
    <p><strong>Sum:</strong> ${sum.toFixed(4)}</p>
    <p><strong>Mean:</strong> ${mean.toFixed(4)}</p>
    <p><strong>Median:</strong> ${median.toFixed(4)}</p>
    <p><strong>Mode:</strong> ${modeText}</p>
    <p><strong>Range:</strong> ${range.toFixed(4)}</p>
    <p><strong>Population Variance:</strong> ${variance.toFixed(4)}</p>
    <p><strong>Population Standard Deviation:</strong> ${stdDev.toFixed(4)}</p>
    <p><strong>Sample Variance:</strong> ${variance.toFixed(4)}</p>
    <p><strong>Sample Standard Deviation:</strong> ${stdDev.toFixed(4)}</p>
    <p><strong>Q1 (25th percentile):</strong> ${q1.toFixed(4)}</p>
    <p><strong>Q2 (50th percentile):</strong> ${median.toFixed(4)}</p>
    <p><strong>Q3 (75th percentile):</strong> ${q3.toFixed(4)}</p>
    <p><strong>IQR:</strong> ${iqr.toFixed(4)}</p>
  `;
  resultsDiv.classList.add('success');
}

// Standard Deviation Functions
function calculatePopulationStdDev() {
  const dataString = document.getElementById('populationData').value;
  const data = parseData(dataString);
  const resultElement = document.getElementById('populationStdDevResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (data.length === 0) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (data.length === 1) {
    resultElement.innerText = 'Need at least 2 numbers for standard deviation';
    resultElement.classList.add('error');
    return;
  }
  
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);
  
  resultElement.innerText = `Population Standard Deviation (σ): ${stdDev.toFixed(4)}`;
  resultElement.classList.add('success');
}

function calculateSampleStdDev() {
  const dataString = document.getElementById('sampleData').value;
  const data = parseData(dataString);
  const resultElement = document.getElementById('sampleStdDevResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (data.length === 0) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (data.length === 1) {
    resultElement.innerText = 'Need at least 2 numbers for standard deviation';
    resultElement.classList.add('error');
    return;
  }
  
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (data.length - 1);
  const stdDev = Math.sqrt(variance);
  
  resultElement.innerText = `Sample Standard Deviation (s): ${stdDev.toFixed(4)}`;
  resultElement.classList.add('success');
}

function calculateVariance() {
  const dataString = document.getElementById('varianceData').value;
  const data = parseData(dataString);
  const varianceType = document.getElementById('varianceType').value;
  const resultElement = document.getElementById('varianceResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (data.length === 0) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (data.length === 1) {
    resultElement.innerText = 'Need at least 2 numbers for variance';
    resultElement.classList.add('error');
    return;
  }
  
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  let variance;
  
  if (varianceType === 'population') {
    variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    resultElement.innerText = `Population Variance (σ²): ${variance.toFixed(4)}`;
  } else {
    variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (data.length - 1);
    resultElement.innerText = `Sample Variance (s²): ${variance.toFixed(4)}`;
  }
  
  resultElement.classList.add('success');
}

// Mean, Median, Mode Functions
function calculateCentralTendency() {
  const dataString = document.getElementById('centralData').value;
  const data = parseData(dataString);
  const resultsDiv = document.getElementById('centralTendencyResults');
  
  // Clear previous classes
  resultsDiv.classList.remove('success', 'error');
  
  if (data.length === 0) {
    resultsDiv.innerHTML = '<p>Please enter valid numbers</p>';
    resultsDiv.classList.add('error');
    return;
  }
  
  const n = data.length;
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const sortedData = [...data].sort((a, b) => a - b);
  const median = n % 2 === 0 ? (sortedData[n/2 - 1] + sortedData[n/2]) / 2 : sortedData[Math.floor(n/2)];
  
  // Mode calculation
  const frequency = {};
  data.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
  const modeText = modes.length === 0 ? 'N/A' : modes.join(', ');
  
  resultsDiv.innerHTML = `
    <h4>Central Tendency Results:</h4>
    <p><strong>Mean:</strong> ${mean.toFixed(4)}</p>
    <p><strong>Median:</strong> ${median.toFixed(4)}</p>
    <p><strong>Mode:</strong> ${modeText}</p>
  `;
  resultsDiv.classList.add('success');
}

// Probability Functions
function calculateBasicProbability() {
  const favorable = parseInt(document.getElementById('favorableOutcomes').value);
  const total = parseInt(document.getElementById('totalOutcomes').value);
  
  if (isNaN(favorable) || isNaN(total) || total === 0 || favorable < 0 || favorable > total) {
    document.getElementById('basicProbabilityResult').innerText = 'Please enter valid numbers (0 ≤ favorable ≤ total)';
    return;
  }
  
  const probability = favorable / total;
  const percentage = probability * 100;
  
  document.getElementById('basicProbabilityResult').innerText = 
    `Probability = ${favorable}/${total} = ${probability.toFixed(4)} = ${percentage.toFixed(2)}%`;
}

function calculateConditionalProbability() {
  const probA = parseFloat(document.getElementById('probA').value);
  const probB = parseFloat(document.getElementById('probB').value);
  const probAandB = parseFloat(document.getElementById('probAandB').value);
  
  if (isNaN(probA) || isNaN(probB) || isNaN(probAandB) || 
      probA < 0 || probA > 1 || probB < 0 || probB > 1 || probAandB < 0 || probAandB > 1) {
    document.getElementById('conditionalProbabilityResult').innerText = 'Please enter valid probabilities (0-1)';
    return;
  }
  
  if (probB === 0) {
    document.getElementById('conditionalProbabilityResult').innerText = 'P(B) cannot be zero';
    return;
  }
  
  const conditionalProb = probAandB / probB;
  
  document.getElementById('conditionalProbabilityResult').innerText = 
    `P(A|B) = P(A∩B)/P(B) = ${probAandB}/${probB} = ${conditionalProb.toFixed(4)}`;
}

function calculateBinomialProbability() {
  const n = parseInt(document.getElementById('nTrials').value);
  const k = parseInt(document.getElementById('kSuccesses').value);
  const p = parseFloat(document.getElementById('pSuccess').value);
  
  if (isNaN(n) || isNaN(k) || isNaN(p) || n < 0 || k < 0 || k > n || p < 0 || p > 1) {
    document.getElementById('binomialProbabilityResult').innerText = 'Please enter valid values (0 ≤ k ≤ n, 0 ≤ p ≤ 1)';
    return;
  }
  
  // Calculate binomial coefficient C(n,k)
  const binomialCoeff = factorial(n) / (factorial(k) * factorial(n - k));
  const probability = binomialCoeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
  
  document.getElementById('binomialProbabilityResult').innerText = 
    `P(X = ${k}) = C(${n},${k}) × ${p}^${k} × (1-${p})^${n-k} = ${probability.toFixed(6)}`;
}

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Z-Score Functions
function calculateZScore() {
  const dataValue = parseFloat(document.getElementById('dataValue').value);
  const mean = parseFloat(document.getElementById('meanValue').value);
  const stdDev = parseFloat(document.getElementById('stdDevValue').value);
  
  if (isNaN(dataValue) || isNaN(mean) || isNaN(stdDev) || stdDev === 0) {
    document.getElementById('zScoreResult').innerText = 'Please enter valid numbers (standard deviation cannot be zero)';
    return;
  }
  
  const zScore = (dataValue - mean) / stdDev;
  
  document.getElementById('zScoreResult').innerText = 
    `Z-Score = (${dataValue} - ${mean}) / ${stdDev} = ${zScore.toFixed(4)}`;
}

function calculatePercentile() {
  const zScore = parseFloat(document.getElementById('zScoreInput').value);
  
  if (isNaN(zScore)) {
    document.getElementById('percentileResult').innerText = 'Please enter a valid Z-Score';
    return;
  }
  
  // Approximation of normal CDF
  const percentile = normalCDF(zScore) * 100;
  
  document.getElementById('percentileResult').innerText = 
    `Percentile = ${percentile.toFixed(2)}%`;
}

function normalCDF(z) {
  // Approximation of standard normal cumulative distribution function
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function calculateConfidenceInterval() {
  const sampleMean = parseFloat(document.getElementById('sampleMean').value);
  const sampleStdDev = parseFloat(document.getElementById('sampleStdDev').value);
  const sampleSize = parseInt(document.getElementById('sampleSize').value);
  const confidenceLevel = parseFloat(document.getElementById('confidenceLevel').value);
  
  if (isNaN(sampleMean) || isNaN(sampleStdDev) || isNaN(sampleSize) || sampleSize <= 1) {
    document.getElementById('confidenceIntervalResult').innerText = 'Please enter valid numbers (sample size > 1)';
    return;
  }
  
  // Z-scores for common confidence levels
  const zScores = { 0.90: 1.645, 0.95: 1.96, 0.99: 2.576 };
  const zScore = zScores[confidenceLevel];
  
  const standardError = sampleStdDev / Math.sqrt(sampleSize);
  const marginOfError = zScore * standardError;
  const lowerBound = sampleMean - marginOfError;
  const upperBound = sampleMean + marginOfError;
  
  const confidencePercent = confidenceLevel * 100;
  document.getElementById('confidenceIntervalResult').innerText = 
    `${confidencePercent}% Confidence Interval: (${lowerBound.toFixed(4)}, ${upperBound.toFixed(4)})`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first calculator by default
  showSection('statistics');
});
