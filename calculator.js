let query = [];
let stringQuery = "";
let answer = "";
let previousAnswer = "";

let numButtons = [];
let firstNum = true;
let newLine = false;

let parenthesis = 'left';

const doc = document;
let input = doc.querySelector(".input");
let operatorButtons = [doc.querySelector(".equals"), doc.querySelector(".plus"), doc.querySelector(".minus"), doc.querySelector(".multiply"), doc.querySelector(".divide")];

let specialButtons = [doc.querySelector(".delete"), doc.querySelector(".clear"), doc.querySelector(".parenthesis"), doc.querySelector(".positive-negative")]


function getNumButtons(arr) {
    for (let i = 0; i <= 10; i++) {
        if (i === 10) {
            arr.push(document.querySelector('.dot'));
        } else {
            arr.push(document.querySelector('.num' + i));
        }
    };
};

getNumButtons(numButtons);


function getTotalNumber(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) === true) {
            arr[i] = Number(arr[i].join(""));
        };
    };
};

function positiveNegative(arr) {
    let last = arr[arr.length - 1];
    if (Array.isArray(last)) {
        if (last[0] === "-") {
            last.shift();
            updateScreen("remove negative");
        } else {
            last.unshift("-");
            updateScreen("add negative");
        }
    }
};

function updateScreen(value) {
    let lastSpace;
    lastSpace = stringQuery.lastIndexOf(" ") + 1;
    if (value === "answer") {
        input.textContent += ' ' + answer;
    }
    if (value === "previous answer") {
        input.textContent = previousAnswer;
    } else if (value === "clear") {
        input.innerHTML = "Awaiting Input<span>:</span>"
    } else if (input.textContent === "Awaiting Input:" && value !== "delete") {
        input.textContent = value;
    } else if (value !== "delete" && value !== "answer" && value !== "remove negative" && value !== "add negative") {
        if (typeof value === "number") {
            input.textContent += value;
        } else if (typeof value === "string" && value === ".") {
            input.textContent += value;
        } else if (typeof value === "string") {
            input.textContent += ' ' + value + ' ';
        };
    } else if (value === "delete" && input.textContent !== "Awaiting Input:") {
        if (stringQuery[stringQuery.length - 2] === " ") {
            input.textContent = stringQuery.slice(0, -2);
        } else {
            input.textContent = stringQuery.slice(0, -1);
        }
        if (input.textContent.length === 0) {
            input.innerHTML = "Awaiting Input<span>:</span>";
        };
    } else if (value === "add negative") {
        stringQuery = stringQuery.slice(0, lastSpace) + "-" + stringQuery.slice(lastSpace);
        input.textContent = input.textContent.slice(0, lastSpace) + "-" + input.textContent.slice(lastSpace);
        console.log(stringQuery);
    } else if (value === "remove negative") {
        stringQuery = stringQuery.slice(0, lastSpace) + stringQuery.slice(lastSpace + 1);
        input.textContent = input.textContent.slice(0, lastSpace) + input.textContent.slice(lastSpace + 1);
    }
    stringQuery = doc.querySelector(".input").textContent;
};


/* --------------------------------- solving -------------------------------- */

function checkOperatorSyntax(arr, opValue) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "string" && typeof arr[i + 1] === "string") {
            console.log("two operators");
        }
    }
    if (query.length === 0) {
        if (opValue[0] === "+") {
            if (previousAnswer > 0) {
                updateScreen("previous answer");
            }
        } else if (opValue[0] === "-") {
            if (previousAnswer > 0) {
                updateScreen("previous answer");
            }
        } else if (opValue[0] === "*") {
            if (previousAnswer > 0) {
                updateScreen("previous answer");
            }
         } else if (opValue[0] === "/") {
            if (previousAnswer > 0) {
                updateScreen("previous answer");
            }
        }
        arr.unshift(previousAnswer);
    }
}

function solveQuery() {
    answer = eval(stringQuery);
}

/* ------------------------------ adding new p ------------------------------ */

function addNewInput() {
    doc.querySelector(".screen .input").classList.remove("input");
    const el = doc.createElement("p");
    el.classList.add("input");
    el.innerHTML = "Awaiting Input<span>:</span>";
    p = doc.querySelector(".screen").appendChild(el);
    input = doc.querySelector(".input");
    newLine = false;
}

/* ------------------------------ detect input ------------------------------ */

numButtons.forEach(button => {
    button.onclick = () => {
        let val = button.dataset.num === "." ? "." : Number(button.dataset.num);
        let numArr = [];
        if (newLine === true) {
            addNewInput()
        }
        if (firstNum === true) {
            numArr.push(val === '.' ? '.' : val);
            query.push(numArr);
            firstNum = false;
        } else if (firstNum === false) {
            query[query.length - 1].push(val === '.' ? '.' : val);
        };
        updateScreen(val);
        console.log(query);
        console.log(stringQuery);
    };
});

operatorButtons.forEach(button => {
    button.onclick = () => {
        if (newLine === true) {
            addNewInput()
        }
        if (button === doc.querySelector(".equals")) {
            getTotalNumber(query);
            solveQuery();
            updateScreen(button.dataset.num);
            updateScreen("answer");
            console.log(stringQuery);
            query = [];
            previousAnswer = answer;
            answer = [];
            stringQuery = "";
            newLine = true;
        } else {
            let operatorArray = [button.dataset.num];
            checkOperatorSyntax(query, operatorArray);
            query.push(operatorArray);
            updateScreen(button.dataset.num);
        };
        firstNum = true;
    };
});

specialButtons.forEach(button => {
    button.onclick = () => {
        if (newLine === true) {
            addNewInput()
        }
        if (button === doc.querySelector(".delete")) {
            query[query.length - 1].pop();
            updateScreen("delete");
        } else if (button === doc.querySelector(".clear")) {
            query = [];
            answer = [];
            stringQuery = "";
            firstNum = true;
            newLine = false;
            parenthesis = 'left';
            updateScreen("clear");
        } else if (button === doc.querySelector(".parenthesis")) {
        let parenthesisArray = [];
        if (parenthesis === 'left' && query.length === 0) {
            parenthesisArray = "(";
            query.push(parenthesisArray);
            parenthesis = 'right';
        } else if (parenthesis === 'left') {
            parenthesisArray = "(";
            query.push(parenthesisArray);
            parenthesis = 'right';
            firstNum = true;
        } else {
            parenthesisArray = ")";
            query.push(parenthesisArray);
            parenthesis = 'left';
            firstNum = true;
        }
        updateScreen(parenthesisArray);
        } else if (button === doc.querySelector(".positive-negative")) {
            positiveNegative(query);
        };
    };
})

/* ----------------------- dectecting keyboard presses ---------------------- */

let keyCodes = {
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    88: "*",
    187: "=",
    13: "=",
    189: "-",
    191: "/",
    78: "positive-negative",
    27: "clear",
    8: "delete",
    190: "."
}

let holdShift = false;

// for all keys
doc.addEventListener("keydown", e => {
    logKey(e);
    let key = keyCodes[e.keyCode];
    if (key === 187 && holdShift === true) {
        console.log("+");
    } else if (key) {
        console.log(key);
    }
});
// for shift
doc.addEventListener("keyup", logUp);

function logKey(e) {
    if (e.keyCode === 16) {
        holdShift = true;
    }
    if (e.key !== 16) {
        decodeInput(e.keyCode);
    }
}
function logUp(e) {
    if (e.keyCode === 16) {
        holdShift = false;
    }
}

function decodeInput(key) {
    let decodedKey;
    if (key >= 48 && key <= 57) {
        decodedKey = key - 48;
        sendInput(decodedKey);
    } else if (decodedKey === 9 && holdShift === true) {
        decodedKey = "(";
        sendOpInput(decodedKey);
    } else if (decodedKey === 0 && holdShift === true) {
        decodedKey = ")";
        sendOpInput(decodedKey);
    } else if (key === 88) {
        decodedKey = "*";
        sendOpInput(decodedKey);
    } else if (key === 187 && holdShift === false) {
        decodedKey = "=";
        sendOpInput(decodedKey);
    } else if (key === 13) {
        decodedKey = "=";
        sendOpInput(decodedKey);
    } else if (key === 187 && holdShift === true) {
        decodedKey = "+";
        sendOpInput(decodedKey);
    } else if (key === 189 && holdShift === false) {
        decodedKey = "-";
        sendOpInput(decodedKey);
    } else if (key === 191) {
        decodedKey = "/";
        sendOpInput(decodedKey);
    } else if (key === 27) {
        decodedKey = "clear";
        sendSpecialInput(decodedKey);
    } else if (key === 8) {
        decodedKey = "delete";
        sendSpecialInput(decodedKey);
    } else if (key === 78) {
        decodedKey = "positive-negative";
        sendSpecialInput(decodedKey);
    } else if (key === 190) {
        decodedKey = ".";
        sendInput(decodedKey);
    }
    animateButton(decodedKey);
}

function animateButton(key) {
    doc.addEventListener("keydown", logKey);
    doc.addEventListener("keyup", logUp);
}

function sendInput(key) {
        let arr = [];
        if (newLine === true) {
            addNewInput()
        }
        if (firstNum === true) {
            arr.push(key);
            query.push(arr);
            firstNum = false;
        } else if (firstNum === false) {
            query[query.length - 1].push(key);
        };
        updateScreen(key);
}

function sendOpInput(key) {
    if (newLine === true) {
            addNewInput()
        }
    if (key === "=") {
        getTotalNumber(query);
        solveQuery();
        updateScreen("=");
        updateScreen("answer");
        query = [];
        previousAnswer = answer;
        answer = [];
        stringQuery = "";
        newLine = true;
    } else {
        let operatorArray = [key];
        checkOperatorSyntax(query, operatorArray);
        query.push(operatorArray);
        updateScreen(key);
    };
    firstNum = true;
}

function sendSpecialInput(key) {
    if (newLine === true) {
            addNewInput()
        }
        if (key === "delete") {
            query[query.length - 1].pop();
            updateScreen("delete");
        } else if (key === "clear") {
            query = [];
            answer = [];
            stringQuery = "";
            firstNum = true;
            newLine = false;
            parenthesis = 'left';
            updateScreen("clear");
        } else if (key === "positive-negative") {
            positiveNegative(query);
        };
}

/* ---------------------- detecting touchscreen clicks ---------------------- */

doc.querySelector(".screen p").onclick = () => {
    if (doc.querySelector(".starting") === null) {
        doc.querySelector(".screen p").classList.toggle("hidden");
    }
    doc.querySelector(".screen p").classList.remove("starting");
    doc.querySelector(".screen p").classList.toggle("os");
};

doc.addEventListener("touchstart", function() {}, false);