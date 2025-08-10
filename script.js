const display = document.getElementById('display');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const resetBtn = document.getElementById('reset');

  let startTime = 0;
  let elapsedTime = 0;
  let timerInterval = null;

  function formatTime(time) {
    const hrs = Math.floor(time / 3600000);
    const mins = Math.floor((time % 3600000) / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    const ms = time % 1000;

    return (
      String(hrs).padStart(2, '0') + ':' +
      String(mins).padStart(2, '0') + ':' +
      String(secs).padStart(2, '0') + '.' +
      String(ms).padStart(3, '0')
    );
  }

  function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
  }

  function start() {
    if (timerInterval) return;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
  }

  function stop() {
    if (!timerInterval) return;
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  }

  startBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);
  resetBtn.addEventListener('click', reset);