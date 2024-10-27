// app/api/quiz/[id]/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id: quizId } = params;

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz não encontrado' }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Erro ao buscar quiz:', error);
    return NextResponse.json({ error: 'Erro ao buscar o quiz' }, { status: 500 });
  }
}
