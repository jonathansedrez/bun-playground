import { describe, it, expect, beforeEach } from "bun:test";
import { addTodo, getTodos, getTodoById, deleteTodo } from "../db";

function clearTodos() {
  const todos = getTodos();
  for (const todo of todos) {
    deleteTodo(todo.id);
  }
}

describe("db.ts", () => {
  beforeEach(() => {
    clearTodos();
  });

  it("should add a new todo with default isChecked=false", () => {
    const todo = addTodo("Learn Bun");
    expect(todo.id).toBeGreaterThan(0);
    expect(todo.label).toBe("Learn Bun");
    expect(todo.isChecked).toBe(false);

    const todos = getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].label).toBe("Learn Bun");
  });

  it("should add a new todo with isChecked=true", () => {
    const todo = addTodo("Already done", true);
    expect(todo.isChecked).toBe(true);

    const found = getTodoById(todo.id);
    expect(found?.isChecked).toBe(true);
  });

  it("should get a todo by ID", () => {
    const todo = addTodo("Check by ID");
    const found = getTodoById(todo.id);
    expect(found).not.toBeNull();
    expect(found?.label).toBe("Check by ID");
  });

  it("should return null if todo does not exist", () => {
    const found = getTodoById(9999);
    expect(found).toBeNull();
  });
});
