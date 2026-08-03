const display = document.getElementById("display");
const history = document.getElementById("history");

let historyList = [];
let currentInput = "";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let justCalculated = false;

// Update display
function updateDisplay(value) {
    display.textContent = value === "" ? "0" : value;
}

// Number buttons
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        // Start new calculation after equals
        if (justCalculated) {
            currentInput = "";
            firstNumber = null;
            operator = null;
            justCalculated = false;
        }

        // Start typing second number
        if (waitingForSecondNumber) {
            currentInput = "";
            waitingForSecondNumber = false;
        }

        currentInput += value;
        updateDisplay(currentInput);
    });
});

// Decimal button
document.querySelector(".decimal").addEventListener("click", () => {

    if (justCalculated) {
        currentInput = "";
        firstNumber = null;
        operator = null;
        justCalculated = false;
    }

    if (waitingForSecondNumber) {
        currentInput = "0";
        waitingForSecondNumber = false;
    }

    if (!currentInput.includes(".")) {
        if (currentInput === "") {
            currentInput = "0";
        }

        currentInput += ".";
        updateDisplay(currentInput);
    }
});

// Clear button
document.querySelector(".clear").addEventListener("click", () => {

    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    justCalculated = false;

    updateDisplay("");
});

// Delete button
document.querySelector(".delete").addEventListener("click", () => {

    if (justCalculated) return;

    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
});
// Equals button
document.querySelector(".equals").addEventListener("click", () => {

    if (
        operator === null ||
        waitingForSecondNumber ||
        currentInput === ""
    ) return;

    const secondNumber = Number(currentInput);

    let result = calculate(
        firstNumber,
        secondNumber,
        operator
    );

    if (result === "Error") {

        updateDisplay("Error");

        currentInput = "";
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        justCalculated = true;

        return;
    }

    result = Number(result.toFixed(10));

    historyList.unshift(
        `${firstNumber} ${operator} ${secondNumber} = ${result}`
    );

    historyList = historyList.slice(0, 5);

    history.innerHTML = historyList.join("<br>");

    updateDisplay(result);

    currentInput = result.toString();

    firstNumber = result;

    operator = null;

    waitingForSecondNumber = false;

    justCalculated = true;

});
//percent button
document.querySelector(".percent").addEventListener("click", () => {

    if (currentInput === "") return;

    currentInput = (Number(currentInput) / 100).toString();

    updateDisplay(currentInput);

});
//plusMinus button
document.querySelector(".plusMinus").addEventListener("click", () => {

    if (currentInput === "") return;

    currentInput = (-Number(currentInput)).toString();

    updateDisplay(currentInput);

});
// Keyboard Support
document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers
    if (!isNaN(key)) {
        document.querySelectorAll(".number").forEach(btn => {
            if (btn.textContent.trim() === key) {
                btn.click();
            }
        });
    }

    // Decimal
    if (key === ".") {
        document.querySelector(".decimal").click();
    }

    // Operators
    if (["+", "-", "*", "/"].includes(key)) {
        document.querySelectorAll(".operator").forEach(btn => {
            if (btn.textContent.trim() === key) {
                btn.click();
            }
        });
    }

    // Enter
    if (key === "Enter" || key === "=") {
        e.preventDefault();
        document.querySelector(".equals").click();
    }

    // Backspace
    if (key === "Backspace") {
        document.querySelector(".delete").click();
    }

    // Escape
    if (key === "Escape") {
        document.querySelector(".clear").click();
    }

});