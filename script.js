let field = document.querySelector('.game-field');
let cake = `<div class="card open cake">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;
let cookie = `<div class="card open cookie">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;
let fries = `<div class="card open fries">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;
let pizza = `<div class="card open pizza">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;
let ramen = `<div class="card open ramen">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;
let soup = `<div class="card open soup">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;
let steak = `<div class="card open steak">
                <div class="front"></div>
                <div class="back"></div>
            </div>`;

let cards = [cake, cake, cookie, cookie, fries, fries, pizza, pizza, ramen, ramen, soup, soup, steak, steak];
let cardList;

let modal = document.querySelector('.modal');
let mistakesField = document.querySelector('.mistakes-field');
let mistakesResult = document.querySelector('.mistakes-result');
let mistakes = 0;

let timeField = document.querySelector('.time-field');
let timeResult = document.querySelector('.time-result');
let sec = 0;
let min = 0;
let isTimer;

let startGameButton = document.querySelector('.start-game-button');
startGameButton.addEventListener('click', startGame);
startGame();

// game functions
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function closeAll(array) {
    array.forEach(el => el.classList.remove('open'))
}

function openCard(e) {
    e.target.parentElement.classList.add('open');
    compare();
}

function compare() {
    let pair = [];
    cardList.forEach(el => {
        if (el.classList.contains('open')) {
            pair.push(el);
        }
    });

    if (pair.length % 2 == 0) {
        cardList.forEach(el => el.classList.add('events-none'));
        let newPair = pair.filter(el => !el.classList.contains('final'));

        if (newPair[0].className == newPair[1].className) {
            newPair.forEach(el => el.classList.add('final'));
            cardList.forEach(el => el.classList.remove('events-none'));

            checkResults();

        } else {
            mistakes += 1;
            mistakesField.innerHTML = mistakes;
            setTimeout(function() {
                newPair.forEach(el => el.classList.remove('open'));
                cardList.forEach(el => el.classList.remove('events-none'));
            }, 500);
        }

    }
}

function checkResults() {
    let matchedPairs = [];
    cardList.forEach(el => {
        if (el.classList.contains('final')) {
            matchedPairs.push(el);
        }
    });

    if (matchedPairs.length == cardList.length) {
        stopGame();
    }
}

// timer functions
function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}

function add() {
    tick();
    timeField.innerHTML = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
   isTimer = setTimeout(add, 1000);
}

function startGame() {
    modal.style.display = 'none';
    sec = 0;
    min = 0;
    timeField.innerHTML = '00:00';
    mistakes = 0;
    mistakesField.innerHTML = '0';

    shuffle(cards);
    field.innerHTML = cards.join('');
    cardList = document.querySelectorAll('.card');
    cardList.forEach(el => el.addEventListener('click', openCard));
    
    setTimeout(function() {
        closeAll(cardList);
        timer();
    }, 3000);
}

function stopGame() {
    clearTimeout(isTimer);

    setTimeout(function () {
        modal.style.display = 'block';
        timeResult.innerHTML = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
        mistakesResult.innerHTML = mistakes;
    }, 1000);
}