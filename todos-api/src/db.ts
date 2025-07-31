import { Database } from "bun:sqlite";
import { Todo } from "./types";

const db = new Database("todos.db");

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    isChecked INTEGER NOT NULL
  )
`);

export function addTodo(label: string, isChecked?: boolean): Todo {
  const stmt = db.prepare("INSERT INTO todos (label, isChecked) VALUES (?, ?)");
  stmt.run(label, isChecked ? 1 : 0);

  const id = db
    .query<{ id: number }, []>("SELECT last_insert_rowid() as id")
    .get()?.id;

  return {
    id: id ?? 0,
    label,
    isChecked: isChecked || false,
  };
}

export function getTodos(): Todo[] {
  return db
    .query<Todo, []>("SELECT id, label, isChecked FROM todos")
    .all()
    .map((todo) => ({
      ...todo,
      isChecked: !!todo.isChecked,
    }));
}

export function getTodoById(id: number): Todo | null {
  const result = db
    .query<Todo, []>(`SELECT id, label, isChecked FROM todos WHERE id = ${id}`)
    .get();

  return result ? { ...result, isChecked: !!result.isChecked } : null;
}
