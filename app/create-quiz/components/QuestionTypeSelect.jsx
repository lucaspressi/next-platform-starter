import React from 'react';

export default function QuestionTypeSelect({ item, setQuizItems }) {
  const PRESET_QUESTIONS = [/* array de perguntas predefinidas */];

  const handleChange = (e) => {/* lógica para atualizar tipo de pergunta */};

  return (
    <select value={item.questionType} onChange={handleChange} className="input-primary">
      {PRESET_QUESTIONS.map(q => (
        <option key={q.value} value={q.value}>{q.question}</option>
      ))}
    </select>
  );
}
