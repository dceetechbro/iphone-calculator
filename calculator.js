let currentCalculation = '';
const display = document.getElementById('display');

function addToCalculation(value) {
    if (currentCalculation === '0' && value !== '.') {
        currentCalculation = value;
    } else {
        currentCalculation += value;
    }
    updateDisplay();
}

function updateDisplay() {
    
    display.value = currentCalculation || '0';

    console.log(display.value)
};

function clearDisplay() {
    currentCalculation = '';
    updateDisplay();
} 

function toggleSign() {
    if (currentCalculation && currentCalculation !== '0') {
        currentCalculation = currentCalculation.startsWith('-') 
            ? currentCalculation.slice(1) 
            : '-' + currentCalculation;
        updateDisplay();
    }
}

function percent() {
    if (currentCalculation && currentCalculation !== '0') {
        currentCalculation = (eval(currentCalculation) / 100).toString();
        updateDisplay();
    }
}

function calculate() {
    try {
        let expression = currentCalculation
            .replace('×', '*')
            .replace('÷', '/');
        currentCalculation = eval(expression).toString();
        updateDisplay();
        console.log(currentCalculation)
    } catch (error) {
        currentCalculation = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (/[0-9]/.test(event.key)) {
        addToCalculation(event.key);
    } else if (event.key === '.') {
        addToCalculation('.');
    } else if (event.key === '+') {
        addToCalculation('+');
    } else if (event.key === '-') {
        addToCalculation('-');
    } else if (event.key === '*') {
        addToCalculation('×');
    } else if (event.key === '/') {
        addToCalculation('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === '%') {
        percent();
    } else if (event.key === 's') { // Added 's' for toggle sign
        toggleSign();
    }
});