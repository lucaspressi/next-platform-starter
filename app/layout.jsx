import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Header } from '../components/header';
import { BackToTop } from '../components/BackToTop';
import { Suspense } from 'react';
import { Providers } from './providers';
import { ClerkProvider } from "@clerk/nextjs";
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  metadataBase: new URL('https://quizelegante.com.br'), // Altere para seu domínio
  title: {
    template: '%s | Quiz Elegante',
    default: 'Quiz Elegante - Crie momentos especiais com quizzes românticos personalizados'
  },
  description: 'Crie quizzes românticos personalizados para momentos especiais. Compartilhe amor, memórias e diversão com seu parceiro(a) através de quizzes únicos e interativos.',
  keywords: [
    'quiz romântico', 'quiz casal', 'quiz amor', 'quiz relacionamento', 
    'quiz namoro', 'quiz personalizado', 'quiz especial', 'quiz momentos',
    'quiz romance', 'quiz interativo', 'presente criativo', 'surpresa romântica'
  ],
  authors: [{ name: 'Quiz Elegante' }],
  creator: 'Quiz Elegante',
  publisher: 'Quiz Elegante',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  openGraph: {
    title: 'Quiz Elegante - Crie momentos especiais com quizzes românticos',
    description: 'Crie quizzes românticos personalizados para momentos especiais. Compartilhe amor e memórias com seu parceiro(a).',
    url: 'https://quizelegante.com.br',
    siteName: 'Quiz Elegante',
    images: [
      {
        url: '/og-image.jpg', // Crie uma imagem atraente para compartilhamento
        width: 1200,
        height: 630,
        alt: 'Quiz Elegante - Crie momentos especiais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiz Elegante - Crie momentos especiais com quizzes românticos',
    description: 'Crie quizzes românticos personalizados para momentos especiais.',
    images: ['/twitter-image.jpg'], // Imagem otimizada para Twitter
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
  verification: {
    google: 'seu-código-de-verificação-do-google',
    yandex: 'seu-código-yandex',
    yahoo: 'seu-código-yahoo',
  },
};

export default function RootLayout({ children }) {
  // Estrutura de dados rica para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Quiz Elegante',
    url: 'https://quizelegante.com.br',
    description: 'Plataforma de criação de quizzes românticos personalizados para casais.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://quizelegante.com.br/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      secretKey={process.env.CLERK_SECRET_KEY}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/onboarding"
    >
      <html 
        lang="pt-BR" 
        data-theme="lofi" 
        className={`${inter.variable} scroll-smooth`}
      >
        <head>
          {/* Metatags importantes */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#EC4899" /> {/* Cor tema do site */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          
          {/* Preconnect com domínios importantes */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Estrutura de dados rica */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {/* Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>

          {/* Google AdSense */}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7029722333785566"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </head>
        <body className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <Providers>
            <div className="relative min-h-screen">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
                  </div>
                }>
                  {children}
                </Suspense>
              </main>
              <BackToTop />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}