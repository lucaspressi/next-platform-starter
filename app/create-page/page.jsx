// app/create-page/page.js
'use client';
import React, { useState } from 'react';
import { PlusCircle, XCircle, Save, Image as ImageIcon, Calendar, AlertCircle } from 'lucide-react';

export default function CreateQuizPage() {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addQuizItem = () => {
    setQuizItems([
      ...quizItems,
      {
        id: Date.now(),
        image: null,
        imagePreview: null,
        question: '',
        options: ['', '', ''],
        correctOption: 0
      }
    ]);
  };

  const removeQuizItem = (itemId) => {
    setQuizItems(quizItems.filter(item => item.id !== itemId));
    // Limpar a URL do preview da imagem removida
    const item = quizItems.find(item => item.id === itemId);
    if (item?.imagePreview) {
      URL.revokeObjectURL(item.imagePreview);
    }
  };

  const handleImageUpload = (itemId, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Limpar preview anterior se existir
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

  const handleSubmit = () => {
    if (quizItems.length < 1) {
      alert('Adicione pelo menos uma pergunta!');
      return;
    }

    const hasEmptyFields = quizItems.some(item => 
      !item.image || 
      !item.question || 
      item.options.some(opt => !opt.trim())
    );

    if (hasEmptyFields) {
      alert('Preencha todos os campos em todas as perguntas!');
      return;
    }

    setIsLoading(true);
    console.log('Quiz completo:', quizItems);
    // Aqui você implementaria a lógica de salvamento
    setTimeout(() => {
      setIsLoading(false);
      alert('Quiz criado com sucesso!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Crie seu Quiz Romântico</h1>
          <p className="text-gray-600">
            Adicione fotos especiais e crie perguntas sobre seus momentos juntos
          </p>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={addQuizItem}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <PlusCircle size={20} />
            Adicionar Pergunta
          </button>
        </div>

        {quizItems.map((item, index) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 flex justify-between items-center">
              <h3 className="text-white font-semibold">Pergunta {index + 1}</h3>
              <button
                onClick={() => removeQuizItem(item.id)}
                className="text-white hover:text-pink-200 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Área de Upload de Imagem */}
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {item.imagePreview ? (
                    <div className="relative">
                      <img
                        src={item.imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        onClick={() => updateQuizItem(item.id, 'image', null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(item.id, e)}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <ImageIcon size={40} />
                        <span>Clique para adicionar uma foto especial</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Pergunta */}
              <div className="mb-6">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateQuizItem(item.id, 'question', e.target.value)}
                  placeholder="Digite sua pergunta sobre esta foto..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>

              {/* Alternativas */}
              <div className="space-y-4">
                {item.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-4">
                    <input
                      type="radio"
                      name={`correct-${item.id}`}
                      checked={item.correctOption === optIndex}
                      onChange={() => updateQuizItem(item.id, 'correctOption', optIndex)}
                      className="w-5 h-5 text-pink-500 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateQuizItem(item.id, 'options', e.target.value, optIndex)}
                      placeholder={`Alternativa ${optIndex + 1}`}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {quizItems.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Criando Quiz...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Finalizar e Criar Quiz
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}