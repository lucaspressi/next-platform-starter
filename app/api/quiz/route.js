// app/api/quiz/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
            imageUrl: q.imageUrl || '',
            options: q.options,
            correctOption: q.correctOption || 0,
            order: q.order || 0
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

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId: session.user.id },
      include: { questions: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Erro ao buscar quizzes:', error);
    return NextResponse.json({ error: 'Erro ao buscar quizzes' }, { status: 500 });
  }
}