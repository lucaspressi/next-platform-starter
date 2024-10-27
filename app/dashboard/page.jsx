'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Plus, 
  LinkIcon, 
  Trash2, 
  Copy, 
  ChartBar, 
  Share2,
  Check // Adicionado o ícone Check
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
          const response = await fetch(`/api/quiz/user/${session.user.id}`);
          
          if (!response.ok) {
            throw new Error('Falha ao carregar os quizzes');
          }
          
          const data = await response.json();
          setQuizzes(Array.isArray(data) ? data : []);
          
        } catch (err) {
          console.error('Erro ao carregar quizzes:', err);
          setError(err.message);
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
    const takeUrl = `${window.location.origin}/quiz/${quizId}/take`;
    try {
      await navigator.clipboard.writeText(takeUrl);
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="text-pink-500" />
          Meus Quizzes
        </h1>
        <button
          onClick={() => router.push('/create-quiz')}
          className="btn btn-primary gap-2"
        >
          <Plus size={20} />
          Criar Novo Quiz
        </button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <Heart className="w-16 h-16 mx-auto text-pink-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Nenhum Quiz Criado Ainda
          </h2>
          <p className="text-gray-600 mb-6">
            Comece criando seu primeiro quiz para seu amor especial!
          </p>
          <button
            onClick={() => router.push('/create-quiz')}
            className="btn btn-primary gap-2"
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

                {/* Seção de links */}
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
                    className="flex items-center text-purple-600 hover:text-purple-700 transition-colors gap-1.5"
                  >
                    <ChartBar size={16} />
                    Ver Resultados
                  </button>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Deletar quiz"
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
  );
}