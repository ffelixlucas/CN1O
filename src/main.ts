import './style.css'
import { App } from './app'
import { initAnimations } from './animations/index'
import { iniciarSlideshow } from './components/slideshow'
import { initMobileMenu } from './components/mobileMenu/mobileMenuBehavior'
import { hydrateClassesSection } from './sections/ClassesSection'

// Não precisamos mais expor mudarSlide globalmente na maioria dos casos
// Se realmente precisar chamar de onclick no HTML → mantenha, mas prefira event delegation

// 1. Prevenir FOUC de forma mais elegante (via classe no html ou body)
document.documentElement.classList.add('js-loading')

// 2. Renderizar o app com segurança
const appContainer = document.querySelector<HTMLDivElement>('#app')

if (!appContainer) {
  console.error('Elemento #app não encontrado')
} else {
  appContainer.innerHTML = App()
}

// 3. Tudo que depende do DOM pronto
async function initializeApp() {
  await hydrateClassesSection()

  // Inicia animações e slideshow
  initAnimations()
  iniciarSlideshow()
  initMobileMenu()

  // Lazy loading + fade-in suave nas imagens (opcional, mas melhora perceived performance)
  document.querySelectorAll('img').forEach(img => {
    if (img.loading !== 'lazy') {
      img.loading = 'lazy' // nativo e bom
    }

    // Só adiciona listener se necessário (evita overhead)
    if (!img.complete) {
      img.classList.add('opacity-0', 'transition-opacity', 'duration-500')
      img.addEventListener('load', () => {
        img.classList.remove('opacity-0')
      }, { once: true })
    }
  })

  // Remove a classe de loading → revela tudo com CSS transition
  document.documentElement.classList.remove('js-loading')
  document.documentElement.classList.add('js-loaded')
}

// 4. Smooth scroll para links âncora (já está bom, só deixei mais limpo)
document.querySelectorAll('a[href^="#"]:not(a[href="#"])').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault()
    const href = anchor.getAttribute('href')
    if (!href) return

    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// 5. Escolher o evento certo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    void initializeApp()
  }, { once: true })
} else {
  // Já carregou → executa imediatamente
  void initializeApp()
}


