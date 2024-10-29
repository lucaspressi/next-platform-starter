// app/api/quiz/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    console.log("Iniciando a requisição POST para criar um quiz...");

    // Obter o usuário autenticado
    const user = await currentUser();
    console.log("Usuário autenticado:", user);

    if (!user) {
      console.warn("Usuário não autenticado. Retornando erro 401.");
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const userId = user.id;
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const email = user.emailAddresses[0]?.emailAddress || '';

    console.log("ID do usuário:", userId);

    // Verifique se o usuário existe no banco de dados
    let existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Se o usuário não existir, crie um novo usuário sem o campo `password`
    if (!existingUser) {
      console.log(`Usuário com ID ${userId} não encontrado. Criando novo usuário no banco de dados.`);
      existingUser = await prisma.user.create({
        data: {
          id: userId,
          name: `${firstName} ${lastName}`,
          email: email,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("Usuário criado:", existingUser);
    }

    // Obter os dados do corpo da requisição
    const { title, questions } = await request.json();
    console.log("Dados recebidos:", { title, questions });

    // Validar se os dados estão no formato esperado
    if (!title || !Array.isArray(questions) || questions.length === 0) {
      console.warn("Dados inválidos recebidos:", { title, questions });
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    // Criação do quiz no banco de dados
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        userId, // Usando o ID do usuário autenticado
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

    console.log("Quiz criado com sucesso:", newQuiz);
    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    return NextResponse.json({ error: 'Erro ao criar quiz', message: error.message }, { status: 500 });
  }
}
