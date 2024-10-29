// app/api/quiz/user/[id]/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const { id: userId } = context.params;

    // Verificação de autenticação usando getAuth
    const { userId: sessionUserId } = await getAuth(request);

    console.log("ID do usuário da sessão:", sessionUserId);
    console.log("ID do usuário solicitado:", userId);

    if (!sessionUserId) {
      console.log("Erro: Usuário não autenticado.");
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    if (sessionUserId !== userId) {
      console.log("Erro: Usuário não autorizado a ver este recurso.");
      return NextResponse.json({ error: 'Não autorizado a ver este recurso' }, { status: 403 });
    }

    // Busca quizzes do usuário autenticado
    const quizzes = await prisma.quiz.findMany({
      where: { userId: sessionUserId },
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });

    console.log("Quizzes encontrados:", quizzes);
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar quizzes:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Encerra o cliente Prisma
  }
}
