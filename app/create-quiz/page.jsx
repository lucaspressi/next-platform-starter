// app/create-quiz/page.jsx
'use client';
import React, { useState } from 'react';
import { PlusCircle, XCircle, Save, Image as ImageIcon, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Perguntas predefinidas
const PRESET_QUESTIONS = [
  {
    value: 'default',
    question: 'Selecione um tipo de pergunta...',
    options: ['', '', '']
  },
  {
    value: 'first_date',
    question: 'Qual foi a data do nosso primeiro encontro?',
    options: [
      'Janeiro de 2023',
      'Fevereiro de 2023',
      'Março de 2023'
    ]
  },
  {
    value: 'favorite_color',
    question: 'Qual é minha cor favorita?',
    options: [
      'Azul',
      'Verde',
      'Vermelho'
    ]
  },
  {
    value: 'favorite_food',
    question: 'Qual é meu prato favorito?',
    options: [
      'Lasanha',
      'Pizza',
      'Strogonoff'
    ]
  },
  {
    value: 'first_kiss',
    question: 'Onde foi nosso primeiro beijo?',
    options: [
      'No cinema',
      'No parque',
      'Na praia'
    ]
  },
  {
    value: 'special_date',
    question: 'Qual data é mais especial para mim?',
    options: [
      'Natal',
      'Ano Novo',
      'Aniversário'
    ]
  },
  {
    value: 'dream_trip',
    question: 'Qual viagem dos sonhos eu mais falo?',
    options: [
      'Paris',
      'Disney',
      'Maldivas'
    ]
  },
  {
    value: 'custom',
    question: 'Criar pergunta personalizada...',
    options: ['', '', '']
  }
];

export default function CreateQuizPage() {
  const router = useRouter();
  const [quizItems, setQuizItems] = useState([{
    id: Date.now(),
    image: null,
    imagePreview: null,
    questionType: 'default',
    question: '',
    options: ['', '', ''],
    correctOption: 0
  }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionTypeChange = (itemId, selectedValue) => {
    const selectedQuestion = PRESET_QUESTIONS.find(q => q.value === selectedValue);
    if (!selectedQuestion) return;

    setQuizItems(quizItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          questionType: selectedValue,
          question: selectedValue === 'custom' ? '' : selectedQuestion.question,
          options: selectedValue === 'custom' ? ['', '', ''] : [...selectedQuestion.options],
        };
      }
      return item;
    }));
  };

  const addQuizItem = () => {
    setQuizItems([
      ...quizItems,
      {
        id: Date.now(),
        image: null,
        imagePreview: null,
        questionType: 'default',
        question: '',
        options: ['', '', ''],
        correctOption: 0
      }
    ]);
  };

  const removeQuizItem = (itemId) => {
    if (quizItems.length <= 1) {
      alert('O quiz precisa ter pelo menos uma pergunta!');
      return;
    }
    setQuizItems(quizItems.filter(item => item.id !== itemId));
    const item = quizItems.find(item => item.id === itemId);
    if (item?.imagePreview) {
      URL.revokeObjectURL(item.imagePreview);
    }
  };

  const handleImageUpload = (itemId, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const existingItem = quizItems.find(item => item.id === itemId);
      if (existingItem?.imagePreview) {
        URL.revokeObjectURL(existingItem.imagePreview);
      }

      setQuizItems(quizItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            image: file,
            imagePreview: URL.createObjectURL(file)
          };
        }
        return item;
      }));
    }
  };

  const updateQuizItem = (itemId, field, value, optionIndex = null) => {
    setQuizItems(quizItems.map(item => {
      if (item.id === itemId) {
        if (optionIndex !== null) {
          const newOptions = [...item.options];
          newOptions[optionIndex] = value;
          return { ...item, options: newOptions };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSubmit = async () => {
    // Validar se tem pelo menos uma pergunta
    if (quizItems.length < 1) {
      alert('Adicione pelo menos uma pergunta!');
      return;
    }

    // Validar se todos os campos estão preenchidos
    const hasEmptyFields = quizItems.some(item => {
      if (item.questionType === 'default') {
        alert('Por favor, selecione um tipo de pergunta para todas as questões.');
        return true;
      }
      if (!item.image) {
        alert('Por favor, adicione uma imagem para todas as questões.');
        return true;
      }
      if (item.questionType === 'custom' && !item.question.trim()) {
        alert('Por favor, preencha todas as perguntas personalizadas.');
        return true;
      }
      if (item.options.some(opt => !opt.trim())) {
        alert('Por favor, preencha todas as alternativas.');
        return true;
      }
      return false;
    });

    if (hasEmptyFields) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      
      quizItems.forEach((item, index) => {
        if (item.image) {
          formData.append(`images${index}`, item.image);
        }
      });

      const quizData = quizItems.map(item => ({
        question: item.questionType === 'custom' ? item.question : 
                 PRESET_QUESTIONS.find(q => q.value === item.questionType)?.question || item.question,
        options: item.options,
        correctOption: item.correctOption
      }));
      formData.append('quizData', JSON.stringify(quizData));

      const response = await fetch('/api/quiz/create', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o quiz');
      }

      const data = await response.json();
      alert('Quiz criado com sucesso!');
      router.push(`/quiz/${data.quizId}`);

    } catch (error) {
      console.error('Erro ao criar quiz:', error);
      alert('Erro ao criar o quiz. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            Crie seu Quiz de Casal
            <Heart className="w-8 h-8 text-purple-500 animate-pulse" />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compartilhe seus momentos especiais através de um quiz personalizado. 
            Adicione fotos memoráveis e crie perguntas sobre sua história de amor.
          </p>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={addQuizItem}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            <PlusCircle size={20} />
            Adicionar Nova Pergunta
          </button>
        </div>

        {quizItems.map((item, index) => (
          <div key={item.id} className="romantic-card mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 flex justify-between items-center">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5" fill="white" />
                Pergunta {index + 1}
              </h3>
              <button
                onClick={() => removeQuizItem(item.id)}
                className="text-white hover:text-pink-200 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6 bg-white/80 backdrop-blur-sm">
              {/* Seleção do Tipo de Pergunta */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Escolha o tipo de pergunta
                </label>
                <select
                  value={item.questionType}
                  onChange={(e) => handleQuestionTypeChange(item.id, e.target.value)}
                  className="w-full p-3 border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300 bg-white"
                >
                  {PRESET_QUESTIONS.map((q) => (
                    <option key={q.value} value={q.value}>
                      {q.question}
                    </option>
                  ))}
                </select>
              </div>

              {/* Área de Upload de Imagem */}
              <div className="romantic-border">
                <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center transition-all duration-300 hover:border-pink-500">
                  {item.imagePreview ? (
                    <div className="relative group">
                      <img
                        src={item.imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => updateQuizItem(item.id, 'image', null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(item.id, e)}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-pink-500 transition-colors duration-300">
                        <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors duration-300">
                          <ImageIcon size={32} className="transform group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="text-sm font-medium">Clique para adicionar uma foto especial</span>
                        <span className="text-xs text-gray-400">Escolha uma imagem que represente este momento</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Campo de Pergunta Personalizada */}
              {item.questionType === 'custom' && (
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateQuizItem(item.id, 'question', e.target.value)}
                  placeholder="Digite sua pergunta personalizada..."
                  className="w-full p-3 border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
                />
              )}

              {/* Alternativas */}
              <div className="space-y-4">
                {item.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-4">
                    <input
                      type="radio"
                      name={`correct-${item.id}`}
                      checked={item.correctOption === optIndex}
                      onChange={() => updateQuizItem(item.id, 'correctOption', optIndex)}
                      className="w-5 h-5 text-pink-500 border-2 border-pink-300 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateQuizItem(item.id, 'options', e.target.value, optIndex)}
                      placeholder={`Alternativa ${optIndex + 1}`}
                      className="flex-1 p-3 border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {quizItems.length > 0 && (
          <div className="text-center mt-8 pb-8">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Criando Quiz...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save size={20} />
                  <span>Finalizar e Criar Quiz</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}