
function clearScreen() {
    document.getElementById("result").value = "";
}
function display(value) {
    document.getElementById("result").value += value;
}

function calculate() {
    let x = document.getElementById("result").value;
    x = getStringWithCalculatedPercent(x);
    let result;
    if (x.indexOf('%') !== -1) {
        result = getArrayWithPercent(x);
    } else {
        result = getArrayWithSigns(x);
    }
    document.getElementById("result").value = result;
}

function getArrayWithPercent(string) {  // Подсчет '%' со знаками '+' и '-'
    let countPercents = 0;
    for (let i = 0; i < string.length; i ++) {
        if (string[i] == '%') {
            countPercents ++;
        }
    }

    let result = 0;

    for (let i = 0; i<countPercents; i++) {
        let percentPosition = 0;
        let percentSign = false;
        let percentSignPosition = 0;

        for (let i = string.length - 1; i >= 0; i--) {
            if (string[i] == '%') {
                percentPosition = i;
                percentSign = true;
            }
            if (percentSign && (string[i] == '+' || string[i] == '-')) {
                percentSignPosition = i;
                percentSign = false;
            }
        }
        let preparedString = string.slice(0, percentSignPosition);
        let percent = string.slice(percentSignPosition, percentPosition);
        let percentValue = string.slice(percentSignPosition + 1, percentPosition);
        let calculatedString = getArrayWithSigns(preparedString);
        let calculatedPercent = calculatedString * percentValue / 100;
        switch (percent[0]) {
            case '+':
                result = calculatedString + calculatedPercent;
                break;
            case '-':
                result = calculatedString - calculatedPercent;
                break;
        }
        string = result + string.slice(percentPosition + 1, string.length);
    }
    return result;
}

function getStringWithCalculatedPercent(string) {  // Подсчет % с знаками '/' , '*'
    let percentPosition = 0;
    let percentSign = false;
    let foundPercent = false;
    let percentSignPosition = 0;
    let argumentPosition = 0;
    let percentsArray = [];
    for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] == '%') {
            percentPosition = i;
            percentSign = true;
        } else if (percentSign && (string[i] == '+' || string[i] == '-')) {
            percentSign = false;
            foundPercent = false;
        } else if (percentSign && (string[i] == '*' || string[i] == '/')) {
            percentSignPosition = i;
            percentSign = false;
            foundPercent = true;
        } else if (foundPercent && typeof string[i-1] === 'undefined'){
            foundPercent = false;
            argumentPosition = i;
            percentsArray.push(string.slice(argumentPosition, percentPosition));
        } else if (foundPercent && (string[i] == '*' || string[i] == '/' || string[i] == '+' || string[i] == '-')){
            foundPercent = false;
            argumentPosition = i + 1;
            percentsArray.push(string.slice(argumentPosition, percentPosition));
        }
    }
    console.log(string);

    for (let i = 0; i < percentsArray.length; i++) {
        if (percentsArray[i].indexOf('*') !== -1) {
            let percentResult = percentsArray[i].split('*');
            percentResult = percentResult[0] * (percentResult[0] * percentResult[1] / 100);
            string = string.replace(percentsArray[i]+'%', percentResult);
        } else {
            let percentResult = percentsArray[i].split('/');
            percentResult = percentResult[0] * percentResult[0] / (percentResult[0] * percentResult[1] / 100);
            string = string.replace(percentsArray[i]+'%', percentResult);
        }
    }

    return string;
}

function getArrayWithSigns(string) {  // записываем массив знаков и чисел.
    let result = 0;
    let number = '';
    let numbersArr = [];
    let operandArr = [];

    let arr = string.split('');
    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i]) || arr[i] == '.'){
            number += arr[i];
        } else {
            numbersArr.push(Number(number));
            number = '';
            operandArr.push(arr[i]);
        }
    }
    numbersArr.push(Number(number));

    for (let i = 0; i < operandArr.length; i++) {
        switch (operandArr[i]) {
            case '*':
                numbersArr[i+1] = numbersArr[i] * numbersArr[i+1];
                numbersArr[i] = null;
                break;
            case '/':
                numbersArr[i+1] = numbersArr[i] / numbersArr[i+1];
                numbersArr[i] = null;
                break;
        }
    }

    for (let i = numbersArr.length-1; i >= 0; i--) {
        if (numbersArr[i] === null) {
            numbersArr.splice(i,1);
        }
    }

    for (let i = operandArr.length - 1; i >= 0; i-- ) {
        if (operandArr[i] == '*' || operandArr[i] == '/') {
            operandArr.splice(i,1);
        }
    }

    for (let i = 0; i < operandArr.length; i++) {  // делаем рассчет со знаками '+' и '-'
        switch (operandArr[i]) {
            case '+':
                numbersArr[i+1] = numbersArr[i] + numbersArr[i+1];
                break;
            case '-':
                numbersArr[i+1] = numbersArr[i] - numbersArr[i+1];
                break;
        }
    }

    result = numbersArr[numbersArr.length - 1];

    return result.toFixed(2)/1;
}