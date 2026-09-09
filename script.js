let query = [];
let stringQuery;
let answer = '';

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

function positiveNegative() {

};

function updateScreen(value) {
    if (value === "answer") {
        input.textContent += ' ' + answer;
    }
    if (value === "clear") {
        input.innerHTML = "Awaiting Input<span>:</span>"
    } else if (input.textContent === "Awaiting Input:" && value !== "delete") {
        input.textContent = value;
    } else if (value !== "delete" && value !== "answer") {
        if (typeof value === "number") {
            input.textContent += value;
        } else if (typeof value === "string" && value === ".") {
            input.textContent += value;
        } else if (typeof value === "string") {
            input.textContent += ' ' + value + ' ';
        };
    } else if (value === "delete" && input.textContent !== "Awaiting Input:") {
        input.textContent = stringQuery.slice(0, -2);
        if (input.textContent.length === 0) {
            input.innerHTML = "Awaiting Input<span>:</span>";
        };
    };
    stringQuery = doc.querySelector(".input").textContent;
};


/* --------------------------------- solving -------------------------------- */

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
    };
});

operatorButtons.forEach(button => {
    button.onclick = () => {
        if (button === doc.querySelector(".equals")) {
            getTotalNumber(query);
            solveQuery();
            updateScreen(button.dataset.num);
            updateScreen("answer");
            query = [];
            answer = [];
            stringQuery = "";
            newLine = true;
        } else {
            let operatorArray = [button.dataset.num];
            query.push(operatorArray);
            updateScreen(button.dataset.num);
        };
        firstNum = true;
    };
});

specialButtons.forEach(button => {
    button.onclick = () => {
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
        } else if (button === doc.querySelector("positive-negative")) {

        };
    };
})

doc.querySelector(".screen p").onclick = () => {
    if (doc.querySelector(".starting") === null) {
        doc.querySelector(".screen p").classList.toggle("hidden");
    }
    doc.querySelector(".screen p").classList.remove("starting");
    doc.querySelector(".screen p").classList.toggle("os");
};

doc.addEventListener("touchstart", function() {}, false);