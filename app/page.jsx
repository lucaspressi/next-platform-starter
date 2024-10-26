// app/page.js
import Link from 'next/link';
import { Heart, Camera, MessageCircle, QrCode } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <main className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="animate-float">
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold text-gray-600 mb-6">
            Crie seu Quiz de <span className="text-pink-400">Casal</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Celebre seu amor de uma maneira única! Crie uma página especial com suas fotos 
            favoritas e uma mensagem personalizada para surpreender seu amor.
          </p>
          <Link
            href="/create-quiz"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Comece Agora
            <Heart className="w-5 h-5 ml-2 animate-pulse" />
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Camera className="w-8 h-8 text-pink-500" />}
            title="Suas Fotos Especiais"
            description="Faça upload das suas fotos favoritas juntos. Suportamos vários formatos de imagem para você escolher os melhores momentos."
          />
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8 text-purple-500" />}
            title="Mensagem Personalizada"
            description="Escreva uma mensagem única e especial que será exibida junto com suas fotos, tornando o momento ainda mais memorável."
          />
          <FeatureCard
            icon={<QrCode className="w-8 h-8 text-pink-500" />}
            title="QR Code Exclusivo"
            description="Gere um QR Code para compartilhar sua página romântica de forma criativa e surpreendente com seu amor."
          />
        </section>

        {/* How It Works Section */}
        <section className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Escolha suas Fotos"
              description="Selecione pelo menos 3 fotos especiais que contem sua história de amor."
            />
            <StepCard
              number="2"
              title="Personalize"
              description="Adicione uma mensagem carinhosa e escolha o estilo da sua página."
            />
            <StepCard
              number="3"
              title="Compartilhe"
              description="Gere um QR Code único e surpreenda seu amor de uma forma especial."
            />
          </div>
        </section>

        {/* Call to Action */}
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
            <Heart className="w-5 h-5 ml-2" />
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
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 h-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}