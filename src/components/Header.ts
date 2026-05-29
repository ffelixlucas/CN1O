// components/Header.ts
import { MATRICULA_LINK, NAV_LINKS, STORE_LINK } from '../data/constants';
import { MobileMenu } from '../components/mobileMenu/MobileMenu';

export function Header() {
  return `
  <header data-anim="hero" class="relative min-h-[92svh] md:min-h-[100svh] flex flex-col bg-cor-fundo overflow-hidden">
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
      <div class="absolute inset-0 bg-gradient-to-t from-cor-fundo/94 via-cor-fundo/58 to-cor-fundo/20"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-cor-fundo/55 via-cor-fundo/12 to-transparent hidden md:block"></div>
    </div>

    <!-- Navbar -->
    <nav data-anim="hero-nav" class="relative z-20 flex max-w-[100vw] items-center justify-between gap-3 px-5 py-4 md:px-6 md:py-8 md:max-w-7xl mx-auto w-full">
      <div class="flex shrink-0 items-center gap-4">
        <div class="inline-flex items-center justify-center rounded-xl bg-[#FFFFFF] p-1.5 md:p-2 shadow-[0_10px_28px_rgba(0,0,0,0.24)] ring-1 ring-white/65">
          <img src="/media/logo.png" class="h-14 sm:h-16 md:h-22 w-auto" alt="Capoeira Nota 10" loading="eager" fetchpriority="high" />
        </div>
      </div>

      <div class="hidden md:flex items-center gap-10">
        ${NAV_LINKS.map(link => `
          <a 
            href="${link.href}" 
            class="relative text-cor-texto/90 hover:text-cor-primaria text-sm uppercase tracking-widest font-semibold transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cor-primaria after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            ${link.label}
          </a>
        `).join('')}
      </div>

      <div class="md:hidden ml-auto flex shrink-0 items-center gap-2">
        <button
          id="menu-btn"
          aria-label="Abrir menu de navegação"
          aria-expanded="false"
          aria-controls="menu-panel"
          class="premium-button-secondary inline-flex items-center justify-center w-12 h-12 p-0"
        >
          <svg class="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </nav>

    ${MobileMenu()}

    <!-- Hero content - agora com flex-grow-0 e mt-auto para controle melhor -->
    <div class="relative z-10 flex-1 flex items-center px-5 pb-10 pt-0 md:px-6 md:py-0 max-w-7xl mx-auto w-full">
      <div class="max-w-3xl space-y-5 md:space-y-8">

        <div data-anim="hero-line" class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-2"></div>

        <div class="flex flex-wrap gap-2">
          <span class="premium-chip">Desde 2011</span>
          <span class="premium-chip">Pinhais - PR</span>
        </div>

        <h1 data-anim="hero-title" class="text-4xl sm:text-5xl md:text-7xl font-black text-cor-texto leading-tight tracking-tight drop-shadow-xl">
          CAPOEIRA<br>
          <span class="text-cor-primaria">NOTA 10</span>
        </h1>

        <p data-anim="hero-copy" class="text-base md:text-xl text-cor-texto max-w-[20rem] md:max-w-xl font-bold leading-relaxed">
          Aulas de capoeira para criancas, jovens e adultos em Pinhais.
        </p>

        <div data-anim="hero-cta-group" class="grid gap-2 pt-1.5 sm:flex sm:flex-row sm:flex-wrap sm:gap-4">
        <a 
            href="#aulas" 
            data-anim="hero-cta"
            class="premium-button min-w-0 px-4 py-3 md:px-9 md:py-5 text-[11px] sm:text-sm group text-center"
          >
            <span class="leading-tight">Agendar aula experimental</span>
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 6V18M12 18L17 13M12 18L7 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <a
            href="${MATRICULA_LINK}"
            target="_blank"
            rel="noopener noreferrer"
            data-anim="hero-cta"
            class="premium-button-secondary min-w-0 px-4 py-3 md:px-9 md:py-5 text-[11px] sm:text-sm group text-center"
          >
            <span class="leading-tight">Fazer matricula</span>
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8.5M17 7V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <a
            href="${STORE_LINK}"
            target="_blank"
            rel="noopener noreferrer"
            data-anim="hero-cta"
            class="premium-button-muted min-w-0 px-4 py-3 md:px-7 md:py-5 text-[11px] sm:text-sm group text-center"
          >
            <span class="leading-tight">Acessar loja</span>
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8.5M17 7V15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Footer hero - ajustado com z-index mais alto e padding inferior -->
    <div class="relative z-20 hidden md:flex justify-between items-center pt-4 pb-8 px-6 max-w-7xl mx-auto w-full bg-gradient-to-t from-cor-fundo/20 to-transparent">
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
