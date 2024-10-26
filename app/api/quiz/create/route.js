// app/api/quiz/create/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const quizData = JSON.parse(formData.get('quizData'));

    // Criar o quiz no banco de dados
    const quiz = await prisma.quiz.create({
      data: {
        title: 'Quiz de Casal',
        questions: {
          create: quizData.map((question, index) => ({
            imageUrl: `URL_DA_IMAGEM_${index}`, // Você precisará implementar o upload de imagens
            question: question.question,
            options: question.options,
            correctOption: question.correctOption
          }))
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      quizId: quiz.id 
    });

  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao criar quiz' 
    }, { status: 500 });
  }
}