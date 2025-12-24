// const addBtn = document.getElementById('addBtn');
// const taskInput = document.getElementById('taskInput');
// const taskList = document.getElementById('taskList');

// // Add a new task
// addBtn.addEventListener('click', () => {
//   const taskText = taskInput.value.trim();
//   if (taskText === '') return;

//   const li = document.createElement('li'); 
//   li.textContent = taskText;

//   // Mark task complete on click
//   li.addEventListener('click', () => {
//     li.classList.toggle('completed');
//   });

//   // Add delete button
//   const delBtn = document.createElement('button');
//   delBtn.textContent = '❌';
//   delBtn.addEventListener('click', (e) => {
//     e.stopPropagation(); // prevent marking complete
//     li.remove();
//   });

//   li.appendChild(delBtn);
//   taskList.appendChild(li);
//   taskInput.value = '';
// });

// // 🔍 Filter tasks as user types
// const searchInput = document.getElementById("searchInput");

// searchInput.addEventListener("keyup", function () {
//   const filter = searchInput.value.toLowerCase();
//   const tasks = document.querySelectorAll("#taskList li");

//   tasks.forEach(task => {
//     const text = task.textContent.toLowerCase();
//     // Show if text matches search input
//     task.style.display = text.includes(filter) ? "" : "none";
//   });
// });

import { TodoList } from './TodoList.js';
import { UI } from './UI.js';

const todoList = new TodoList();
const ui = new UI(todoList);

ui.render(); // show saved tasks on load
// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Fix: Add button should call ui.addTask()
document.getElementById('add-btn').addEventListener('click', () => {
  ui.addTask();
});