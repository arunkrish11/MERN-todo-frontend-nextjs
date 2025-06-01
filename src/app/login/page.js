"use client";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Login response:", data);
    // store token, set user, redirect, etc.
  };

  return (
    <div className="flex w-screen h-screen justify-center pt-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="flex flex-col max-w-md  p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="username"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="flex justify-center pt-3 text-sm ">
          Don't have account? <a className="flex ps-2 cursor-pointer" href="/signup"> Create new one.</a>
        </p>
      </div>
    </div>
  );
}
