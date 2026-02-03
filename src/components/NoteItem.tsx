import { memo } from "react";
import { Note } from "../types";

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  return (
    <li>
      <p>{note.content}</p>
      <small>{new Date(note.updated_at).toLocaleString()}</small>
      <div>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </li>
  );
}

export default memo(NoteItem);
