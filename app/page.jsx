// app/page.jsx
import Link from 'next/link';
import { Heart, Camera, MessageCircle, QrCode } from 'lucide-react';

export const metadata = {
  title: 'Quiz de Casal - Crie Quizzes Românticos Personalizados',
  description:
    'Crie quizzes personalizados com fotos e perguntas sobre seu relacionamento. Celebre o amor de uma forma única com o Quiz de Casal.',
  keywords: [
    'quiz de casal',
    'quizzes românticos',
    'quizzes personalizados',
    'amor',
    'relacionamento',
    'fotos de casal',
    'mensagem personalizada',
    'surpresa romântica',
    'quiz online',
    'quiz elegante',
  ],
  openGraph: {
    title: 'Quiz de Casal - Crie Quizzes Românticos Personalizados',
    description:
      'Crie quizzes personalizados com fotos e perguntas sobre seu relacionamento. Celebre o amor de uma forma única com o Quiz de Casal.',
    url: 'https://seu-dominio.com', // Substitua pelo seu domínio real
    type: 'website',
    images: [
      {
        url: 'https://seu-dominio.com/imagens/preview.jpg', // Substitua pela URL da sua imagem
        width: 1200,
        height: 630,
        alt: 'Quiz de Casal - Crie Quizzes Românticos Personalizados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@seuusuario', // Substitua pelo seu usuário do Twitter
    creator: '@seuusuario',
    title: 'Quiz de Casal - Crie Quizzes Românticos Personalizados',
    description:
      'Crie quizzes personalizados com fotos e perguntas sobre seu relacionamento. Celebre o amor de uma forma única com o Quiz de Casal.',
    images: ['https://seu-dominio.com/imagens/preview.jpg'], // Substitua pela URL da sua imagem
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* Seção Hero */}
        <section className="text-center mb-20">
          <div className="animate-float">
            <Heart
              className="w-16 h-16 text-pink-500 mx-auto mb-6"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold text-gray-600 mb-6">
            Crie seu Quiz de <span className="text-pink-400">Casal</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Transforme seus momentos especiais em um quiz romântico! 
          Com fotos e perguntas únicas, celebre sua história de amor de um jeito divertido e surpreendente.

          </p>
          <Link
            href="/create-quiz"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Comece Agora
            <Heart
              className="w-5 h-5 ml-2 animate-pulse"
              aria-hidden="true"
            />
          </Link>
        </section>

        {/* Seção de Recursos */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={
              <Camera
                className="w-8 h-8 text-pink-500"
                aria-hidden="true"
              />
            }
            title="Suas Fotos Especiais"
            description="Faça upload das suas fotos favoritas juntos. Suportamos vários formatos de imagem para você escolher os melhores momentos."
          />
          <FeatureCard
            icon={
              <MessageCircle
                className="w-8 h-8 text-purple-500"
                aria-hidden="true"
              />
            }
            title="Mensagem Personalizada"
            description="Escreva uma mensagem única e especial que será exibida junto com suas fotos, tornando o momento ainda mais memorável."
          />
          <FeatureCard
            icon={
              <QrCode
                className="w-8 h-8 text-pink-500"
                aria-hidden="true"
              />
            }
            title="QR Code Exclusivo"
            description="Gere um QR Code para compartilhar sua página romântica de forma criativa e surpreendente com seu amor."
          />
        </section>

    {/* Seção Como Funciona */}
    <section id="como-funciona" className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl mb-20 scroll-mt-24">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Como Funciona
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StepCard
        number="1"
        title="Monte seu Quiz"
        description="Escolha perguntas pré-definidas ou crie suas próprias questões personalizadas sobre seu relacionamento."
        />
        <StepCard
        number="2"
        title="Adicione Fotos"
        description="Para cada pergunta, adicione uma foto especial que representa aquele momento ou memória."
        />
        <StepCard
        number="3"
        title="Personalize Respostas"
        description="Defina as alternativas e a resposta correta para cada pergunta do quiz."
        />
        <StepCard
        number="4"
        title="Compartilhe"
        description="Receba um link exclusivo e QR Code para compartilhar seu quiz. Ao final, descubra a pontuação e mensagens personalizadas!"
        />
    </div>
    </section>

        {/* Chamada para Ação */}
        <section className="text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Pronto para Criar sua Página Romântica?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Comece agora e crie um momento inesquecível para vocês dois.
          </p>
          <Link
            href="/create-quiz"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Criar Minha Página
            <Heart className="w-5 h-5 ml-2" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
    return (
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
          {number}
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 h-full hover:transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }
