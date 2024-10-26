// app/layout.js
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Suspense } from 'react';
import { BackToTopButton } from '../components/BackToTopButton';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
    title: {
        template: '%s | Quiz Romântico',
        default: 'Quiz Romântico - Crie momentos especiais'
    },
    description: 'Crie quizzes românticos e compartilhe momentos especiais com quem você ama.',
    keywords: ['quiz', 'romance', 'Romântico', 'amor', 'momentos especiais'],
    authors: [{ name: 'Quiz Romântico' }],
    icons: {
      icon: '/favicon.svg',
    }
};

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default function RootLayout({ children }) {
    return (
        <html 
          lang="pt-BR" 
          data-theme="lofi"
          className={`${inter.variable} antialiased`}
        >
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <meta name="theme-color" content="#FF80B5" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </head>
            <body className="antialiased min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                {/* Gradiente decorativo no topo */}
                <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                
                <div className="relative min-h-screen">
                    {/* Padrão de fundo decorativo */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                    
                    {/* Conteúdo principal */}
                    <div className="relative flex flex-col min-h-screen">
                        <Header />
                        
                        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <Suspense fallback={<LoadingSpinner />}>
                                {children}
                            </Suspense>
                        </main>

                        <Footer />
                    </div>

                    {/* Elementos decorativos flutuantes */}
                    <div className="fixed hidden lg:block">
                        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>
                </div>

                {/* Botão de voltar ao topo */}
                <BackToTopButton />
            </body>
        </html>
    );
}