"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "loading" && <p>Carregando...</p>}

      {status === "authenticated" ? (
        <>
          <h1>Bem-vindo, {session.user?.name}!</h1>
          <p>Email: {session.user?.email}</p>
          <p>ID: {session.user?.id}</p>
        </>
      ) : (
        <h1>Bem-vindo, visitante!</h1>
      )}
    </div>
  );
}
