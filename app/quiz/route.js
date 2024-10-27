import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const data = await request.json();
    
    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        userId: session.user.id,
        questions: {
          create: data.questions.map(q => ({
            question: q.question,
            imageUrl: q.image || '',
            options: q.options,
            correctOption: 0 // Você pode ajustar isso conforme necessário
          }))
        }
      },
      include: {
        questions: true
      }
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    return NextResponse.json({ error: 'Erro ao criar quiz' }, { status: 500 });
  }
}