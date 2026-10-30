import { useState } from "react";

const TodoCreate = (props) => {
  const { onCreate } = props;

  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);

    try {
      // a blank bpm stays blank instead of turning into 0
      const practiceBpm = bpm === "" ? null : Number(bpm);
      const saved = await onCreate(title.trim(), practiceBpm);

      // only clear the form when the server saved it
      if (saved) {
        setTitle("");
        setBpm("");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="new-title" className="mb-1 block text-sm font-medium">
          Song or exercise
        </label>
        <input
          id="new-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Major scales"
          required
          className="w-full rounded border border-gray-300 bg-white px-3 py-2"
        />
      </div>

      {/* added a second input for current practice tempo */}
      <div className="sm:w-36">
        <label htmlFor="new-bpm" className="mb-1 block text-sm font-medium">
          Current BPM
        </label>
        <input
          id="new-bpm"
          name="bpm"
          type="number"
          min="1"
          step="1"
          value={bpm}
          onChange={(event) => setBpm(event.target.value)}
          placeholder="optional"
          className="w-full rounded border border-gray-300 bg-white px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded bg-blue-900 px-5 py-2 text-white disabled:opacity-50"
      >
        {isSaving ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default TodoCreate;
