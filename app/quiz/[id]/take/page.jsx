'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, LockKeyhole } from 'lucide-react';

export default function TakeQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const checkExistingResult = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        setError(null);

        // Verificar se já existe um resultado
        const resultResponse = await fetch(`/api/quiz/${params.id}/results`);
        if (resultResponse.ok) {
          const resultData = await resultResponse.json();
          console.log('DEBUG - Dados do resultado:', resultData);

          if (resultData && resultData.completed) {
            setHasCompleted(true);
            return;
          }
        }

        // Carregar quiz
        const quizResponse = await fetch(`/api/quiz/${params.id}`);
        if (!quizResponse.ok) {
          const errorData = await quizResponse.json().catch(() => ({}));
          throw new Error(errorData.error || 'Erro ao carregar o quiz');
        }

        const quizData = await quizResponse.json();
        if (!quizData?.questions?.length) {
          throw new Error('Este quiz não possui perguntas.');
        }

        setQuiz(quizData);
        setUserAnswers(new Array(quizData.questions.length).fill(null));
      } catch (error) {
        console.error('Erro:', error);
        setError(error.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    checkExistingResult();
  }, [params.id]);

  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = optionIndex;
      return newAnswers;
    });

    if (currentQuestion < (quiz?.questions?.length || 0) - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 300);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (quiz?.questions?.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const validateAnswers = () => {
    if (userAnswers.some((answer) => answer === null)) {
      const unansweredIndex = userAnswers.findIndex((answer) => answer === null);
      setError(`Por favor, responda a questão ${unansweredIndex + 1} antes de continuar.`);
      setCurrentQuestion(unansweredIndex);
      return false;
    }
    return true;
  };

  const handleSubmitQuiz = async () => {
    if (!validateAnswers()) return;

    try {
      setSubmitting(true);
      setError(null);

      console.log('DEBUG - Payload:', {
        url: `/api/quiz/${params.id}/results`,
        body: { answers: userAnswers },
      });

      const response = await fetch(`/api/quiz/${params.id}/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: userAnswers }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao enviar o quiz');
      }

      const result = await response.json();
      console.log('Resultado:', result);

      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/quiz/${params.id}/results`);
    } catch (error) {
      console.error('Erro ao enviar o quiz:', error);
      setError('Erro ao enviar o quiz. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (hasCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <LockKeyhole className="w-16 h-16 mx-auto text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz já respondido!</h2>
          <p className="text-gray-600 mb-6">Você já respondeu este quiz. Que tal ver seus resultados?</p>
          <button
            onClick={() => router.push(`/quiz/${params.id}/results`)}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600"
          >
            Ver Resultados
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 mt-4"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 max-w-md shadow-lg">
          {error}
        </div>
        <button
          onClick={() => router.refresh()}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  const progress = Math.round(((currentQuestion + 1) / (quiz?.questions?.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          <Heart className="text-pink-500 animate-pulse" size={32} /> Quiz de Casal <Heart className="text-purple-500 animate-pulse" size={32} />
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-medium mb-4">
            {quiz?.questions?.[currentQuestion]?.question}
          </h2>
          <div className="space-y-3">
            {quiz?.questions?.[currentQuestion]?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-lg border-2 transition-all transform hover:scale-[1.02]
                  ${userAnswers[currentQuestion] === index ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3
                    ${userAnswers[currentQuestion] === index ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-gray-200'}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0} className="px-6 py-2 rounded-lg bg-gray-800 text-white">
            Anterior
          </button>
          {currentQuestion === quiz?.questions?.length - 1 ? (
            <button onClick={handleSubmitQuiz} disabled={submitting} className="px-6 py-2 rounded-lg bg-pink-500 text-white">
              {submitting ? 'Enviando...' : 'Finalizar Quiz'}
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="px-6 py-2 rounded-lg bg-pink-500 text-white">
              Próxima
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
