'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Plus, 
  Copy, 
  ChartBar, 
  Trash2,
  Check,
  Loader 
} from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchQuizzes() {
      if (session?.user?.id) {
        try {
          setIsLoading(true);
          setError(null);
          
          const response = await fetch(`/api/quiz/user/${session.user.id}`, {
            method: 'GET', // Especifica o método explicitamente
            headers: {
              'Authorization': `Bearer ${session?.accessToken}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Falha ao carregar os quizzes');
          }
          
          const data = await response.json();
          setQuizzes(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('Erro ao carregar quizzes:', err);
          setError('Erro ao carregar os quizzes. Por favor, tente novamente.');
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (session?.user?.id) {
      fetchQuizzes();
    }
  }, [session]);

  const handleCopyLink = async (quizId) => {
    try {
      const url = `${window.location.origin}/quiz/${quizId}/take`;
      await navigator.clipboard.writeText(url);
      setCopySuccess(quizId);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleDelete = async (quizId) => {
    if (!window.confirm('Tem certeza que deseja excluir este quiz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/quiz/${quizId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar quiz');
      }

      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    } catch (err) {
      console.error('Erro ao deletar quiz:', err);
      alert('Erro ao deletar quiz. Por favor, tente novamente.');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <Loader className="w-16 h-16 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Carregando seus quizzes...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <Heart className="w-16 h-16 mx-auto text-pink-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Faça login para continuar
          </h2>
          <p className="text-gray-600 mb-6">
            Você precisa estar logado para ver seus quizzes.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="text-pink-500" />
            Meus Quizzes
          </h1>
          <button
            onClick={() => router.push('/create-quiz')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            <Plus size={20} />
            Criar Novo Quiz
          </button>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Heart className="w-16 h-16 mx-auto text-pink-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Nenhum Quiz Criado Ainda
            </h2>
            <p className="text-gray-600 mb-6">
              Comece criando seu primeiro quiz para seu amor especial!
            </p>
            <button
              onClick={() => router.push('/create-quiz')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 mx-auto"
            >
              <Plus size={20} />
              Criar Meu Primeiro Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {quiz.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Criado em {new Date(quiz.createdAt).toLocaleDateString('pt-BR')}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/quiz/${quiz.id}/take`}
                        className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                      />
                      <button
                        onClick={() => handleCopyLink(quiz.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          copySuccess === quiz.id
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                        title="Copiar link"
                      >
                        {copySuccess === quiz.id ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <button
                      onClick={() => router.push(`/quiz/${quiz.id}/results`)}
                      className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 transition-all font-medium"
                    >
                      <ChartBar size={16} />
                      Ver Resultados
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Deletar quiz"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
