// app/api/quiz/user/[id]/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const userId = context.params.id;

    // Verificar se o usuário está tentando acessar seus próprios quizzes
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId },
      include: { questions: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Erro ao buscar quizzes do usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  }
}