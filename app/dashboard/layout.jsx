//app/dashboard/layout.jsx
'use client';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
    }
  }, [isSignedIn, router]);

  if (isSignedIn === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="text-pink-500 h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Quiz de Casal
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
              <SignOutButton>
                <button className="text-gray-600 hover:text-gray-800 transition-colors">
                  Sair
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
