import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { addTodo, getTodos, getTodoById, deleteTodo } from "./db";

const app = new Hono();

app.post("/todos", async ({ req, text, json }) => {
  const { label, isChecked } = await req.json();

  if (!label) {
    return text("label is required", 400);
  }

  const newTodo = addTodo(label, isChecked);

  return json(newTodo, 201);
});

app.get("/todos", ({ json }) => {
  const todos = getTodos();
  return json(todos, 200);
});

app.get("/todos/:id", ({ req, json }) => {
  const id = Number(req?.param("id"));
  const todo = getTodoById(id);

  if (!todo) {
    throw new HTTPException(404, { message: "Todo not found" });
  }

  return json(todo, 200);
});

app.delete("/todos/:id", ({ req, json }) => {
  const id = Number(req.param("id"));

  if (!id) {
    throw new HTTPException(400, { message: "Invalid ID" });
  }

  const deleted = deleteTodo(id);

  if (!deleted) {
    throw new HTTPException(404, { message: "Todo not found" });
  }

  return json({ message: "Todo deleted successfully" }, 200);
});

export default app;
