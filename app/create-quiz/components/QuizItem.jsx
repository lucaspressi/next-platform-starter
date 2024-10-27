import React from 'react';
import { XCircle, Heart, CheckCircle2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { PRESET_QUESTIONS } from './presetQuestions';

export default function QuizItem({ index, item, setQuizItems, handleQuestionTypeChange }) {
  const handleQuestionChange = (e) => {
    const updatedQuestion = e.target.value;
    setQuizItems(prevItems =>
      prevItems.map(quizItem =>
        quizItem.id === item.id ? { ...quizItem, question: updatedQuestion } : quizItem
      )
    );
  };

  const handleRemoveItem = () => {
    setQuizItems(prevItems => prevItems.filter(quizItem => quizItem.id !== item.id));
  };

  const handleCorrectOptionChange = (optionIndex) => {
    setQuizItems(prevItems =>
      prevItems.map(quizItem =>
        quizItem.id === item.id ? { ...quizItem, correctOption: optionIndex } : quizItem
      )
    );
  };

  const ensureFourOptions = (options) => {
    const currentOptions = options || [];
    while (currentOptions.length < 4) {
      currentOptions.push('');
    }
    return currentOptions.slice(0, 4);
  };

  const options = ensureFourOptions(item.options);
  const isCustomQuestion = item.questionType === 'custom';

  return (
    <div className="romantic-card mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center rounded-t-lg">
        <h3 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="white" />
          Pergunta {index + 1}
        </h3>
        <button 
          onClick={handleRemoveItem}
          className="text-white hover:text-pink-200 transition-colors duration-200 hover:scale-110"
        >
          <XCircle size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white/80 backdrop-blur-sm rounded-b-lg">
        <select
          value={item.questionType}
          onChange={(e) => handleQuestionTypeChange(item.id, e.target.value)}
          className="w-full p-2 sm:p-3 text-sm sm:text-base border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300 bg-white"
        >
          <option value="" disabled>Selecione um tipo de pergunta...</option>
          {PRESET_QUESTIONS.map((q) => (
            <option key={q.value} value={q.value}>
              {q.question}
            </option>
          ))}
        </select>

        {isCustomQuestion && (
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={item.question || ''}
            onChange={handleQuestionChange}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
          />
        )}

        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">Selecione a resposta correta:</p>
          {options.map((option, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <button
                onClick={() => handleCorrectOptionChange(idx)}
                className={`w-8 h-8 flex items-center justify-center ${
                  item.correctOption === idx
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                } text-white font-semibold rounded-lg transition-all duration-200`}
              >
                {item.correctOption === idx ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  String.fromCharCode(65 + idx)
                )}
              </button>
              <input
                type="text"
                placeholder={`Opção ${String.fromCharCode(65 + idx)}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[idx] = e.target.value;
                  setQuizItems(prevItems =>
                    prevItems.map(quizItem =>
                      quizItem.id === item.id ? { ...quizItem, options: updatedOptions } : quizItem
                    )
                  );
                }}
                className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-pink-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <ImageUpload item={item} setQuizItems={setQuizItems} />
      </div>
    </div>
  );
}