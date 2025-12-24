import { Todo } from './Todo.js';

export class TodoList {
  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();
  }
  getSortedTodos(sortType) {
    let sorted = [...this.todos];

    switch (sortType) {
      case "newest":
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;

      case "oldest":
        sorted.sort((a, b) => a.createdAt - b.createdAt);
        break;

      case "completed":
        sorted.sort((a, b) => b.completed - a.completed);
        break;

      case "uncompleted":
        sorted.sort((a, b) => a.completed - b.completed);
        break;
    }

    return sorted;
  }
  addTodo(title, category) {
    const newTodo = new Todo(title, category);
    this.todos.push(newTodo);
    this.saveToLocalStorage();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.saveToLocalStorage();
  }

  toggleTodo(index) {
    this.todos[index].toggleComplete();
    this.saveToLocalStorage();
  }

  getTodos() {
    return this.todos;
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem('todos');
    if (stored) {
      this.todos = JSON.parse(stored).map(t => Object.assign(new Todo(t.title, t.category), t));
    }
  }

  debugLocalStorage() {
  const stored = localStorage.getItem('todos');
  if (!stored) {
    console.log("🟡 No todos saved yet.");
    return;
  }
  
  console.log("📦 Raw LocalStorage data:");
  console.log(stored);

  console.log("📋 Parsed todos array:");
  console.log(JSON.parse(stored));
}
editTodo(index) {
  this.todoContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("edit-btn")) return;

    const id = e.target.dataset.id;
    const span = this.todoContainer.querySelector(`span[data-id="${id}"]`);

    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";
    input.dataset.id = id;

    span.replaceWith(input);
    input.focus();

    // Save on Enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.saveEdit(input);
      }
      if (e.key === "Escape") {
        this.renderTodos(); // cancel edit
      }
    });

    // Save on blur
    input.addEventListener("blur", () => {
      this.saveEdit(input);
    });
  });
}

}
