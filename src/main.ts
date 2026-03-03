import './style.css'
import { App, getCurrentRoute } from './app'
import { initAnimations } from './animations/index'
import { iniciarSlideshow } from './components/slideshow'
import { initMobileMenu } from './components/mobileMenu/mobileMenuBehavior'
import { hydrateClassesSection } from './sections/ClassesSection'
import { hydrateNoticesSection } from './sections/NoticesSection'
import { hydrateNewsListPage } from './pages/NewsListPage'
import { hydrateNewsDetailPage } from './pages/NewsDetailPage'

document.documentElement.classList.add('js-loading')

const appContainer = document.querySelector<HTMLDivElement>('#app')

if (!appContainer) {
  console.error('Elemento #app não encontrado')
}

function setupSmoothScroll() {
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
}

function setupImageLoading() {
  document.querySelectorAll('img').forEach(img => {
    if (img.loading !== 'lazy') {
      img.loading = 'lazy'
    }

    if (!img.complete) {
      img.classList.add('opacity-0', 'transition-opacity', 'duration-500')
      img.addEventListener('load', () => {
        img.classList.remove('opacity-0')
      }, { once: true })
    }
  })
}

async function renderAndInitialize() {
  if (!appContainer) return

  const route = getCurrentRoute()
  appContainer.innerHTML = App(route)

  if (route.name === 'home') {
    await Promise.all([
      hydrateClassesSection(),
      hydrateNoticesSection()
    ])

    initAnimations()
    iniciarSlideshow()
    initMobileMenu()
    setupSmoothScroll()
  }

  if (route.name === 'news-list') {
    await hydrateNewsListPage()
  }

  if (route.name === 'news-detail') {
    await hydrateNewsDetailPage(route.id)
  }

  setupImageLoading()

  document.documentElement.classList.remove('js-loading')
  document.documentElement.classList.add('js-loaded')
}

function setupRouteLinks() {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null
    const link = target?.closest('a[data-route]') as HTMLAnchorElement | null
    if (!link) return

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (link.target === '_blank') return

    const href = link.getAttribute('href')
    if (!href || !href.startsWith('/')) return

    event.preventDefault()

    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
    void renderAndInitialize()
  })

  window.addEventListener('popstate', () => {
    void renderAndInitialize()
  })
}

setupRouteLinks()

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    void renderAndInitialize()
  }, { once: true })
} else {
  void renderAndInitialize()
}
