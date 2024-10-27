import React from 'react';

export default function OptionsInput({ item, setQuizItems }) {
  const handleOptionChange = (index, value) => {/* lógica para atualizar opções */};
  const handleCorrectOptionChange = (index) => {/* lógica para selecionar opção correta */};

  return (
    <div className="options-input">
      {item.options.map((option, optIndex) => (
        <div key={optIndex} className="option-item">
          <input
            type="radio"
            checked={item.correctOption === optIndex}
            onChange={() => handleCorrectOptionChange(optIndex)}
          />
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(optIndex, e.target.value)}
            placeholder={`Alternativa ${optIndex + 1}`}
            className="input-primary"
          />
        </div>
      ))}
    </div>
  );
}
