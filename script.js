let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.getElementById('screen');

function buttonClick(value) {

    if(isNaN(value)){
        // this is not a number
        handleSymbol(value);
    }else{
        //this is a number
        handleNumber(value);
    }

    screen.innerText = buffer;

}

function handleSymbol(symbol){

    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length == 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '.':
                buffer += symbol;
                break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
            
    }

}

function handleMath(symbol) {
   if(buffer === "0"){
    return;
   }

   const intNum = parseFloat(buffer);
   if(runningTotal === 0){
     runningTotal = intNum;
   }else{
    flushOperation(intNum);
   }

   previousOperator = symbol;

   buffer = "0";
}


function flushOperation(intNum){
   

    if(previousOperator === '+'){
        runningTotal +=  intNum;
    }else if(previousOperator === '-'){
        runningTotal -= intNum;
    }else if(previousOperator === 'x'){
        runningTotal *= intNum;
    }else{
        runningTotal /= intNum;
    }


}


function handleNumber(number){
    // const num = parseInt(number);

    if(buffer === "0"){
        buffer = number;
    }else{
        buffer = buffer + number;
    }

}



function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', (event) => {
        buttonClick(event.target.innerText);
    })
}

init();