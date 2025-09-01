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

// Grade Calculator Functions
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
  button.parentElement.remove();
}

function calcWeightedGrade() {
  const assignments = document.querySelectorAll('.assignment-row');
  let totalWeightedScore = 0;
  let totalWeight = 0;
  let breakdown = '';
  
  assignments.forEach((assignment, index) => {
    const score = parseFloat(assignment.querySelector('.assignment-score').value);
    const total = parseFloat(assignment.querySelector('.assignment-total').value);
    const weight = parseFloat(assignment.querySelector('.assignment-weight').value);
    const name = assignment.querySelector('.assignment-name').value || `Assignment ${index + 1}`;
    
    if (!isNaN(score) && !isNaN(total) && !isNaN(weight) && total > 0) {
      const percentage = (score / total) * 100;
      const weightedScore = percentage * (weight / 100);
      totalWeightedScore += weightedScore;
      totalWeight += weight;
      breakdown += `${name}: ${percentage.toFixed(2)}% × ${weight}% = ${weightedScore.toFixed(2)}%\n`;
    }
  });
  
  if (totalWeight === 0) {
    document.getElementById('weightedGradeResult').innerText = 'Please enter valid assignment data';
    return;
  }
  
  const finalGrade = totalWeightedScore;
  let letterGrade = '';
  
  if (finalGrade >= 90) letterGrade = 'A';
  else if (finalGrade >= 80) letterGrade = 'B';
  else if (finalGrade >= 70) letterGrade = 'C';
  else if (finalGrade >= 60) letterGrade = 'D';
  else letterGrade = 'F';
  
  document.getElementById('weightedGradeResult').innerText = 
    `Final Grade: ${finalGrade.toFixed(2)}% (${letterGrade})\n\nBreakdown:\n${breakdown}`;
}

function addCourse() {
  const container = document.getElementById('courses-container');
  const newRow = document.createElement('div');
  newRow.className = 'course-row';
  newRow.innerHTML = `
    <input type="text" placeholder="Course Name" class="course-name">
    <select class="course-grade">
      <option value="4.0">A (4.0)</option>
      <option value="3.7">A- (3.7)</option>
      <option value="3.3">B+ (3.3)</option>
      <option value="3.0">B (3.0)</option>
      <option value="2.7">B- (2.7)</option>
      <option value="2.3">C+ (2.3)</option>
      <option value="2.0">C (2.0)</option>
      <option value="1.7">C- (1.7)</option>
      <option value="1.3">D+ (1.3)</option>
      <option value="1.0">D (1.0)</option>
      <option value="0.0">F (0.0)</option>
    </select>
    <input type="number" placeholder="Credit Hours" class="course-credits" step="0.5" min="0">
    <button onclick="removeCourse(this)" class="remove-btn">×</button>
  `;
  container.appendChild(newRow);
}

function removeCourse(button) {
  button.parentElement.remove();
}

function calcGPA() {
  const courses = document.querySelectorAll('.course-row');
  let totalGradePoints = 0;
  let totalCredits = 0;
  let breakdown = '';
  
  courses.forEach((course, index) => {
    const grade = parseFloat(course.querySelector('.course-grade').value);
    const credits = parseFloat(course.querySelector('.course-credits').value);
    const name = course.querySelector('.course-name').value || `Course ${index + 1}`;
    
    if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
      const gradePoints = grade * credits;
      totalGradePoints += gradePoints;
      totalCredits += credits;
      breakdown += `${name}: ${grade} × ${credits} = ${gradePoints.toFixed(1)}\n`;
    }
  });
  
  if (totalCredits === 0) {
    document.getElementById('gpaResult').innerText = 'Please enter valid course data';
    return;
  }
  
  const gpa = totalGradePoints / totalCredits;
  
  document.getElementById('gpaResult').innerText = 
    `GPA: ${gpa.toFixed(2)}\nTotal Grade Points: ${totalGradePoints.toFixed(1)}\nTotal Credits: ${totalCredits.toFixed(1)}\n\nBreakdown:\n${breakdown}`;
}

// Percent Error Calculator Functions
function calculatePercentError() {
  const experimental = parseFloat(document.getElementById('experimentalValue').value);
  const theoretical = parseFloat(document.getElementById('theoreticalValue').value);
  const resultElement = document.getElementById('percentErrorResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(experimental) || isNaN(theoretical)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (theoretical === 0) {
    resultElement.innerText = 'Theoretical value cannot be zero';
    resultElement.classList.add('error');
    return;
  }
  
  const percentError = Math.abs((experimental - theoretical) / theoretical) * 100;
  resultElement.innerText = `Percent Error: ${percentError.toFixed(4)}%`;
  resultElement.classList.add('success');
}

// Half-Life Calculator Functions
function calculateHalfLife() {
  const initialAmount = parseFloat(document.getElementById('initialAmount').value);
  const finalAmount = parseFloat(document.getElementById('finalAmount').value);
  const timeElapsed = parseFloat(document.getElementById('timeElapsed').value);
  const timeUnit = document.getElementById('timeUnit').value;
  const resultElement = document.getElementById('halfLifeResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(initialAmount) || isNaN(finalAmount) || isNaN(timeElapsed)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (initialAmount <= 0 || finalAmount <= 0 || timeElapsed <= 0) {
    resultElement.innerText = 'All values must be positive';
    resultElement.classList.add('error');
    return;
  }
  
  if (finalAmount >= initialAmount) {
    resultElement.innerText = 'Final amount must be less than initial amount';
    resultElement.classList.add('error');
    return;
  }
  
  // FIXED: Use natural logarithm (ln) instead of log base 2
  const halfLife = timeElapsed / Math.log(initialAmount / finalAmount) * Math.log(2);
  
  resultElement.innerText = `Half-Life: ${halfLife.toFixed(4)} ${timeUnit}`;
  resultElement.classList.add('success');
}

function calculateTimeElapsed() {
  const halfLife = parseFloat(document.getElementById('hlTime').value);
  const initialAmount = parseFloat(document.getElementById('initialAmountTime').value);
  const finalAmount = parseFloat(document.getElementById('finalAmountTime').value);
  const timeUnit = document.getElementById('timeUnitTime').value;
  const resultElement = document.getElementById('timeElapsedResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(halfLife) || isNaN(initialAmount) || isNaN(finalAmount)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (halfLife <= 0 || initialAmount <= 0 || finalAmount <= 0) {
    resultElement.innerText = 'All values must be positive';
    resultElement.classList.add('error');
    return;
  }
  
  if (finalAmount >= initialAmount) {
    resultElement.innerText = 'Final amount must be less than initial amount';
    resultElement.classList.add('error');
    return;
  }
  
  // FIXED: Use natural logarithm (ln) instead of log base 2
  const timeElapsed = halfLife * Math.log(initialAmount / finalAmount) / Math.log(2);
  
  resultElement.innerText = `Time Elapsed: ${timeElapsed.toFixed(4)} ${timeUnit}`;
  resultElement.classList.add('success');
}

function calculateRemainingAmount() {
  const halfLife = parseFloat(document.getElementById('hlRemaining').value);
  const initialAmount = parseFloat(document.getElementById('initialAmountRemaining').value);
  const timeElapsed = parseFloat(document.getElementById('timeElapsedRemaining').value);
  const timeUnit = document.getElementById('timeUnitRemaining').value;
  const resultElement = document.getElementById('remainingAmountResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(halfLife) || isNaN(initialAmount) || isNaN(timeElapsed)) {
    resultElement.innerText = 'Please enter valid numbers';
    resultElement.classList.add('error');
    return;
  }
  
  if (halfLife <= 0 || initialAmount <= 0 || timeElapsed < 0) {
    resultElement.innerText = 'Half-life and initial amount must be positive, time elapsed must be non-negative';
    resultElement.classList.add('error');
    return;
  }
  
  const remainingAmount = initialAmount * Math.pow(0.5, timeElapsed / halfLife);
  
  resultElement.innerText = `Remaining Amount: ${remainingAmount.toFixed(4)}`;
  resultElement.classList.add('success');
}

// Quadratic Formula Calculator Functions
function solveQuadratic() {
  const a = parseFloat(document.getElementById('coefficientA').value);
  const b = parseFloat(document.getElementById('coefficientB').value);
  const c = parseFloat(document.getElementById('coefficientC').value);
  
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    document.getElementById('quadraticResult').innerText = 'Please enter valid coefficients';
    return;
  }
  
  if (a === 0) {
    document.getElementById('quadraticResult').innerText = 'Coefficient a cannot be zero (not a quadratic equation)';
    return;
  }
  
  const discriminant = b * b - 4 * a * c;
  let result = `Equation: ${a}x² + ${b}x + ${c} = 0\nDiscriminant: Δ = ${b}² - 4(${a})(${c}) = ${discriminant}\n\n`;
  
  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    result += `Two real roots:\nx₁ = (-${b} + √${discriminant}) / (2 × ${a}) = ${x1.toFixed(4)}\nx₂ = (-${b} - √${discriminant}) / (2 × ${a}) = ${x2.toFixed(4)}`;
  } else if (discriminant === 0) {
    const x = -b / (2 * a);
    result += `One real root (double root):\nx = -${b} / (2 × ${a}) = ${x.toFixed(4)}`;
  } else {
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
    result += `Two complex roots:\nx₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i\nx₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`;
  }
  
  document.getElementById('quadraticResult').innerText = result;
}

// Matrix Calculator Functions
function calculateDeterminant() {
  const a11 = parseFloat(document.getElementById('a11').value);
  const a12 = parseFloat(document.getElementById('a12').value);
  const a21 = parseFloat(document.getElementById('a21').value);
  const a22 = parseFloat(document.getElementById('a22').value);
  const resultElement = document.getElementById('determinantResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(a11) || isNaN(a12) || isNaN(a21) || isNaN(a22)) {
    resultElement.innerText = 'Please enter valid numbers for all matrix elements';
    resultElement.classList.add('error');
    return;
  }
  
  const determinant = a11 * a22 - a12 * a21;
  
  resultElement.innerHTML = `
    <strong>Matrix:</strong><br>
    [${a11} ${a12}]<br>
    [${a21} ${a22}]<br><br>
    <strong>Determinant:</strong> det(A) = ${a11} × ${a22} - ${a12} × ${a21} = ${determinant.toFixed(4)}
  `;
  resultElement.classList.add('success');
}

function calculateInverse() {
  const a11 = parseFloat(document.getElementById('inv11').value);
  const a12 = parseFloat(document.getElementById('inv12').value);
  const a21 = parseFloat(document.getElementById('inv21').value);
  const a22 = parseFloat(document.getElementById('inv22').value);
  const resultElement = document.getElementById('inverseResult');
  
  // Clear previous classes
  resultElement.classList.remove('success', 'error');
  
  if (isNaN(a11) || isNaN(a12) || isNaN(a21) || isNaN(a22)) {
    resultElement.innerText = 'Please enter valid numbers for all matrix elements';
    resultElement.classList.add('error');
    return;
  }
  
  const determinant = a11 * a22 - a12 * a21;
  
  if (determinant === 0) {
    resultElement.innerText = 'Matrix is not invertible (determinant = 0)';
    resultElement.classList.add('error');
    return;
  }
  
  const inv11 = a22 / determinant;
  const inv12 = -a12 / determinant;
  const inv21 = -a21 / determinant;
  const inv22 = a11 / determinant;
  
  resultElement.innerHTML = `
    <strong>Original Matrix:</strong><br>
    [${a11} ${a12}]<br>
    [${a21} ${a22}]<br><br>
    <strong>Inverse Matrix:</strong><br>
    [${inv11.toFixed(4)} ${inv12.toFixed(4)}]<br>
    [${inv21.toFixed(4)} ${inv22.toFixed(4)}]
  `;
  resultElement.classList.add('success');
}

function multiplyMatrices() {
  const ma11 = parseFloat(document.getElementById('ma11').value);
  const ma12 = parseFloat(document.getElementById('ma12').value);
  const ma21 = parseFloat(document.getElementById('ma21').value);
  const ma22 = parseFloat(document.getElementById('ma22').value);
  
  const mb11 = parseFloat(document.getElementById('mb11').value);
  const mb12 = parseFloat(document.getElementById('mb12').value);
  const mb21 = parseFloat(document.getElementById('mb21').value);
  const mb22 = parseFloat(document.getElementById('mb22').value);
  
  if (isNaN(ma11) || isNaN(ma12) || isNaN(ma21) || isNaN(ma22) ||
      isNaN(mb11) || isNaN(mb12) || isNaN(mb21) || isNaN(mb22)) {
    document.getElementById('multiplicationResult').innerText = 'Please enter all matrix elements';
    return;
  }
  
  const result11 = ma11 * mb11 + ma12 * mb21;
  const result12 = ma11 * mb12 + ma12 * mb22;
  const result21 = ma21 * mb11 + ma22 * mb21;
  const result22 = ma21 * mb12 + ma22 * mb22;
  
  document.getElementById('multiplicationResult').innerText = 
    `[${ma11} ${ma12}; ${ma21} ${ma22}] × [${mb11} ${mb12}; ${mb21} ${mb22}] = [${result11.toFixed(4)} ${result12.toFixed(4)}; ${result21.toFixed(4)} ${result22.toFixed(4)}]`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Show first calculator by default
  showSection('grade');
});
