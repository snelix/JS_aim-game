const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#E4572E', '#E627C6', '#F3A712', '#A8C686', '#669BBC', '#EA3546', '#CE7DA5'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

board.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button#restart')) {
        screens[1].classList.remove('up');
        score = 0;
        time = 0;
        board.innerHTML = '';
        timeEl.parentNode.classList.remove('hide');
    }
});


function startGame() {
    const intervalId = setInterval(() => {
        if (time === 0) {
            clearInterval(intervalId);
            finishGame();
        } else {
            let current = --time;
            setTime(current);
        }
    }, 1000);
    createRandomCircle();
    setTime(time);
}


function setTime(value) {
    let seconds = value % 60;
    let minutes = Math.floor(value / 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    timeEl.innerHTML = `${minutes}:${seconds}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>
        <button class="btn-setting" id="restart">Сыграем ещё?</button>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(15, 60);
    const {
        width,
        height
    } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    const color = getRandomColor();
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}