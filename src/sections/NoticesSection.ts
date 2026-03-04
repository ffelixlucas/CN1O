// sections/NoticesSection.ts

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

function renderNoticeTimelineItem(item: NoticeItem): string {
  return `
    <a data-route href="${escapeHtml(toNoticeDetailPath(item.id))}" data-anim="notice-item" class="group block relative rounded-2xl border border-cor-texto/10 bg-cor-secundaria/30 p-4 md:p-5 hover:border-cor-primaria/35 transition-colors">
      <div class="absolute -left-8 top-5 hidden md:block w-3 h-3 rounded-full bg-cor-primaria shadow-[0_0_0_4px_rgba(243,200,73,0.2)]"></div>
      <div class="rounded-xl overflow-hidden mb-3 bg-cor-secundaria/30">
        <img src="${escapeHtml(getNoticeImage(item))}" alt="${escapeHtml(item.titulo)}" class="w-full h-36 object-cover" loading="lazy">
      </div>
      <div class="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-cor-texto/60">
        <span class="font-semibold text-cor-texto/80">${escapeHtml(item.dataLabel)}</span>
        ${item.horarioLabel ? `<span class="inline-block w-1 h-1 rounded-full bg-cor-texto/35"></span><span>${escapeHtml(item.horarioLabel)}</span>` : ''}
      </div>
      <h3 class="mt-2 text-cor-texto font-bold text-base md:text-lg leading-snug">${escapeHtml(item.titulo)}</h3>
      <p class="mt-2 text-cor-texto/75 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">${escapeHtml(item.resumo)}</p>
      <span class="mt-4 inline-flex items-center gap-2 text-cor-primaria text-sm font-semibold group-hover:translate-x-1 transition-transform">
        Ler publicacao
        <span>→</span>
      </span>
    </a>
  `;
}

function renderNotices(items: NoticeItem[]): string {
  if (items.length === 0) {
    return '<p class="col-span-full text-cor-texto/70 text-sm md:text-base">Nenhuma publicacao disponivel no momento.</p>';
  }

  const [featured, ...others] = items;
  const latest = items[0];

  return `
    <div class="mb-6 flex flex-wrap items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.12em]">
      <span class="px-2.5 py-1 rounded-full bg-cor-secundaria/45 border border-cor-texto/10 text-cor-texto/75">${items.length} publicacoes</span>
      <span class="px-2.5 py-1 rounded-full bg-cor-secundaria/45 border border-cor-texto/10 text-cor-texto/75">Ativo ate ${escapeHtml(latest.dataLabel)}${latest.horarioLabel ? ` • ${escapeHtml(latest.horarioLabel)}` : ''}</span>
      <span class="px-2.5 py-1 rounded-full bg-cor-primaria/90 text-cor-escura font-bold">Atualizacoes do nosso espaco cultural</span>
    </div>

    <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-start">
      <a data-route href="${escapeHtml(toNoticeDetailPath(featured.id))}" data-anim="notice-featured" class="group block rounded-3xl border border-cor-texto/10 bg-cor-secundaria/35 overflow-hidden hover:border-cor-primaria/35 transition-colors">
        <div class="relative aspect-[16/10] bg-cor-secundaria/40">
          <img src="${escapeHtml(getNoticeImage(featured))}" alt="${escapeHtml(featured.titulo)}" class="w-full h-full object-cover" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-cor-fundo/85 via-cor-fundo/25 to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
            <span class="px-2.5 py-1 rounded-full bg-cor-primaria text-cor-escura font-extrabold">Em destaque</span>
            <span class="px-2.5 py-1 rounded-full bg-cor-fundo/70 text-cor-texto/80">${escapeHtml(featured.dataLabel)}</span>
            ${featured.horarioLabel ? `<span class="px-2.5 py-1 rounded-full bg-cor-fundo/70 text-cor-texto/80">${escapeHtml(featured.horarioLabel)}</span>` : ''}
          </div>
        </div>

        <div class="p-5 md:p-7">
          <p class="text-[11px] uppercase tracking-[0.16em] text-cor-primaria font-semibold mb-2">Publicacao principal</p>
          <h3 class="text-cor-texto text-2xl md:text-3xl font-black leading-tight">${escapeHtml(featured.titulo)}</h3>
          <p class="mt-3 text-cor-texto/80 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4">${escapeHtml(featured.resumo)}</p>
          <span class="mt-5 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm md:text-base group-hover:translate-x-1 transition-transform">
            Ver publicacao completa
            <span>→</span>
          </span>
        </div>
      </a>

      <div data-anim="notice-list" class="relative md:pl-8">
        <div class="hidden md:block absolute left-[0.32rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cor-primaria via-cor-primaria/45 to-transparent"></div>
        <div class="space-y-4 md:space-y-5">
          ${(others.length ? others : [featured]).map(renderNoticeTimelineItem).join('')}
        </div>
      </div>
    </div>
  `;
}

export function NoticesSection() {
  return `
    <section id="noticias" data-anim="notices" class="relative py-24 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-cor-fundo/35"></div>
        <div class="absolute -top-8 left-0 w-72 h-72 rounded-full bg-cor-primaria/8 blur-3xl"></div>
        <div class="absolute -bottom-10 right-0 w-80 h-80 rounded-full bg-cor-secundaria/25 blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-12 md:mb-16">
          <div data-anim="notices-line" class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span data-anim="notices-kicker" class="block text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Ultimas atualizacoes</span>
          <h2 data-anim="notices-title" class="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight">TIMELINE DE NOTICIAS</h2>
          <p data-anim="notices-subtitle" class="mt-4 text-cor-texto/70 text-base md:text-lg max-w-2xl">Acompanhe nossas novidades, eventos e a rotina do espaco em ordem cronologica.</p>
          <a data-route href="/noticias" class="mt-5 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm md:text-base hover:translate-x-1 transition-transform">
            Ver todas as noticias
            <span>→</span>
          </a>
        </div>

        <div data-notices-root>
          <p class="col-span-full text-cor-texto/70 text-sm md:text-base">Carregando publicacoes...</p>
        </div>
      </div>
    </section>
  `;
}

export async function hydrateNoticesSection() {
  const root = document.querySelector<HTMLElement>('[data-notices-root]');
  if (!root) return;

  try {
    const notices = await fetchNotices();
    root.innerHTML = renderNotices(notices);
  } catch (error) {
    console.error('Erro ao carregar noticias da API.', error);
    root.innerHTML = '<p class="col-span-full text-red-300/80 text-sm md:text-base">Nao foi possivel carregar as publicacoes agora.</p>';
  }
}
