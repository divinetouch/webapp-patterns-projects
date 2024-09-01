import { TodoList, TodoItem } from "./classes.js";
import { TodoHistory } from "./momento.js";

export class Command {
  name;
  args; // Array

  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  UNDO: "undo",
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value;
        const itemToAdd = todoList.find(todoText);

        if (todoText != "" && itemToAdd == undefined) {
          todoInput.value = "";
          todoList.add(new TodoItem(todoText));
        }
        break;
      case Commands.DELETE:
        const [textToDelete] = command.args;
        todoList.delete(textToDelete);
        break;
      case Commands.UNDO:
        const prevList = TodoHistory.pop();
        if (prevList) {
          todoList.replaceList(prevList);
        }
        break;
    }
  },
};
