#!/bin/bash

# Criar arquivo de constantes
cat > src/data/constants.ts << 'INNEREOF'
export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#aulas', label: 'Aulas' },
  { href: '#eventos', label: 'Eventos' },
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
INNEREOF

echo "✅ constants.ts criado"

# Criar Header
cat > src/components/Header.ts << 'INNEREOF'
import { NAV_LINKS } from '../data/constants';

export function Header() {
  return `
    <header class="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style="background-image: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('/media/bg-hero.jpg');">
      <nav class="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto w-full">
        <img src="/media/logo.png" class="h-16 hover:scale-105 transition" alt="Logo">
        <div class="hidden md:flex gap-8 text-sm uppercase tracking-wide font-medium">
          \${NAV_LINKS.map(link => 
            `<a href="\${link.href}" class="hover:text-yellow-400 transition">\${link.label}</a>`
          ).join('')}
        </div>
        <button class="md:hidden text-3xl">☰</button>
      </nav>
      <div class="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">CAPOEIRA NOTA 10</h1>
        <p class="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl drop-shadow">Arte, cultura e transformação social através da capoeira</p>
        <div class="mt-10 flex flex-col sm:flex-row gap-6">
          <a href="#sobre" class="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition shadow-lg">Conheça a Escola</a>
          <a href="#aulas" class="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400/10 transition">Horários de Aula</a>
        </div>
      </div>
    </header>
  `;
}
INNEREOF

echo "✅ Header.ts criado"

# Criar Footer
cat > src/components/Footer.ts << 'INNEREOF'
import { NAV_LINKS } from '../data/constants';

export function Footer() {
  return `
    <footer class="bg-black text-neutral-300 py-16 px-6 border-t border-white/10">
      <div class="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center">
        <img src="/media/logo.png" class="h-24 opacity-90 hover:opacity-100 transition" alt="Capoeira Nota 10">
        <div class="flex flex-wrap justify-center gap-8 text-sm uppercase tracking-wide">
          \${NAV_LINKS.map(link => 
            `<a href="\${link.href}" class="hover:text-yellow-400 transition">\${link.label}</a>`
          ).join('')}
        </div>
        <div class="flex gap-6 text-xl">
          <a href="#" class="hover:text-yellow-400 transition">📸</a>
          <a href="#" class="hover:text-yellow-400 transition">▶</a>
          <a href="#" class="hover:text-yellow-400 transition">📘</a>
        </div>
        <div class="text-sm text-neutral-500 mt-4">© 2026 Capoeira Nota 10 — Todos os direitos reservados</div>
      </div>
    </footer>
  `;
}
INNEREOF

echo "✅ Footer.ts criado"
echo "🎉 Todos os arquivos criados com sucesso!"
