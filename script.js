const buttons = document.querySelectorAll('button');
const display = document.getElementById('calculator_input');

let firstValue = ''; // Initialize as empty string to build the number
let operator = '';
let secondValue = '';
let result = null; // To store the result of an operation
let awaitingNextNumber = false; // Flag to indicate if we're waiting for the second number
let displayValue = display.value;

//Defining the maths functions
function addition(firstValue, secondValue){
    const result = parseFloat(firstValue) + parseFloat(secondValue);
    return result;
}

function subtraction(firstValue, secondValue){
    const result = parseFloat(firstValue) - parseFloat(secondValue);
    return result;
}

function multiplication(firstValue, secondValue){
    const result = parseFloat(firstValue) * parseFloat(secondValue);
    return result;
}

function division(firstValue, secondValue){

    if(secondValue === 0){
        return "Cannot divide by zero";
    } else {
        const result = parseFloat(firstValue) / parseFloat(secondValue);
        return result;
    }
}


//Function to do the calculation

function calculate(firstValue, operator, secondValue){
    if(operator === '+'){
        result = addition(firstValue, secondValue);
        return result;
    } else if(operator === '-'){
        result = subtraction(firstValue, secondValue);
        return result;
    } else if(operator === 'x'){
        result = multiplication(firstValue, secondValue);
        return result;
    } else if(operator === '/'){
        result = division(firstValue, secondValue);
        return result;
    }
}

function clearAll(){
    display.value = "";
}

function clearLastDigit(){
    displayValue = buttons.textContent;
    display.value = displayValue.slice(0, -4);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {

        const buttonText = button.textContent; // Declares buttonText variable to  be used later on.

        //When we click number button for the first time
        if(button.classList.contains('number')){
            //When we click number button for the first time and there is no next number awaited
            if(awaitingNextNumber === false){
                if(result !== null){
                    result = null;
                } else {
                    firstValue += buttonText;
                    display.value = firstValue;
                    displayValue = display.value;
                }
            } else if (awaitingNextNumber === true){ // When operator button is already pressed an next number is awaited 
                if(result === null && operator !== ''){ // When operator button exist but no previous result exist so this is first calculation
                    secondValue += buttonText; 
                    display.value = firstValue + ' ' + operator + ' ' + secondValue + ' ';
                    }
                else if (result !== null && operator !== ''){ //When operator button exist and result also exist so this is calculation after first calculation.
                    firstValue = result;
                    secondValue = '';
                    secondValue += buttonText
                    display.value = firstValue + ' ' + operator + ' ' + secondValue;
                    result = null;
                } else if (result !== null && operator === ''){
                    display.value = '';
                    display.value += buttonText;
                }
            }
            
        } else if (button.classList.contains('operator')){
            
            if(firstValue === '' && result === null){ // When there is no first Value
                display.value = 'Please enter a number first';
                
            } else if(firstValue !== ''&& secondValue === ''){ //When we are doing first calculation
                operator = buttonText;
                awaitingNextNumber = true;
                display.value = firstValue + ' ' + operator + ' '; 
                
            } else if (result !== null){// When we have a result and we want to continue calculation
                operator = buttonText;
                display.value = result + ' ' + operator ;
                awaitingNextNumber = true; 
                
            
            } else if (result === null && firstValue !== '' && secondValue !== ''){ // When we dont have a result we have only entered the numbers and operator but we want to continue long calculation with operator instead of equal
                result = calculate(firstValue, operator, secondValue);
                operator = buttonText;
                console.log(operator);
                display.value = result + ' ' + operator + '';
                firstValue = result;
                secondValue = '';
                awaitingNextValue = false;
            }
                
        } else if (button.classList.contains('equals')){
            result = calculate(firstValue, operator, secondValue);
            display.value = result;
            firstValue = '';
            secondValue = '';
            awaitingNextNumber = false;
            
        } else if (button.classList.contains('clear-all')){
            display.value = '';
            firstValue = '';
            secondValue = '';
            operator = '';
            result = null;
            awaitingNextNumber = false;
            
        } else if (button.classList.contains('clear-last')){
            displayValue = display.value;
            let lastDigitRemovedValue = displayValue.slice(0,-1);
            console.log(lastDigitRemovedValue);
            displayValue = lastDigitRemovedValue;
            display.value = displayValue;
        }
    });
})