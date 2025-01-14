// Variables to manage the timerr
let callStartTime;
let timerInterval;

// Function to format time
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

// Function to start the timer
function startTimer() {
  callStartTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - callStartTime) / 1000);
    document.getElementById('timer').textContent = formatTime(elapsedSeconds);
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = '00:00:00';
}

// Example: Starting and stopping the timer
document.addEventListener('DOMContentLoaded',() =>{
  startTimer();

})
  

document.getElementById('endCallButton').addEventListener('click', () => {
  stopTimer();
});
