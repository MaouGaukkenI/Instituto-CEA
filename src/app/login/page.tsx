"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ⬅️ novo

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // limpa erro anterior

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/", // redireciona manualmente se login der certo
    });

    if (result?.error) {
      setErrorMessage(result.error); // mostra erro retornado do backend
    } else if (result?.ok && result?.url) {
      router.push(result.url); // redireciona se sucesso
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {/* Exibe erro se houver */}
      {errorMessage && (
        <div className="bg-red-600 text-white p-2 rounded mb-4 w-80 text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit" className="bg-blue-500 p-2 rounded">
          Entrar
        </button>
        <button
          type="button"
          className="bg-green-500 p-2 rounded"
          onClick={() => router.push("/register")}
        >
          Cadastrar Usuário
        </button>
        <button
          type="button"
          className="bg-red-500 p-2 rounded"
          onClick={() => signIn("google")}
        >
          Entrar com Google
        </button>
      </form>
    </div>
  );
}
