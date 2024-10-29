import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const { id: userId } = await context.params; // Acessando `params` de forma assíncrona

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const sessionUserId = session.user.id;

    if (sessionUserId !== userId) {
      return NextResponse.json({ error: 'Não autorizado a ver este recurso' }, { status: 403 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId },
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar quizzes:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  }
}
