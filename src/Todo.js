export class Todo {
  constructor(title,category='General') {
    this.title = title;
    this.completed = false;
    this.category = category;
    this.createdAt = new Date();
    this.id = crypto.randomUUID();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
