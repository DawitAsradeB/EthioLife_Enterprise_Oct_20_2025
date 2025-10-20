"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [todos]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/todos", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = async () => {
    const t = title.trim();
    if (!t) return;
    setTitle("");
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: t }),
    });
    if (res.ok) {
      const created: Todo = await res.json();
      setTodos((prev) => [created, ...prev]);
    } else {
      const { error: err } = await res.json().catch(() => ({ error: "Error" }));
      setError(err);
    }
  };

  const toggle = async (todo: Todo) => {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (res.ok) {
      const updated: Todo = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
  };

  const remove = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (res.ok) setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-xl w-full mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo title"
          className="flex-1 border rounded px-3 py-2 bg-transparent"
          onKeyDown={(e) => {
            if (e.key === "Enter") create();
          }}
        />
        <button onClick={create} className="px-4 py-2 rounded bg-foreground text-background">
          Add
        </button>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-2">
          {sortedTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between border rounded px-3 py-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggle(todo)}
                />
                <span className={todo.completed ? "line-through opacity-60" : ""}>{todo.title}</span>
              </label>
              <button
                onClick={() => remove(todo.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
