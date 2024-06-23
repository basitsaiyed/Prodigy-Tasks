let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const lapsSection = document.getElementById('lapsSection');
const themeIcon = document.getElementById('themeIcon');

lapsSection.style.display = 'none';

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    display.textContent = `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
}

function format(number) {
    return number < 10 ? '0' + number : number;
}

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        playSound('start');
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        isRunning = false;
        playSound('pause');
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    lapTimes = [];
    lapsSection.style.display = 'none';
    playSound('reset');
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = Date.now() - startTime + elapsedTime;
        lapTimes.push(lapTime);
        const li = document.createElement('li');
        const lastLapTime = lapTimes.length > 1 ? lapTimes[lapTimes.length - 2] : 0;
        const lapDifference = lapTime - lastLapTime;
        li.textContent = `${display.textContent} (+${formatLapDifference(lapDifference)})`;
        lapsList.appendChild(li);
        lapsSection.style.display = 'block';
        playSound('lap');
    }
});

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

function formatLapDifference(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    return `${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
}

function playSound(action) {
    const audio = new Audio(`${action}.mp3`);
    audio.play();
}

// Load the theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
});
