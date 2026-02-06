import { useEffect, useState, useCallback } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types";
import API_URL from "../config/api";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState("");

  const handleDeleteTodo = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }, []);

  const handleToggleTodo = useCallback(async (todo: Todo) => {
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      const updated = await response.json();

      setTodos((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }, []);

  const handleEditTodo = useCallback(async (todo: Todo) => {
    const newTitle = prompt("Edit todo", todo.title);
    if (!newTitle) return;

    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      const updated = await response.json();

      setTodos((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }, []);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${API_URL}/todos`);

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        setTodos(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();
  }, []);

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();

    if (!newTodo.trim()) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const createdTodo = await response.json();

      setTodos((prev) => [...prev, createdTodo]);
      setNewTodo("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Todos</h2>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggle={handleToggleTodo}
              onEdit={handleEditTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
