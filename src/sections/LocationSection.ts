export function LocationSection() {
  return `
    <section id="localizacao" class="py-32 bg-cor-fundo">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cor-primaria text-sm tracking-widest">— ONDE ESTAMOS</span>
          <h2 class="text-5xl text-cor-texto mt-4">LOCALIZAÇÃO</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <span class="text-cor-primaria text-2xl">📍</span>
              <div>
                <h3 class="text-cor-texto mb-2">ENDEREÇO</h3>
                <p class="text-cor-texto/50">
                  R. Alamanda, 384 A<br>
                  Jardim Karla, Pinhais - PR
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <span class="text-cor-primaria text-2xl">📞</span>
              <div>
                <h3 class="text-cor-texto mb-2">CONTATO</h3>
                <p class="text-cor-texto/50">
                  (41) 99999-9999<br>
                  contato@cn10.com.br
                </p>
              </div>
            </div>

            <div class="pt-8">
              <a href="https://www.google.com/maps" target="_blank" 
                 class="inline-block px-8 py-4 border border-cor-primaria text-cor-primaria hover:bg-cor-primaria hover:text-cor-fundo transition-all">
                VER NO MAPA
              </a>
            </div>
          </div>

          <div class="h-96 bg-cor-secundaria/30 border border-cor-secundaria/50 flex items-center justify-center">
            <span class="text-cor-texto/30">MAPA</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
