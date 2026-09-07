let query = [];
let answer = '';

let numButtons = [];
let firstNum = true;
let howManyFirstNums = 0;

const doc = document;
let operatorButtons = [doc.querySelector(".equals"), doc.querySelector(".plus"), doc.querySelector(".minus"), doc.querySelector(".multiply"), doc.querySelector(".divide")];


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
        }
    }
}

function solveQuery(arr) {
    
}

/* ------------------------------ detect input ------------------------------ */

numButtons.forEach(button => {
    button.onclick = () => {
        let val = button.dataset.num;
        let numArr = [];
        if (firstNum === true) {
            numArr.push(val === '.' ? '.' : Number(val));
            query.push(numArr);
            firstNum = false;
        } else if (firstNum === false) {
            query[howManyFirstNums].push(val === '.' ? '.' : Number(val));
        }
        console.log(query);
    }
});

operatorButtons.forEach(button => {
    button.onclick = () => {
        if (button === doc.querySelector(".equals")) {
            solveQuery(query);
            getTotalNumber(query);
            console.log(query);
            query = [];
            howManyFirstNums = 0;
        } else {
            let operatorArray = [button.dataset.num];
            query.push(operatorArray);
            howManyFirstNums += 2;
        }
        firstNum = true;
        console.log(query);
    }
})


