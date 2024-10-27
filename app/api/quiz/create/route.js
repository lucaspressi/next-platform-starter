import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Verificar se está recebendo JSON ou FormData
    const contentType = req.headers.get('content-type') || '';
    let quizData;

    if (contentType.includes('application/json')) {
      const data = await req.json();
      quizData = data.quizData;
    } else {
      const formData = await req.formData();
      console.log('Conteúdo do FormData:', formData); // Log para ver o conteúdo
      quizData = JSON.parse(formData.get('quizData'));
    }

    // Log do quizData para ver se o JSON foi interpretado corretamente
    console.log('quizData após parse:', quizData);

    // Criar o quiz no banco de dados
    const quiz = await prisma.quiz.create({
      data: {
        title: 'Quiz de Casal',
        questions: {
          create: quizData.map((question, index) => ({
            imageUrl: `URL_DA_IMAGEM_${index}`,
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
