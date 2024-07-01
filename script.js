function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'cescpinyol') { 
        document.getElementById('login').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert('Incorrect password');
    }
}

// Timer script
let timer;
let timerRunning = false;
let seconds = 0;

function startTimer() {
    if (!timerRunning) {
        const inputSeconds = parseInt(document.getElementById('timer-input').value) || 0;
        seconds = inputSeconds;
        timerRunning = true;
        timer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(timer);
                timerRunning = false;
            }
            document.getElementById('time').innerText = new Date(seconds * 1000).toISOString().substr(11, 8);
        }, 1000);
    }
}

function stopTimer() {
    if (timerRunning) {
        clearInterval(timer);
        timerRunning = false;
    }
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById('time').innerText = '00:00:00';
}

// Sound script
function playSound(sound) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = `https://archive.org/download/naturesounds-soundtheraphy/${sound}.mp3`;
    audioPlayer.play();
}

// Tasks script
function addTask() {
    const taskText = document.getElementById('new-task').value;
    if (taskText.trim() !== '') {
        const task = document.createElement('div');
        task.className = 'task draggable';
        task.draggable = true;
        task.innerText = taskText;
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
        document.getElementById('todo').appendChild(task);
        document.getElementById('new-task').value = '';
    }
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hidden');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hidden');
}

document.querySelectorAll('.dropzone').forEach(dropzone => {
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', dropTask);
});

function dragOver(event) {
    event.preventDefault();
}

function dropTask(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    const draggable = document.querySelector(`#${id}`);
    event.target.appendChild(draggable);
    updateTree();
}

function updateTree() {
    const doneTasks = document.getElementById('done').children.length;
    document.getElementById('task-counter').innerText = `Completed Tasks: ${doneTasks}`;
    document.getElementById('tree-image').src = `https://via.placeholder.com/100x150?text=${doneTasks}`;
}

// Schedule script
function updateCurrentTimeBar() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const percentage = (totalMinutes / (24 * 60)) * 100;
    document.getElementById('current-time-bar').style.top = `${percentage}%`;
}

setInterval(updateCurrentTimeBar, 60000); // Update every minute
updateCurrentTimeBar(); // Initial call

// Initialize draggable tasks
document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
});
