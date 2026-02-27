// components/MobileMenu.ts
import { NAV_LINKS } from '../../data/constants';

export function MobileMenu() {
  return `
    <div id="mobile-menu" class="fixed inset-0 z-50 invisible">
      <!-- Overlay com blur -->
      <div class="absolute inset-0 bg-cor-fundo/95 backdrop-blur-md opacity-0 transition-opacity duration-500" id="menu-overlay"></div>
      
      <!-- Menu panel -->
      <div class="absolute inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-cor-fundo to-cor-fundo/95 shadow-2xl transform translate-x-full transition-transform duration-500 ease-out" id="menu-panel">
        
        <!-- Header do menu com close button estilizado -->
        <div class="flex items-center justify-between p-6 border-b border-cor-primaria/20">
          <span class="text-cor-primaria font-bold text-lg tracking-widest">MENU</span>
          
          <button id="close-menu" class="group relative w-10 h-10 flex items-center justify-center">
            <span class="sr-only">Fechar menu</span>
            
            <!-- Anel externo animado -->
            <span class="absolute inset-0 rounded-full border border-cor-texto/20 group-hover:border-cor-primaria/50 transition-colors duration-300"></span>
            
            <!-- Ícone X -->
            <span class="relative text-2xl text-cor-texto/70 group-hover:text-cor-primaria transition-colors duration-300">
              ✕
            </span>
          </button>
        </div>

        <!-- Links de navegação -->
        <nav class="flex flex-col p-8 space-y-6">
          ${NAV_LINKS.map((link, index) => `
            <a 
              href="${link.href}" 
              class="menu-link group relative flex items-center text-3xl md:text-4xl font-light text-cor-texto/80 hover:text-cor-primaria transition-all duration-300 transform hover:translate-x-4"
              style="transition-delay: ${index * 50}ms"
            >
              <!-- Indicador animado -->
              <span class="absolute -left-4 w-1 h-0 bg-cor-primaria group-hover:h-8 transition-all duration-300"></span>
              
              <!-- Label -->
              <span class="relative">
                ${link.label}
                <span class="absolute -bottom-2 left-0 w-0 h-px bg-cor-primaria group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          `).join('')}
        </nav>

        <!-- Social links com design melhorado -->
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="border-t border-cor-primaria/20 pt-8">
            <p class="text-center text-cor-texto/40 text-xs uppercase tracking-widest mb-4">Siga-nos</p>
            
            <div class="flex justify-center gap-6">
              <a href="#" class="group relative">
                <span class="absolute inset-0 bg-cor-primaria/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span class="relative block w-12 h-12 rounded-full border border-cor-texto/20 group-hover:border-cor-primaria flex items-center justify-center text-2xl text-cor-texto/60 group-hover:text-cor-primaria transition-all duration-300">
                  📸
                </span>
              </a>
              
              <a href="#" class="group relative">
                <span class="absolute inset-0 bg-cor-primaria/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span class="relative block w-12 h-12 rounded-full border border-cor-texto/20 group-hover:border-cor-primaria flex items-center justify-center text-2xl text-cor-texto/60 group-hover:text-cor-primaria transition-all duration-300">
                  ▶
                </span>
              </a>
              
              <a href="#" class="group relative">
                <span class="absolute inset-0 bg-cor-primaria/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span class="relative block w-12 h-12 rounded-full border border-cor-texto/20 group-hover:border-cor-primaria flex items-center justify-center text-2xl text-cor-texto/60 group-hover:text-cor-primaria transition-all duration-300">
                  📘
                </span>
              </a>
            </div>
          </div>
        </div>

        <!-- Decoração sutil -->
        <div class="absolute top-[80%] left-8 -translate-y-1/2 -rotate-90 origin-left text-cor-primaria/6 text-8xl font-black whitespace-nowrap pointer-events-none select-none">
          CAPOEIRA
        </div>
      </div>
    </div>
  `;
}