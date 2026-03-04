export function StoreTeaserSection() {
  return `
    <section id="loja" class="relative py-20 md:py-24 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute left-[24%] top-[34%] w-44 h-44 rounded-full bg-cor-primaria/8 blur-[88px]"></div>
        <div class="absolute left-[58%] top-[56%] w-52 h-52 rounded-full bg-cor-secundaria/12 blur-[96px]"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div
          class="relative block overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-[0_16px_42px_rgba(0,0,0,0.28)] bg-[#0b1e17] md:bg-no-repeat md:bg-contain md:bg-center md:aspect-[1549/637] md:[background-image:url('/media/bannerloja.png')]"
          role="status"
          aria-live="polite"
        >
          <img
            src="/media/bannerloja.png"
            alt="Banner da loja CN10"
            class="block w-full h-auto md:hidden"
            loading="lazy"
            decoding="async"
          />

          <div class="absolute inset-0 pointer-events-none hidden md:block bg-gradient-to-r from-[#081711ed] via-[#081711bf] to-[#0817111a]"></div>
          <div class="absolute inset-0 pointer-events-none hidden md:block bg-gradient-to-t from-[#081711bf] via-transparent to-transparent"></div>

          <div class="relative z-10 p-5 sm:p-6 md:p-10 md:h-full max-w-2xl flex flex-col justify-center">
              <div class="self-start rounded-2xl bg-[#081711b8] p-4 sm:p-5 md:bg-transparent md:p-0">
              <span class="text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Loja oficial</span>
              <h2 class="mt-2 text-xl sm:text-2xl md:text-4xl font-black text-cor-texto tracking-tight">LOJA TEMPORARIAMENTE INDISPONIVEL</h2>
              <p class="mt-2 md:mt-3 text-cor-texto/90 text-sm md:text-base max-w-xl">
                Estamos repondo o estoque. Em breve a loja estara ativa novamente.
              </p>

              <span class="self-start mt-4 md:mt-6 inline-flex items-center justify-center gap-2 bg-cor-texto/12 text-cor-texto/85 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm border border-cor-texto/25">
                Em breve
              </span>
              </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
