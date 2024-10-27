// app/create-quiz/components/QuizTitleInput.jsx
import React from 'react';
import { Heart } from 'lucide-react';

export default function QuizTitleInput({ title, setTitle }) {
  return (
    <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Dê um título especial para seu quiz
      </label>
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Quiz do Nosso Amor, Momentos Especiais, Nossa História..."
          className="w-full p-4 text-lg border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300 pr-12"
        />
        <Heart className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-pink-400" />
      </div>
    </div>
  );
}
