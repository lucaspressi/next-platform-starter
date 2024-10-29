import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const { id: userId } = context.params; // Acessando o ID do usuário dos parâmetros da URL

    // Obtém a sessão do usuário autenticado
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const sessionUserId = session.user.id;

    // Verifica se o usuário autenticado corresponde ao ID do parâmetro
    if (sessionUserId !== userId) {
      return NextResponse.json({ error: 'Não autorizado a ver este recurso' }, { status: 403 });
    }

    // Log para garantir que o ID do usuário está correto
    console.log("UserId from session:", sessionUserId);
    
    // Obtém apenas os quizzes do usuário autenticado
    const quizzes = await prisma.quiz.findMany({
      where: { userId: sessionUserId }, // Usa o ID da sessão do usuário logado
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });

    console.log("Quizzes retornados:", quizzes); // Log dos quizzes para verificação

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar quizzes:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  }
}
