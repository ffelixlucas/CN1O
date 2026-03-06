import { fetchEvents } from '../data/events';
import type { EventItem } from '../data/events';

const eventsMapBySection = new WeakMap<HTMLElement, Map<string, EventItem>>();

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function linkifyText(value: string): string {
  const escaped = escapeHtml(value);
  const withLinks = escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline decoration-cor-primaria/60 hover:text-cor-primaria break-all">$1</a>'
  );
  return withLinks.replace(/\n/g, '<br>');
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function getEventWhatsappHref(event: EventItem): string | null {
  if (event.whatsappUrl) return event.whatsappUrl;
  if (!event.telefoneContato) return null;
  return `https://wa.me/55${onlyDigits(event.telefoneContato)}`;
}

function toGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?q=${encodeURIComponent(address)}`;
}

function formatCountdown(inscricoesAteTs: number | null): string | null {
  if (!inscricoesAteTs || !Number.isFinite(inscricoesAteTs)) return null;
  const diff = Math.max(0, inscricoesAteTs - Date.now());
  if (diff <= 0) return 'encerrado';
  const totalSeconds = Math.floor(diff / 1000);
  const dias = Math.floor(totalSeconds / 86_400);
  const horas = Math.floor((totalSeconds % 86_400) / 3_600);
  const segundos = totalSeconds % 60;
  return `${dias}d ${horas}h ${segundos}s`;
}

function renderEventCard(event: EventItem, isNextEvent: boolean): string {
  const canSubscribe = Boolean(event.inscricaoUrl) && !event.isPast;
  const eventDateLabel = `${event.date}${event.time ? ` • ${event.time}` : ''}`;
  const countdown = formatCountdown(event.inscricoesAteTs);
  const showMeta = Boolean(event.inscricaoUrl) && Boolean(event.limiteInscritos);
  const inscritosLabel = event.limiteInscritos
    ? `${event.inscritosAtual}/${event.limiteInscritos}`
    : `${event.inscritosAtual}`;
  const inscricoesAteDia = event.inscricoesAteLabel
    ? event.inscricoesAteLabel.split('•')[0]?.trim() || event.inscricoesAteLabel
    : null;

  return `
    <article data-event-card data-event-id="${escapeHtml(event.id)}" class="surface-card flex-[0_0_88%] sm:flex-[0_0_72%] lg:flex-[0_0_calc(50%-0.75rem)] xl:flex-[0_0_calc(33.333%-1rem)] snap-start rounded-2xl overflow-hidden ${event.isPast ? 'opacity-85' : ''}">
      <div class="relative h-44 md:h-52">
        <img src="${escapeHtml(event.image)}" alt="${escapeHtml(event.title)}" class="w-full h-full object-cover ${event.isPast ? 'grayscale' : ''}" style="object-position:${event.imageFocusX}% ${event.imageFocusY}%;" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-cor-fundo/85 via-cor-fundo/30 to-transparent"></div>
        ${isNextEvent && !event.isPast
          ? `<div class="absolute top-3 left-3"><span class="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.12em] font-extrabold bg-cor-primaria/18 text-cor-primaria border border-cor-primaria/55">PROXIMO EVENTO</span></div>`
          : ''}
        <div class="absolute bottom-3 left-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cor-fundo/85 border border-cor-primaria/45 text-cor-primaria text-[11px] font-bold tracking-[0.1em] uppercase">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 3V6M16 3V6M4 9H20M5 5H19C19.5523 5 20 5.44772 20 6V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${escapeHtml(eventDateLabel)}
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <span class="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.12em] font-extrabold ${event.isPast ? 'bg-[#e11d48] text-white border border-white/70 shadow-[0_0_12px_rgba(225,29,72,0.65)]' : 'bg-[#24f08f]/18 text-[#8fffc8] border border-[#31f39a]/55 shadow-[0_0_12px_rgba(36,240,143,0.45)]'}">
            ${event.isPast ? 'Encerrado' : 'Aberto'}
          </span>
        </div>
      </div>

      <div class="p-5 md:p-6">
        <h3 class="text-cor-texto text-lg md:text-xl font-bold leading-tight">${escapeHtml(event.title)}</h3>
        <p class="mt-3 text-cor-texto/75 text-sm md:text-base leading-relaxed line-clamp-3">${linkifyText(event.description)}</p>
        <div class="mt-2 min-h-[16px] text-[11px]">
          ${showMeta
            ? `
              <div class="rounded-xl border border-[#8fffc8]/20 bg-cor-fundo/25 px-2.5 py-2 space-y-1.5">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-cor-texto/78">
                  <p>Inscritos <strong class="text-[#8fffc8]">${escapeHtml(inscritosLabel)}</strong></p>
                  ${inscricoesAteDia ? `<p>Inscricoes ate dia <strong class="text-cor-texto/90">${escapeHtml(inscricoesAteDia)}</strong></p>` : ''}
                  <p>Acontece em <strong class="text-cor-texto/90">${escapeHtml(eventDateLabel)}</strong></p>
                </div>
                <div class="flex justify-center">
                  <span class="inline-flex items-center rounded-full border border-[#8fffc8]/35 bg-cor-fundo/55 px-2 py-0.5 font-bold text-[#8fffc8] tabular-nums tracking-[0.04em]">
                    <span data-event-countdown data-deadline="${event.inscricoesAteTs || ''}">${escapeHtml(countdown ? `Evento em ${countdown}` : 'Evento encerrado')}</span>
                  </span>
                </div>
              </div>
            `
            : '<span class="block">&nbsp;</span>'}
        </div>

        <div class="mt-5 flex items-center gap-2">
          <button
            type="button"
            data-open-event
            data-event-id="${escapeHtml(event.id)}"
            class="inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm md:text-base hover:translate-x-1 transition-transform"
          >
            Ver detalhes
            <span>→</span>
          </button>

          ${canSubscribe
            ? `
            <a href="${escapeHtml(event.inscricaoUrl!)}" target="_blank" rel="noopener noreferrer" class="ml-auto inline-flex h-10 items-center gap-2 px-4 rounded-full bg-cor-primaria text-cor-escura text-xs md:text-sm font-bold hover:bg-cor-destaque transition-colors">
              Inscrever
            </a>
          `
            : `<span class="ml-auto inline-flex h-10 items-center rounded-full border border-cor-texto/20 px-4 text-cor-texto/60 text-xs md:text-sm">${event.isPast ? 'Evento finalizado' : 'Sem inscricao'}</span>`}
        </div>
      </div>
    </article>
  `;
}

function renderEvents(items: EventItem[]): string {
  if (items.length === 0) {
    return '<p class="text-cor-texto/70 text-sm md:text-base">Nenhum evento confirmado no momento.</p>';
  }

  const nextIndex = items.findIndex((item) => !item.isPast);

  return `
    <div class="relative">
      <div data-events-track class="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        ${items.map((event, index) => renderEventCard(event, nextIndex !== -1 && index === nextIndex)).join('')}
      </div>

      <div class="mt-5 flex items-center justify-center md:justify-end gap-2">
        <button type="button" data-events-prev class="inline-flex items-center justify-center w-10 h-10 rounded-full border border-cor-texto/25 bg-cor-fundo/70 text-cor-texto/90 hover:text-cor-primaria hover:border-cor-primaria/40 transition-colors" aria-label="Evento anterior">
          ❮
        </button>
        <button type="button" data-events-next class="inline-flex items-center justify-center w-10 h-10 rounded-full border border-cor-texto/25 bg-cor-fundo/70 text-cor-texto/90 hover:text-cor-primaria hover:border-cor-primaria/40 transition-colors" aria-label="Proximo evento">
          ❯
        </button>
      </div>
    </div>
  `;
}

function renderModal(event: EventItem): string {
  const canSubscribe = Boolean(event.inscricaoUrl) && !event.isPast;
  const hasAddress = Boolean(event.endereco);
  const body = event.fullDescription || event.description;
  const eventDateLabel = `${event.date}${event.time ? ` • ${event.time}` : ''}`;
  const whatsappHref = getEventWhatsappHref(event);

  return `
    <div data-event-modal class="fixed inset-0 z-[100] hidden">
      <div data-event-modal-backdrop class="absolute inset-0 bg-cor-fundo/88 backdrop-blur-sm"></div>
      <div class="relative z-10 mx-auto mt-8 md:mt-12 w-[94%] md:w-full max-w-3xl max-h-[86vh] overflow-y-auto rounded-3xl surface-card p-4 md:p-6">
        <button type="button" data-event-modal-close class="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full border border-cor-texto/20 text-cor-texto/70 hover:text-cor-primaria hover:border-cor-primaria/40 leading-none">
          <span aria-hidden="true">×</span>
        </button>

        <div class="rounded-2xl overflow-hidden">
          <img data-event-modal-image src="${escapeHtml(event.image)}" alt="${escapeHtml(event.title)}" class="w-full max-h-[320px] object-cover cursor-zoom-in" style="object-position:${event.imageFocusX}% ${event.imageFocusY}%;">
        </div>

        <div class="mt-4">
          <h3 class="text-cor-texto text-xl md:text-3xl font-black leading-tight">${escapeHtml(event.title)}</h3>
          <p class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cor-fundo/80 border border-cor-primaria/40 text-cor-primaria text-xs md:text-sm font-bold uppercase tracking-[0.12em]">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 3V6M16 3V6M4 9H20M5 5H19C19.5523 5 20 5.44772 20 6V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${escapeHtml(eventDateLabel)}
          </p>
          <p class="mt-4 text-cor-texto/85 text-sm md:text-base leading-relaxed">${linkifyText(body)}</p>

          <div class="mt-4 space-y-2 text-sm md:text-base text-cor-texto/85">
            ${event.local ? `<p><strong class="text-cor-primaria">Local:</strong> ${escapeHtml(event.local)}</p>` : ''}
            ${hasAddress ? `<p><strong class="text-cor-primaria">Endereco:</strong> <a href="${escapeHtml(toGoogleMapsUrl(event.endereco!))}" target="_blank" rel="noopener noreferrer" class="underline decoration-cor-primaria/60 hover:text-cor-primaria">${escapeHtml(event.endereco!)}</a></p>` : ''}
            ${whatsappHref ? `<p><strong class="text-cor-primaria">Contato:</strong> <a href="${escapeHtml(whatsappHref)}" target="_blank" rel="noopener noreferrer" class="hover:text-cor-primaria">${event.whatsappUrl ? 'Grupo de WhatsApp' : escapeHtml(event.telefoneContato || '')}</a></p>` : ''}
            ${event.inscricoesAteLabel ? `<p><strong class="text-cor-primaria">Inscricoes ate:</strong> ${escapeHtml(event.inscricoesAteLabel)}</p>` : ''}
            ${event.limiteInscritos ? `<p><strong class="text-cor-primaria">Limite de inscritos:</strong> ${event.limiteInscritos}</p>` : ''}
          </div>

          <div class="mt-5 flex flex-wrap items-center gap-3">
            ${canSubscribe
              ? `<a href="${escapeHtml(event.inscricaoUrl!)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cor-primaria text-cor-escura text-sm font-bold hover:bg-cor-destaque transition-colors">Fazer inscricao <span>→</span></a>`
              : `<span class="text-cor-texto/65 text-sm">${event.isPast ? 'Evento finalizado' : 'Evento sem inscricao obrigatoria'}</span>`}
          </div>
        </div>
      </div>
    </div>

    <div data-event-image-modal class="fixed inset-0 z-[120] hidden items-center justify-center p-4 bg-black/90">
      <button type="button" data-event-image-close class="absolute top-4 right-4 text-white/85 hover:text-white text-2xl">×</button>
      <img data-event-image-content src="${escapeHtml(event.image)}" alt="${escapeHtml(event.title)}" class="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl">
    </div>
  `;
}

function setupEventsSlider(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>('[data-events-track]');
  const prevBtn = section.querySelector<HTMLButtonElement>('[data-events-prev]');
  const nextBtn = section.querySelector<HTMLButtonElement>('[data-events-next]');
  if (!track || !prevBtn || !nextBtn) return;

  const getStep = () => Math.max(280, Math.floor(track.clientWidth * 0.9));
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -getStep(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: getStep(), behavior: 'smooth' }));
}

function setupCountdown(section: HTMLElement) {
  const update = () => {
    const nodes = section.querySelectorAll<HTMLElement>('[data-event-countdown]');
    nodes.forEach((node) => {
      const raw = node.getAttribute('data-deadline');
      const ts = raw ? Number(raw) : Number.NaN;
      if (!Number.isFinite(ts)) return;
      const label = formatCountdown(ts);
      node.textContent = label ? `Evento em ${label}` : 'Evento encerrado';
    });
  };

  update();
  const previous = section.dataset.eventsCountdownInterval;
  if (previous) {
    window.clearInterval(Number(previous));
  }
  const intervalId = window.setInterval(update, 1_000);
  section.dataset.eventsCountdownInterval = String(intervalId);
}

function setupEventModal(section: HTMLElement, eventsById: Map<string, EventItem>) {
  const renderRoot = section.querySelector<HTMLElement>('[data-event-modal-root]');
  if (!renderRoot) return;
  eventsMapBySection.set(section, eventsById);

  const closeModal = () => {
    const modal = renderRoot.querySelector<HTMLElement>('[data-event-modal]');
    const zoomModal = renderRoot.querySelector<HTMLElement>('[data-event-image-modal]');
    if (modal) modal.classList.add('hidden');
    if (zoomModal) {
      zoomModal.classList.add('hidden');
      zoomModal.classList.remove('flex');
    }
    document.body.classList.remove('overflow-hidden');
  };

  const openModal = (eventItem: EventItem) => {
    renderRoot.innerHTML = renderModal(eventItem);
    const modal = renderRoot.querySelector<HTMLElement>('[data-event-modal]');
    const image = renderRoot.querySelector<HTMLImageElement>('[data-event-modal-image]');
    const zoomModal = renderRoot.querySelector<HTMLElement>('[data-event-image-modal]');
    const zoomImage = renderRoot.querySelector<HTMLImageElement>('[data-event-image-content]');
    const zoomClose = renderRoot.querySelector<HTMLElement>('[data-event-image-close]');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    image?.addEventListener('click', () => {
      if (!zoomModal || !zoomImage) return;
      zoomImage.src = image.src;
      zoomModal.classList.remove('hidden');
      zoomModal.classList.add('flex');
    });

    zoomClose?.addEventListener('click', () => {
      if (!zoomModal) return;
      zoomModal.classList.add('hidden');
      zoomModal.classList.remove('flex');
    });

    zoomModal?.addEventListener('click', (evt) => {
      if (evt.target === zoomModal) {
        zoomModal.classList.add('hidden');
        zoomModal.classList.remove('flex');
      }
    });
  };

  const onClick = (evt: Event) => {
    const target = evt.target as Element | null;
    if (!target) return;

    const close = target.closest('[data-event-modal-close], [data-event-modal-backdrop]');
    if (close) {
      closeModal();
      return;
    }

    const trigger = target.closest<HTMLElement>('[data-open-event], [data-event-card]');
    if (!trigger) return;

    if (target.closest('a')) return;

    const eventId = trigger.getAttribute('data-event-id');
    if (!eventId) return;
    const activeMap = eventsMapBySection.get(section);
    if (!activeMap) return;
    const eventItem = activeMap.get(eventId);
    if (!eventItem) return;
    openModal(eventItem);
  };

  const onEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  };

  if (section.dataset.eventsModalBound === '1') return;
  section.dataset.eventsModalBound = '1';
  section.addEventListener('click', onClick);
  document.addEventListener('keydown', onEsc);
}

export function EventsSection() {
  return `
    <section id="eventos" class="relative py-24 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-10 md:mb-12">
          <div class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span class="block text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Proximos eventos</span>
          <h2 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight">AGENDA CULTURAL</h2>
          <p class="mt-4 text-cor-texto/70 text-base md:text-lg max-w-2xl">
            Eventos, rodas e encontros especiais para fortalecer a comunidade.
          </p>
          <a
            data-route
            href="/eventos"
            class="mt-4 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm md:text-base hover:translate-x-1 transition-transform"
          >
            Ver todos eventos
            <span>→</span>
          </a>
        </div>

        <div data-events-root>
          <p class="text-cor-texto/70 text-sm md:text-base">Carregando eventos...</p>
        </div>
        <div data-event-modal-root></div>
      </div>
    </section>
  `;
}

export async function hydrateEventsSection() {
  const section = document.querySelector<HTMLElement>('#eventos');
  const root = section?.querySelector<HTMLElement>('[data-events-root]');
  if (!section || !root) return;

  const events = await fetchEvents();
  root.innerHTML = renderEvents(events);
  setupEventsSlider(section);
  setupCountdown(section);
  setupEventModal(section, new Map(events.map((event) => [event.id, event])));
}
