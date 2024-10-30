// app/create-quiz/components/presetQuestions.js


export const PRESET_QUESTIONS = [
  {
    value: 'default',
    question: 'Selecione um tipo de pergunta...',
    options: ['', '', '', ''],
    category: 'default'
  },
  // Categoria: Relacionamento
  {
    value: 'first_date',
    question: 'Qual foi a data do nosso primeiro encontro?',
    options: [
      'Janeiro de 2023',
      'Fevereiro de 2023',
      'Março de 2023',
      'Abril de 2023'
    ],
    category: 'relationship'
  },
  {
    value: 'first_kiss',
    question: 'Onde foi nosso primeiro beijo?',
    options: [
      'No cinema',
      'No parque',
      'Na praia',
      'Em casa'
    ],
    category: 'relationship'
  },
  {
    value: 'nicknames',
    question: 'Qual apelido carinhoso você mais usa comigo?',
    options: [
      'Amor',
      'Bebê',
      'Vida',
      'Querido(a)'
    ],
    category: 'relationship'
  },
  {
    value: 'meet_story',
    question: 'Como nos conhecemos?',
    options: [
      'Através de amigos',
      'No trabalho/faculdade',
      'Em uma festa',
      'Por um app'
    ],
    category: 'relationship'
  },

  // Categoria: Preferências Pessoais
  {
    value: 'favorite_color',
    question: 'Qual é minha cor favorita?',
    options: [
      'Azul',
      'Verde',
      'Vermelho',
      'Amarelo'
    ],
    category: 'preferences'
  },
  {
    value: 'favorite_food',
    question: 'Qual é meu prato favorito?',
    options: [
      'Lasanha',
      'Pizza',
      'Strogonoff',
      'Hambúrguer'
    ],
    category: 'preferences'
  },
  {
    value: 'favorite_movie_genre',
    question: 'Qual meu gênero de filme preferido?',
    options: [
      'Comédia Romântica',
      'Ação/Aventura',
      'Terror/Suspense',
      'Drama'
    ],
    category: 'preferences'
  },
  {
    value: 'favorite_season',
    question: 'Qual minha estação do ano favorita?',
    options: [
      'Verão',
      'Outono',
      'Inverno',
      'Primavera'
    ],
    category: 'preferences'
  },

  // Categoria: Sonhos e Aspirações
  {
    value: 'dream_trip',
    question: 'Qual minha viagem dos sonhos?',
    options: [
      'Paris',
      'Disney',
      'Maldivas',
      'Japão'
    ],
    category: 'dreams'
  },
  {
    value: 'future_goal',
    question: 'Qual é meu maior objetivo para o futuro?',
    options: [
      'Viajar o mundo',
      'Ter filhos',
      'Crescer na carreira',
      'Comprar uma casa'
    ],
    category: 'dreams'
  },
  {
    value: 'dream_job',
    question: 'Qual seria meu trabalho dos sonhos?',
    options: [
      'Empreendedor(a)',
      'Artista',
      'Professor(a)',
      'Digital Influencer'
    ],
    category: 'dreams'
  },

  // Categoria: Hábitos e Rotina
  {
    value: 'morning_routine',
    question: 'Qual é a primeira coisa que faço ao acordar?',
    options: [
      'Checar o celular',
      'Tomar café',
      'Exercícios',
      'Tomar banho'
    ],
    category: 'habits'
  },
  {
    value: 'stress_relief',
    question: 'O que mais me ajuda a relaxar depois de um dia estressante?',
    options: [
      'Assistir séries',
      'Tomar um banho quente',
      'Ouvir música',
      'Conversar com amigos'
    ],
    category: 'habits'
  },
  {
    value: 'weekend_activity',
    question: 'Qual minha atividade favorita no fim de semana?',
    options: [
      'Maratonar séries',
      'Sair com amigos',
      'Dormir até tarde',
      'Praticar hobbies'
    ],
    category: 'habits'
  },

  // Categoria: Memórias Especiais
  {
    value: 'special_date',
    question: 'Qual data é mais especial para mim?',
    options: [
      'Natal',
      'Ano Novo',
      'Aniversário',
      'Dia dos Namorados'
    ],
    category: 'memories'
  },
  {
    value: 'childhood_memory',
    question: 'Qual minha memória favorita da infância?',
    options: [
      'Brincar com amigos',
      'Viagens em família',
      'Festas de aniversário',
      'Dias na escola'
    ],
    category: 'memories'
  },

  // Opção Personalizada
  {
    value: 'custom',
    question: 'Criar pergunta personalizada...',
    options: ['', '', '', ''],
    category: 'custom'
  }
];
