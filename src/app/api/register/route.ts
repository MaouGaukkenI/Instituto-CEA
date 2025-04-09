// app/api/register/route.ts
import { prismaClient } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  // Verificar se o e-mail já está cadastrado
  const existingEmail = await prismaClient.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return NextResponse.json(
      { error: "Endereço de e-mail já cadastrado." },
      { status: 400 }
    );
  }

  // TODO: adicionar validação de senha (mínimo de caracteres, complexidade, etc.)

  const hashedPassword = await hash(password, 12);

  const newUser = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    message: "Usuário registrado com sucesso!",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
}
