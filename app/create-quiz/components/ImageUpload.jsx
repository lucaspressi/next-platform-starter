import React, { useState } from 'react';
import { Image as ImageIcon, XCircle, Info } from 'lucide-react';

export default function ImageUpload({ item, setQuizItems }) {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Atualizar a imagem no item correto em quizItems
        setQuizItems((prevItems) =>
          prevItems.map((quizItem) =>
            quizItem.id === item.id
              ? { ...quizItem, imageUrl: data.secure_url } // Altera para imageUrl
              : quizItem
          )
        );
      } else {
        console.error('Erro no upload de imagem:', data.error.message);
      }
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setQuizItems((prevItems) =>
      prevItems.map((quizItem) =>
        quizItem.id === item.id ? { ...quizItem, imageUrl: null } : quizItem
      )
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2 text-gray-600 text-sm">
        <Info size={16} className="min-w-4 mt-1 text-pink-500" />
        <p>
          Opcional: Adicione uma imagem para tornar sua pergunta mais
          personalizada e divertida.
        </p>
      </div>

      <div className="image-upload mt-2">
        {item.imageUrl ? ( // Aqui usamos imageUrl diretamente
          <div className="relative group">
            <img
              src={item.imageUrl}
              alt="Preview"
              className="w-full max-w-md rounded-lg shadow-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            >
              <XCircle size={20} />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 p-4 border-2 border-dashed border-pink-200 rounded-lg cursor-pointer hover:border-pink-400 transition-colors duration-200">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <ImageIcon className="text-pink-500" size={24} />
            <span className={`text-gray-600 ${loading ? 'animate-pulse' : ''}`}>
              {loading ? 'Carregando imagem...' : 'Clique para adicionar uma imagem (opcional)'}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
