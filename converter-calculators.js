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

// Unit Converter Functions
const unitDefinitions = {
  length: {
    units: {
      'mm': { name: 'Millimeter', factor: 0.001 },
      'cm': { name: 'Centimeter', factor: 0.01 },
      'm': { name: 'Meter', factor: 1 },
      'km': { name: 'Kilometer', factor: 1000 },
      'in': { name: 'Inch', factor: 0.0254 },
      'ft': { name: 'Foot', factor: 0.3048 },
      'yd': { name: 'Yard', factor: 0.9144 },
      'mi': { name: 'Mile', factor: 1609.344 }
    },
    quickRef: [
      '1 km = 1000 m = 0.621 mi',
      '1 m = 100 cm = 39.37 in',
      '1 ft = 12 in = 0.305 m',
      '1 mi = 5280 ft = 1.609 km'
    ]
  },
  mass: {
    units: {
      'mg': { name: 'Milligram', factor: 0.001 },
      'g': { name: 'Gram', factor: 1 },
      'kg': { name: 'Kilogram', factor: 1000 },
      't': { name: 'Metric Tonne', factor: 1000000 },
      'oz': { name: 'Ounce', factor: 28.3495 },
      'lb': { name: 'Pound', factor: 453.592 },
      'st': { name: 'Stone (UK)', factor: 6350.29 },
      'ton': { name: 'Short Ton (US)', factor: 907185 }
    },
    quickRef: [
      '1 kg = 1000 g = 2.205 lb',
      '1 lb = 16 oz = 453.6 g',
      '1 t = 1000 kg = 2205 lb',
      '1 st = 14 lb = 6.35 kg'
    ]
  },
  temperature: {
    units: {
      'C': { name: 'Celsius', factor: 1 },
      'F': { name: 'Fahrenheit', factor: 1 },
      'K': { name: 'Kelvin', factor: 1 }
    },
    quickRef: [
      '°F = (°C × 9/5) + 32',
      '°C = (°F - 32) × 5/9',
      'K = °C + 273.15',
      '°C = K - 273.15'
    ]
  },
  area: {
    units: {
      'm2': { name: 'Square Meter', factor: 1 },
      'ha': { name: 'Hectare', factor: 10000 },
      'km2': { name: 'Square Kilometer', factor: 1000000 },
      'in2': { name: 'Square Inch', factor: 0.00064516 },
      'ft2': { name: 'Square Foot', factor: 0.092903 },
      'yd2': { name: 'Square Yard', factor: 0.836127 },
      'ac': { name: 'Acre', factor: 4046.86 },
      'mi2': { name: 'Square Mile', factor: 2589988 }
    },
    quickRef: [
      '1 km² = 100 ha = 0.386 mi²',
      '1 ha = 10000 m² = 2.471 ac',
      '1 ac = 4047 m² = 0.405 ha',
      '1 mi² = 640 ac = 259 ha'
    ]
  },
  volume: {
    units: {
      'mL': { name: 'Milliliter', factor: 1 },
      'cL': { name: 'Centiliter', factor: 10 },
      'L': { name: 'Liter', factor: 1000 },
      'm3': { name: 'Cubic Meter', factor: 1000000 },
      'tsp': { name: 'Teaspoon (US)', factor: 4.929 },
      'tbsp': { name: 'Tablespoon (US)', factor: 14.787 },
      'fl_oz': { name: 'Fluid Ounce (US)', factor: 29.574 },
      'cup': { name: 'Cup (US)', factor: 236.588 },
      'pt': { name: 'Pint (US)', factor: 473.176 },
      'qt': { name: 'Quart (US)', factor: 946.353 },
      'gal': { name: 'Gallon (US)', factor: 3785.41 }
    },
    quickRef: [
      '1 L = 1000 mL = 33.8 fl oz',
      '1 gal = 4 qt = 3.785 L',
      '1 cup = 8 fl oz = 237 mL',
      '1 tbsp = 3 tsp = 15 mL'
    ]
  },
  energy: {
    units: {
      'J': { name: 'Joule', factor: 1 },
      'kJ': { name: 'Kilojoule', factor: 1000 },
      'Wh': { name: 'Watt-hour', factor: 3600 },
      'kWh': { name: 'Kilowatt-hour', factor: 3600000 },
      'cal': { name: 'Calorie', factor: 4.184 },
      'kcal': { name: 'Kilocalorie', factor: 4184 },
      'BTU': { name: 'British Thermal Unit', factor: 1055.06 },
      'therm': { name: 'Therm', factor: 105505585 }
    },
    quickRef: [
      '1 kWh = 3600 kJ = 3412 BTU',
      '1 kcal = 1000 cal = 4.184 kJ',
      '1 BTU = 1055 J = 0.252 kcal',
      '1 J = 0.239 cal = 0.000948 BTU'
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
  
  const units = unitDefinitions[conversionType].units;
  const quickReferences = unitDefinitions[conversionType].quickRef;
  
  // Add options to both dropdowns
  Object.keys(units).forEach(unit => {
    const fromOption = document.createElement('option');
    fromOption.value = unit;
    fromOption.textContent = `${units[unit].name} (${unit})`;
    fromSelect.appendChild(fromOption);
    
    const toOption = document.createElement('option');
    toOption.value = unit;
    toOption.textContent = `${units[unit].name} (${unit})`;
    toSelect.appendChild(toOption);
  });
  
  // Set default selections
  if (conversionType === 'length') {
    fromSelect.value = 'm';
    toSelect.value = 'ft';
  } else if (conversionType === 'mass') {
    fromSelect.value = 'kg';
    toSelect.value = 'lb';
  } else if (conversionType === 'temperature') {
    fromSelect.value = 'C';
    toSelect.value = 'F';
  } else if (conversionType === 'area') {
    fromSelect.value = 'm2';
    toSelect.value = 'ft2';
  } else if (conversionType === 'volume') {
    fromSelect.value = 'L';
    toSelect.value = 'gal';
  } else if (conversionType === 'energy') {
    fromSelect.value = 'kJ';
    toSelect.value = 'kcal';
  }
  
  // Update quick reference
  quickRef.innerHTML = '';
  quickReferences.forEach(ref => {
    const div = document.createElement('div');
    div.className = 'quick-item';
    div.textContent = ref;
    quickRef.appendChild(div);
  });
}

function convertMetricImperial() {
  const value = parseFloat(document.getElementById('metricValue').value);
  const fromUnit = document.getElementById('metricFrom').value;
  const toUnit = document.getElementById('imperialTo').value;
  const resultElement = document.getElementById('metricResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value)) {
    resultElement.innerText = 'Please enter a valid number';
    resultElement.classList.add('error');
    return;
  }
  
  if (fromUnit === toUnit) {
    resultElement.innerText = `${value} ${fromUnit} = ${value} ${toUnit}`;
    resultElement.classList.add('success');
    return;
  }
  
  const conversionType = document.getElementById('conversionType').value;
  let result;
  
  try {
    switch (conversionType) {
      case 'length':
        result = convertLength(value, fromUnit, toUnit);
        break;
      case 'mass':
        result = convertMass(value, fromUnit, toUnit);
        break;
      case 'temperature':
        result = convertTemperature(value, fromUnit, toUnit);
        break;
      case 'area':
        result = convertArea(value, fromUnit, toUnit);
        break;
      case 'volume':
        result = convertVolume(value, fromUnit, toUnit);
        break;
      case 'energy':
        result = convertEnergy(value, fromUnit, toUnit);
        break;
      default:
        result = NaN;
    }
    
    if (isNaN(result)) {
      resultElement.innerText = 'Invalid conversion or units not compatible';
      resultElement.classList.add('error');
      return;
    }
    
    resultElement.innerText = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
    resultElement.classList.add('success');
  } catch (error) {
    resultElement.innerText = 'Conversion error occurred';
    resultElement.classList.add('error');
  }
}

function convertTemperature(value, fromUnit, toUnit) {
  let celsius;
  
  // Convert to Celsius first
  switch (fromUnit) {
    case 'C':
      celsius = value;
      break;
    case 'F':
      // FIXED: More accurate Fahrenheit to Celsius conversion
      celsius = (value - 32) * 5/9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    default:
      return NaN;
  }
  
  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'C':
      return celsius;
    case 'F':
      // FIXED: More accurate Celsius to Fahrenheit conversion
      return celsius * 9/5 + 32;
    case 'K':
      return celsius + 273.15;
    default:
      return NaN;
  }
}

// Currency Converter Functions
let currencies = {};

async function loadCurrencies() {
  try {
    const response = await fetch('https://api.frankfurter.app/currencies');
    currencies = await response.json();
    
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    Object.keys(currencies).forEach(code => {
      const fromOption = document.createElement('option');
      fromOption.value = code;
      fromOption.textContent = `${code} - ${currencies[code]}`;
      fromSelect.appendChild(fromOption);
      
      const toOption = document.createElement('option');
      toOption.value = code;
      toOption.textContent = `${code} - ${currencies[code]}`;
      toSelect.appendChild(toOption);
    });
    
    // Set defaults
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
  } catch (error) {
    console.error('Error loading currencies:', error);
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultElement = document.getElementById('currencyResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(amount) || amount <= 0) {
    resultElement.innerText = 'Please enter a valid positive amount';
    resultElement.classList.add('error');
    return;
  }
  
  if (fromCurrency === toCurrency) {
    resultElement.innerText = `${amount} ${fromCurrency} = ${amount} ${toCurrency}`;
    resultElement.classList.add('success');
    return;
  }
  
  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    
    const data = await response.json();
    const convertedAmount = data.rates[toCurrency];
    
    if (convertedAmount) {
      resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      resultElement.classList.add('success');
    } else {
      resultElement.innerText = 'Currency conversion failed';
      resultElement.classList.add('error');
    }
  } catch (error) {
    resultElement.innerText = 'Error: Unable to fetch exchange rate. Please try again later.';
    resultElement.classList.add('error');
  }
}

// Binary/Hex Calculator Functions
function convertNumberBase() {
  const number = document.getElementById('numberToConvert').value.trim();
  const fromBase = parseInt(document.getElementById('fromBase').value);
  const toBase = parseInt(document.getElementById('toBase').value);
  const resultElement = document.getElementById('baseConversionResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (!number) {
    resultElement.innerText = 'Please enter a number to convert';
    resultElement.classList.add('error');
    return;
  }
  
  try {
    // Convert from source base to decimal
    const decimal = parseInt(number, fromBase);
    
    if (isNaN(decimal)) {
      resultElement.innerText = `Invalid number for base ${fromBase}`;
      resultElement.classList.add('error');
      return;
    }
    
    // Convert from decimal to target base
    let result;
    if (toBase === 10) {
      result = decimal.toString();
    } else if (toBase === 16) {
      result = decimal.toString(16).toUpperCase();
    } else if (toBase === 2) {
      result = decimal.toString(2);
    } else if (toBase === 8) {
      result = decimal.toString(8);
    } else {
      result = decimal.toString(toBase);
    }
    
    resultElement.innerText = `${number} (base ${fromBase}) = ${result} (base ${toBase})`;
    resultElement.classList.add('success');
  } catch (error) {
    resultElement.innerText = 'Conversion error occurred';
    resultElement.classList.add('error');
  }
}

function calculateBinary() {
  const binary1 = document.getElementById('binary1').value.trim();
  const binary2 = document.getElementById('binary2').value.trim();
  const operation = document.getElementById('binaryOperation').value;
  
  if (!binary1 || !binary2) {
    document.getElementById('binaryCalcResult').innerText = 'Please enter both binary numbers';
    return;
  }
  
  // Validate binary numbers
  if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {
    document.getElementById('binaryCalcResult').innerText = 'Please enter valid binary numbers (only 0 and 1)';
    return;
  }
  
  const decimal1 = parseInt(binary1, 2);
  const decimal2 = parseInt(binary2, 2);
  
  let result, binaryResult;
  
  switch (operation) {
    case 'add':
      result = decimal1 + decimal2;
      break;
    case 'subtract':
      result = decimal1 - decimal2;
      break;
    case 'multiply':
      result = decimal1 * decimal2;
      break;
    case 'divide':
      if (decimal2 === 0) {
        document.getElementById('binaryCalcResult').innerText = 'Cannot divide by zero';
        return;
      }
      result = Math.floor(decimal1 / decimal2);
      break;
    default:
      document.getElementById('binaryCalcResult').innerText = 'Invalid operation';
      return;
  }
  
  if (result < 0) {
    binaryResult = '-' + Math.abs(result).toString(2);
  } else {
    binaryResult = result.toString(2);
  }
  
  const operationSymbol = {
    'add': '+',
    'subtract': '-',
    'multiply': '×',
    'divide': '÷'
  }[operation];
  
  document.getElementById('binaryCalcResult').innerText = 
    `${binary1} (${decimal1}) ${operationSymbol} ${binary2} (${decimal2}) = ${binaryResult} (${result})`;
}

function calculateHex() {
  const hex1 = document.getElementById('hex1').value.trim().toUpperCase();
  const hex2 = document.getElementById('hex2').value.trim().toUpperCase();
  const operation = document.getElementById('hexOperation').value;
  
  if (!hex1 || !hex2) {
    document.getElementById('hexCalcResult').innerText = 'Please enter both hexadecimal numbers';
    return;
  }
  
  // Validate hex numbers
  if (!/^[0-9A-F]+$/.test(hex1) || !/^[0-9A-F]+$/.test(hex2)) {
    document.getElementById('hexCalcResult').innerText = 'Please enter valid hexadecimal numbers (0-9, A-F)';
    return;
  }
  
  const decimal1 = parseInt(hex1, 16);
  const decimal2 = parseInt(hex2, 16);
  
  let result, hexResult;
  
  switch (operation) {
    case 'add':
      result = decimal1 + decimal2;
      break;
    case 'subtract':
      result = decimal1 - decimal2;
      break;
    case 'multiply':
      result = decimal1 * decimal2;
      break;
    case 'divide':
      if (decimal2 === 0) {
        document.getElementById('hexCalcResult').innerText = 'Cannot divide by zero';
        return;
      }
      result = Math.floor(decimal1 / decimal2);
      break;
    default:
      document.getElementById('hexCalcResult').innerText = 'Invalid operation';
      return;
  }
  
  if (result < 0) {
    hexResult = '-' + Math.abs(result).toString(16).toUpperCase();
  } else {
    hexResult = result.toString(16).toUpperCase();
  }
  
  const operationSymbol = {
    'add': '+',
    'subtract': '-',
    'multiply': '×',
    'divide': '÷'
  }[operation];
  
  document.getElementById('hexCalcResult').innerText = 
    `${hex1} (${decimal1}) ${operationSymbol} ${hex2} (${decimal2}) = ${hexResult} (${result})`;
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

// Data Storage Converter Functions
function convertStorage() {
  const value = parseFloat(document.getElementById('storageValue').value);
  const fromUnit = document.getElementById('storageFrom').value;
  const toUnit = document.getElementById('storageTo').value;
  const resultElement = document.getElementById('storageResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(value) || value < 0) {
    resultElement.innerText = 'Please enter a valid positive number';
    resultElement.classList.add('error');
    return;
  }
  
  if (fromUnit === toUnit) {
    resultElement.innerText = `${value} ${fromUnit} = ${value} ${toUnit}`;
    resultElement.classList.add('success');
    return;
  }
  
  // Convert to bytes first
  let bytes;
  switch (fromUnit) {
    case 'B':
      bytes = value;
      break;
    case 'KB':
      bytes = value * 1024;
      break;
    case 'MB':
      bytes = value * 1024 * 1024;
      break;
    case 'GB':
      bytes = value * 1024 * 1024 * 1024;
      break;
    case 'TB':
      bytes = value * 1024 * 1024 * 1024 * 1024;
      break;
    default:
      bytes = value;
  }
  
  // Convert from bytes to target unit
  let result;
  switch (toUnit) {
    case 'B':
      result = bytes;
      break;
    case 'KB':
      result = bytes / 1024;
      break;
    case 'MB':
      result = bytes / (1024 * 1024);
      break;
    case 'GB':
      result = bytes / (1024 * 1024 * 1024);
      break;
    case 'TB':
      result = bytes / (1024 * 1024 * 1024 * 1024);
      break;
    default:
      result = bytes;
  }
  
  resultElement.innerText = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
  resultElement.classList.add('success');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first calculator by default
  showSection('unit');
  
  // Initialize unit converter
  updateUnitOptions();
  
  // Load currencies
  loadCurrencies();
  

});
