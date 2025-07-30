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
