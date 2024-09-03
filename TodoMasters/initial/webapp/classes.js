import { ObserverMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(other) {
    return this.text.trim() === other.text.trim();
  }
}

export class TodoList {
  // Data
  // # is private
  #data = new Set();
  get items() {
    return this.#data;
  }

  // promisify so later on we can update this to call the backend
  // and don't have to worry about updating the consumers
  getItems() {
    return Promise.resolve(this.#data);
  }

  // singleton
  static instance = null;

  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  // cannot just create a new instance with new TodoList()
  constructor() {
    throw new Error("Use TodoList.getInstance() to access the list");
  }

  add(item) {
    const array = Array.from(this.#data);
    const todoExist = array.filter((t) => t.equals(item)).length > 0;
    if (!todoExist) {
      this.#data.add(item);
      this.notify();
    }
  }

  delete(text) {
    const array = Array.from(this.#data);
    const todoToDelete = array.filter((t) => t.text == text)[0];
    this.#data.delete(todoToDelete);
    this.notify();
  }

  find(text) {
    const array = Array.from(this.#data);
    return array.find((t) => t.text == text);
  }

  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

Object.assign(TodoList.prototype, ObserverMixin);

// can access this way
// const items = (new TodoList).items;
