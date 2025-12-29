"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export async function Login(request) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      // cookie is now set by server 🎉
      router.push("/products");
      router.refresh(); // updates header login/logout state
    } catch (err) {
      setError("Something went wrong");
    }
  }

  return (
      <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Use: abc@gmail.com / abc123456</p>
    </div>
  );
}
