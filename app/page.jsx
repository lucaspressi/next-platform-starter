// app/page.jsx
import Link from 'next/link';
import { Heart, Camera, MessageCircle, QrCode, Star, StarHalf, Users, Calendar, Gift } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://quizelegante.com.br'),
  title: 'Quiz de Casal - Crie Quizzes Românticos Personalizados com Fotos ❤️',
  description:
    'Crie quizzes românticos personalizados com fotos e perguntas sobre seu relacionamento. Surpreenda seu amor com um quiz único, adicione momentos especiais e mensagens carinhosas. Comece agora gratuitamente!',
  keywords: [
    'quiz de casal',
    'quiz romântico',
    'quiz para namorados',
    'teste de amor',
    'quiz de relacionamento',
    'presente criativo namoro',
    'surpresa romântica',
    'quiz com fotos',
    'quiz personalizado',
    'brincadeira para casal',
    'quiz do amor',
    'presente dia dos namorados',
    'quiz online relacionamento',
    'teste casal online',
    'quiz elegante'
  ],
  openGraph: {
    title: 'Quiz de Casal - Crie Quizzes Românticos com Fotos ❤️',
    description:
      'Surpreenda seu amor com um quiz personalizado! Adicione fotos especiais, crie perguntas únicas e compartilhe momentos inesquecíveis.',
    url: 'https://quizelegante.com.br',
    siteName: 'Quiz Elegante',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og-image-quiz-casal.jpg',
        width: 1200,
        height: 630,
        alt: 'Quiz de Casal - Crie momentos especiais',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@QuizElegante',
    creator: '@QuizElegante',
    title: 'Quiz de Casal - Crie Quizzes Românticos com Fotos ❤️',
    description: 'Surpreenda seu amor com um quiz personalizado! Adicione fotos e mensagens especiais.',
    images: ['/twitter-card-quiz-casal.jpg'],
  },
  alternates: {
    canonical: 'https://quizelegante.com.br',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Page() {
  return (
    <>
      {/* Google Ads */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Quiz Elegante',
            description: 'Plataforma de criação de quizzes românticos personalizados para casais.',
            url: 'https://quizelegante.com.br',
            potentialAction: {
              '@type': 'CreateAction',
              target: 'https://quizelegante.com.br/create-quiz',
              result: {
                '@type': 'CreativeWork',
                name: 'Quiz Romântico Personalizado'
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <main className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
          {/* Hero Section com métricas */}
          <section className="text-center mb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-purple-200/20 to-pink-200/20 animate-gradient-x"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm mb-6">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm font-medium text-gray-600">+ de 1000 quizzes criados</span>
              </div>

              <div className="animate-float">
                <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6" aria-hidden='true'/>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Crie seu Quiz de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Casal</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Transforme seus momentos especiais em um quiz romântico! 
                Com fotos e perguntas únicas, celebre sua história de amor de um jeito divertido e surpreendente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Comece Agora
                  <Heart className="w-5 h-5 ml-2 animate-pulse" />
                </Link>

                <Link
                  href="#como-funciona"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Como Funciona
                  <MessageCircle className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
                <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                  <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">1000+</p>
                  <p className="text-sm text-gray-600">Casais Felizes</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                  <Calendar className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">5000+</p>
                  <p className="text-sm text-gray-600">Memórias Compartilhadas</p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl shadow-sm hidden md:block">
                  <Gift className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">4.9/5</p>
                  <p className="text-sm text-gray-600">Avaliação Média</p>
                </div>
              </div>
            </div>
          </section>
{/* Seção de Recursos */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           <FeatureCard
             icon={
               <Camera className="w-8 h-8 text-pink-500 animate-bounce" aria-hidden='true'/>
             }
             title="Suas Fotos Especiais"
             description="Faça upload das suas fotos favoritas juntos. Suportamos vários formatos de imagem para você escolher os melhores momentos."
           />
           <FeatureCard
             icon={
               <MessageCircle className="w-8 h-8 text-purple-500" aria-hidden='true'/>
             }
             title="Mensagem Personalizada"
             description="Escreva uma mensagem única e especial que será exibida junto com suas fotos, tornando o momento ainda mais memorável."
           />
           <FeatureCard
             icon={
               <QrCode className="w-8 h-8 text-pink-500" aria-hidden='true'/>
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

         {/* Seção de Depoimentos */}
         <section className="mb-20 bg-white rounded-2xl p-8 sm:p-12 shadow-xl">
           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
             O Que Dizem Nossos Usuários
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <TestimonialCard
               name="Maria Silva"
               text="Amei criar um quiz personalizado! Meu namorado adorou a surpresa e as fotos especiais. Foi uma forma única de celebrar nosso aniversário de namoro!"
               rating={5}
               date="Há 2 dias"
             />
             <TestimonialCard
               name="João Santos"
               text="Fiz um quiz surpresa para minha namorada e ela ficou super emocionada! A plataforma é super fácil de usar e as opções de personalização são incríveis."
               rating={5}
               date="Há 1 semana"
             />
             <TestimonialCard
               name="Ana Costa"
               text="Que ideia genial! Criei um quiz para nosso aniversário de casamento e foi um momento super especial relembrar nossa história juntos."
               rating={4.5}
               date="Há 3 dias"
             />
           </div>
         </section>

         {/* Seção FAQ */}
         <section className="mb-20 bg-white rounded-2xl p-8 sm:p-12 shadow-xl">
           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
             Perguntas Frequentes
           </h2>
           <div className="space-y-8 max-w-4xl mx-auto">
             <FaqItem
               question="Como funciona o Quiz Elegante?"
               answer="É simples! Você cria perguntas personalizadas, adiciona fotos especiais e compartilha com seu amor através de um link ou QR Code exclusivo. Você pode escolher entre nossas perguntas predefinidas ou criar as suas próprias."
             />
             <FaqItem
               question="Posso adicionar fotos ao quiz?"
               answer="Sim! Você pode adicionar fotos especiais para cada pergunta do quiz, tornando a experiência mais pessoal e emotiva. Aceitamos imagens em JPG, PNG e outros formatos populares."
             />
             <FaqItem
               question="O quiz é gratuito?"
               answer="Sim, a criação básica de quiz é totalmente gratuita! Você pode criar e compartilhar seus quizzes sem custo algum. Temos também opções premium com recursos adicionais."
             />
             <FaqItem
               question="Por quanto tempo o quiz fica disponível?"
               answer="Seu quiz fica disponível permanentemente em nossa plataforma. Você pode editar, compartilhar ou excluir seu quiz a qualquer momento através da sua conta."
             />
             <FaqItem
               question="Como compartilho meu quiz?"
               answer="Após criar seu quiz, você recebe um link exclusivo e um QR Code que pode ser compartilhado por WhatsApp, e-mail ou qualquer outra rede social. Seu amor pode acessar o quiz de qualquer dispositivo!"
             />
           </div>
         </section>

         {/* Área do Google Ads */}
         <div className="my-12 text-center">
           <ins
             className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
             data-ad-slot="YOUR_AD_SLOT"
             data-ad-format="auto"
             data-full-width-responsive="true"
           />
<Script id="adsense-init">
  {`
    (adsbygoogle = window.adsbygoogle || []).push({});
  `}
</Script>
         </div>

         {/* Chamada para Ação Final */}
         <section className="text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 sm:p-12 mb-20">
           <h2 className="text-3xl font-bold text-gray-800 mb-6">
             Pronto para Criar sua Página Romântica?
           </h2>
           <p className="text-lg text-gray-600 mb-8">
             Comece agora e crie um momento inesquecível para vocês dois.
           </p>
           <Link
             href="/sign-in"
             className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
           >
             Criar Meu Quiz
             <Heart className="w-5 h-5 ml-2 animate-pulse" />
           </Link>
         </section>
{/* Footer */}
<footer className="mt-20 text-center border-t border-gray-100 pt-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
             {/* Coluna 1 - Sobre */}
             <div>
               <h3 className="font-semibold text-gray-800 mb-4">Sobre Nós</h3>
               <p className="text-sm text-gray-600">
                 Quiz Elegante é a plataforma perfeita para criar momentos especiais e únicos para casais apaixonados.
               </p>
             </div>

             {/* Coluna 2 - Links Rápidos */}
             <div>
               <h3 className="font-semibold text-gray-800 mb-4">Links Rápidos</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/como-funciona" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Como Funciona
                   </Link>
                 </li>
                 <li>
                   <Link href="/exemplos" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Exemplos de Quiz
                   </Link>
                 </li>
                 <li>
                   <Link href="/dicas" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Dicas Românticas
                   </Link>
                 </li>
                 <li>
                   <Link href="/blog" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Blog
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Coluna 3 - Legal */}
             <div>
               <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/termos" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Termos de Uso
                   </Link>
                 </li>
                 <li>
                   <Link href="/privacidade" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Política de Privacidade
                   </Link>
                 </li>
                 <li>
                   <Link href="/cookies" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Política de Cookies
                   </Link>
                 </li>
               </ul>
             </div>

             {/* Coluna 4 - Contato */}
             <div>
               <h3 className="font-semibold text-gray-800 mb-4">Contato</h3>
               <ul className="space-y-2">
                 <li>
                   <Link href="/contato" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Fale Conosco
                   </Link>
                 </li>
                 <li>
                   <Link href="/suporte" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     Suporte
                   </Link>
                 </li>
                 <li>
                   <a href="mailto:contato@quizelegante.com.br" className="text-sm text-gray-600 hover:text-pink-500 transition-colors">
                     contato@quizelegante.com.br
                   </a>
                 </li>
               </ul>
             </div>
           </div>

           {/* Copyright */}
           <div className="border-t border-gray-100 pt-8 pb-4">
             <p className="text-sm text-gray-500">
               © {new Date().getFullYear()} Quiz Elegante - Todos os direitos reservados
             </p>
           </div>
         </footer>
       </main>
     </div>
   </>
 );
}

// Componentes
function FeatureCard({ icon, title, description }) {
 return (
   <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
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

function TestimonialCard({ name, text, rating, date }) {
 return (
   <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
     <div className="flex mb-4">
       {[...Array(Math.floor(rating))].map((_, i) => (
         <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
       ))}
       {rating % 1 !== 0 && (
         <StarHalf className="w-5 h-5 text-yellow-400" fill="currentColor" />
       )}
     </div>
     <p className="text-gray-600 mb-4 italic">"{text}"</p>
     <div className="flex justify-between items-center">
       <p className="font-semibold text-gray-800">- {name}</p>
       <span className="text-sm text-gray-500">{date}</span>
     </div>
   </div>
 );
}

function FaqItem({ question, answer }) {
 return (
   <div className="border-b border-gray-100 pb-6">
     <h3 className="text-xl font-semibold text-gray-800 mb-3">{question}</h3>
     <p className="text-gray-600 leading-relaxed">{answer}</p>
   </div>
 );
}

// Adicione ao seu arquivo global.css
/*
*/