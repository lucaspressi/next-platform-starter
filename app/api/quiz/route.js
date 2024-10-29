// app/api/quiz/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Obtenha a sessão com `getServerSession`
    const session = await getServerSession(authOptions);

    // Verifique se o usuário está autenticado
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Pegue o ID do usuário da sessão
    const userId = session.user.id;

    if (!userId) {
      console.error("Erro: userId indefinido na sessão.");
      return NextResponse.json({ error: 'ID do usuário indefinido' }, { status: 400 });
    }

    // Parseie o body da requisição
    const { title, questions } = await request.json();

    // Crie o quiz no Prisma
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        userId,
        questions: {
          create: questions.map((question, index) => ({
            question: question.question,
            imageUrl: question.imageUrl || "",
            options: question.options,
            correctOption: question.correctOption,
            order: index,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    return NextResponse.json({ error: 'Erro ao criar quiz' }, { status: 500 });
  }
}
