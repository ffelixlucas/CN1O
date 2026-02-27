const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;
export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#aulas', label: 'Aulas' },
  { href: '#eventos', label: 'Eventos' },
  { href: `${ADMIN_URL}/loja/cn10`, label: 'Loja' },
  { href: `${ADMIN_URL}/loja/matricula`, label: 'Matrícula' },

  { href: '#localizacao', label: 'Localização' }

];

export const CLASS_SCHEDULE = [
  { turma: 'Infantil', dias: 'Seg / Qua', horario: '18:00', faixaEtaria: '6 a 12 anos' },
  { turma: 'Adulto', dias: 'Ter / Qui', horario: '19:30', faixaEtaria: '+13 anos' }
];

export const EVENTS = [
  {
    id: 1,
    date: '15 de Março',
    title: 'Batizado 2026',
    description: 'Evento tradicional de troca de cordas e integração cultural com mestres convidados.',
    image: '/media/evento1.png'
  },
  {
    id: 2,
    date: '20 de Abril',
    title: 'Festival Cultural',
    description: 'Apresentações, música ao vivo, roda aberta e integração com a comunidade.',
    image: '/media/evento2.png'
  }
];
