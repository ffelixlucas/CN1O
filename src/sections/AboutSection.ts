export function AboutSection() {
  return `
    <section id="sobre" data-anim="about" class="relative py-20 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28">
      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-center">
          <div class="max-w-2xl md:py-6">
            <div data-anim="about-line" class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
            <span class="section-kicker">Institucional</span>
            <h2 data-anim="about-title" class="section-title mt-4 text-3xl sm:text-4xl md:text-5xl">
              QUEM SOMOS
            </h2>
            <p data-anim="about-subtitle" class="section-copy mt-4 text-base md:text-lg">
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

              <div class="premium-card rounded-2xl p-4">
                <p class="text-cor-texto/80 italic text-sm md:text-base">
                "Aqui, a mente descansa e o corpo balanca."
                </p>
              </div>
            </div>
          </div>

          <div data-anim="about-image" class="relative md:pt-3">
            <div class="premium-card relative rounded-3xl p-3 md:p-4">
              <img
                src="/media/about.png"
                class="w-full object-contain max-h-[620px] mx-auto rounded-2xl"
                alt="Professor da Capoeira Nota 10"
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
