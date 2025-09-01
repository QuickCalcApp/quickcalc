function showSection(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function switchTab(tabName) {
  // Find the parent tab container
  const clickedButton = event.target;
  const parentContainer = clickedButton.closest('.calculator-tabs').parentElement;
  
  // Hide all tab contents in this container
  parentContainer.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  parentContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  const targetTab = document.getElementById(`${tabName}-tab`);
  if (targetTab) {
    targetTab.classList.add('active');
    clickedButton.classList.add('active');
  }
}

// Triangle Calculator Functions
function calculateTriangleArea() {
  const base = parseFloat(document.getElementById('base').value);
  const height = parseFloat(document.getElementById('height').value);
  const side1 = parseFloat(document.getElementById('side1').value);
  const side2 = parseFloat(document.getElementById('side2').value);
  const side3 = parseFloat(document.getElementById('side3').value);
  const resultElement = document.getElementById('triangleAreaResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
    resultElement.innerText = 'Please enter valid positive numbers for base and height';
    resultElement.classList.add('error');
    return;
  }
  
  if (isNaN(side1) || isNaN(side2) || isNaN(side3) || side1 <= 0 || side2 <= 0 || side3 <= 0) {
    resultElement.innerText = 'Please enter valid positive numbers for all sides';
    resultElement.classList.add('error');
    return;
  }
  
  // Check triangle inequality
  if (side1 + side2 <= side3 || side1 + side3 <= side2 || side2 + side3 <= side1) {
    resultElement.innerText = 'Invalid triangle: sides do not satisfy triangle inequality';
    resultElement.classList.add('error');
    return;
  }
  
  const area = 0.5 * base * height;
  const perimeter = side1 + side2 + side3;
  
  resultElement.innerText = 
    `Area: ${area.toFixed(4)} square units\nPerimeter: ${perimeter.toFixed(4)} units`;
  resultElement.classList.add('success');
}

function findMissingSide() {
  const sideA = parseFloat(document.getElementById('sideA').value);
  const sideB = parseFloat(document.getElementById('sideB').value);
  const sideC = parseFloat(document.getElementById('sideC').value);
  
  let result = '';
  
  if (!isNaN(sideA) && !isNaN(sideB) && isNaN(sideC) && sideA > 0 && sideB > 0) {
    // Find hypotenuse
    const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);
    result = `Hypotenuse (c) = √(${sideA}² + ${sideB}²) = √${sideA * sideA + sideB * sideB} = ${hypotenuse.toFixed(4)}`;
  } else if (!isNaN(sideA) && isNaN(sideB) && !isNaN(sideC) && sideA > 0 && sideC > 0 && sideC > sideA) {
    // Find leg b
    const legB = Math.sqrt(sideC * sideC - sideA * sideA);
    result = `Leg (b) = √(${sideC}² - ${sideA}²) = √${sideC * sideC - sideA * sideA} = ${legB.toFixed(4)}`;
  } else if (isNaN(sideA) && !isNaN(sideB) && !isNaN(sideC) && sideB > 0 && sideC > 0 && sideC > sideB) {
    // Find leg a
    const legA = Math.sqrt(sideC * sideC - sideB * sideB);
    result = `Leg (a) = √(${sideC}² - ${sideB}²) = √${sideC * sideC - sideB * sideB} = ${legA.toFixed(4)}`;
  } else {
    result = 'Please enter exactly two sides to find the third side';
  }
  
  document.getElementById('missingSideResult').innerText = result;
}

function findMissingAngle() {
  const angle1 = parseFloat(document.getElementById('angle1').value);
  const angle2 = parseFloat(document.getElementById('angle2').value);
  const angle3 = parseFloat(document.getElementById('angle3').value);
  
  let result = '';
  
  if (!isNaN(angle1) && !isNaN(angle2) && isNaN(angle3)) {
    const missingAngle = 180 - angle1 - angle2;
    if (missingAngle > 0) {
      result = `Missing angle = 180° - ${angle1}° - ${angle2}° = ${missingAngle.toFixed(2)}°`;
    } else {
      result = 'Invalid angles: sum exceeds 180°';
    }
  } else if (!isNaN(angle1) && isNaN(angle2) && !isNaN(angle3)) {
    const missingAngle = 180 - angle1 - angle3;
    if (missingAngle > 0) {
      result = `Missing angle = 180° - ${angle1}° - ${angle3}° = ${missingAngle.toFixed(2)}°`;
    } else {
      result = 'Invalid angles: sum exceeds 180°';
    }
  } else if (isNaN(angle1) && !isNaN(angle2) && !isNaN(angle3)) {
    const missingAngle = 180 - angle2 - angle3;
    if (missingAngle > 0) {
      result = `Missing angle = 180° - ${angle2}° - ${angle3}° = ${missingAngle.toFixed(2)}°`;
    } else {
      result = 'Invalid angles: sum exceeds 180°';
    }
  } else {
    result = 'Please enter exactly two angles to find the third angle';
  }
  
  document.getElementById('missingAngleResult').innerText = result;
}

// Circle Calculator Functions
function calculateCircle() {
  const radius = parseFloat(document.getElementById('radius').value);
  const diameter = parseFloat(document.getElementById('diameter').value);
  const resultElement = document.getElementById('circleResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  let r;
  if (!isNaN(radius) && radius > 0) {
    r = radius;
  } else if (!isNaN(diameter) && diameter > 0) {
    r = diameter / 2;
  } else {
    resultElement.innerText = 'Please enter a valid positive radius or diameter';
    resultElement.classList.add('error');
    return;
  }
  
  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;
  
  resultElement.innerText = 
    `Radius: ${r.toFixed(4)} units\nArea: ${area.toFixed(4)} square units\nCircumference: ${circumference.toFixed(4)} units`;
  resultElement.classList.add('success');
}

function calculateSector() {
  const radius = parseFloat(document.getElementById('sectorRadius').value);
  const angle = parseFloat(document.getElementById('sectorAngle').value);
  const resultElement = document.getElementById('sectorResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(radius) || isNaN(angle) || radius <= 0 || angle <= 0 || angle > 360) {
    resultElement.innerText = 'Please enter valid positive numbers (radius > 0, 0 < angle ≤ 360)';
    resultElement.classList.add('error');
    return;
  }
  
  const sectorArea = (angle / 360) * Math.PI * radius * radius;
  const arcLength = (angle / 360) * 2 * Math.PI * radius;
  
  resultElement.innerText = 
    `Sector Area: ${sectorArea.toFixed(4)} square units\nArc Length: ${arcLength.toFixed(4)} units`;
  resultElement.classList.add('success');
}

function calculateSegment() {
  const radius = parseFloat(document.getElementById('segmentRadius').value);
  const height = parseFloat(document.getElementById('segmentHeight').value);
  const resultElement = document.getElementById('segmentResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0 || height >= 2 * radius) {
    resultElement.innerText = 'Please enter valid numbers (radius > 0, 0 < height < 2×radius)';
    resultElement.classList.add('error');
    return;
  }
  
  const segmentArea = radius * radius * Math.acos((radius - height) / radius) - (radius - height) * Math.sqrt(2 * radius * height - height * height);
  
  resultElement.innerText = `Segment Area: ${segmentArea.toFixed(4)} square units`;
  resultElement.classList.add('success');
}

// Area Calculator Functions (2D Shapes)
function calculateRectangleArea() {
  const length = parseFloat(document.getElementById('rectLength').value);
  const width = parseFloat(document.getElementById('rectWidth').value);
  
  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    document.getElementById('rectangleAreaResult').innerText = 'Please enter valid length and width (positive numbers)';
    return;
  }
  
  const area = length * width;
  const perimeter = 2 * (length + width);
  
  document.getElementById('rectangleAreaResult').innerText = 
    `Area = ${length} × ${width} = ${area.toFixed(4)} square units\nPerimeter = 2 × (${length} + ${width}) = ${perimeter.toFixed(4)} units`;
}

function calculateSquareArea() {
  const side = parseFloat(document.getElementById('squareSide').value);
  
  if (isNaN(side) || side <= 0) {
    document.getElementById('squareAreaResult').innerText = 'Please enter a valid side length (positive number)';
    return;
  }
  
  const area = side * side;
  const perimeter = 4 * side;
  
  document.getElementById('squareAreaResult').innerText = 
    `Area = ${side}² = ${area.toFixed(4)} square units\nPerimeter = 4 × ${side} = ${perimeter.toFixed(4)} units`;
}

function calculateTriangleArea2D() {
  const base = parseFloat(document.getElementById('triangleBase').value);
  const height = parseFloat(document.getElementById('triangleHeight').value);
  
  if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
    document.getElementById('triangleArea2DResult').innerText = 'Please enter valid base and height (positive numbers)';
    return;
  }
  
  const area = 0.5 * base * height;
  
  document.getElementById('triangleArea2DResult').innerText = 
    `Area = ½ × ${base} × ${height} = ${area.toFixed(4)} square units`;
}

function calculateCircleArea() {
  const radius = parseFloat(document.getElementById('circleRadius').value);
  
  if (isNaN(radius) || radius <= 0) {
    document.getElementById('circleAreaResult').innerText = 'Please enter a valid radius (positive number)';
    return;
  }
  
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  
  document.getElementById('circleAreaResult').innerText = 
    `Area = π × ${radius}² = ${area.toFixed(4)} square units\nCircumference = 2π × ${radius} = ${circumference.toFixed(4)} units`;
}

function calculateParallelogramArea() {
  const base = parseFloat(document.getElementById('paraBase').value);
  const height = parseFloat(document.getElementById('paraHeight').value);
  
  if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
    document.getElementById('parallelogramAreaResult').innerText = 'Please enter valid base and height (positive numbers)';
    return;
  }
  
  const area = base * height;
  
  document.getElementById('parallelogramAreaResult').innerText = 
    `Area = ${base} × ${height} = ${area.toFixed(4)} square units`;
}

function calculateTrapezoidArea() {
  const base1 = parseFloat(document.getElementById('trapBase1').value);
  const base2 = parseFloat(document.getElementById('trapBase2').value);
  const height = parseFloat(document.getElementById('trapHeight').value);
  
  if (isNaN(base1) || isNaN(base2) || isNaN(height) || base1 <= 0 || base2 <= 0 || height <= 0) {
    document.getElementById('trapezoidAreaResult').innerText = 'Please enter valid bases and height (positive numbers)';
    return;
  }
  
  const area = 0.5 * (base1 + base2) * height;
  
  document.getElementById('trapezoidAreaResult').innerText = 
    `Area = ½ × (${base1} + ${base2}) × ${height} = ${area.toFixed(4)} square units`;
}

function calculateEllipseArea() {
  const a = parseFloat(document.getElementById('ellipseA').value);
  const b = parseFloat(document.getElementById('ellipseB').value);
  
  if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
    document.getElementById('ellipseAreaResult').innerText = 'Please enter valid semi-axes (positive numbers)';
    return;
  }
  
  const area = Math.PI * a * b;
  
  document.getElementById('ellipseAreaResult').innerText = 
    `Area = π × ${a} × ${b} = ${area.toFixed(4)} square units`;
}

function calculatePolygonArea() {
  const sides = parseInt(document.getElementById('polygonSides').value);
  const sideLength = parseFloat(document.getElementById('polygonSideLength').value);
  
  if (isNaN(sides) || isNaN(sideLength) || sides < 3 || sideLength <= 0) {
    document.getElementById('polygonAreaResult').innerText = 'Please enter valid number of sides (≥3) and side length (positive)';
    return;
  }
  
  // FIXED: More accurate polygon area calculation
  const perimeter = sides * sideLength;
  // Apothem = side length / (2 * tan(π/n))
  const apothem = sideLength / (2 * Math.tan(Math.PI / sides));
  const area = 0.5 * perimeter * apothem;
  
  // Alternative formula: Area = (n × s²) / (4 × tan(π/n))
  const altArea = (sides * sideLength * sideLength) / (4 * Math.tan(Math.PI / sides));
  
  document.getElementById('polygonAreaResult').innerText = 
    `Area = ½ × ${perimeter.toFixed(4)} × ${apothem.toFixed(4)} = ${area.toFixed(4)} square units\n` +
    `Alternative: Area = (${sides} × ${sideLength}²) / (4 × tan(π/${sides})) = ${altArea.toFixed(4)} square units`;
}

// Volume Calculator Functions (3D Shapes)
function calculateCubeVolume() {
  const side = parseFloat(document.getElementById('cubeSide').value);
  
  if (isNaN(side) || side <= 0) {
    document.getElementById('cubeVolumeResult').innerText = 'Please enter a valid side length (positive number)';
    return;
  }
  
  const volume = side * side * side;
  const surfaceArea = 6 * side * side;
  
  document.getElementById('cubeVolumeResult').innerText = 
    `Volume = ${side}³ = ${volume.toFixed(4)} cubic units\nSurface Area = 6 × ${side}² = ${surfaceArea.toFixed(4)} square units`;
}

function calculateRectangularVolume() {
  const length = parseFloat(document.getElementById('rectLengthVol').value);
  const width = parseFloat(document.getElementById('rectWidthVol').value);
  const height = parseFloat(document.getElementById('rectHeightVol').value);
  
  if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
    document.getElementById('rectangularVolumeResult').innerText = 'Please enter valid length, width, and height (positive numbers)';
    return;
  }
  
  const volume = length * width * height;
  const surfaceArea = 2 * (length * width + length * height + width * height);
  
  document.getElementById('rectangularVolumeResult').innerText = 
    `Volume = ${length} × ${width} × ${height} = ${volume.toFixed(4)} cubic units\nSurface Area = 2 × (${length}×${width} + ${length}×${height} + ${width}×${height}) = ${surfaceArea.toFixed(4)} square units`;
}

function calculateCylinderVolume() {
  const radius = parseFloat(document.getElementById('cylinderRadius').value);
  const height = parseFloat(document.getElementById('cylinderHeight').value);
  
  if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) {
    document.getElementById('cylinderVolumeResult').innerText = 'Please enter valid radius and height (positive numbers)';
    return;
  }
  
  const volume = Math.PI * radius * radius * height;
  const surfaceArea = 2 * Math.PI * radius * (radius + height);
  
  document.getElementById('cylinderVolumeResult').innerText = 
    `Volume = π × ${radius}² × ${height} = ${volume.toFixed(4)} cubic units\nSurface Area = 2π × ${radius} × (${radius} + ${height}) = ${surfaceArea.toFixed(4)} square units`;
}

function calculateSphereVolume() {
  const radius = parseFloat(document.getElementById('sphereRadius').value);
  
  if (isNaN(radius) || radius <= 0) {
    document.getElementById('sphereVolumeResult').innerText = 'Please enter a valid radius (positive number)';
    return;
  }
  
  const volume = (4/3) * Math.PI * radius * radius * radius;
  const surfaceArea = 4 * Math.PI * radius * radius;
  
  document.getElementById('sphereVolumeResult').innerText = 
    `Volume = (4/3)π × ${radius}³ = ${volume.toFixed(4)} cubic units\nSurface Area = 4π × ${radius}² = ${surfaceArea.toFixed(4)} square units`;
}

function calculateConeVolume() {
  const radius = parseFloat(document.getElementById('coneRadius').value);
  const height = parseFloat(document.getElementById('coneHeight').value);
  
  if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) {
    document.getElementById('coneVolumeResult').innerText = 'Please enter valid radius and height (positive numbers)';
    return;
  }
  
  const volume = (1/3) * Math.PI * radius * radius * height;
  const slantHeight = Math.sqrt(radius * radius + height * height);
  const surfaceArea = Math.PI * radius * (radius + slantHeight);
  
  document.getElementById('coneVolumeResult').innerText = 
    `Volume = (1/3)π × ${radius}² × ${height} = ${volume.toFixed(4)} cubic units\nSurface Area = π × ${radius} × (${radius} + ${slantHeight.toFixed(4)}) = ${surfaceArea.toFixed(4)} square units`;
}

function calculatePyramidVolume() {
  const baseArea = parseFloat(document.getElementById('pyramidBaseArea').value);
  const height = parseFloat(document.getElementById('pyramidHeight').value);
  
  if (isNaN(baseArea) || isNaN(height) || baseArea <= 0 || height <= 0) {
    document.getElementById('pyramidVolumeResult').innerText = 'Please enter valid base area and height (positive numbers)';
    return;
  }
  
  const volume = (1/3) * baseArea * height;
  
  document.getElementById('pyramidVolumeResult').innerText = 
    `Volume = (1/3) × ${baseArea} × ${height} = ${volume.toFixed(4)} cubic units`;
}

function calculateTriangularPrismVolume() {
  const baseArea = parseFloat(document.getElementById('triPrismBase').value);
  const height = parseFloat(document.getElementById('triPrismHeight').value);
  
  if (isNaN(baseArea) || isNaN(height) || baseArea <= 0 || height <= 0) {
    document.getElementById('triangularPrismVolumeResult').innerText = 'Please enter valid base area and height (positive numbers)';
    return;
  }
  
  const volume = baseArea * height;
  
  document.getElementById('triangularPrismVolumeResult').innerText = 
    `Volume = ${baseArea} × ${height} = ${volume.toFixed(4)} cubic units`;
}

function calculateEllipsoidVolume() {
  const a = parseFloat(document.getElementById('ellipsoidA').value);
  const b = parseFloat(document.getElementById('ellipsoidB').value);
  const c = parseFloat(document.getElementById('ellipsoidC').value);
  
  if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
    document.getElementById('ellipsoidVolumeResult').innerText = 'Please enter valid semi-axes (positive numbers)';
    return;
  }
  
  const volume = (4/3) * Math.PI * a * b * c;
  
  document.getElementById('ellipsoidVolumeResult').innerText = 
    `Volume = (4/3)π × ${a} × ${b} × ${c} = ${volume.toFixed(4)} cubic units`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first calculator by default
  showSection('triangle');
});