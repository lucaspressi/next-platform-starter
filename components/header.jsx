// components/header.jsx
'use client';

import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Criar Página', href: '/create-page' },
    { linkText: 'Galeria', href: '/gallery' },
    { linkText: 'Como Funciona', href: '/how-it-works' },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <nav className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
    <div className="relative group">
        {/* Círculo decorativo com gradiente */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Corações sobrepostos */}
        <div className="relative">
            <Heart className="w-9 h-9 fill-pink-500 transform -rotate-12 transition-transform duration-300 group-hover:rotate-0" />
            <Heart className="w-7 h-7 fill-purple-500 absolute -right-1 -bottom-1 transform rotate-12 transition-transform duration-300 group-hover:rotate-0" />
        </div>
    </div>
    
    {/* Texto do logo com fontes mais encorpadas */}
    <div className="flex flex-col items-start">
        <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
            Quiz
        </span>
        <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent -mt-1.5">
            Elegante
        </span>
    </div>
</Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-6">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-base-content/80 hover:text-primary transition-colors duration-200 font-medium"
                                    >
                                        {item.linkText}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/create-page"
                            className="btn btn-primary btn-sm"
                        >
                            Criar Agora
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
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

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="block py-2 text-base-content/80 hover:text-primary transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.linkText}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4">
                                <Link
                                    href="/create-page"
                                    className="btn btn-primary btn-sm w-full"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Criar Agora
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}