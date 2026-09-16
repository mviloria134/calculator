const operation = {
    num1: 0,
    num2: 0,
    operator: "",
    finished: false
};

const display = document.querySelector("#calc-display");
const buttonContainer = document.querySelector("#buttons");
const decimalButton = document.querySelector('.decimal');

function updateDisplay(num) {
    display.value = num;
    if (display.value.includes(".")) {
        decimalButton.disabled = true;
    }
    else {
        decimalButton.disabled = false;
    }
}

function negateNumber(numLabel) {
    operation[numLabel] = operation[numLabel] * -1;
    updateDisplay(operation[numLabel]);
}

function appendNumberOnto(numLabel, toAppend) {
    if (!operation[numLabel]) {
        operation[numLabel] = toAppend;
    }
    else {
        operation[numLabel] = operation[numLabel] + toAppend;
    }
    updateDisplay(operation[numLabel]);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, num2, operator) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    switch (operator) {
        case "+":
            return add(n1, n2);

        case "-":
            return subtract(n1, n2);

        case "*":
            return multiply(n1, n2);
        
        case "/":
            return divide(n1, n2);
    
        default:
            return n1;
    }
}

function resetOperation(prevResult = 0, finished = false) {
    operation.num1 = prevResult;
    operation.num2 = 0;
    operation.operator = "";
    operation.finished = finished;

    updateDisplay(operation.num1);
}

window.addEventListener("load", () => updateDisplay(operation.num1));

buttonContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const buttonText = event.target.textContent.toLowerCase()
        switch (buttonText) {
            case "c":
                resetOperation();
                break;

            case "+":
            case "-":
            case "*":
            case "/":
                if (operation.operator) {
                    resetOperation(operate(operation.num1, operation.num2, operation.operator));
                }
                operation.finished = false;
                operation.operator = buttonText;
                break;

            case "+/-":
                if (!operation.operator) {
                    negateNumber("num1");
                }
                else {
                    negateNumber("num2");
                }
                break;

            case "=":
                resetOperation(operate(operation.num1, operation.num2, operation.operator), true);
                break;

            default:
                if (operation.finished) {
                    resetOperation();
                }
                if (!operation.operator) {
                    appendNumberOnto("num1", buttonText);
                }
                else {
                    appendNumberOnto("num2", buttonText);
                }
                break;
        }
    }
});