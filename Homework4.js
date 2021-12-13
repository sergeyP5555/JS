/*
Задание No1. Дочерние элементы в DOM
Для страницы:
    <html>
    <body>
    <div>Пользователи:</div>
    <ul>
        <li>Джон</li>
        <li>Пит</li>
    </ul>
    </body>
    </html>
Как получить:
• Напишите код, который получит элемент <div>?
• Напишите код, который получит <ul>?
• Напишите код, который получит второй <li> (с именем Пит)?*/

/*let firstQuestion = document.body.firstElementChild; // Или document.body.firstElementChild.innerText;
console.log(firstQuestion);
let secondQuestion = document.body.firstElementChild.nextElementSibling;
console.log(secondQuestion);
let thirdQuestion = document.body.firstElementChild.nextElementSibling.lastElementChild; // Или document.body.firstElementChild.nextElementSibling.lastElementChild.innerText;
console.log(thirdQuestion);*/

//......................................................................................................................

/*
Задание No2. Выделите ячейки по диагонали
Напишите код, который выделит красным цветом все ячейки в таблице по диагонали.
    Вам нужно получить из таблицы <table> все диагональные <td> и выделить их,
    используя код:
// в переменной td находится DOM-элемент для тега <td>
    td.style.backgroundColor = 'red';*/

/*let table = document.body.firstElementChild;
for (let i = 0; i < table.rows.length; i++){
    for (let j = 0; j  < table.rows[i].cells.length; j++){
        table.rows[i].cells[j].innerText = (i + 1) + ":" + (j + 1);
    }
}
for (let i = 0; i < table.rows.length; i++) {
    let diagonal = table.rows[i];
    diagonal.cells[i].style.backgroundColor = 'red';
}*/

//......................................................................................................................

/*
Задание No3. Поиск элементов
Вот документ с таблицей и формой. Как найти?...
• Таблицу с id="age-table".
• Все элементы label внутри этой таблицы (их три).
• Первый td в этой таблице (со словом «Age»).
• Форму form с именем name="search".
• Первый input в этой форме.
• Последний input в этой форме.
    Используйте код файла table.html и браузерные инструменты разработчика:*/

/*
console.log(document.getElementById('age-table')); // Таблица с id="age-table"

console.log(document.getElementById('age-table').querySelectorAll('label')); // Все элементы label внутри этой таблицы (их три)

console.log(document.getElementById('age-table').querySelector('tr > td:first-child')); // Первый td в этой таблице (со словом «Age»)

console.log(document.body.firstElementChild); // Форма form с именем name="search".

console.log(document.body.firstElementChild.firstElementChild.firstElementChild); // Первый input в этой форме.

console.log(document.body.firstElementChild.lastElementChild); // Последний input в этой форме.
*/

//......................................................................................................................

/*
Задание No4. Очистите элемент
Создайте функцию clear(elem), которая удаляет всё содержимое из elem.
<ol id="elem">
    <li>Привет</li>
    <li>Мир</li>
</ol>
<script>
    function clear(elem) {
    /!* ваш код *!/
}
    clear(elem); // очищает список
</script>
*/

//Решение:

/*
<ol id="elem">
    <li>Привет</li>
    <li>Мир</li>
</ol>
<script>
    function clear() {
    let list =  document.getElementById('elem').children;
    for (let i = list.length - 1; i >= 0; i--) {
    console.log(i);
    list[i].remove();
}
}
    clear(); // очищает список
</script>*/

//......................................................................................................................

/*
Задание No5. Создайте список
Напишите интерфейс для создания списка.
Для каждого пункта:
    1. Запрашивайте содержимое пункта у пользователя с помощью prompt.
    2. Создавайте элемент <li> и добавляйте его к <ul>.
    3. Процесс прерывается, когда пользователь нажимает Esc или вводит пустую строку.
Все элементы должны создаваться динамически.
Если пользователь вводит HTML-теги -– пусть в списке они показываются как обычный
текст.*/

/*<ul id="ul">

</ul>
<script>
    function addList() {
    let userLi = '';
    do {
    userLi = prompt('Добавьте в список: ');
    if (userLi !== '' && userLi !== null) {
    let liFromUser = document.createElement('li');
    liFromUser.textContent = userLi;
    document.getElementById('ul').append(liFromUser);
}
}
    while (userLi !== '' && userLi !== null);
}
addList();
</script>*/

//......................................................................................................................

/*
Задание No6. Вставьте HTML в список
Напишите код для вставки <li>2</li><li>3</li> между этими двумя <li>:
<ul id="ul">
    <li id="one">1</li>
    <li id="two">4</li>
</ul>*/

/*
<ul id="ul">
    <li id="one">1</li>
    <li id="two">4</li>
</ul>
<script>
    let liTwo = document.createElement('li');
    liTwo.innerHTML = '2';
    document.getElementById('ul').prepend(liTwo);
    one.after(document.getElementById('ul').firstElementChild);
    let liThree = document.createElement('li');
    liThree.innerHTML = '3';
    document.getElementById('ul').append(liThree);
    document.getElementById('ul').lastElementChild.after(two);

</script>*/

//......................................................................................................................

/*
Задание No7. Создать уведомление
Напишите функцию showNotification(options), которая создаёт уведомление:
<div class="notification"> с заданным содержимым. Уведомление должно автоматически
исчезнуть через 1,5 секунды.*/

/*<h1>Уведомление находится справа</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<script>
    function showNotification({top = 0, right = 0, className, html})
    {
        let notification = document.createElement('div');
        notification.className = "notification";
        notification.classList.add(className);
        notification.style.top = top + 'px';
        notification.style.right = right + 'px';
        notification.innerHTML = html;
        document.body.append(notification);
        setTimeout(() => notification.remove() , 1500);
    }
    showNotification({
    top:10,
    right:10,
    html:"Hello!",
    className: "welcome"
});
</script>*/
