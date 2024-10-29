import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { BackToTop } from '../components/BackToTop';
import { Suspense } from 'react';
import { Providers } from './providers';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
    title: {
        template: '%s | Quiz Elegante',
        default: 'Quiz Elegante - Crie momentos especiais'
    },
    description: 'Crie quizzes românticos e compartilhe momentos especiais com quem você ama.',
    keywords: ['quiz', 'romance', 'casal', 'amor', 'momentos especiais'],
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider 
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            secretKey={process.env.CLERK_SECRET_KEY}
            signInFallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/onboarding"
        >
            <html lang="pt-BR" data-theme="lofi" className={inter.variable}>
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
                            <Footer />
                            <BackToTop />
                        </div>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
