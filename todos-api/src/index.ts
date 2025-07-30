import { Hono } from "hono";
import { addTodo } from "./db";

const app = new Hono();

app.post("/todos", async ({ req, text, json }) => {
  const { label, isChecked } = await req.json();

  if (!label) {
    return text("label is required", 400);
  }

  const newTodo = addTodo(label, isChecked);

  return json(newTodo, 201);
});

export default app;
