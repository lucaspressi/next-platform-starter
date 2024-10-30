'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Heart, Plus, Copy, ChartBar, Trash2, Check, Loader, QrCode, X, Download } from 'lucide-react';

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentQRUrl, setCurrentQRUrl] = useState('');

  useEffect(() => {
    if (isSignedIn === false) {
      console.log("Usuário não autenticado. Redirecionando para /sign-in");
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    async function fetchQuizzes() {
      if (user?.id) {
        try {
          console.log("Iniciando carregamento dos quizzes...");
          setIsLoading(true);
          setError(null);
          
          const response = await fetch(`/api/quiz/user/${user.id}`, {
            method: 'GET',
          });
          
          console.log("Resposta da API de quizzes:", response);
          if (!response.ok) {
            throw new Error(`Falha ao carregar os quizzes: ${response.status} - ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log("Dados recebidos dos quizzes:", data);
          setQuizzes(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('Erro ao carregar quizzes:', err);
          setError('Erro ao carregar os quizzes. Por favor, tente novamente.');
        } finally {
          setIsLoading(false);
          console.log("Carregamento dos quizzes finalizado.");
        }
      }
    }

    if (isSignedIn && user?.id) {
      fetchQuizzes();
    }
  }, [isSignedIn, user?.id]);

  const handleCopyLink = async (quizId) => {
    try {
      const url = `${window.location.origin}/quiz/${quizId}/take`;
      await navigator.clipboard.writeText(url);
      setCopySuccess(quizId);
      setTimeout(() => setCopySuccess(null), 2000);
      console.log(`Link copiado para o quiz ${quizId}:`, url);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleShowQRCode = (quizId) => {
    const url = `${window.location.origin}/quiz/${quizId}/take`;
    setCurrentQRUrl(url);
    setShowQRCode(true);
  };

  const handleDownloadQRCode = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentQRUrl)}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode-quiz.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar QR Code:', error);
    }
  };

  const handleDelete = async (quizId) => {
    if (!window.confirm('Tem certeza que deseja excluir este quiz?')) {
      return;
    }

    try {
      console.log(`Iniciando exclusão do quiz ${quizId}`);
      const response = await fetch(`/api/quiz/${quizId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar quiz: ${response.status} - ${response.statusText}`);
      }

      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
      console.log(`Quiz ${quizId} excluído com sucesso`);
    } catch (err) {
      console.error('Erro ao deletar quiz:', err);
      alert('Erro ao deletar quiz. Por favor, tente novamente.');
    }
  };

  const QRCodeModal = () => {
    if (!showQRCode) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowQRCode(false)}
      >
        <div 
          className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 animate-fade-in"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">QR Code do Quiz</h3>
            <button
              onClick={() => setShowQRCode(false)}
              className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex justify-center mb-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentQRUrl)}`}
              alt="QR Code"
              className="w-48 h-48 border rounded-lg shadow-sm"
            />
          </div>
          
          <p className="text-sm text-gray-600 text-center mb-6">
            Escaneie este QR Code para acessar o quiz
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleDownloadQRCode}
              className="flex-1 py-2 bg-white border-2 border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Baixar
            </button>
            <button
              onClick={() => setShowQRCode(false)}
              className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isSignedIn || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <Loader className="w-16 h-16 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Carregando seus quizzes...</p>
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
                      <button
                        onClick={() => handleShowQRCode(quiz.id)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
                        title="Gerar QR Code"
                      >
                        <QrCode size={16} />
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
        <QRCodeModal />
      </div>
    </div>
  );
}