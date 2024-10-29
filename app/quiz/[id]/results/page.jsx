// app/quiz/[id]/results/page.js

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, CheckCircle2, XCircle } from 'lucide-react';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
        setError(null);

        console.log("DEBUG: Iniciando fetch do quiz e resultado...");

        // Primeiro, buscar o quiz
        const quizResponse = await fetch(`/api/quiz/${params.id}`);
        console.log("DEBUG: Resposta do fetch do quiz:", quizResponse);
        
        if (!quizResponse.ok) {
          console.error("DEBUG: Erro ao carregar o quiz");
          throw new Error('Erro ao carregar o quiz');
        }

        const quizData = await quizResponse.json();
        console.log("DEBUG - Dados do quiz carregado:", quizData);

        // Depois, buscar o resultado mais recente
        const resultResponse = await fetch(`/api/quiz/${params.id}/results`);
        console.log("DEBUG: Resposta do fetch dos resultados:", resultResponse);

        if (!resultResponse.ok) {
          console.error("DEBUG: Erro ao carregar o resultado");
          throw new Error('Erro ao carregar o resultado');
        }

        const resultData = await resultResponse.json();
        setQuiz(quizData);
        setResult(resultData);
        console.log("DEBUG - Dados do resultado carregado:", resultData);
      } catch (err) {
        console.error('Erro:', err);
        setError('Erro ao carregar resultados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
        console.log("DEBUG: Finalizando carregamento de resultados.");
      }
    }

    if (params.id) {
      console.log("DEBUG: ID do quiz encontrado:", params.id);
      fetchResults();
    } else {
      console.log("DEBUG: ID do quiz não encontrado em params.");
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <XCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {error || 'Não foi possível carregar os resultados'}
          </h2>
          <p className="text-gray-600 mb-6">
            Tente novamente mais tarde ou volte à página inicial
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  // Garante que result.answers é um array JSON válido antes de tentar parseá-lo
  let answers;
  try {
    answers = result.answers ? JSON.parse(result.answers) : [];
    console.log("DEBUG: Answers parsed com sucesso:", answers);
  } catch (e) {
    console.error("Erro ao parsear answers:", e);
    answers = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-2">
            <Heart className="text-pink-500" size={32} />
            Resultados do Quiz
            <Heart className="text-purple-500" size={32} />
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              {result.score || 0}%
            </div>
            <p className="text-gray-600">de respostas corretas</p>
          </div>
        </div>

        <div className="space-y-6">
          {quiz.questions?.map((question, index) => {
            const isCorrect = answers[index] === question.correctOption;
            console.log("DEBUG: Checando resposta correta para questão:", index, " - Resultado:", isCorrect);

            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex-grow">
                    {question.question}
                  </h3>
                  {isCorrect ? (
                    <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                  ) : (
                    <XCircle className="text-red-500 flex-shrink-0" size={24} />
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = answers[index] === optionIndex;
                    const isCorrectAnswer = question.correctOption === optionIndex;
                    
                    let bgColor = 'bg-white';
                    if (isUserAnswer && isCorrect) bgColor = 'bg-green-50';
                    else if (isUserAnswer && !isCorrect) bgColor = 'bg-red-50';
                    else if (isCorrectAnswer) bgColor = 'bg-green-50';

                    return (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${bgColor} ${
                          isUserAnswer ? 'border-purple-300' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-white font-semibold
                            ${isCorrectAnswer 
                              ? 'bg-green-500' 
                              : isUserAnswer 
                                ? 'bg-red-500'
                                : 'bg-gray-200'
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
