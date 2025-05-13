const toggleBtn = document.getElementById('toggleThemeBtn');
const saveNameBtn = document.getElementById('saveNameBtn');
const resetBtn = document.getElementById('resetBtn');
const nameInput = document.getElementById('nameInput');
const welcomeText = document.getElementById('welcomeText');
const colorThemeSelect = document.getElementById('colorTheme');
const quoteText = document.getElementById('quoteText');
const timeDisplay = document.getElementById('currentTime');
const dateDisplay = document.getElementById('currentDate');
const notesArea = document.getElementById('notesArea');
const saveNotesBtn = document.getElementById('saveNotesBtn');

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Don’t stop when you’re tired. Stop when you’re done."
];

function applyAccentColor(color) {
  document.documentElement.style.setProperty('--accent-color', color);
}

function animateElement(el) {
  el.classList.add('animate');
  el.addEventListener('animationend', () => el.classList.remove('animate'), { once: true });
}

function updateClock() {
  const now = new Date();
  timeDisplay.textContent = now.toLocaleTimeString();
  dateDisplay.textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const savedName = localStorage.getItem('userName');
  const savedColor = localStorage.getItem('accentColor');
  const savedNotes = localStorage.getItem('notes');

  if (savedName) {
    welcomeText.textContent = `Welcome back, ${savedName}!`;
    nameInput.value = savedName;
  }

  if (!savedTheme) {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 7) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  } else if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  if (savedColor) {
    applyAccentColor(savedColor);
    colorThemeSelect.value = savedColor;
  }

  if (savedNotes) {
    notesArea.value = savedNotes;
  }

  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  animateElement(welcomeText);
});

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  animateElement(toggleBtn);
});

saveNameBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem('userName', name);
    welcomeText.textContent = `Welcome, ${name}!`;
    animateElement(welcomeText);
  }
  animateElement(saveNameBtn);
});

colorThemeSelect.addEventListener('change', () => {
  const selectedColor = colorThemeSelect.value;
  applyAccentColor(selectedColor);
  localStorage.setItem('accentColor', selectedColor);
  animateElement(colorThemeSelect);
});

resetBtn.addEventListener('click', () => {
  localStorage.clear();
  nameInput.value = '';
  notesArea.value = '';
  document.body.classList.remove('dark');
  colorThemeSelect.value = 'blue';
  applyAccentColor('blue');
  welcomeText.textContent = 'Welcome!';
  animateElement(welcomeText);
});

saveNotesBtn.addEventListener('click', () => {
  const notes = notesArea.value;
  localStorage.setItem('notes', notes);
  animateElement(saveNotesBtn);
});

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const weatherInfo = document.getElementById('weatherInfo');

addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => {
      li.classList.toggle('completed');
      saveTodos();
    };
    todoList.appendChild(li);
    saveTodos();
    todoInput.value = '';
  }
});

function saveTodos() {
  const tasks = [];
  todoList.querySelectorAll('li').forEach(li => {
    tasks.push({ text: li.textContent, done: li.classList.contains('completed') });
  });
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function loadTodos() {
  const tasks = JSON.parse(localStorage.getItem('todos') || "[]");
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.done) li.classList.add('completed');
    li.onclick = () => {
      li.classList.toggle('completed');
      saveTodos();
    };
    todoList.appendChild(li);
  });
}
loadTodos();

// Basic weather info (fallback static, no API for demo)
function showWeather() {
  weatherInfo.textContent = "🌤️ 24°C, Clear Sky (Demo)";
}
showWeather();
