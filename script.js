function showSection(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Metric ↔ Imperial Converter (Comprehensive)
document.getElementById('metricImperial').innerHTML = `
  <h3>Comprehensive Unit Converter</h3>
  
  <div class="converter-group">
    <label for="conversionType">Conversion Type:</label>
    <select id="conversionType" onchange="updateUnitOptions()">
      <option value="length">📏 Length / Distance</option>
      <option value="mass">⚖️ Mass / Weight</option>
      <option value="temperature">🌡 Temperature</option>
      <option value="area">📐 Area</option>
      <option value="volume">🧪 Volume / Capacity</option>
      <option value="energy">⚡ Energy</option>
    </select>
  </div>
  
  <div class="converter-group">
    <input type="number" id="metricValue" placeholder="Enter value" step="0.01">
    <select id="metricFrom"></select>
    <select id="imperialTo"></select>
    <button onclick="convertMetricImperial()">Convert</button>
    <p id="metricResult"></p>
  </div>
  
  <div class="converter-group">
    <h4>Quick Reference</h4>
    <div id="quickReference" class="quick-conversions">
      <!-- Quick reference will be populated by JavaScript -->
    </div>
  </div>
`;

// Unit definitions
const unitDefinitions = {
  length: {
    metric: [
      { value: 'mm', label: 'Millimeter (mm)' },
      { value: 'cm', label: 'Centimeter (cm)' },
      { value: 'm', label: 'Meter (m)' },
      { value: 'km', label: 'Kilometer (km)' }
    ],
    imperial: [
      { value: 'in', label: 'Inch (in)' },
      { value: 'ft', label: 'Foot (ft)' },
      { value: 'yd', label: 'Yard (yd)' },
      { value: 'mi', label: 'Mile (mi)' }
    ],
    quickRef: [
      '1 meter = 3.28 feet',
      '1 kilometer = 0.62 miles',
      '1 inch = 2.54 centimeters',
      '1 mile = 1.61 kilometers'
    ]
  },
  mass: {
    metric: [
      { value: 'mg', label: 'Milligram (mg)' },
      { value: 'g', label: 'Gram (g)' },
      { value: 'kg', label: 'Kilogram (kg)' },
      { value: 't', label: 'Metric Tonne (t)' }
    ],
    imperial: [
      { value: 'oz', label: 'Ounce (oz)' },
      { value: 'lb', label: 'Pound (lb)' },
      { value: 'st', label: 'Stone (st)' },
      { value: 'uston', label: 'US Ton (short ton)' },
      { value: 'ukton', label: 'UK Ton (long ton)' }
    ],
    quickRef: [
      '1 kilogram = 2.20 pounds',
      '1 pound = 0.45 kilograms',
      '1 stone = 14 pounds',
      '1 metric tonne = 1.10 US tons'
    ]
  },
  temperature: {
    metric: [
      { value: 'celsius', label: 'Celsius (°C)' },
      { value: 'kelvin', label: 'Kelvin (K)' }
    ],
    imperial: [
      { value: 'fahrenheit', label: 'Fahrenheit (°F)' }
    ],
    quickRef: [
      '°F = (°C × 9/5) + 32',
      '°C = (°F - 32) × 5/9',
      'K = °C + 273.15',
      '°C = K - 273.15'
    ]
  },
  area: {
    metric: [
      { value: 'm2', label: 'Square Meter (m²)' },
      { value: 'ha', label: 'Hectare (ha)' },
      { value: 'km2', label: 'Square Kilometer (km²)' }
    ],
    imperial: [
      { value: 'in2', label: 'Square Inch (in²)' },
      { value: 'ft2', label: 'Square Foot (ft²)' },
      { value: 'yd2', label: 'Square Yard (yd²)' },
      { value: 'ac', label: 'Acre (ac)' },
      { value: 'mi2', label: 'Square Mile (mi²)' }
    ],
    quickRef: [
      '1 square meter = 10.76 square feet',
      '1 acre = 4,047 square meters',
      '1 hectare = 2.47 acres',
      '1 square mile = 259 hectares'
    ]
  },
  volume: {
    metric: [
      { value: 'ml', label: 'Milliliter (mL)' },
      { value: 'cl', label: 'Centiliter (cL)' },
      { value: 'l', label: 'Liter (L)' },
      { value: 'm3', label: 'Cubic Meter (m³)' }
    ],
    imperial: [
      { value: 'tsp', label: 'Teaspoon (tsp)' },
      { value: 'tbsp', label: 'Tablespoon (tbsp)' },
      { value: 'floz', label: 'Fluid Ounce (fl oz)' },
      { value: 'cup', label: 'Cup (US)' },
      { value: 'pint', label: 'Pint (US)' },
      { value: 'quart', label: 'Quart (US)' },
      { value: 'gal', label: 'Gallon (US)' }
    ],
    quickRef: [
      '1 liter = 0.26 US gallons',
      '1 US gallon = 3.79 liters',
      '1 cup = 237 milliliters',
      '1 fluid ounce = 29.57 milliliters'
    ]
  },
  energy: {
    metric: [
      { value: 'j', label: 'Joule (J)' },
      { value: 'kj', label: 'Kilojoule (kJ)' },
      { value: 'wh', label: 'Watt-hour (Wh)' },
      { value: 'kwh', label: 'Kilowatt-hour (kWh)' },
      { value: 'cal', label: 'Calorie (cal)' },
      { value: 'kcal', label: 'Kilocalorie (kcal)' }
    ],
    imperial: [
      { value: 'btu', label: 'British Thermal Unit (BTU)' },
      { value: 'therm', label: 'Therm' }
    ],
    quickRef: [
      '1 kilocalorie = 4.184 kilojoules',
      '1 BTU = 1,055 joules',
      '1 kilowatt-hour = 3,600,000 joules',
      '1 therm = 100,000 BTU'
    ]
  }
};

function updateUnitOptions() {
  const conversionType = document.getElementById('conversionType').value;
  const fromSelect = document.getElementById('metricFrom');
  const toSelect = document.getElementById('imperialTo');
  const quickRef = document.getElementById('quickReference');
  
  // Clear existing options
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';
  quickRef.innerHTML = '';
  
  const units = unitDefinitions[conversionType];
  
  // Add metric options
  units.metric.forEach(unit => {
    const option = document.createElement('option');
    option.value = unit.value;
    option.textContent = unit.label;
    fromSelect.appendChild(option);
  });
  
  // Add imperial options
  units.imperial.forEach(unit => {
    const option = document.createElement('option');
    option.value = unit.value;
    option.textContent = unit.label;
    toSelect.appendChild(option);
  });
  
  // Add quick reference
  units.quickRef.forEach(ref => {
    const div = document.createElement('div');
    div.className = 'quick-item';
    div.textContent = ref;
    quickRef.appendChild(div);
  });
}

function convertMetricImperial() {
  const value = parseFloat(document.getElementById('metricValue').value);
  const conversionType = document.getElementById('conversionType').value;
  const from = document.getElementById('metricFrom').value;
  const to = document.getElementById('imperialTo').value;
  
  if (isNaN(value)) {
    document.getElementById('metricResult').innerText = 'Please enter a valid number';
    return;
  }
  
  let result;
  const unitNames = {
    // Length
    'mm': 'millimeters', 'cm': 'centimeters', 'm': 'meters', 'km': 'kilometers',
    'in': 'inches', 'ft': 'feet', 'yd': 'yards', 'mi': 'miles',
    // Mass
    'mg': 'milligrams', 'g': 'grams', 'kg': 'kilograms', 't': 'metric tonnes',
    'oz': 'ounces', 'lb': 'pounds', 'st': 'stones', 'uston': 'US tons', 'ukton': 'UK tons',
    // Temperature
    'celsius': '°C', 'kelvin': 'K', 'fahrenheit': '°F',
    // Area
    'm2': 'square meters', 'ha': 'hectares', 'km2': 'square kilometers',
    'in2': 'square inches', 'ft2': 'square feet', 'yd2': 'square yards', 'ac': 'acres', 'mi2': 'square miles',
    // Volume
    'ml': 'milliliters', 'cl': 'centiliters', 'l': 'liters', 'm3': 'cubic meters',
    'tsp': 'teaspoons', 'tbsp': 'tablespoons', 'floz': 'fluid ounces', 'cup': 'cups',
    'pint': 'pints', 'quart': 'quarts', 'gal': 'gallons',
    // Energy
    'j': 'joules', 'kj': 'kilojoules', 'wh': 'watt-hours', 'kwh': 'kilowatt-hours',
    'cal': 'calories', 'kcal': 'kilocalories', 'btu': 'BTU', 'therm': 'therms'
  };
  
  // Conversion factors (simplified - in a real app, you'd have a comprehensive conversion table)
  const conversions = {
    // Length conversions
    'mm-in': 0.0393701, 'mm-ft': 0.00328084, 'mm-yd': 0.00109361, 'mm-mi': 0.000000621371,
    'cm-in': 0.393701, 'cm-ft': 0.0328084, 'cm-yd': 0.0109361, 'cm-mi': 0.00000621371,
    'm-in': 39.3701, 'm-ft': 3.28084, 'm-yd': 1.09361, 'm-mi': 0.000621371,
    'km-in': 39370.1, 'km-ft': 3280.84, 'km-yd': 1093.61, 'km-mi': 0.621371,
    
    // Mass conversions
    'mg-oz': 0.000035274, 'mg-lb': 0.00000220462, 'mg-st': 0.000000157473, 'mg-uston': 0.00000000110231, 'mg-ukton': 0.000000000984207,
    'g-oz': 0.035274, 'g-lb': 0.00220462, 'g-st': 0.000157473, 'g-uston': 0.00000110231, 'g-ukton': 0.000000984207,
    'kg-oz': 35.274, 'kg-lb': 2.20462, 'kg-st': 0.157473, 'kg-uston': 0.00110231, 'kg-ukton': 0.000984207,
    't-oz': 35274, 't-lb': 2204.62, 't-st': 157.473, 't-uston': 1.10231, 't-ukton': 0.984207,
    
    // Area conversions
    'm2-in2': 1550.0031, 'm2-ft2': 10.7639, 'm2-yd2': 1.19599, 'm2-ac': 0.000247105, 'm2-mi2': 0.000000386102,
    'ha-ft2': 107639, 'ha-ac': 2.47105, 'ha-mi2': 0.00386102,
    'km2-ac': 247105, 'km2-mi2': 0.386102,
    
    // Volume conversions (US customary)
    'ml-tsp': 0.202884, 'ml-tbsp': 0.067628, 'ml-floz': 0.033814, 'ml-cup': 0.00422675, 'ml-pint': 0.00211338, 'ml-quart': 0.00105669, 'ml-gal': 0.000264172,
    'cl-tsp': 2.02884, 'cl-tbsp': 0.67628, 'cl-floz': 0.33814, 'cl-cup': 0.0422675, 'cl-pint': 0.0211338, 'cl-quart': 0.0105669, 'cl-gal': 0.00264172,
    'l-tsp': 202.884, 'l-tbsp': 67.628, 'l-floz': 33.814, 'l-cup': 4.22675, 'l-pint': 2.11338, 'l-quart': 1.05669, 'l-gal': 0.264172,
    'm3-cup': 4226.75, 'm3-pint': 2113.38, 'm3-quart': 1056.69, 'm3-gal': 264.172,
    
    // Energy conversions
    'j-btu': 0.000947817, 'j-therm': 0.00000000947817,
    'kj-btu': 0.947817, 'kj-therm': 0.00000947817,
    'wh-btu': 3.41214, 'wh-therm': 0.0000341214,
    'kwh-btu': 3412.14, 'kwh-therm': 0.0341214,
    'cal-btu': 0.00396567, 'cal-therm': 0.0000000396567,
    'kcal-btu': 3.96567, 'kcal-therm': 0.0000396567
  };
  
  const conversionKey = `${from}-${to}`;
  
  // Handle temperature conversions separately
  if (conversionType === 'temperature') {
    if (from === 'celsius' && to === 'fahrenheit') {
      result = (value * 9/5) + 32;
      document.getElementById('metricResult').innerText = `${value}°C = ${result.toFixed(1)}°F`;
      return;
    } else if (from === 'celsius' && to === 'kelvin') {
      result = value + 273.15;
      document.getElementById('metricResult').innerText = `${value}°C = ${result.toFixed(2)}K`;
      return;
    } else if (from === 'kelvin' && to === 'celsius') {
      result = value - 273.15;
      document.getElementById('metricResult').innerText = `${value}K = ${result.toFixed(2)}°C`;
      return;
    } else if (from === 'kelvin' && to === 'fahrenheit') {
      result = (value - 273.15) * 9/5 + 32;
      document.getElementById('metricResult').innerText = `${value}K = ${result.toFixed(1)}°F`;
      return;
    } else if (from === 'fahrenheit' && to === 'celsius') {
      result = (value - 32) * 5/9;
      document.getElementById('metricResult').innerText = `${value}°F = ${result.toFixed(1)}°C`;
      return;
    } else if (from === 'fahrenheit' && to === 'kelvin') {
      result = (value - 32) * 5/9 + 273.15;
      document.getElementById('metricResult').innerText = `${value}°F = ${result.toFixed(2)}K`;
      return;
    }
  }
  
  // Handle other conversions
  if (conversions[conversionKey]) {
    result = value * conversions[conversionKey];
    document.getElementById('metricResult').innerText = `${value} ${unitNames[from]} = ${result.toFixed(4)} ${unitNames[to]}`;
  } else {
    document.getElementById('metricResult').innerText = 'Conversion not available for selected units';
  }
}

// Combined Percentage and Weighted Grade Calculator
document.getElementById('percentageCalc').innerHTML = `
  <h3>Grade Calculator</h3>
  
  <div class="calculator-tabs">
    <button class="tab-button active" onclick="switchTab('percentage')">📊 Percentage Calculator</button>
    <button class="tab-button" onclick="switchTab('weighted')">📈 Weighted Grade Calculator</button>
  </div>
  
  <div id="percentage-tab" class="tab-content active">
    <h4>Percentage Calculator</h4>
    <div class="converter-group">
      <input type="number" id="score" placeholder="Score" step="0.01">
      <input type="number" id="total" placeholder="Total" step="0.01">
  <button onclick="calcPercentage()">Calculate</button>
  <p id="percentageResult"></p>
    </div>
  </div>
  
  <div id="weighted-tab" class="tab-content">
    <h4>Weighted Grade Calculator</h4>
    <div class="converter-group">
      <p><strong>Instructions:</strong> Add your assignments below. For each assignment, enter the score you received and the total possible points, then set the weight percentage.</p>
      
      <div id="assignments-container">
        <div class="assignment-row">
          <input type="text" placeholder="Assignment Name" class="assignment-name">
          <input type="number" placeholder="Score" class="assignment-score" step="0.01">
          <input type="number" placeholder="Total Points" class="assignment-total" step="0.01">
          <input type="number" placeholder="Weight %" class="assignment-weight" step="0.1">
          <button onclick="removeAssignment(this)" class="remove-btn">×</button>
        </div>
      </div>
      
      <button onclick="addAssignment()" class="add-btn">+ Add Assignment</button>
      <button onclick="calcWeightedGrade()">Calculate Final Grade</button>
      <p id="weightedGradeResult"></p>
    </div>
  </div>
`;

function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add('active');
  event.target.classList.add('active');
}

function addAssignment() {
  const container = document.getElementById('assignments-container');
  const newRow = document.createElement('div');
  newRow.className = 'assignment-row';
  newRow.innerHTML = `
    <input type="text" placeholder="Assignment Name" class="assignment-name">
    <input type="number" placeholder="Score" class="assignment-score" step="0.01">
    <input type="number" placeholder="Total Points" class="assignment-total" step="0.01">
    <input type="number" placeholder="Weight %" class="assignment-weight" step="0.1">
    <button onclick="removeAssignment(this)" class="remove-btn">×</button>
  `;
  container.appendChild(newRow);
}

function removeAssignment(button) {
  const row = button.parentElement;
  if (document.querySelectorAll('.assignment-row').length > 1) {
    row.remove();
  }
}

function calcPercentage() {
  const score = parseFloat(document.getElementById('score').value);
  const total = parseFloat(document.getElementById('total').value);
  
  if (isNaN(score) || isNaN(total) || total === 0) {
    document.getElementById('percentageResult').innerText = 'Please enter valid numbers (total cannot be zero)';
    return;
  }
  
  const percent = (score / total) * 100;
  let grade = '';
  
  if (percent >= 90) grade = 'A';
  else if (percent >= 80) grade = 'B';
  else if (percent >= 70) grade = 'C';
  else if (percent >= 60) grade = 'D';
  else grade = 'F';
  
  document.getElementById('percentageResult').innerText = `Percentage: ${percent.toFixed(2)}% (Grade: ${grade})`;
}

function calcWeightedGrade() {
  const assignments = document.querySelectorAll('.assignment-row');
  let totalWeightedScore = 0;
  let totalWeight = 0;
  let errors = [];
  let assignmentDetails = [];
  
  assignments.forEach((assignment, index) => {
    const name = assignment.querySelector('.assignment-name').value.trim();
    const score = parseFloat(assignment.querySelector('.assignment-score').value);
    const total = parseFloat(assignment.querySelector('.assignment-total').value);
    const weight = parseFloat(assignment.querySelector('.assignment-weight').value);
    
    if (name && !isNaN(score) && !isNaN(total) && !isNaN(weight) && total > 0 && weight > 0) {
      const percentage = (score / total) * 100;
      const weightedScore = percentage * (weight / 100);
      totalWeightedScore += weightedScore;
      totalWeight += weight;
      
      assignmentDetails.push(`${name}: ${percentage.toFixed(1)}% (${weight}% weight)`);
    } else if (name || !isNaN(score) || !isNaN(total) || !isNaN(weight)) {
      errors.push(`Assignment ${index + 1}: Please fill all fields with valid values`);
    }
  });
  
  if (errors.length > 0) {
    document.getElementById('weightedGradeResult').innerText = `Errors: ${errors.join(', ')}`;
    return;
  }
  
  if (totalWeight === 0) {
    document.getElementById('weightedGradeResult').innerText = 'Please add at least one assignment with valid values';
    return;
  }
  
  // FIXED: Divide by total weight to get the correct final grade
  const finalGrade = totalWeightedScore / totalWeight * 100;
  let letterGrade = '';
  
  if (finalGrade >= 90) letterGrade = 'A';
  else if (finalGrade >= 80) letterGrade = 'B';
  else if (finalGrade >= 70) letterGrade = 'C';
  else if (finalGrade >= 60) letterGrade = 'D';
  else letterGrade = 'F';
  
  let result = `Final Grade: ${finalGrade.toFixed(2)}% (${letterGrade})`;
  if (assignmentDetails.length > 0) {
    result += '\n\nBreakdown:\n' + assignmentDetails.join('\n');
  }
  
  document.getElementById('weightedGradeResult').innerText = result;
}

// Currency Converter (example using Frankfurter API)
document.getElementById('currencyConverter').innerHTML = `
  <h3>Currency Converter</h3>
  <input type="number" id="amount" placeholder="Amount" step="0.01">
  <select id="fromCurrency"></select>
  <select id="toCurrency"></select>
  <button onclick="convertCurrency()">Convert</button>
  <p id="currencyResult"></p>
`;

async function loadCurrencies() {
  try {
    const res = await fetch('https://api.frankfurter.app/currencies');
    const data = await res.json();
    const fromSel = document.getElementById('fromCurrency');
    const toSel = document.getElementById('toCurrency');
    
    for (const code in data) {
      const opt1 = document.createElement('option');
      opt1.value = code;
      opt1.text = `${code} - ${data[code]}`;
    fromSel.add(opt1.cloneNode(true));
    toSel.add(opt1);
  }
    fromSel.value = 'USD';
    toSel.value = 'EUR';
  } catch (error) {
    console.error('Failed to load currencies:', error);
    document.getElementById('currencyResult').innerText = 'Failed to load currencies. Please try again later.';
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  
  if (isNaN(amount) || amount <= 0) {
    document.getElementById('currencyResult').innerText = 'Please enter a valid positive amount';
    return;
  }
  
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    document.getElementById('currencyResult').innerText = `${amount} ${from} = ${data.rates[to]} ${to}`;
  } catch (error) {
    console.error('Currency conversion failed:', error);
    document.getElementById('currencyResult').innerText = 'Conversion failed. Please try again later.';
  }
}



// Data Storage Converter
document.getElementById('dataStorageConverter').innerHTML = `
  <h3>Data Storage Converter</h3>
  <input type="number" id="storageValue" placeholder="Value" step="0.01">
  <select id="storageFrom">
    <option value="B">Bytes</option>
    <option value="KB">Kilobytes</option>
    <option value="MB">Megabytes</option>
    <option value="GB">Gigabytes</option>
    <option value="TB">Terabytes</option>
  </select>
  <select id="storageTo">
    <option value="B">Bytes</option>
    <option value="KB">Kilobytes</option>
    <option value="MB">Megabytes</option>
    <option value="GB">Gigabytes</option>
    <option value="TB">Terabytes</option>
  </select>
  <button onclick="convertStorage()">Convert</button>
  <p id="storageResult"></p>
`;

function convertStorage() {
  const value = parseFloat(document.getElementById('storageValue').value);
  const from = document.getElementById('storageFrom').value;
  const to = document.getElementById('storageTo').value;
  
  if (isNaN(value) || value < 0) {
    document.getElementById('storageResult').innerText = 'Please enter a valid positive number';
    return;
  }
  
  const units = { B: 1, KB: 1024, MB: 1024*1024, GB: 1024*1024*1024, TB: 1024*1024*1024*1024 };
  const bytes = value * units[from];
  const result = bytes / units[to];
  
  document.getElementById('storageResult').innerText = `${value} ${from} = ${result.toFixed(2)} ${to}`;
}

// Initialize
updateUnitOptions(); // Initialize the unit converter
loadCurrencies();
