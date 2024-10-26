// components/header.jsx
'use client';
import Link from 'next/link';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Criar Quiz', href: '/create-quiz' },
    { linkText: 'Galeria', href: '/gallery' },
    { linkText: 'Como Funciona', href: '/how-it-works' },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 opacity-80"></div>
            
            <nav className="relative max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group relative flex items-center gap-3">
                        {/* Efeito de brilho flutuante */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-300/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse-slow"></div>
                        
                        {/* Corações animados */}
                        <div className="relative">
                            <Heart className="w-12 h-12 fill-pink-500 transform -rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110" />
                            <Heart className="w-8 h-8 fill-purple-500 absolute -right-1 -bottom-1 transform rotate-12 transition-all duration-500 group-hover:rotate-0" />
                            {/* Faíscas decorativas */}
                            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 transform rotate-45 animate-pulse-slow" />
                        </div>
                        
                        {/* Texto do Logo */}
                        <div className="flex flex-col items-start relative">
                            {/* Efeito de partículas */}
                            <div className="particle-container">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`absolute w-1 h-1 bg-pink-400 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.5}s`
                                        }}
                                    ></div>
                                ))}
                            </div>
                            
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 bg-size-200 animate-gradient bg-clip-text text-transparent">
                                    Quiz
                                </span>
                                <span className="text-xl font-medium text-gray-600 animate-float">
                                    de
                                </span>
                            </div>
                            <span className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-size-200 animate-gradient-slow bg-clip-text text-transparent -mt-1">
                                Casal
                            </span>
                            
                            {/* Linha decorativa animada */}
                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transition-all duration-1000 mt-1"></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-6">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="relative group text-gray-600 hover:text-pink-500 transition-colors duration-300"
                                    >
                                        <span>{item.linkText}</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/create-quiz"
                            className="relative group overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                            <span className="relative z-10">Criar Agora</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative group p-2 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="absolute inset-0 bg-pink-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600 relative z-10" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600 relative z-10" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 md:hidden bg-white/95 backdrop-blur-lg shadow-lg rounded-b-2xl overflow-hidden animate-slide-up">
                        <ul className="flex flex-col p-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="border-b border-gray-100 last:border-none">
                                    <Link
                                        href={item.href}
                                        className="block py-3 text-gray-600 hover:text-pink-500 transition-colors duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.linkText}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4">
                                <Link
                                    href="/create-quiz"
                                    className="block text-center py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Criar Agora
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
            
            {/* Linha decorativa inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-50"></div>
        </header>
    );
}