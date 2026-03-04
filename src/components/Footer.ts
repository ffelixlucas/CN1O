import { NAV_LINKS, STORE_LINK } from '../data/constants';

export function Footer() {
  const sectionLinks = NAV_LINKS.filter((link) => link.href.startsWith('#'));

  return `
    <footer class="relative bg-cor-fundo border-t border-cor-texto/10 py-14 md:py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-10">
          <div class="space-y-4">
            <img src="/media/logo.png" class="h-14" alt="Capoeira Nota 10">
            <p class="text-cor-texto/65 text-sm leading-relaxed">
              Arte, cultura e transformacao social atraves da capoeira.
            </p>
          </div>

          <div>
            <h4 class="text-cor-primaria text-xs uppercase tracking-[0.16em] font-semibold mb-4">Navegacao</h4>
            <ul class="space-y-2 text-sm text-cor-texto/70">
              ${sectionLinks
                .map((link) => `<li><a href="${link.href}" class="hover:text-cor-primaria transition-colors">${link.label}</a></li>`)
                .join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-cor-primaria text-xs uppercase tracking-[0.16em] font-semibold mb-4">Acessos</h4>
            <ul class="space-y-2 text-sm text-cor-texto/70">
              <li><a href="${STORE_LINK}" class="hover:text-cor-primaria transition-colors">Loja online</a></li>
              <li><a href="https://capoeira-base.vercel.app/matricula/cn10" class="hover:text-cor-primaria transition-colors">Pre-matricula</a></li>
              <li><a href="/noticias" data-route class="hover:text-cor-primaria transition-colors">Blog de noticias</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-cor-primaria text-xs uppercase tracking-[0.16em] font-semibold mb-4">Contato</h4>
            <ul class="space-y-2 text-sm text-cor-texto/70">
              <li>(41) 99964-4301</li>
              <li>contato@capoeiranota10.com.br</li>
              <li>Pinhais - PR</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-cor-texto/10 mt-10 pt-6 text-center text-cor-texto/45 text-xs md:text-sm">
          © 2026 Capoeira Nota 10. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  `;
}
