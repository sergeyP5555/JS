let firstBlockQuestions = { // Вопросы легкого уровня(1-5)
    0: {
        "question": "Где, если верить пословице, любопытной Варваре нос оторвали?",
        "options": ["На реке", "На базаре", "В квартире", "На даче"],
        "correctAnswer": "На базаре",
    },
    1: {
        "question": "В какую одежду принято плакать, чтобы вызвать сочувствие?",
        "options": ["В пальто", "В шапку", "В жилетку", "В макасины"],
        "correctAnswer": "В жилетку",
    },
    2: {
        "question": "Какое прозвище носил король Англии Ричард I?",
        "options": ["Прекрасноволосый", "Великий", "Вялый Меч", "Львиное Сердце"],
        "correctAnswer": "Львиное Сердце",
    },
    3: {
        "question": "Как называют манекенщицу супер-класса?",
        "options": ["Красотка", "Топ-манекенщица", "Топ-модель", "Леди"],
        "correctAnswer": "Топ-модель",
    },
    4: {
        "question": "Какое из этих украшений можно встретить на новогодней ёлке?",
        "options": ["Браслет", "Гирлянда", "Калье", "Серьги"],
        "correctAnswer": "Гирлянда",
    }
};
let secondBlockQuestions = {  // Вопросы среднего уровня (5-10)
    0: {
        "question": "Какой цвет получается при смешении синего и красного?",
        "options": ["Фиолетовый", "Оранжевый", "Зеленый", "Коричневый"],
        "correctAnswer": "Фиолетовый",
    },
    1: {
        "question": "Из какого мяса традиционно готовится начинка для чебуреков?",
        "options": ["Свинина", "Курица", "Баранина", "Медвежатина"],
        "correctAnswer": "Баранина",
    },
    2: {
        "question": "Какая из перечисленных башен самая низкая?",
        "options": ["Останкинская", "Эйфелева", "Пизанская", "Спасская"],
        "correctAnswer": "Пизанская",
    },
    3: {
        "question": "Чему равна сумма углов треугольника?",
        "options": ["90 градусов", "100 градусов", "180 градусов", "360 градусов"],
        "correctAnswer": "180 градусов",
    },
    4: {
        "question": "Какой напиток получают из сахарного тростника?",
        "options": ["Кальвадос", "Ром", "Виски", "Джин"],
        "correctAnswer": "Ром",
    }
};
let thirdBlockQuestions = { //Вопросы сложного уровня (10-15)
    0: {
        "question": "Чем, по словам Огурцова, героя кинофильма \"Карнавальная ночь\", не воспитаешь зрителя?",
        "options": ["Руками", "Громким бассом", "Пылким взглядом", "Голыми ногами"],
        "correctAnswer": "Голыми ногами",
    },
    1: {
        "question": "Как звали невесту Эдмона Дантеса, будущего графа Монте-Кристо?",
        "options": ["София", "Мерседес", "Виолета", "Вальда"],
        "correctAnswer": "Мерседес",
    },
    2: {
        "question": "Разновидностью какого минерала является горный хрусталь?",
        "options": ["Кварц", "Галоид", "Карбид", "Топаз"],
        "correctAnswer": "Кварц",
    },
    3: {
        "question": "На самолёте какого авиаконструктора экипаж Валерия Чкалова совершил первый беспосадочный перелёт из СССР в США?",
        "options": ["Антонова", "Ильюшина", "Яковлева", "Туполева"],
        "correctAnswer": "Туполева",
    },
    4: {
        "question": "Кто 1-м получил Нобелевскую премию по литературе?",
        "options": ["Романист", "Драматург", "Поэт", "Эссеист"],
        "correctAnswer": "Поэт",
    }
};

//Запись ответов для каждого генерируемого вопроса......................................................................

let questionNumber;
let pastQuestionNumbers = [];
let countPastQuestion = 1;
let questionBlock;
let confirmedAmount = 0;
let isGameIsEnded = false;
nextQuestion();

function nextQuestion()
{
    if (isGameIsEnded)
    {
        return;
    }

    clearBody();

    if (countPastQuestion == 5 || countPastQuestion == 10) {
        confirmedAmount = (countPastQuestion == 5) ? '1,000' : '32,000';
    } else if (countPastQuestion == 16) {
        confirmedAmount = '1,000,000';
        endGame();
        return ;
    }

    if (countPastQuestion == 6 || countPastQuestion == 11) {
        pastQuestionNumbers = [];
    }

    if (countPastQuestion <= 5) {
        questionBlock = firstBlockQuestions;
    } else if (countPastQuestion > 5 && countPastQuestion <= 10) {
        questionBlock = secondBlockQuestions;
    } else {
        questionBlock = thirdBlockQuestions;
    }
    document.querySelectorAll('.issue_price li')[15 - countPastQuestion].classList.add('active');
    questionNumber = getRandomNumber(0, 4, pastQuestionNumbers);
    pastQuestionNumbers.push(questionNumber);
    document.querySelector('.question').innerHTML = questionBlock[questionNumber].question;
    document.querySelector('#answ_A').value = 'A: ' + questionBlock[questionNumber].options[0];
    document.querySelector('#answ_B').value = 'B: ' + questionBlock[questionNumber].options[1];
    document.querySelector('#answ_C').value = 'C: ' + questionBlock[questionNumber].options[2];
    document.querySelector('#answ_D').value = 'D: ' + questionBlock[questionNumber].options[3];
    let answerButtons = document.querySelectorAll('.answ_options');
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener(`click`, checkCorrectAnswer);
    }
}

// Генератор рандомного вопроса.........................................................................................

function getRandomNumber(min, max, pastQuestionNumbers) {
    let questionNumber;
    do {
        questionNumber = Math.floor((Math.random() * (max - min + 1)) + min);

    } while (pastQuestionNumbers.includes(questionNumber))
    return questionNumber;
}

// Проверка на правильный ответ
function checkCorrectAnswer(event) {
    let isCorrectAnswer = checkAnswer(event.currentTarget, questionBlock[questionNumber]);
    choiceOfAnswer(event.currentTarget, isCorrectAnswer);
}

function endGame() {

    clearBody();
    if (confirmedAmount == '1,000' || confirmedAmount == '32,000') {
        document.querySelector(".answer").innerHTML = "Вы проиграли!";
        document.querySelector('.question').innerHTML = "Ваш выигрыш составил " + confirmedAmount + " грн.";
    } else if(confirmedAmount != 0) {
        document.querySelector(".answer").innerHTML = "Поздравляем!";
        document.querySelector('.question').innerHTML = "Ваш выигрыш составил " + confirmedAmount + " грн.";
    } else {
        document.querySelector(".answer").innerHTML = "Вы проиграли!";
        document.querySelector(".current_prize").innerHTML = "Ваша сумма сгорела!";
    }
    isGameIsEnded = true;
    clearButtons();
}

function clearButtons()
{
    document.querySelectorAll('.answ_options').forEach(function (item) {
        item.remove();
    });
    document.querySelectorAll('.help_btn').forEach(function (item) {
        item.remove();
    });
}

function clearBody()
{
    document.querySelectorAll(".answ_options").forEach(function (item) {
        item.style.opacity = '1';
        item.removeAttribute('disabled');
        item.style.background = 'linear-gradient(rgba(200,143,246,1) 0%, rgba(105,5,158,1) 50%, rgba(4,0,29,1) 100%)';
    });
    document.querySelectorAll('.issue_price li').forEach(function (item) {
        item.classList.remove('active');
    });
    document.querySelector(".answer").innerHTML = "";
}

// Проверка правильного ответа..........................................................................................

function checkAnswer(element, currentQuestion) {
    let answer = element.value.slice(3, element.value.length);
    if (answer == currentQuestion.correctAnswer) {
        return true;
    } else {
        return false;
    }
}

//Подсветка правильного/неправильного ответа + запись в итоговую сумму..................................................

function choiceOfAnswer(element, isCorrectAnswer) {
    element.style.background = "yellow";
    setTimeout(function () {
        if (isCorrectAnswer) {
            element.style.background = "green";
            document.querySelector(".answer").innerHTML = "Правильно!";
            if (confirmedAmount == 0) {
                document.querySelector(".current_prize").innerHTML = "Ваш выйгрыш: " + `${document.querySelectorAll('.issue_price li')[15 - countPastQuestion].innerText}` + " грн.";
            } else {
                document.querySelector(".current_prize").innerHTML = "Ваш выйгрыш: " + `${document.querySelectorAll('.issue_price li')[15 - countPastQuestion].innerText}` + " грн. <br>Несгораемая сумма: " + confirmedAmount + " грн.";
            }

        } else {
            element.style.background = "red";
            endGame();
        }
    }, 3000);
    setTimeout(function () {
        countPastQuestion ++;
        nextQuestion();
    }, 5000);
}

// Подсказка "50:50"......................................................................................................

document.querySelector("#fifty_fifty").addEventListener('click', event => {
    let correctAnswer = questionBlock[questionNumber].options.indexOf(questionBlock[questionNumber].correctAnswer);
    let hideAnswerArray = [];
    do {
        let random = Math.floor(Math.random() * 4);
        if (random != correctAnswer && !hideAnswerArray.includes(random)) {
            hideAnswerArray.push(random);
        }
    } while (hideAnswerArray.length < 2);

    for (let i = 0; i < hideAnswerArray.length; i++) {
        switch (hideAnswerArray[i]) {
            case 0:
                document.querySelector("#answ_A").style.opacity = '0';
                document.querySelector("#answ_A").setAttribute('disabled', '');
                break;
            case 1:
                document.querySelector("#answ_B").style.opacity = '0';
                document.querySelector("#answ_B").setAttribute('disabled', '');
                break;
            case 2:
                document.querySelector("#answ_C").style.opacity = '0';
                document.querySelector("#answ_C").setAttribute('disabled', '');
                break;
            case 3:
                document.querySelector("#answ_D").style.opacity = '0';
                document.querySelector("#answ_D").setAttribute('disabled', '');
                break;
        }
    }

    document.querySelector("#fifty_fifty").remove();

});

//Проверка на убранные элементы после подсказки "50:50"...................................................................

function checkHiddenAnswers()
{
    let hiddenAnswersArray = [];
    if (document.querySelector("#answ_A").style.opacity == '0') {
        hiddenAnswersArray.push(0)
    }
    if (document.querySelector("#answ_B").style.opacity == '0') {
        hiddenAnswersArray.push(1)
    }
    if (document.querySelector("#answ_C").style.opacity == '0') {
        hiddenAnswersArray.push(2)
    }
    if (document.querySelector("#answ_D").style.opacity == '0') {
        hiddenAnswersArray.push(3)
    }
    return hiddenAnswersArray;
}

//Подсказка "Звонок другу"................................................................................................

document.querySelector("#call_friend").addEventListener('click', event => {
    chooseRandomHelpAnswer("#call_friend");
});

//Подсказка "Помощь зала".................................................................................................

document.querySelector("#hall_help").addEventListener('click', event => {
    chooseRandomHelpAnswer("#hall_help");
});

function chooseRandomHelpAnswer(blockId)
{
    let random;
    do {
        random = Math.floor(Math.random() * 4);
    } while (checkHiddenAnswers().includes(random));
    switch (random){
        case 0:
            document.querySelector("#answ_A").style.background = "blue";
            break;
        case 1:
            document.querySelector("#answ_B").style.background = "blue";
            break;
        case 2:
            document.querySelector("#answ_C").style.background = "blue";
            break;
        case 3:
            document.querySelector("#answ_D").style.background = "blue";
            break;
    }
    document.querySelector(blockId).remove();
}