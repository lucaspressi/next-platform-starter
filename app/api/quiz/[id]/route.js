// app/api/quiz/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

// Handler para GET - Qualquer um pode acessar
export async function GET(request, { params }) {
  const id = params?.id; // Assegura que `id` está presente

  if (!id) {
    return NextResponse.json({ error: "ID do quiz não fornecido" }, { status: 400 });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz não encontrado" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar o quiz:", error);
    return NextResponse.json({ error: "Erro ao buscar o quiz" }, { status: 500 });
  }
}

// Handler para POST - Requer autenticação
export async function POST(request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  const { title, questions } = await request.json();

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        userId: user.id,
        questions: {
          create: questions.map((question) => ({
            ...question,
          })),
        },
      },
    });
    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o quiz:", error);
    return NextResponse.json({ error: "Erro ao criar o quiz" }, { status: 500 });
  }
}
