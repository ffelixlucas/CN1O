export function LocationSection() {
  return `
    <section id="localizacao" class="relative py-24 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-b from-cor-fundo via-cor-fundo to-cor-secundaria/20"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-10 md:mb-12">
          <div class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span class="block text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Onde estamos</span>
          <h2 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight">LOCALIZACAO</h2>
          <p class="mt-4 text-cor-texto/70 text-base md:text-lg max-w-2xl">
            Venha conhecer nossa roda e viver a capoeira de perto.
          </p>
        </div>

        <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 md:gap-8 items-stretch">
          <div class="rounded-3xl border border-cor-texto/10 bg-cor-secundaria/30 p-6 md:p-8">
            <div class="space-y-6">
              <div>
                <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">Endereco</p>
                <p class="mt-2 text-cor-texto/85 text-sm md:text-base leading-relaxed">
                  Rua Alamanda, 384 A<br>
                  Jardim Karla, Pinhais - PR
                </p>
              </div>

              <div>
                <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">Contato</p>
                <p class="mt-2 text-cor-texto/85 text-sm md:text-base leading-relaxed">
                  (41) 99964-4301<br>
                  contato@capoeiranota10.com.br
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Rua+Alamanda+384+A+Pinhais+PR"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 mt-2 bg-cor-primaria hover:bg-cor-destaque text-cor-escura px-5 py-3 rounded-full font-semibold uppercase tracking-wide text-xs md:text-sm transition-colors"
              >
                Abrir no mapa
                <span>→</span>
              </a>
            </div>
          </div>

          <div class="rounded-3xl border border-cor-texto/10 overflow-hidden min-h-[320px]">
            <iframe
              title="Mapa - Capoeira Nota 10"
              src="https://maps.google.com/maps?q=Rua%20Alamanda%20384%20A%20Pinhais%20PR&t=&z=15&ie=UTF8&iwloc=&output=embed"
              class="w-full h-full min-h-[320px]"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}
