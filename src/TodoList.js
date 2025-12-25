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

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToLocalStorage();
  }

  toggleTodo(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.toggleComplete();
      this.saveToLocalStorage();
    }
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
  editTodo(id, newTitle) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo && newTitle.trim()) {
      todo.title = newTitle.trim();
      this.saveToLocalStorage();
    }
  }

}
