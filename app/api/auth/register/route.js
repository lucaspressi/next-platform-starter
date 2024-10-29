import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Reutilizando instância do Prisma no ambiente de desenvolvimento
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Validação de dados
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    // Verificação de email já cadastrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
    }

    // Criação do hash da senha e registro do usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // Retorna o ID do usuário criado, sem incluir a senha na resposta
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
