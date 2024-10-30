'use client';
import Link from 'next/link';
import { Heart, Menu, X, User, LogOut, Star, Gift, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Partículas otimizadas
const PARTICLES = Array(8).fill().map((_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 2}px`,
  delay: `${Math.random() * 2}s`,
  duration: `${Math.random() * 2 + 2}s`
}));

const navItems = [
  { linkText: 'Home', href: '/' },
  { linkText: 'Como Funciona', href: '/#como-funciona' },
  { linkText: 'Recursos', href: '/#recursos' },
  { linkText: 'Depoimentos', href: '/#depoimentos' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const elementId = href.replace('/#', '');
      document.getElementById(elementId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Redesenhado */}
          <Link href="/" className="group relative flex items-center gap-2">
            {/* Efeito de Brilho */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-300/20 to-pink-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            
            {/* Container do Logo */}
            <div className="relative flex items-center">
              {/* Coração Principal */}
              <div className="relative">
                <Heart 
                  className="w-10 h-10 fill-pink-500 stroke-none transform transition-all duration-500 group-hover:scale-110" 
                />
                <Sparkles 
                  className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" 
                />
              </div>
              
              {/* Texto do Logo */}
              <div className="ml-2">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                    Quiz Casal
                  </span>
                </div>
                
                {/* Linha decorativa */}
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transition-all duration-700" />
              </div>

              {/* Partículas */}
              <div className="absolute inset-0 pointer-events-none">
                {PARTICLES.map((particle, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-pink-400/30 animate-float"
                    style={{
                      left: particle.left,
                      top: particle.top,
                      width: particle.size,
                      height: particle.size,
                      animationDelay: particle.delay,
                      animationDuration: particle.duration,
                    }}
                  />
                ))}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Menu Items */}
            <div className="flex gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative group text-gray-600 hover:text-pink-500 transition-colors duration-300"
                >
                  <span className="relative">
                    {item.linkText}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </div>

            {/* User Menu/Auth */}
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-6">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {user.emailAddresses[0].emailAddress}
                    </span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sair</span>
                  </button>
                </div>
              ) : (
                <Link 
                  href="/sign-in"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium text-sm"
                >
                  <Gift className="w-4 h-4" />
                  Criar Quiz
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-100">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                >
                  {item.linkText}
                </Link>
              ))}
              {isSignedIn ? (
                <>
                  <div className="border-t border-gray-100 my-2" />
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Meu Perfil
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="block px-3 py-2 text-center text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 mt-2"
                >
                  <Gift className="w-4 h-4 inline mr-2" />
                  Criar Quiz
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}