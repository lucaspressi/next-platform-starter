const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  try {
    if (event.httpMethod === 'POST') {
      console.log('Iniciando requisição POST para criar um quiz');

      const { title, questions, userId } = JSON.parse(event.body);

      if (!title || !Array.isArray(questions) || questions.length === 0 || !userId) {
        console.log('Dados inválidos fornecidos:', { title, questions, userId });
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Dados inválidos: título, perguntas ou userId ausentes' })
        };
      }

      console.log('Verificando existência do usuário no banco de dados com ID:', userId);

      // Tenta encontrar o usuário no banco de dados
      let existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      // Se o usuário não existir, cria um novo registro no banco de dados
      if (!existingUser) {
        console.log(`Usuário com ID ${userId} não encontrado. Criando novo usuário no banco de dados.`);
        existingUser = await prisma.user.create({
          data: {
            id: userId,
            name: 'Nome do Usuário', // Ajuste conforme necessário
            email: 'email@example.com', // Ajuste conforme necessário, talvez a partir dos dados fornecidos pelo Clerk
            password: 'senha', // Se necessário, ajuste para uma senha segura
          },
        });
        console.log('Usuário criado:', existingUser);
      }

      console.log('Usuário encontrado ou criado, criando o quiz para o usuário:', userId);

      const quiz = await prisma.quiz.create({
        data: {
          title: title || 'Quiz de Casal',
          user: { connect: { id: userId } },
          questions: {
            create: questions.map((question, index) => ({
              imageUrl: question.imageUrl || '',
              question: question.question || 'Pergunta não definida',
              options: question.options || ['', '', '', ''],
              correctOption: question.correctOption || 0,
              order: index
            }))
          }
        },
        include: { questions: true }
      });

      console.log('Quiz criado com sucesso:', quiz);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, quizId: quiz.id })
      };
    } else if (event.httpMethod === 'GET') {
      console.log('Iniciando requisição GET para obter quizzes');

      const quizzes = await prisma.quiz.findMany({
        include: { questions: true },
        orderBy: { createdAt: 'desc' }
      });

      console.log('Quizzes encontrados:', quizzes);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(quizzes)
      };
    }

    console.log('Método não permitido:', event.httpMethod);

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' })
    };

  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erro ao processar requisição',
        message: error.message
      })
    };
  }
};
