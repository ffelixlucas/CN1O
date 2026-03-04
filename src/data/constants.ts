const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;
const STORE_URL = import.meta.env.VITE_STORE_URL || `${ADMIN_URL}/loja/cn10`;

export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#aulas', label: 'Aulas' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#noticias', label: 'Noticias' },
  { href: '#loja', label: 'Loja' },
  { href: '#localizacao', label: 'Localizacao' },
  { href: `${ADMIN_URL}/matricula/cn10`, label: 'Matrícula' },
];

export const CLASS_SCHEDULE = [
  { turma: 'Infantil', dias: 'Seg / Qua', horario: '18:00', faixaEtaria: '6 a 12 anos' },
  { turma: 'Adulto', dias: 'Ter / Qui', horario: '19:30', faixaEtaria: '+13 anos' }
];

export const EVENTS = [
  {
    id: 1,
    date: '15 de Marco de 2026',
    time: '14:00',
    title: 'Batizado CN10 2026',
    description: 'Troca de cordas, roda aberta e confraternizacao com alunos, familias e convidados.',
    image: '/media/capoeira-nota10-social-1200x630.jpg',
    inscricaoUrl: `${ADMIN_URL}/inscricoes`
  },
  {
    id: 2,
    date: '20 de Abril de 2026',
    time: '09:00',
    title: 'Oficina Cultural de Capoeira',
    description: 'Manha de oficina para iniciantes, musicalidade e fundamentos de roda para toda comunidade.',
    image: '/media/bg-hero2.jpg'
  }
];

export const STORE_LINK = STORE_URL;
