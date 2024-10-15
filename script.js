let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

// Format time to HH:MM:SS
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(() => {
            updatedTime = Date.now();
            difference = updatedTime - startTime;
            document.getElementById('display').textContent = formatTime(difference);
        }, 1000);
        isRunning = true;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    lapCounter = 0;
}

// Record lap time
function recordLap() {
    if (isRunning) {
        const lapList = document.getElementById('laps');
        const lapTime = document.createElement('li');
        lapCounter++;
        lapTime.textContent = `Lap ${lapCounter}: ${formatTime(difference)}`;
        lapList.appendChild(lapTime);
    }
}
