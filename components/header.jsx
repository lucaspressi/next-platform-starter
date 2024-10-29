'use client';
import Link from 'next/link';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';

const PARTICLE_POSITIONS = [
  { left: '20%', top: '20%', delay: '0s' },
  { left: '50%', top: '30%', delay: '0.5s' },
  { left: '80%', top: '40%', delay: '1s' },
];

const navItems = [
  { linkText: 'Home', href: '/' },
  { linkText: 'Como Funciona', href: '/#como-funciona' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const elementId = href.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setIsMenuOpen(false);
      }
    }
  };

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group relative flex items-center gap-3">
            {/* Efeito de brilho */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-300/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse-slow"></div>

            {/* Corações */}
            <div className="relative">
              <Heart className="w-12 h-12 fill-pink-500 transform -rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110" />
              <Heart className="w-8 h-8 fill-purple-500 absolute -right-1 -bottom-1 transform rotate-12 transition-all duration-500 group-hover:rotate-0" />
            </div>

            {/* Texto do Logo */}
            <div className="flex flex-col items-start relative">
              <div className="particle-container">
                {PARTICLE_POSITIONS.map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      left: pos.left,
                      top: pos.top,
                      animationDelay: pos.delay,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 bg-clip-text text-transparent">
                  Quiz
                </span>
                <span className="text-xl font-medium text-gray-600">de</span>
              </div>
              <span className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-clip-text text-transparent">
                Casal
              </span>

              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transition-all duration-1000 mt-1" />
            </div>
          </Link>

          {/* Navegação Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                  >
                    {item.linkText}
                  </Link>
                </li>
              ))}
            </ul>

            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">{user.emailAddresses[0].emailAddress}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost btn-sm text-gray-600 hover:text-pink-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline ml-1">Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-600 hover:text-pink-500 transition-colors">
                  Login
                </Link>
                <Link href="/create-quiz" className="btn btn-primary btn-sm">
                  Criar Quiz
                </Link>
              </div>
            )}
          </div>

          {/* Botão do Menu Mobile */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navegação Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-600 hover:text-pink-500 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.linkText}
                  </Link>
                </li>
              ))}
              {isSignedIn ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="block py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left py-2 text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 text-gray-600 hover:text-pink-500 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="pt-2">
                    <Link
                      href="/create-quiz"
                      className="btn btn-primary btn-sm w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Criar Quiz
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
