// netlify/functions/quiz.js
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
      const { title, questions, userId } = JSON.parse(event.body);

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Dados inválidos: "questions" deve ser um array de perguntas');
      }

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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, quizId: quiz.id })
      };
    }

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
