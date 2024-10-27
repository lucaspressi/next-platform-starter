// app/api/quiz/[id]/results/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, context) {
  try {
    const id = context.params.id;
    const { answers } = await request.json();

    console.log('DEBUG - ID:', id);
    console.log('DEBUG - Answers:', answers);

    // Buscar o quiz
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      select: { questions: true } // Simplificado para pegar só as questões
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz não encontrado' }, { status: 404 });
    }

    // Calcular pontuação
    const correctAnswers = quiz.questions.reduce((acc, question, index) => {
      return answers[index] === question.correctOption ? acc + 1 : acc;
    }, 0);
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    // Criar o resultado de forma simplificada
    const result = await prisma.quizResult.create({
      data: {
        quizId: id,
        answers: JSON.stringify(answers),
        score
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao processar o quiz:', error);
    return NextResponse.json({ 
      error: 'Erro ao processar o quiz',
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET(request, context) {
  try {
    const id = context.params.id;

    const result = await prisma.quizResult.findFirst({
      where: { quizId: id },
      orderBy: { completedAt: 'desc' },
      include: {
        quiz: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!result) {
      return NextResponse.json({ error: 'Resultado não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao buscar resultado:', error);
    return NextResponse.json({ 
      error: 'Erro ao buscar resultado',
      details: error.message 
    }, { status: 500 });
  }
}