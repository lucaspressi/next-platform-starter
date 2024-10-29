// app/onboarding/page.jsx
'use client';

import { ClerkProvider, useUser, RedirectToSignIn } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      // Se o usuário já concluiu o onboarding, redireciona para o dashboard
      if (user.publicMetadata?.onboardingComplete) {
        router.push('/dashboard');
      }
    }
  }, [isSignedIn, user, router]);

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const completeOnboarding = async () => {
    // Atualiza o estado de onboarding do usuário no Clerk
    await user.update({
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    router.push('/dashboard'); // Redireciona para o dashboard após concluir o onboarding
  };

  return (
    <ClerkProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Bem-vindo, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mb-6">
            Estamos felizes em tê-lo(a) aqui! Vamos configurar sua conta para você começar.
          </p>
          <button
            onClick={completeOnboarding}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            Concluir Onboarding
          </button>
        </div>
      </div>
    </ClerkProvider>
  );
}
