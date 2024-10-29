// app/api/quiz/user/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const { id: userId } = context.params;

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const sessionUserId = user.id;

    if (sessionUserId !== userId) {
      return NextResponse.json({ error: 'Não autorizado a ver este recurso' }, { status: 403 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId: sessionUserId },
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar quizzes:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  }
}
