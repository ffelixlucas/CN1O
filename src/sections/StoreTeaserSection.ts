import { STORE_LINK } from '../data/constants';

export function StoreTeaserSection() {
  return `
    <section id="loja" class="relative py-20 md:py-24 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-r from-cor-secundaria/25 via-transparent to-cor-primaria/10"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="surface-card rounded-3xl p-6 md:p-10">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div class="max-w-2xl">
              <span class="text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Loja oficial</span>
              <h2 class="mt-3 text-2xl sm:text-3xl md:text-4xl font-black text-cor-texto tracking-tight">ACESSE NOSSA LOJA</h2>
              <p class="mt-3 text-cor-texto/75 text-sm md:text-base">
                Uniformes, acessorios e produtos para treinar com identidade CN10.
              </p>
            </div>

            <a href="${STORE_LINK}" class="inline-flex items-center justify-center gap-2 bg-cor-primaria hover:bg-cor-destaque text-cor-escura px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-colors">
              Ir para loja
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
