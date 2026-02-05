import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { Note } from "../types";

function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://productivity-app-backend-m4za.onrender.com/notes")
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  async function addNote(e) {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch("https://productivity-app-backend-m4za.onrender.com/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const note = await res.json();
    setNotes((prev) => [note, ...prev]);
    setContent("");
  }

  async function editNote(note) {
    const newContent = prompt("Edit note", note.content);
    if (!newContent) return;

    const res = await fetch(
      `https://productivity-app-backend-m4za.onrender.com/notes/${note.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      }
    );

    const updated = await res.json();

    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? updated : n))
    );
  }

  async function deleteNote(id) {
    await fetch(`https://productivity-app-backend-m4za.onrender.com/notes/${id}`, {
      method: "DELETE",
    });

    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <section>
      <h2>Notes</h2>

      <form onSubmit={addNote}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a note..."
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={editNote}
            onDelete={deleteNote}
          />
        ))}
      </ul>
    </section>
  );
}

export default NotesList;
