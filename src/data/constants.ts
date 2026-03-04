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

export const STORE_LINK = STORE_URL;
