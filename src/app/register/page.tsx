"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepBackIcon } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative">
      <div className="w-full max-w-[20rem] relative">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute -top-10 left-0 bg-transparent hover:bg-gray-700/20 p-2 rounded-full transition"
        >
          <StepBackIcon />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">Criar Conta</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded text-black"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded text-black"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded text-black"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-green-500 p-2 rounded">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
