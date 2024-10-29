'use client';
import { SignIn } from '@clerk/nextjs';
import { Heart } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center">
        
        <div className="mb-6">
          <Heart className="text-pink-500 w-16 h-16 mx-auto animate-bounce" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">Bem-vindo ao Quiz Elegante!</h1>
        <p className="text-gray-600 mb-8">
          Crie e compartilhe momentos especiais com quem você ama!
        </p>

        {/* Componente SignIn que automaticamente lida com o redirecionamento */}
        <SignIn path="/sign-in" routing="path" />

        <p className="text-sm text-gray-400 mt-8">
          Ao continuar, você aceita nossos{" "}
          <a href="/terms" className="text-purple-500 hover:underline">
            Termos de Serviço
          </a>{" "}
          e{" "}
          <a href="/privacy" className="text-purple-500 hover:underline">
            Política de Privacidade
          </a>.
        </p>
      </div>
    </div>
  );
}
