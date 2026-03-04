import { EVENTS } from '../data/constants';

type EventItem = {
  id: number;
  date: string;
  time?: string;
  title: string;
  description: string;
  image: string;
  inscricaoUrl?: string;
};

function renderEventCard(event: EventItem): string {
  return `
    <article class="min-w-[84%] sm:min-w-[70%] md:min-w-0 snap-start rounded-2xl border border-cor-texto/10 bg-cor-secundaria/30 overflow-hidden">
      <div class="relative h-44 md:h-52">
        <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-cor-fundo/85 via-cor-fundo/30 to-transparent"></div>
        <div class="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
          <span class="px-2.5 py-1 rounded-full bg-cor-primaria text-cor-escura font-bold">${event.date}</span>
          ${event.time ? `<span class="px-2.5 py-1 rounded-full bg-cor-fundo/75 text-cor-texto/80">${event.time}</span>` : ''}
        </div>
      </div>

      <div class="p-5 md:p-6">
        <h3 class="text-cor-texto text-lg md:text-xl font-bold leading-tight">${event.title}</h3>
        <p class="mt-3 text-cor-texto/75 text-sm md:text-base leading-relaxed line-clamp-3">${event.description}</p>
        ${event.inscricaoUrl
          ? `
          <a href="${event.inscricaoUrl}" class="mt-5 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm md:text-base hover:translate-x-1 transition-transform">
            Fazer inscricao
            <span>→</span>
          </a>
        `
          : `
          <span class="mt-5 inline-flex items-center gap-2 text-cor-texto/65 text-sm md:text-base">
            Evento sem inscricao obrigatoria
          </span>
        `}
      </div>
    </article>
  `;
}

export function EventsSection() {
  const hasEvents = EVENTS.length > 0;

  return `
    <section id="eventos" class="relative py-24 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-b from-cor-fundo via-cor-fundo to-cor-secundaria/20"></div>
        <div class="absolute -top-12 right-0 w-72 h-72 rounded-full bg-cor-primaria/10 blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-10 md:mb-12">
          <div class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span class="block text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Proximos eventos</span>
          <h2 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight">AGENDA CULTURAL</h2>
          <p class="mt-4 text-cor-texto/70 text-base md:text-lg max-w-2xl">
            Eventos, rodas e encontros especiais para fortalecer a comunidade.
          </p>
        </div>

        ${
          hasEvents
            ? `
          <div class="flex gap-4 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2">
            ${EVENTS.map((event) => renderEventCard(event)).join('')}
          </div>
        `
            : `
          <p class="text-cor-texto/70 text-sm md:text-base">Nenhum evento confirmado no momento.</p>
        `
        }
      </div>
    </section>
  `;
}
