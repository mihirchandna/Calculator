document.addEventListener("DOMContentLoaded", () => {
    const numberButtons=document.querySelectorAll('[data-number]');
    const operatorButtons=document.querySelectorAll('[data-operator]');
    const equalButton=document.getElementById('equals');
    const clearButton=document.getElementById('clear');
    const pointButton = document.getElementById('point');
    const lastOperationScreen=document.getElementById('lastOperationScreen');
    const currentOperationScreen=document.getElementById('currentOperationScreen');

    
    let firstNum='';
    let secondNum='';
    let operation=null;
    let shouldResetScreen=false;

    clearButton.addEventListener('click',clear);
    pointButton.addEventListener('click', appendPoint);
    equalButton.addEventListener('click',evaluate);


    numberButtons.forEach((button)=>
        button.addEventListener('click',()=> appendNumber(button.textContent))
    );

    operatorButtons.forEach((button)=>
        button.addEventListener('click',()=> setCurrentOperation(button.textContent))
    );

    function appendNumber(num)
    {
        if (currentOperationScreen.textContent === '0' || shouldResetScreen)
        {
            resetScreen();
        } 
        currentOperationScreen.textContent+=num;
    }

    function resetScreen() {
        currentOperationScreen.textContent = '';
        shouldResetScreen = false;
    }

    function setCurrentOperation(currOperation)
    {
        if(currOperation!=null)
        {
            evaluate();
        }
        firstNum=currentOperationScreen.textContent;
        operation=currOperation;
        lastOperationScreen.textContent=`${firstNum} ${operation}`;
        shouldResetScreen=true;
    }

    function clear()
    {
        currentOperationScreen.textContent='0';
        firstNum='';
        secondNum='';
        operation=null;
        lastOperationScreen.textContent='';
    }

    function appendPoint()
    {
        if (shouldResetScreen) resetScreen();
        if (currentOperationScreen.textContent === ''){
            currentOperationScreen.textContent = '0';
        }

        if (currentOperationScreen.textContent.includes('.')) return;

        currentOperationScreen.textContent+='.';
    }

    function evaluate() {
        if (operation === null || shouldResetScreen) return;
    
        if (operation === '/' && currentOperationScreen.textContent === '0') {
            alert("Error: Division by zero");
            clear();
            return;
        }
    
        secondNum = currentOperationScreen.textContent;
    
        currentOperationScreen.textContent = result(operation, firstNum, secondNum);
        lastOperationScreen.textContent = `${firstNum} ${operation} ${secondNum} =`;
        operation = null;
        shouldResetScreen = true;
    }
    

    function result(operator,firstNum,secondNum)
    {
        a=Number(firstNum);
        b=Number(secondNum);
        switch (operator){
            case '+':
                return a+b;
            case '-':
                return a-b;
            case '*':
                return a*b;
            case '/':
                if(b==0)
                {
                    return null;
                }
                return a/b;
            default:
                return null;
        }
    }
});
