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

        <!-- Social links - versão clean e premium (sem YouTube) -->
<div class="px-8 pb-16 mt-auto border-t border-cor-primaria/10 pt-12">
  <p class="text-center text-cor-texto/60 text-sm font-medium uppercase tracking-[0.4em] mb-5">
    Siga-nos
  </p>

  <div class="flex justify-center items-center gap-10">
    <!-- Instagram -->
    <a 
      href="https://www.instagram.com/espacocultural_cn10" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="group relative"
      aria-label="Instagram"
    >
      <div class="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] border border-white/5 group-hover:border-white/40 transition-all duration-500 shadow-md group-hover:shadow-xl group-hover:shadow-pink-600/30 flex items-center justify-center transform group-hover:-translate-y-1">
        <svg class="w-9 h-9 text-white group-hover:scale-110 transition-all duration-500 ease-out" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.578.266.181 2.666.072 7.14.014 8.42 0 8.828 0 12c0 3.172.014 3.58.072 4.86C.18 21.334 2.578 23.734 7.052 23.928 8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.474-.194 6.871-2.594 6.98-7.068.058-1.28.072-1.688.072-4.86 0-3.172-.014-3.58-.072-4.86C23.82 2.666 21.422.266 16.948.072 15.668.014 15.259 0 12 0z"/>
          <circle cx="18.406" cy="5.594" r="1.44"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      </div>
    </a>

    <!-- Facebook -->
    <a 
      href="https://www.facebook.com/espacoculturalcn10" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="group relative"
      aria-label="Facebook"
    >
      <div class="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#1877f2] border border-white/5 group-hover:border-white/40 transition-all duration-500 shadow-md group-hover:shadow-xl group-hover:shadow-blue-600/30 flex items-center justify-center transform group-hover:-translate-y-1">
        <svg class="w-9 h-9 text-white group-hover:scale-110 transition-all duration-500 ease-out" viewBox="0 0 320 512" fill="currentColor">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
        </svg>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      </div>
    </a>
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