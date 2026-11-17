/*
  I used useEffect with [] for the GET request because
  I only want to load the todos when the app first opens.
  Calling fetchTodos directly in the component would
  cause another request whenever the state updates.

  In deleteTodoById, I wait for the server before
  removing the item from state. If I moved setTodos
  above await, the item would disappear immediately,
  even if the server was down. It would then reappear
  when the page refreshed.

  The All, Active and Done filters don't need another
  API request because all the todos are already in state.
  I used filter() to decide which ones to display.

  I used PATCH for the done checkbox because I'm only
  changing one property rather than replacing the
  entire record.
*/
import { useState, useEffect } from "react";

import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";

import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  toggleTodo as toggleTodoRequest,
} from "./api";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // load saved songs when the page first opens
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await fetchTodos();
        setTodos(savedTodos);
      } catch (err) {
        console.error(err);
        setError("Could not reach the server. Is npm run server running?");
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const createTodo = async (title, bpm) => {
    try {
      setError(null);

      // send both the title and bpm to the api
      const newTodo = await createTodoRequest(title, bpm);

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not add that song.");
      return false;
    }
  };

  const deleteTodoById = async (id) => {
    try {
      setError(null);

      await deleteTodoRequest(id);

      // remove deleted song from the list
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => {
          return todo.id !== id;
        }),
      );
    } catch (err) {
      console.error(err);
      setError("Could not delete that song.");
    }
  };

  const editTodoById = async (id, newTitle, newBpm) => {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) return false;

    try {
      setError(null);

      // FIXED! now editing updates bpm as well as the title
      const updated = await updateTodoRequest({
        ...todo,
        title: newTitle,
        bpm: newBpm,
      });

      // replace the old song with the updated version
      const updatedTodos = todos.map((item) => {
        if (item.id === id) {
          return updated;
        }

        return item;
      });

      setTodos(updatedTodos);
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not save changes.");
      return false;
    }
  };

  const toggleTodoById = async (id, done) => {
    try {
      setError(null);

      const updated = await toggleTodoRequest(id, done);

      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return updated;
        }

        return todo;
      });

      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
      setError("Could not update practice status.");
    }
  };

  // how many songs are not marked done
  const remaining = todos.filter((todo) => !todo.done).length;

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });
  return (
    <div className="max-w-xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-2">Practice Room</h1>

      <p className="text-gray-600 mb-6">
        What I'm practising and the BPM I'm at.
      </p>

      <TodoCreate onCreate={createTodo} />

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "done"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded ${
              filter === option
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-gray-500">Loading practice list...</p>}

      {error && (
        <p role="alert" className="rounded bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      {!isLoading && !error && todos.length === 0 && (
        <p className="text-gray-500">
          Nothing here yet. Add a song or exercise.
        </p>
      )}

      {!isLoading && todos.length > 0 && (
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoById}
        />
      )}

      {!isLoading && (
        <p className="mt-6 text-sm text-gray-500">
          {remaining} left to practise
        </p>
      )}
    </div>
  );
};

export default App;
