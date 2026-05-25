import { STORE_LINK } from '../data/constants';

export function StoreTeaserSection() {
  return `
    <section id="loja" class="relative py-20 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-9 md:mb-12">
          <div class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span class="section-kicker">Loja oficial</span>
          <h2 class="section-title mt-4 text-3xl sm:text-4xl md:text-5xl">LOJA ONLINE CN10</h2>
          <p class="section-copy mt-4 text-base md:text-lg max-w-2xl">
            Uniformes e produtos oficiais em um só lugar. Escolha o item e finalize pela loja online.
          </p>
          <a
            href="${STORE_LINK}"
            target="_blank"
            rel="noopener noreferrer"
            class="premium-button mt-5 px-5 md:px-6 py-3 text-xs md:text-sm"
          >
            Acessar loja
          </a>
        </div>

        <div class="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] border border-cor-texto/12 bg-cor-fundo">
          <img
            src="/media/bannerloja.png"
            alt="Banner da loja CN10"
            class="w-full h-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  `;
}
