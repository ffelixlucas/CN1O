import { EVENTS } from '../data/constants';

export function EventsSection() {
  return `
    <section id="eventos" class="py-24 px-6 bg-gradient-to-br from-emerald-950 to-emerald-900 text-white overflow-hidden">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-yellow-300 tracking-wide animate-on-scroll">
          Próximos Eventos
        </h2>
        <div class="grid md:grid-cols-3 gap-10">
          ${EVENTS.map((event, index) => `
            <div class="event-card bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div class="relative overflow-hidden">
                <img src="${event.image}" 
                     class="w-full h-56 object-contain bg-neutral-100 transition-transform duration-700 hover:scale-110" 
                     alt="${event.title}"
                     loading="lazy">
                <div class="absolute inset-0 bg-yellow-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-6 flex flex-col gap-4">
                <div class="text-yellow-600 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
                  <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  ${event.date}
                </div>
                <h3 class="text-xl font-bold">${event.title}</h3>
                <p class="text-neutral-600 text-sm leading-relaxed">${event.description}</p>
                <button class="mt-auto text-emerald-700 font-semibold hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                  Ver detalhes 
                  <span class="text-xl">→</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
