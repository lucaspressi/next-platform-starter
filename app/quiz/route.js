// app/api/quiz/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Obter o usuário autenticado com Clerk
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const userId = user.id;

    // Verifica se o usuário já existe no banco de dados
    let dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Se o usuário não existir, cria o usuário no banco de dados
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId,
          email: user.emailAddresses[0].emailAddress, // Usando o email do Clerk
          name: `${user.firstName} ${user.lastName}`, // Nome e sobrenome do Clerk
        },
      });
      console.log(`Usuário com ID ${userId} criado no banco de dados.`);
    } else {
      console.log(`Usuário com ID ${userId} já existe no banco de dados.`);
    }

    // Recebe os dados do corpo da requisição
    const { title, questions } = await request.json();

    // Cria o quiz no Prisma
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        userId: dbUser.id, // Vincula ao ID do usuário no banco de dados
        questions: {
          create: questions.map((question, index) => ({
            question: question.question,
            imageUrl: question.imageUrl || "",
            options: question.options,
            correctOption: question.correctOption,
            order: index,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    return NextResponse.json({ error: 'Erro ao criar quiz' }, { status: 500 });
  }
}
