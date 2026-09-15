const operation = {
    num1: 0,
    num2: 0,
    operator: ""
};

const display = document.querySelector("#calc-display");
const buttonContainer = document.querySelector("#buttons");

function updateDisplay(num) {
    display.value = num;
}

function appendNumberOnto(numLabel, toAppend) {
    operation[numLabel] = operation[numLabel] * 10 + toAppend;
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
    switch (operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return multiply(num1, num2);
        
        case "/":
            return divide(num1, num2);
    
        default:
            break;
    }
}

function resetOperation(prevResult = 0) {
    operation.num1 = prevResult;
    operation.num2 = 0;
    operation.operator = "";

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
                if (!operation.operator) {
                    operation.operator = buttonText;
                    updateDisplay(operation.num2);
                }
                else {
                    resetOperation(operate(operation.num1, operation.num2, operation.operator));
                }
                break;

            case "+/-":
                break;

            case ".":
                break;

            case "=":
                resetOperation(operate(operation.num1, operation.num2, operation.operator));
                break;

            default:
                if (!operation.operator) {
                    appendNumberOnto("num1", parseInt(buttonText));
                }
                else {
                    appendNumberOnto("num2", parseInt(buttonText));
                }
                break;
        }
    }
});