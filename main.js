(function () {

    // Этап 1. Создание функции, генерирующая массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

    // Создает массив парных чисел в заданном количестве.
    // Пример массива: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].
    // Количество пар определяется аргументом "count".
    function createNumbersArray(count) {
        const pairs = [];
        const iter = (count * count / 2)
        for (let i = 1; i <= iter; i++) {
            pairs.push(i, i);
        }
        if (count % 2 !== 0) {
            pairs.push(Math.floor(iter + 1));
        }
        return pairs;
    }

    // Этап 2. Создание функции перемешивания массива. Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

    // Перемешивает элементы массива случайным образом.
    // Принимает массив в качестве аргумента и возвращает перемешанный массив.
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Этап 3. Использование двух созданных функций для создания массива перемешанными номерами. На основе этого массива были созданы DOM-элементы карточек. У каждой карточки установлен свой номер из массива произвольных чисел.

    // Создает форму для ввода размерности поля от 2 до 6.
    // При клике на кнопку "Начать игру" вызывает функцию startGame(count).
    function fieldDimension() {
        const mainContainer = document.getElementById("game-app");

        const formContainer = document.createElement('div');
        formContainer.className = 'form form-container';
        mainContainer.append(formContainer);

        const form = document.createElement('form');
        form.className = 'form__form';
        formContainer.append(form);

        const title = document.createElement('h2');
        title.type = 'text';
        title.className = 'form__title';
        title.textContent = "Введите размерность поля от 2 до 6";
        form.append(title);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form__input';
        form.append(input);

        const button = document.createElement('button');
        button.className = 'form__button';
        button.textContent = "Начать игру";
        form.append(button);

        button.addEventListener('click', function () {
            const count = input.value.trim();

            if (count !== '' && count >= 2 && count <= 6) {
                formContainer.remove();
                startGame(count);
            } else {
                alert('Введите размерность поля от 2 до 6!');
            }
        });
    }

    // Использует предыдущие две функции для создания перемешанного массива.
    // Вызывает createCards(arr, count) для создания DOM-элементов карточек и начала игры.
    function startGame(count) {
        arr = createNumbersArray(count);
        arr = shuffle(arr);

        console.log(arr);
        createCards(arr, count);
    }

    //Этап 4. На основе массива был создан DOM-элементы карточек:

    // Отображает модальное окно с заданным сообщением.
    // Включает кнопку "Начать заново", которая перезагружает страницу при клике.
    function showModal(message, icon) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const modalImage = document.createElement('img');
        modalImage.className = 'modal-image';
        modalImage.src = 'images/' + icon;


        modal.appendChild(modalImage);

        const modalContent = document.createElement('h3');
        modalContent.className = 'modal-content';
        modalContent.textContent = message;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        const modalButthon = document.createElement('div');
        modalButthon.className = 'modal-butthon';
        modalButthon.textContent = "Начать заново?";
        modal.appendChild(modalButthon);
        document.body.appendChild(modal);

        modalButthon.addEventListener('click', () => {
            location.reload();
        });
    }


    let isTimerRunning = false;

    // Функция для остановки таймера
    function stopTimer() {
        isTimerRunning = false;
    }

    // Функция для задержки асинхронного времени
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Асинхронная функция для обратного отсчета
    async function countdown(count) {
        isTimerRunning = true;
        var countdownTimeInSeconds = count * count * count;

        while (countdownTimeInSeconds >= 0 && isTimerRunning) {
            var minutes = Math.floor(countdownTimeInSeconds / 60);
            var seconds = countdownTimeInSeconds % 60;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            document.getElementById('timer').textContent = `Осталось времени: ${minutes} : ${seconds}`;
            await delay(1000);

            countdownTimeInSeconds--;

            if (countdownTimeInSeconds < 0) {
                showModal('Время вышло! Игра завершена.', "gameOver.png");
                return;
            }
        }
    }

    // Преобразует массив чисел в массив индексов карточек.
    function makeIndexCard(arr) {
        for (let i = 1; i <= arr.length; i++) {
            let index = arr.indexOf(i);
            arr[index] = arr[index] + '-1';
            index = arr.indexOf(i);
            arr[index] = arr[index] + '-2';
        }
        return arr
    }

    // Создает DOM-элементы карточек на основе массива индексов.
    // Запускает таймер и анимацию открытия карточек.
    function createCards(arr, count) {
        const mainContainer = document.getElementById("game-app");

        const gameContainer = document.createElement('div');
        gameContainer.className = 'game__container';
        mainContainer.append(gameContainer);

        const title = document.createElement('h1');
        title.textContent = "Игра в пары";
        title.className = 'game__title';
        gameContainer.append(title);

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card__container';
        const containerWidth = count * 100;
        cardContainer.style.width = `${containerWidth}px`;
        cardContainer.style.height = `${containerWidth}px`;
        gameContainer.append(cardContainer);

        gameContainer.style.width = `${containerWidth + 180}px`
        gameContainer.style.height = `${containerWidth + 180}px`

        const cardSize = containerWidth * 2 / (count * 2);

        arr = makeIndexCard(arr);

        for (let i = 0; i < arr.length; i++) {
            let card = document.createElement('div');
            card.style.width = `${cardSize}px`;
            card.style.height = `${cardSize}px`;
            card.setAttribute('data-index', `${arr[i]}`);
            console.log(card.getAttribute('data-index'));
            card.className = 'card__button';
            cardContainer.append(card);
            let cardFront = document.createElement('div');
            let cardBack = document.createElement('div');

            // cardFront.textContent = `П${arr[i]}`;
            // cardBack.textContent = `О${arr[i]}`;

            cardBack.style.backgroundImage = `url(./images/${arr[i].split('-')[0]}.webp)`;
            cardFront.className = 'card__button-front inside-button';
            cardBack.className = 'card__button-back inside-button';
            card.append(cardFront);
            card.append(cardBack);
            card.addEventListener('click', handleClick);
        }

        const timer = document.createElement('h3');
        timer.className = 'game__timer';
        timer.id = 'timer';
        gameContainer.append(timer);

        for (var i = 0; i < cardContainer.children.length; i++) {
            cardContainer.children[i].style.transform = "rotateY(180deg)";
        }
        setTimeout(() => {
            for (var i = 0; i < cardContainer.children.length; i++) {
                cardContainer.children[i].style.transform = "rotateY(0deg)";
            }
            countdown(count);
        }, 5000);

    }
    let openCards = 0;
    let flag = false;
    let lastCard = null;

    // Обрабатывает клики по карточкам во время игры.
    // Проверяет совпадение пар, открывает или закрывает карточки.
    // Показывает модальное окно при завершении игры.
    function handleClick() {
        let clickedIndex = this.getAttribute('data-index');
        let lastCardElement = lastCard !== null ? document.querySelector(`[data-index="${lastCard}"]`) : null;

        console.log("lastCard", lastCard);
        console.log("clickedIndex", clickedIndex);

        if (flag && lastCard) {
            // console.log("1 if условие");
            if (clickedIndex.split('-')[0] === lastCard.split('-')[0]) {
                // console.log("2 if условие");
                this.removeEventListener('click', handleClick);
                this.style.transform = "rotateY(180deg)";
                lastCard = null;
                flag = false;
                openCards += 1;
            }
            else {
                // console.log("2 else условие");
                this.style.transform = "rotateY(180deg)";
                setTimeout(() => {
                    console.log("lastCardElement", lastCardElement);
                    lastCardElement.style.transform = "rotateY(0deg)";
                    this.style.transform = "rotateY(0deg)";
                }, 1000);

                lastCardElement.addEventListener('click', handleClick);
                this.addEventListener('click', handleClick);
                lastCard = null;
                flag = false;
            }
        }
        else {
            // console.log("1 else условие");
            lastCard = clickedIndex;
            this.removeEventListener('click', handleClick);
            this.style.transform = "rotateY(180deg)";
            flag = true;

            if (arr.length === openCards * 2 + 1) {
                showModal("Поздравляем!", "victory.png")
                stopTimer();
            }
        }

        if (arr.length % 2 === 0 && arr.length === openCards * 2) {
            showModal("Поздравляем!", "victory.png")
            stopTimer();
        }

    }

    window.fieldDimension = fieldDimension;
    window.startGame = startGame;
})();