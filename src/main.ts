import './style.css'
import { App, getCurrentRoute } from './app'
import { initAnimations } from './animations/index'
import { iniciarSlideshow } from './components/slideshow'
import { initMobileMenu } from './components/mobileMenu/mobileMenuBehavior'
import { initFloatingWhatsApp } from './components/FloatingWhatsApp'
import { hydrateFooter } from './components/Footer'
import { hydrateClassesSection } from './sections/ClassesSection'
import { hydrateEventsSection } from './sections/EventsSection'
import { hydrateNoticesSection } from './sections/NoticesSection'
import { hydrateLocationSection } from './sections/LocationSection'
import { hydrateNewsListPage } from './pages/NewsListPage'
import { hydrateNewsDetailPage } from './pages/NewsDetailPage'
import { fetchNotices, findNoticeById } from './data/notices'
import { applyHomeSeo, applyNewsDetailSeo, applyNewsListSeo } from './seo'

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
        // Ajuste fino para o topo da seção ficar alinhado na tela sem descer demais.
        const offset = 56
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      }
    })
  })
}

function setupImageLoading() {
  document.querySelectorAll('img').forEach(img => {
    const isPriority = img.closest('header') !== null || img.hasAttribute('data-priority-image')
    if (isPriority) {
      img.loading = 'eager'
      img.setAttribute('fetchpriority', 'high')
      return
    }

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
    applyHomeSeo()
    await Promise.all([
      hydrateClassesSection(),
      hydrateEventsSection(),
      hydrateNoticesSection(),
      hydrateLocationSection(),
      hydrateFooter()
    ])

    initAnimations()
    iniciarSlideshow()
    initMobileMenu()
    setupSmoothScroll()
  }

  if (route.name === 'news-list') {
    const notices = await fetchNotices()
    applyNewsListSeo()
    await hydrateNewsListPage(notices)
  }

  if (route.name === 'news-detail') {
    const notices = await fetchNotices()
    const selected = findNoticeById(notices, route.id) ?? notices[0]
    if (selected) {
      applyNewsDetailSeo(selected)
    } else {
      applyNewsListSeo()
    }
    await hydrateNewsDetailPage(route.id, notices)
  }

  setupImageLoading()
  await initFloatingWhatsApp()

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
