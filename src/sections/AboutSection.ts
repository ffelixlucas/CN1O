export function AboutSection() {
  return `
    <section id="sobre" data-anim="about" class="relative py-24 md:py-32 bg-cor-fundo">
      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-center">
          <div class="max-w-2xl md:py-6">
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
            <div class="absolute inset-8 rounded-3xl bg-gradient-to-br from-cor-primaria/10 via-cor-secundaria/8 to-transparent blur-2xl"></div>
            <div class="relative">
              <img
                src="/media/professor2.png"
                class="w-full object-contain max-h-[620px] mx-auto"
                alt="Professor da Capoeira Nota 10"
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
