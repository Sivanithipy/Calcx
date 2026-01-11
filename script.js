const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

function isOperator(char) {
    return "+-*/".includes(char);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;
        const lastChar = display.value.slice(-1);

        if (value === "C") {
            display.value = "";
            return;
        }

        if (value === "=") {
            try {
                display.value = eval(display.value);
            } catch {
                display.value = "ERROR";
                setTimeout(() => display.value = "", 1500);
            }
            return;
        }

        if (!isNaN(value)) {
            display.value += value;
        }
        else if (isOperator(value)) {
            if (display.value === "" || isOperator(lastChar)) return;
            display.value += value;
        }
        else if (value === ".") {
            const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
            if (lastNumber.includes(".")) return;
            display.value += value;
        }
    });
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    const lastChar = display.value.slice(-1);

    if (!isNaN(key)) {
        display.value += key;
    }
    else if (isOperator(key)) {
        if (display.value === "" || isOperator(lastChar)) return;
        display.value += key;
    }
    else if (key === ".") {
        const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes(".")) return;
        display.value += key;
    }
    else if (key === "%") {
        const value = display.value;
        const match = value.match(/(\d+\.?\d*)$/);
        if (!match) return;
        const number = match[0];
        display.value = value.replace(number, number / 100);
    }
    else if (key === "Enter") {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "ERROR";
            setTimeout(() => display.value = "", 1500);
        }
    }
    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
    else if (key === "Escape") {
        display.value = "";
    }
});
