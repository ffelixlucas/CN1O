import { NAV_LINKS } from '../data/constants';

export function Footer() {
  return `
    <footer class="bg-cor-secundaria py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12">
          <div class="space-y-4">
            <img src="/media/logo.png" class="h-12" alt="Capoeira Nota 10">
            <p class="text-cor-texto/50 text-sm">
              Transformando vidas através da capoeira desde 2011.
            </p>
          </div>

          <div>
            <h4 class="text-cor-primaria mb-4">NAVEGAÇÃO</h4>
            <ul class="space-y-2 text-cor-texto/50">
              ${NAV_LINKS.map(link => `
                <li><a href="${link.href}" class="hover:text-cor-primaria">${link.label}</a></li>
              `).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-cor-primaria mb-4">CONTATO</h4>
            <ul class="space-y-2 text-cor-texto/50">
              <li>(41) 99999-9999</li>
              <li>contato@cn10.com.br</li>
              <li>Pinhais - PR</li>
            </ul>
          </div>

          <div>
            <h4 class="text-cor-primaria mb-4">REDES</h4>
            <div class="flex gap-4">
              <a href="#" class="text-cor-texto/50 hover:text-cor-primaria text-2xl">📸</a>
              <a href="#" class="text-cor-texto/50 hover:text-cor-primaria text-2xl">▶</a>
              <a href="#" class="text-cor-texto/50 hover:text-cor-primaria text-2xl">📘</a>
            </div>
          </div>
        </div>

        <div class="border-t border-cor-texto/10 mt-12 pt-8 text-center text-cor-texto/30 text-sm">
          © 2026 Capoeira Nota 10 — Todos os direitos reservados
        </div>
      </div>
    </footer>
  `;
}
