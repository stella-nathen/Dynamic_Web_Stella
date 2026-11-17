import { useState } from "react";
import TodoEdit from "./TodoEdit";

const TodoItem = (props) => {
  const { todo, onDelete, onEdit, onToggle } = props;
  const [showEdit, setShowEdit] = useState(false);

  const handleSave = async (title, bpm) => {
    const saved = await onEdit(todo.id, title, bpm);

    if (saved) {
      setShowEdit(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {showEdit ? (
        <TodoEdit
          todo={todo}
          onSave={handleSave}
          onCancel={() => setShowEdit(false)}
        />
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={
                  todo.done
                    ? "break-words text-gray-400 line-through"
                    : "break-words font-medium text-gray-900"
                }
              >
                {todo.title}
              </p>

              {/* show the bpm we saved for this song */}
              <p className="mt-1 text-sm text-gray-500">
                {todo.bpm == null ? "Tempo not set" : `${todo.bpm} BPM`}
              </p>
            </div>

            <label className="flex shrink-0 items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={Boolean(todo.done)}
                onChange={(event) => onToggle(todo.id, event.target.checked)}
                className="h-4 w-4"
              />
              Done
            </label>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="rounded border border-gray-300 px-3 py-1 text-sm"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="rounded border border-red-200 px-3 py-1 text-sm text-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
