import { memo } from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
}

function TodoItem({ todo, onDelete, onToggle, onEdit }: TodoItemProps) {
  return (
    <li style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => onToggle(todo)}
      />
      {todo.title}
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default memo(TodoItem);


