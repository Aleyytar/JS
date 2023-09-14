const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue ='0';
let firstvalue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay(){
    display.value=displayValue;
}


keys.addEventListener('click',function(e){
    const element = e.target;

    if(!element.matches('button')) return;
        
    if(element.classList.contains('operator')){
        console.log('operator', element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')){
        // console.log('decimal', element.value);
        inputDecimal(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')){
        //console.log('decimal', element.value);
        clear();
        updateDisplay();
        return;
    }
    
    // console.log('number',element.value);

    inputNumber(element.value);
    updateDisplay();

});


function inputNumber(num){
    if(waitingForSecondValue ){
        displayValue = num;
        waitingForSecondValue = false;
    }else{
        displayValue=displayValue === '0'? num: displayValue + num;

    }
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        
        displayValue+='.';
    }
    
}

function clear(){
    displayValue='0';
}

function handleOperator(nextoperator){
    const value = parseFloat(displayValue);

    if(operator&&waitingForSecondValue){
        operator = nextoperator;
        return;
    }


    if(firstvalue === null){
        firstvalue = value;
    }else if (operator){
        const result = calculate(firstvalue,value,operator);
        displayValue = String(result);
        firstvalue = result;
    }

    waitingForSecondValue = true;
    operator= nextoperator;

}

function calculate(first , second , operator){
    if(operator === '+'){
        return first + second;
    }else if (operator === '-'){
        return first + second ;
    }else if (operator === '*'){
        return first * second ;
    }else if (operator === '/'){
        return first / second;
    }
}