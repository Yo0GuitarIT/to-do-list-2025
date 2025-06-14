"use client";

import { useState, useEffect } from "react";

interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // 載入待辦事項
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodos = async () => {
    if (inputValue.trim() === "") return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue.trim() }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos((prev) => [newTodo, ...prev]);
        setInputValue("");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (response.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">載入中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Todo List
      </h1>

      <div className="flex mb-4">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            addTodos();
          }}
          placeholder="新增待辦事項..."
        />
        <button
          onClick={addTodos}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          新增
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center p-3 rounded-md ${
              todo.completed ? "bg-green-100" : "bg-gray-50"
            }`}
          >
            <input
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 px-2 py-1 text-red-600 hover:bg-red-100 rounded text-sm"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          還沒有待辦事項，來新增一個吧！
        </p>
      )}
    </div>
  );
};

export default TodoList;
