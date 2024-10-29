//app/create-quiz/page.jsx
'use client';
import React, { useState } from 'react';
import { PlusCircle, Save, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import QuizItem from './components/QuizItem';
import QuizTitleInput from './components/QuizTitleInput';
import { AuthModal } from './components/AuthModal';
import { PRESET_QUESTIONS } from './components/presetQuestions';

export default function CreateQuizPage() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const [quizTitle, setQuizTitle] = useState('Meu Quiz');
  const [quizItems, setQuizItems] = useState([
    {
      id: Date.now(),
      questionType: PRESET_QUESTIONS[0]?.value || '',
      question: PRESET_QUESTIONS[0]?.question || '',
      options: ['', '', '', ''],
      image: null,
      correctOption: 0,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const addQuizItem = () =>
    setQuizItems([
      ...quizItems,
      {
        id: Date.now(),
        questionType: PRESET_QUESTIONS[0]?.value || '',
        question: PRESET_QUESTIONS[0]?.question || '',
        options: ['', '', '', ''],
        image: null,
        correctOption: 0,
      },
    ]);

  const handleQuestionTypeChange = (itemId, selectedValue) => {
    setQuizItems(
      quizItems.map((item) => {
        if (item.id === itemId) {
          if (selectedValue === 'custom') {
            return {
              ...item,
              questionType: selectedValue,
              question: '',
              options: ['', '', '', ''],
            };
          } else {
            const selectedQuestion = PRESET_QUESTIONS.find(
              (q) => q.value === selectedValue
            );
            return {
              ...item,
              questionType: selectedValue,
              question: selectedQuestion?.question || '',
              options: selectedQuestion?.options || ['', '', '', ''],
            };
          }
        }
        return item;
      })
    );
  };

  const validateQuiz = () => {
    setError('');
  
    if (!quizTitle.trim()) {
      setError('Por favor, defina um título para o quiz');
      return false;
    }
  
    if (quizItems.length === 0) {
      setError('Adicione pelo menos uma pergunta ao quiz');
      return false;
    }
  
    for (let i = 0; i < quizItems.length; i++) {
      const item = quizItems[i];
  
      if (!item.question?.trim()) {
        setError(`Pergunta ${i + 1}: Digite uma pergunta`);
        return false;
      }
  
      const emptyOptions = item.options.filter((opt) => !opt.trim());
      if (emptyOptions.length > 0) {
        setError(`Pergunta ${i + 1}: Preencha todas as opções de resposta`);
        return false;
      }
  
      if (item.correctOption === undefined) {
        setError(`Pergunta ${i + 1}: Selecione a resposta correta`);
        return false;
      }
    }
  
    return true;
  };

  const saveQuiz = async () => {
    try {
      setIsLoading(true);
      const formattedQuestions = quizItems.map((item, index) => ({
        question: item.question,
        options: item.options,
        questionType: item.questionType,
        imageUrl: item.image || '',
        correctOption: item.correctOption || 0,
        order: index,
      }));

      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: quizTitle,
          questions: formattedQuestions,
          userId: user?.id || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o quiz');
      }

      router.push(`/dashboard`);
    } catch (error) {
      console.error('Erro ao salvar quiz:', error);
      setError('Ocorreu um erro ao salvar o quiz. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateQuiz()) {
      return;
    }

    if (isSignedIn) {
      await saveQuiz();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-2">
            <Heart className="text-pink-500 animate-pulse" size={32} />
            Crie seu Quiz de Casal
            <Heart className="text-purple-500 animate-pulse" size={32} />
          </h1>
          <p className="text-gray-600 mt-2">
            Personalize suas perguntas e crie um quiz especial
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <QuizTitleInput title={quizTitle} setTitle={setQuizTitle} />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-8">
          <button
            onClick={addQuizItem}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            <PlusCircle className="mr-2" />
            Adicionar Nova Pergunta
          </button>
        </div>

        <div className="space-y-6">
          {quizItems.map((item, index) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl">
              <QuizItem
                index={index}
                item={item}
                setQuizItems={setQuizItems}
                handleQuestionTypeChange={handleQuestionTypeChange}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="mr-2" />
            {isLoading ? 'Salvando...' : 'Finalizar e Criar Quiz'}
          </button>
        </div>

        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)}
            onSuccess={saveQuiz}
          />
        )}
      </div>
    </div>
  );
}
