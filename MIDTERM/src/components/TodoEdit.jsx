import { useState } from "react";

const TodoEdit = (props) => {
  const { todo, onSave, onCancel } = props;

  // start with the song's saved values
  const [title, setTitle] = useState(todo.title);
  const [bpm, setBpm] = useState(todo.bpm ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);

    try {
      // send both edited values back to App
      const practiceBpm = bpm === "" ? null : Number(bpm);
      await onSave(title.trim(), practiceBpm);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label
          htmlFor={`edit-title-${todo.id}`}
          className="mb-1 block text-sm font-medium"
        >
          Song or exercise
        </label>
        <input
          id={`edit-title-${todo.id}`}
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor={`edit-bpm-${todo.id}`}
          className="mb-1 block text-sm font-medium"
        >
          Current BPM
        </label>
        <input
          id={`edit-bpm-${todo.id}`}
          name="bpm"
          type="number"
          min="1"
          step="1"
          value={bpm}
          onChange={(event) => setBpm(event.target.value)}
          placeholder="optional"
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded bg-blue-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded border border-gray-300 px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TodoEdit;
