// components/Header.ts
import { NAV_LINKS } from '../data/constants';
import { MobileMenu } from '../components/mobileMenu/MobileMenu';

export function Header() {
  return `
  <header class="relative min-h-[100svh] flex flex-col bg-cor-fundo overflow-hidden">
    <!-- Slideshow container -->
    <div class="absolute inset-0 z-0">
      <div 
        class="absolute inset-0 opacity-100 transition-opacity duration-1000 bg-cover bg-center" 
        id="slide-1"
        style="background-image: url('/media/bg-hero-blur.jpg');"
      ></div>
      
      <div 
        class="absolute inset-0 opacity-0 transition-opacity duration-1000 bg-cover bg-center" 
        id="slide-2"
        style="background-image: url('/media/bg-hero2-blur.jpg');"
      ></div>
    
      <!-- Overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-cor-fundo/90 via-cor-fundo/50 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-cor-secundaria/30 via-transparent to-transparent mix-blend-overlay"></div>
    </div>

    <!-- Navbar -->
    <nav class="relative z-20 flex items-center justify-between px-6 py-5 md:py-8 max-w-7xl mx-auto w-full">
      <div class="flex items-center gap-4">
        <img src="/media/logo.png" class="h-22 md:h-26 lg:h-30" alt="Capoeira Nota 10" />
      </div>

      <div class="hidden md:flex items-center gap-10">
        ${NAV_LINKS.map(link => `
          <a 
            href="${link.href}" 
            class="relative text-cor-texto/90 hover:text-cor-primaria text-sm uppercase tracking-widest font-medium transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cor-primaria after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            ${link.label}
          </a>
        `).join('')}
      </div>

      <button id="menu-btn" class="md:hidden text-3xl text-cor-texto hover:text-cor-primaria transition-colors">
        ☰
      </button>
    </nav>

    ${MobileMenu()}

    <!-- Hero content - agora com flex-grow-0 e mt-auto para controle melhor -->
    <div class="relative z-10 flex-1 flex items-center px-6 py-8 md:py-0 max-w-7xl mx-auto w-full">
      <div class="max-w-3xl space-y-6 md:space-y-8">

        <div class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-2"></div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-cor-texto leading-tight tracking-tight drop-shadow-xl">
          CAPOEIRA<br>
          <span class="text-cor-primaria">NOTA 10</span>
        </h1>

        <p class="text-base md:text-xl text-cor-texto max-w-xl font-bold leading-relaxed">
          Arte, cultura e transformação social através da capoeira
        </p>

        <div class="flex flex-col sm:flex-row gap-4 pt-2">
          <a 
            href="#sobre" 
            class="bg-cor-primaria hover:bg-cor-destaque text-cor-escura px-8 py-4 md:px-9 md:py-5 rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg shadow-cor-secundaria/30 inline-flex items-center justify-center gap-3 group"
          >
            <span>Conheça a Escola</span>
            <span class="group-hover:translate-x-1 transition-transform">↓</span>
          </a>

          
        </div>
      </div>
    </div>

    <!-- Footer hero - ajustado com z-index mais alto e padding inferior -->
    <div class="relative z-20 flex justify-between items-center pt-4 pb-6 md:pb-8 px-6 max-w-7xl mx-auto w-full bg-gradient-to-t from-cor-fundo/20 to-transparent">
      <span class="text-cor-texto/70 text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
        <span class="animate-bounce">↓</span> Role para descobrir
      </span>
      
      <div class="flex gap-2 md:gap-3">
      <button data-slide="1" class="w-2 h-2 rounded-full bg-cor-primaria"></button>
      <button data-slide="2" class="w-2 h-2 rounded-full bg-cor-texto/40 hover:bg-cor-primaria transition-colors"></button>
      </div>
    </div>
  </header>
  `;
}