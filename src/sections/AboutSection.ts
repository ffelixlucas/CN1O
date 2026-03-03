export function AboutSection() {
  return `
    <section id="sobre" data-anim="about" class="relative py-24 md:py-32 bg-cor-fundo">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-cor-fundo/35"></div>
        <div class="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cor-primaria/10 blur-3xl"></div>
        <div class="absolute bottom-8 -right-20 w-80 h-80 rounded-full bg-cor-secundaria/14 blur-[72px]"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-start">
          <div class="max-w-2xl">
            <div data-anim="about-line" class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
            <h2 data-anim="about-title" class="text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight leading-tight">
              QUEM SOMOS
            </h2>
            <p data-anim="about-subtitle" class="mt-4 text-cor-texto/75 text-base md:text-lg">
              Capoeira, cultura e disciplina para formar corpo, mente e comunidade.
            </p>

            <div data-anim="about-copy" class="space-y-5 mt-8 md:mt-10">
              <p class="text-cor-texto/90 text-base md:text-lg leading-relaxed">
                O <strong class="text-cor-texto">Capoeira Nota 10</strong> e um espaco cultural que une arte,
                educacao e transformacao social desde 2011.
              </p>

              <p class="text-cor-texto/80 text-base md:text-lg leading-relaxed">
                Vinculada ao <strong class="text-cor-primaria">Grupo Capoeira Brasil</strong>, sob supervisao
                do Mestre Duende e lideranca do Formando Clone.
              </p>

              <p class="text-cor-texto/60 italic text-sm md:text-base pt-1">
                "Aqui, a mente descansa e o corpo balanca."
              </p>
            </div>
          </div>

          <div data-anim="about-image" class="relative md:pt-3">
            <div class="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cor-primaria/20 via-cor-secundaria/20 to-transparent blur-2xl"></div>
            <div class="relative bg-cor-secundaria/30 border border-cor-texto/15 rounded-3xl p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <img
                src="/media/professor2.png"
                class="w-full rounded-2xl object-contain max-h-[620px] mx-auto"
                alt="Professor da Capoeira Nota 10"
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
