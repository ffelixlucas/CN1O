// components/Header.ts
import { NAV_LINKS } from '../data/constants';
import { MobileMenu } from '../components/mobileMenu/MobileMenu';

export function Header() {
  return `
  <header data-anim="hero" class="relative min-h-[100svh] flex flex-col bg-cor-fundo overflow-hidden">
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
    <nav data-anim="hero-nav" class="relative z-20 flex items-center justify-between px-6 py-5 md:py-8 max-w-7xl mx-auto w-full">
      <div class="flex items-center gap-4">
        <div class="inline-flex items-center justify-center rounded-xl bg-[#FFFFFF] p-1.5 md:p-2 shadow-[0_6px_14px_rgba(0,0,0,0.2)] ring-1 ring-white/55">
          <img src="/media/logo.png" class="h-20 md:h-22 w-auto" alt="Capoeira Nota 10" loading="eager" fetchpriority="high" />
        </div>
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

      <button
        id="menu-btn"
        aria-label="Abrir menu de navegação"
        aria-expanded="false"
        aria-controls="menu-panel"
        class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-cor-primaria/35 text-cor-primaria hover:text-cor-destaque hover:border-cor-destaque/55 transition-colors"
      >
        <svg class="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
        </svg>
      </button>
    </nav>

    ${MobileMenu()}

    <!-- Hero content - agora com flex-grow-0 e mt-auto para controle melhor -->
    <div class="relative z-10 flex-1 flex items-center px-6 py-8 md:py-0 max-w-7xl mx-auto w-full">
      <div class="max-w-3xl space-y-6 md:space-y-8">

        <div data-anim="hero-line" class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-2"></div>

        <h1 data-anim="hero-title" class="text-4xl sm:text-5xl md:text-7xl font-black text-cor-texto leading-tight tracking-tight drop-shadow-xl">
          CAPOEIRA<br>
          <span class="text-cor-primaria">NOTA 10</span>
        </h1>

        <p data-anim="hero-copy" class="text-base md:text-xl text-cor-texto max-w-xl font-bold leading-relaxed">
          Arte, cultura e transformação social através da capoeira
        </p>

        <div data-anim="hero-cta-group" class="flex flex-col sm:flex-row gap-4 pt-2">
          <a 
            href="#sobre" 
            data-anim="hero-cta"
            class="bg-cor-primaria hover:bg-cor-destaque text-cor-escura px-8 py-4 md:px-9 md:py-5 rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg shadow-cor-secundaria/30 inline-flex items-center justify-center gap-3 group"
          >
            <span>Conheça a Escola</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 6V18M12 18L17 13M12 18L7 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          
        </div>
      </div>
    </div>

    <!-- Footer hero - ajustado com z-index mais alto e padding inferior -->
    <div class="relative z-20 flex justify-between items-center pt-4 pb-6 md:pb-8 px-6 max-w-7xl mx-auto w-full bg-gradient-to-t from-cor-fundo/20 to-transparent">
      <span data-anim="hero-hint" class="text-cor-texto/70 text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
        <svg class="w-3.5 h-3.5 animate-bounce" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 6V18M12 18L17 13M12 18L7 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Role para descobrir</span>
      </span>
      
      <div data-anim="hero-indicators" class="flex gap-2 md:gap-3">
      <button data-slide="1" data-anim="hero-indicator" class="w-2 h-2 rounded-full bg-cor-primaria"></button>
      <button data-slide="2" data-anim="hero-indicator" class="w-2 h-2 rounded-full bg-cor-texto/40 hover:bg-cor-primaria transition-colors"></button>
      </div>
    </div>
  </header>
  `;
}
