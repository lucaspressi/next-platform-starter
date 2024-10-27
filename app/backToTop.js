// app/backToTop.js
'use client';

import { useEffect } from 'react';

export function initBackToTop() {
  useEffect(() => {
    const backToTopButton = document.getElementById('backToTop');
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
      } else {
        backToTopButton.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}