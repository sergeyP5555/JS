function getResult() {
    let min = Number(document.getElementById("numberFrom").value);
    let max = Number(document.getElementById("numberTo").value);
    let count = Number(document.getElementById("numberAmount").value);
    let generation = [];
    if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(count)) {
        document.getElementById("conclusion").value = "Введите числа!";
        return;
    }
    for (let i = 0; i < count; i++) {
        userNumber = Math.floor((Math.random() * (max - min + 1)) + min);
        generation.push(userNumber);
    }
    if (min > max){
        generation = "Введите корректные значения для 'От' и 'До'";
    }
    document.getElementById("conclusion").value = generation.toString();
}
