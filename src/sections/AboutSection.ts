export function AboutSection() {
  return `
    <section id="sobre" class="py-20" style="background-color: #0b1e17;">
      <div class="max-w-6xl mx-auto px-4">
        
        <h2 class="text-3xl font-bold text-center mb-12 text-white">QUEM SOMOS</h2>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <p class="text-gray-200 mb-4">
              O <strong class="text-white">Capoeira Nota 10</strong> é uma escola de capoeira e espaço cultural que une arte, cultura e educação desde 2011.
            </p>
            
            <p class="text-gray-200 mb-4">
              Vinculada ao <strong class="text-yellow-500">Grupo Capoeira Brasil</strong>, sob supervisão do Mestre Duende, liderada pelo Formando Clone.
            </p>
            
            <p class="text-gray-300 italic">
              "Aqui, a mente descansa e o corpo balança."
            </p>
          </div>

          <div>
            <img src="/media/professor2.png" class="w-full rounded-lg shadow-md" alt="Grupo Capoeira">
          </div>

        </div>

      </div>
    </section>
  `;
}