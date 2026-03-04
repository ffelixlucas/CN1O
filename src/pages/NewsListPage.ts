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

function renderList(items: NoticeItem[]): string {
  if (items.length === 0) {
    return '<p class="text-cor-texto/70">Nenhuma noticia disponivel no momento.</p>';
  }

  const [featured, ...others] = items;

  return `
    <a data-route href="${escapeHtml(toNoticeDetailPath(featured.id))}" class="surface-card group block rounded-3xl overflow-hidden mb-8 hover:border-cor-primaria/35 transition-colors">
      <div class="grid lg:grid-cols-2">
        <div class="surface-card-soft aspect-[16/10] lg:aspect-auto">
          <img src="${escapeHtml(getNoticeImage(featured))}" alt="${escapeHtml(featured.titulo)}" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="p-6 md:p-8">
          <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">${escapeHtml(featured.categoria)}</p>
          <h2 class="mt-3 text-cor-texto text-2xl md:text-4xl font-black leading-tight">${escapeHtml(featured.titulo)}</h2>
          <p class="mt-3 text-cor-texto/75 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">${escapeHtml(featured.resumo)}</p>
          <div class="mt-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-cor-texto/60">
            <span>${escapeHtml(featured.dataLabel)}${featured.horarioLabel ? ` • ${escapeHtml(featured.horarioLabel)}` : ''}</span>
            <span class="inline-block w-1 h-1 rounded-full bg-cor-texto/40"></span>
            <span>${escapeHtml(featured.autor)}</span>
            <span class="inline-block w-1 h-1 rounded-full bg-cor-texto/40"></span>
            <span>${featured.leituraMin} min de leitura</span>
          </div>
          <span class="mt-5 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Ler materia completa
            <span>→</span>
          </span>
        </div>
      </div>
    </a>

    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      ${others.map((item) => `
        <a data-route href="${escapeHtml(toNoticeDetailPath(item.id))}" class="surface-card group block rounded-2xl overflow-hidden hover:border-cor-primaria/35 transition-colors">
          <div class="surface-card-soft aspect-[16/10]">
            <img src="${escapeHtml(getNoticeImage(item))}" alt="${escapeHtml(item.titulo)}" class="w-full h-full object-cover" loading="lazy">
          </div>
          <div class="p-5">
            <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">${escapeHtml(item.categoria)}</p>
            <p class="text-[11px] uppercase tracking-[0.14em] text-cor-texto/60">${escapeHtml(item.dataLabel)}${item.horarioLabel ? ` • ${escapeHtml(item.horarioLabel)}` : ''}</p>
            <h2 class="mt-2 text-cor-texto text-xl font-bold leading-tight">${escapeHtml(item.titulo)}</h2>
            <p class="mt-2 text-cor-texto/75 text-sm leading-relaxed line-clamp-2">${escapeHtml(item.resumo)}</p>
            <p class="mt-3 text-[11px] uppercase tracking-[0.12em] text-cor-texto/55">${escapeHtml(item.autor)} • ${item.leituraMin} min</p>
            <span class="mt-4 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Ler noticia
              <span>→</span>
            </span>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}

export function NewsListPage() {
  return `
    <main class="min-h-screen bg-cor-fundo text-cor-texto py-20 md:py-24">
      <div class="max-w-7xl mx-auto px-6">
        <a data-route href="/" class="inline-flex items-center gap-2 text-cor-texto/70 hover:text-cor-primaria text-sm mb-8">← Voltar para home</a>
        <p class="text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Blog do Espaco Cultural</p>
        <h1 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-black">Noticias</h1>
        <p class="mt-4 text-cor-texto/75 max-w-3xl">Acompanhe nossas publicacoes, eventos e novidades do espaco cultural.</p>

        <div data-news-list-root class="mt-10">
          <p class="text-cor-texto/70">Carregando noticias...</p>
        </div>
      </div>
    </main>
  `;
}

export async function hydrateNewsListPage(prefetched?: NoticeItem[]) {
  const root = document.querySelector<HTMLElement>('[data-news-list-root]');
  if (!root) return;

  try {
    const notices = prefetched ?? (await fetchNotices());
    root.innerHTML = renderList(notices);
  } catch (error) {
    console.error('Erro ao carregar lista de noticias.', error);
    root.innerHTML = '<p class="text-red-300/80 text-sm md:text-base">Nao foi possivel carregar as noticias agora.</p>';
  }
}
