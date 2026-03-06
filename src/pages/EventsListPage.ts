import { fetchEvents } from '../data/events';
import type { EventItem } from '../data/events';

type EventTab = 'todos' | 'abertos' | 'encerrados';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function formatCountdown(deadlineTs: number | null): string {
  if (!deadlineTs || !Number.isFinite(deadlineTs)) return 'Sem prazo de inscricao';
  const diff = Math.max(0, deadlineTs - Date.now());
  if (diff <= 0) return 'Inscricoes encerradas';
  const totalSeconds = Math.floor(diff / 1000);
  const dias = Math.floor(totalSeconds / 86_400);
  const horas = Math.floor((totalSeconds % 86_400) / 3_600);
  const segundos = totalSeconds % 60;
  return `Evento em ${dias}d ${horas}h ${segundos}s`;
}

function filterItems(items: EventItem[], tab: EventTab, query: string): EventItem[] {
  const q = normalizeText(query.trim());
  return items
    .filter((item) => {
      if (tab === 'abertos' && item.isPast) return false;
      if (tab === 'encerrados' && !item.isPast) return false;
      if (!q) return true;
      const text = normalizeText([item.title, item.description, item.local ?? ''].join(' '));
      return text.includes(q);
    })
    .sort((a, b) => {
      if (tab === 'abertos') return a.timestamp - b.timestamp;
      if (tab === 'encerrados') return b.timestamp - a.timestamp;

      // Aba "todos": abertos primeiro (mais proximos), depois encerrados (mais recentes).
      if (a.isPast !== b.isPast) return a.isPast ? 1 : -1;
      if (!a.isPast && !b.isPast) return a.timestamp - b.timestamp;
      return b.timestamp - a.timestamp;
    });
}

function renderCard(item: EventItem): string {
  const inscritos = item.limiteInscritos ? `${item.inscritosAtual}/${item.limiteInscritos}` : `${item.inscritosAtual}`;
  const canSubscribe = Boolean(item.inscricaoUrl) && !item.isPast;

  return `
    <article class="surface-card rounded-2xl overflow-hidden">
      <div class="relative h-44">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover ${item.isPast ? 'grayscale' : ''}" style="object-position:${item.imageFocusX}% ${item.imageFocusY}%;" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-cor-fundo/90 via-cor-fundo/45 to-transparent"></div>
        <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.1em] font-extrabold ${item.isPast ? 'bg-[#e11d48] text-white' : 'bg-[#24f08f]/18 text-[#8fffc8] border border-[#31f39a]/55'}">
          ${item.isPast ? 'Encerrado' : 'Aberto'}
        </span>
        <span class="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-cor-fundo/85 border border-cor-primaria/45 text-cor-primaria text-[11px] font-bold uppercase tracking-[0.08em]">
          ${escapeHtml(item.date)}${item.time ? ` • ${escapeHtml(item.time)}` : ''}
        </span>
      </div>
      <div class="p-5">
        <h3 class="text-cor-texto text-xl font-bold leading-tight">${escapeHtml(item.title)}</h3>
        <p class="mt-2 text-cor-texto/75 line-clamp-2">${escapeHtml(item.description)}</p>
        <p class="mt-2 text-cor-texto/75">${escapeHtml(item.local || 'Local a definir')}</p>

        ${item.limiteInscritos ? `
          <div class="mt-3 rounded-xl border border-[#8fffc8]/20 bg-cor-fundo/25 p-3 space-y-1.5">
            <p class="text-sm text-cor-texto/85">Inscritos <strong class="text-[#8fffc8]">${escapeHtml(inscritos)}</strong></p>
            ${item.inscricoesAteLabel ? `<p class="text-sm text-cor-texto/75">Inscricoes ate dia <strong>${escapeHtml(item.inscricoesAteLabel)}</strong></p>` : ''}
            <p class="text-sm font-bold text-[#8fffc8] tabular-nums" data-page-event-countdown data-deadline="${item.inscricoesAteTs ?? ''}">
              ${escapeHtml(formatCountdown(item.inscricoesAteTs))}
            </p>
          </div>
        ` : ''}

        <div class="mt-4 flex items-center justify-between gap-2">
          <span class="text-sm text-cor-primaria font-semibold">Ver detalhes →</span>
          ${canSubscribe
            ? `<a href="${escapeHtml(item.inscricaoUrl!)}" target="_blank" rel="noopener noreferrer" class="inline-flex h-10 items-center rounded-full bg-cor-primaria px-4 text-cor-escura text-sm font-bold hover:bg-cor-destaque transition-colors">Inscrever</a>`
            : `<span class="inline-flex h-10 items-center rounded-full border border-cor-texto/20 px-4 text-cor-texto/60 text-sm">${item.isPast ? 'Finalizado' : 'Sem inscricao'}</span>`}
        </div>
      </div>
    </article>
  `;
}

function renderGrid(items: EventItem[]): string {
  if (!items.length) return '<p class="text-cor-texto/70">Nenhum evento encontrado.</p>';
  return `<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">${items.map(renderCard).join('')}</div>`;
}

function renderToolbar(tab: EventTab, query: string): string {
  return `
    <div class="surface-card rounded-2xl p-4 mt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div class="inline-flex rounded-full border border-cor-texto/20 p-1 w-fit">
        <button data-events-tab="todos" class="px-3 py-1.5 rounded-full text-sm ${tab === 'todos' ? 'bg-cor-primaria text-cor-escura font-bold' : 'text-cor-texto/75'}">Todos</button>
        <button data-events-tab="abertos" class="px-3 py-1.5 rounded-full text-sm ${tab === 'abertos' ? 'bg-cor-primaria text-cor-escura font-bold' : 'text-cor-texto/75'}">Abertos</button>
        <button data-events-tab="encerrados" class="px-3 py-1.5 rounded-full text-sm ${tab === 'encerrados' ? 'bg-cor-primaria text-cor-escura font-bold' : 'text-cor-texto/75'}">Encerrados</button>
      </div>
      <input data-events-query type="search" value="${escapeHtml(query)}" placeholder="Buscar evento..." class="w-full md:w-[320px] h-11 rounded-xl bg-cor-fundo/60 border border-cor-texto/15 px-3 outline-none focus:border-cor-primaria/45">
    </div>
  `;
}

function bindCountdown(root: HTMLElement): number {
  const update = () => {
    root.querySelectorAll<HTMLElement>('[data-page-event-countdown]').forEach((node) => {
      const raw = node.getAttribute('data-deadline');
      const ts = raw ? Number(raw) : Number.NaN;
      node.textContent = formatCountdown(Number.isFinite(ts) ? ts : null);
    });
  };
  update();
  return window.setInterval(update, 1000);
}

export function EventsListPage() {
  return `
    <main class="min-h-screen bg-cor-fundo text-cor-texto py-20 md:py-24">
      <div class="max-w-7xl mx-auto px-6">
        <a data-route href="/" class="inline-flex items-center gap-2 text-cor-texto/70 hover:text-cor-primaria text-sm mb-8">← Voltar para home</a>
        <p class="text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Agenda completa</p>
        <h1 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-black">Todos os eventos</h1>
        <p class="mt-4 text-cor-texto/75 max-w-3xl">Lista completa de Eventos cadastrados.</p>

        <div data-events-toolbar></div>
        <div data-events-list class="mt-8">
          <p class="text-cor-texto/70">Carregando eventos...</p>
        </div>
      </div>
    </main>
  `;
}

export async function hydrateEventsListPage(prefetched?: EventItem[]) {
  const toolbarRoot = document.querySelector<HTMLElement>('[data-events-toolbar]');
  const listRoot = document.querySelector<HTMLElement>('[data-events-list]');
  if (!toolbarRoot || !listRoot) return;

  try {
    const source = prefetched ?? (await fetchEvents());
    let tab: EventTab = 'todos';
    let query = '';
    let timerId = -1;

    const rerender = () => {
      const filtered = filterItems(source, tab, query);
      toolbarRoot.innerHTML = renderToolbar(tab, query);
      listRoot.innerHTML = renderGrid(filtered);

      if (timerId !== -1) window.clearInterval(timerId);
      timerId = bindCountdown(listRoot);

      toolbarRoot.querySelectorAll<HTMLButtonElement>('[data-events-tab]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const value = btn.getAttribute('data-events-tab') as EventTab | null;
          if (!value) return;
          tab = value;
          rerender();
        });
      });

      const input = toolbarRoot.querySelector<HTMLInputElement>('[data-events-query]');
      input?.addEventListener('input', () => {
        query = input.value;
        rerender();
      });
    };

    rerender();
  } catch (error) {
    console.error('Erro ao carregar lista de eventos.', error);
    listRoot.innerHTML = '<p class="text-red-300/80 text-sm md:text-base">Nao foi possivel carregar os eventos agora.</p>';
  }
}
