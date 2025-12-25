export class UI {
  constructor(todoList) {
    this.todoList = todoList;
    this.todoContainer = document.getElementById('todo-list');
    this.searchInput = document.getElementById('search-input');
    this.taskInput = document.getElementById('task-input');
    this.categorySelect = document.getElementById('categorySelect');
    this.searchTerm = '';
    this.sortSelect = document.getElementById("sort-select");

    this.sortSelect.addEventListener("change", () => {
      this.renderTodos();
    });

    // Search listener
    this.searchInput.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.render();
    });

    // Press ENTER to add task
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const title = this.taskInput.value.trim();
        if (!title) return;   // prevent empty task
        this.addTask();
      }

    });
  }
  renderTodos() {
    const sortType = this.sortSelect.value;

    const todos = this.todoList.getSortedTodos(sortType);

    this.todoContainer.innerHTML = "";

    todos.forEach(todo => {
      const div = document.createElement("div");
      div.className = "todo-item";

      div.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span>${todo.title}</span>
      `;

      this.todoContainer.appendChild(div);
    });
  }

  addTask() {
    const title = this.taskInput.value.trim();
    const category = this.categorySelect.value;

    // Prevent empty tasks
    if (!title) {
      this.taskInput.classList.add("input-error");  // red border animation
      setTimeout(() => {
        this.taskInput.classList.remove("input-error");
      }, 500);
      return;
    }

    this.todoList.addTodo(title, category);
    this.taskInput.value = '';
    this.render();
  }

  render() {
    this.todoContainer.innerHTML = '';

    // Filtered search results
    const filteredTodos = this.todoList.getTodos().filter(todo =>
      todo.title.toLowerCase().includes(this.searchTerm)
    );

    filteredTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');

      if (todo.completed) {
        li.classList.add('completed');
      }

      // Category badge
      const categoryBadge = document.createElement('span');
      categoryBadge.classList.add('category-badge');
      categoryBadge.textContent = todo.category;

      // Task text
      const textSpan = document.createElement('span');
      textSpan.textContent = todo.title;
      textSpan.classList.add('task-text');

      // Toggle Button
      const toggleBtn = document.createElement('button');
      toggleBtn.classList.add('toggle-btn');
      if (window.innerWidth <= 400){
        toggleBtn.innerHTML = todo.completed
        ? '<i class="fa-solid fa-rotate-left"></i> '     // undo icon
        : '<i class="fa-solid fa-circle-check"></i> ';   // done icon
      }else{
        toggleBtn.innerHTML = todo.completed
        ? '<i class="fa-solid fa-rotate-left"></i> Undo'     // undo icon
        : '<i class="fa-solid fa-circle-check"></i> Done';   // done icon
      }

      toggleBtn.onclick = () => {
        this.todoList.toggleTodo(index);
        this.render();
      };
      // Delete Button (with animation)
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      if (window.innerWidth <= 400) {
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i> ';
      }else{
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Delete';
      }
      deleteBtn.onclick = () => {
        li.classList.add('remove'); // fade-out animation
        li.addEventListener('animationend', () => {
          this.todoList.deleteTodo(index);
          this.render();
        });
      };

      //edit button
      const editBtn = document.createElement('button');
      editBtn.classList.add('edit-btn');
      if (window.innerWidth <= 400) {
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      } else {
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit';
      }
      editBtn.onclick = () => {
        this.todoList.editTodo(todo.id);
        this.render();
      };

      // Append elements
      li.appendChild(categoryBadge);
      li.appendChild(textSpan);
      li.appendChild(toggleBtn);
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
      this.todoContainer.appendChild(li);
    });
  }
}
