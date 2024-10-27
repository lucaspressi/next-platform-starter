// app/api/quiz/user/[id]/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id: userId } = params;

    // Verifica se o usuário está tentando acessar seus próprios quizzes
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId },
      include: { questions: true },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Erro ao buscar quizzes do usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { quizId, answers } = await request.json();

    if (!quizId || !answers) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const quizResult = await prisma.quizResult.create({
      data: {
        quizId,
        userId: session.user.id,
        answers: JSON.stringify(answers),
        score: 0, // Você pode calcular a pontuação aqui se desejar
      },
    });

    return NextResponse.json(quizResult);
  } catch (error) {
    console.error('Erro ao salvar resultado do quiz:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar resultado do quiz' },
      { status: 500 }
    );
  }
}