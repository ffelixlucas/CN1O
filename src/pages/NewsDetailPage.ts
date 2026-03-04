import { fetchNotices, toNoticeDetailPath } from '../data/notices';
import type { NoticeItem } from '../data/notices';

const NOTICE_FALLBACK_IMAGE = '/media/capoeira-nota10-social-1200x630.jpg';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getNoticeImage(item: NoticeItem): string {
  return item.imagemUrl || NOTICE_FALLBACK_IMAGE;
}

function renderDetail(item: NoticeItem, source: NoticeItem[]): string {
  const related = source.filter((notice) => notice.id !== item.id).slice(0, 2);
  const paragraphs = item.conteudo
    .split(/\n{2,}/)
    .map((text) => text.trim())
    .filter(Boolean);

  return `
    <article class="rounded-3xl border border-cor-texto/10 bg-cor-secundaria/25 overflow-hidden">
      <div class="relative aspect-[16/8] bg-cor-secundaria/30 group">
        <img
          src="${escapeHtml(getNoticeImage(item))}"
          alt="${escapeHtml(item.titulo)}"
          class="w-full h-full object-cover cursor-zoom-in"
          loading="lazy"
          data-news-image
        >
        <span class="absolute right-3 bottom-3 text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-cor-fundo/70 text-cor-texto/80 pointer-events-none">Toque para ampliar</span>
      </div>
      <div class="p-6 md:p-8">
        <div class="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
          <span class="px-2.5 py-1 rounded-full bg-cor-primaria text-cor-escura font-extrabold">${escapeHtml(item.categoria)}</span>
          <span class="px-2.5 py-1 rounded-full bg-cor-fundo/60 text-cor-texto/80">${escapeHtml(item.dataLabel)}${item.horarioLabel ? ` • ${escapeHtml(item.horarioLabel)}` : ''}</span>
          <span class="px-2.5 py-1 rounded-full bg-cor-fundo/60 text-cor-texto/80">${escapeHtml(item.autor)}</span>
          <span class="px-2.5 py-1 rounded-full bg-cor-fundo/60 text-cor-texto/80">${item.leituraMin} min de leitura</span>
        </div>
        <h1 class="mt-3 text-2xl sm:text-3xl md:text-5xl font-black text-cor-texto leading-[1.12] tracking-tight">${escapeHtml(item.titulo)}</h1>
        <div class="mt-5 md:mt-6 space-y-4 md:space-y-5 text-cor-texto/85 text-[15px] md:text-lg leading-relaxed">
          ${(paragraphs.length ? paragraphs : [item.conteudo]).map((text) => `<p>${escapeHtml(text)}</p>`).join('')}
        </div>
      </div>
    </article>

    ${related.length ? `
      <section class="mt-8 md:mt-10">
        <h2 class="text-cor-texto text-xl md:text-2xl font-bold mb-4">Outras noticias</h2>
        <div class="grid md:grid-cols-2 gap-4">
          ${related.map((news) => `
            <a data-route href="${escapeHtml(toNoticeDetailPath(news.id))}" class="group block rounded-2xl border border-cor-texto/10 bg-cor-secundaria/25 p-4 hover:border-cor-primaria/35 transition-colors">
              <p class="text-[11px] uppercase tracking-[0.14em] text-cor-texto/60">${escapeHtml(news.dataLabel)}</p>
              <h3 class="mt-2 text-cor-texto font-semibold leading-snug line-clamp-2">${escapeHtml(news.titulo)}</h3>
              <span class="mt-3 inline-flex items-center gap-2 text-cor-primaria text-sm font-semibold group-hover:translate-x-1 transition-transform">Ler <span>→</span></span>
            </a>
          `).join('')}
        </div>
      </section>
    ` : ''}

    <div data-news-image-modal class="fixed inset-0 z-[120] bg-black/90 hidden items-center justify-center p-4">
      <button type="button" data-news-image-close class="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none" aria-label="Fechar imagem">×</button>
      <img data-news-image-modal-content src="" alt="Imagem ampliada" class="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl">
    </div>
  `;
}

function bindImageLightbox(root: HTMLElement) {
  const image = root.querySelector<HTMLImageElement>('[data-news-image]');
  const modal = root.querySelector<HTMLDivElement>('[data-news-image-modal]');
  const modalContent = root.querySelector<HTMLImageElement>('[data-news-image-modal-content]');
  const closeBtn = root.querySelector<HTMLButtonElement>('[data-news-image-close]');

  if (!image || !modal || !modalContent || !closeBtn) return;

  const onEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  };

  const openModal = () => {
    modalContent.src = image.src;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEsc);
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEsc);
  };

  image.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

}

export function NewsDetailPage() {
  return `
    <main class="min-h-screen bg-cor-fundo text-cor-texto py-20 md:py-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <a data-route href="/noticias" class="inline-flex items-center gap-2 text-cor-texto/70 hover:text-cor-primaria text-sm mb-8">← Voltar para noticias</a>
        <div data-news-detail-root>
          <p class="text-cor-texto/70">Carregando noticia...</p>
        </div>
      </div>
    </main>
  `;
}

export async function hydrateNewsDetailPage(noticeId: string, prefetched?: NoticeItem[]) {
  const root = document.querySelector<HTMLElement>('[data-news-detail-root]');
  if (!root) return;

  try {
    const notices = prefetched ?? (await fetchNotices());
    const item = notices.find((notice) => notice.id === noticeId) ?? notices[0];

    if (!item) {
      root.innerHTML = '<p class="text-cor-texto/70">Noticia nao encontrada.</p>';
      return;
    }

    root.innerHTML = renderDetail(item, notices);
    bindImageLightbox(root);
  } catch (error) {
    console.error('Erro ao carregar detalhe da noticia.', error);
    root.innerHTML = '<p class="text-red-300/80 text-sm md:text-base">Nao foi possivel carregar esta noticia agora.</p>';
  }
}
