"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState([]);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  // Fetch todos
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!text.trim()) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setText("");
  };

  // Toggle todo
  const toggleTodo = async (id) => {
    const res = await fetch(`${API_URL}/api/todos/${id}`, { method: "PATCH" });
    const updatedTodo = await res.json();
    setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t._id !== id));
  };

  function handleLogin() {
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-5">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between h-fit items-start">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
            📝 Your To-Do List
          </h1>
          {/* <div
            className="text-base py-1 justify-center items-center bg-blue-700 hover:bg-blue-800 text-white px-3 rounded-lg cursor-pointer"
            onClick={() => {
              handleLogin();
            }}
          >Login</div> */}
          {
            <div
              className="text-base py-1 justify-center items-center bg-blue-700 hover:bg-blue-800 text-white px-3 rounded-lg cursor-pointer"
              onClick={() => {
                handleLogin();
              }}
            >
              {user.username ? user.username : "Login"}
            </div>
          }
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to do?"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo._id)}
                  className="h-5 w-5 text-blue-600"
                />
                <span
                  onClick={() => toggleTodo(todo._id)}
                  className={`cursor-pointer text-lg ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.toDo}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{todo.username}</span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-sm bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
