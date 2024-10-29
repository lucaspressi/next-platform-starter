// providers.jsx
'use client';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

export function Providers({ children }) {
  return (
    <ClerkProvider>
      {children} {/* Isso deve permitir que qualquer página não protegida funcione */}
      <SignedOut>
        <RedirectToSignIn /> {/* Isso ainda garantirá que as páginas protegidas redirecionem para login */}
      </SignedOut>
    </ClerkProvider>
  );
}
