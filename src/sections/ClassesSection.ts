// sections/ClassesSection.ts
import {
  fetchOrganizationContact,
  normalizeWhatsappNumber
} from '../data/organization';

type ApiClassItem = {
  id: number;
  turma: string;
  dias: string;
  horario: string;
  faixa_etaria?: string | null;
  idade_min?: number | null;
  idade_max?: number | null;
};

type ClassGroup = {
  turma: string;
  faixaEtaria: string | null;
  idadeMin: number | null;
  idadeMax: number | null;
  horarios: Array<{
    dias: string[];
    horario: string;
  }>;
};

const TURMA_ORDER = ['INFANTIL', 'JUVENIL', 'ADULTOS'] as const;
const WEEKDAY_ORDER = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'] as const;
const WHATSAPP_NUMBER_FALLBACK = import.meta.env.VITE_WHATSAPP_NUMBER || '5541999644301';

function normalizeTurmaName(turma: string): string {
  return turma.trim().toUpperCase();
}

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getWeekdayIndex(day: string): number {
  const normalizedDay = normalizeText(day);
  const index = WEEKDAY_ORDER.indexOf(normalizedDay as (typeof WEEKDAY_ORDER)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function sortDays(days: string[]): string[] {
  return [...days].sort((a, b) => getWeekdayIndex(a) - getWeekdayIndex(b));
}

function formatDayLabel(day: string): string {
  const normalized = normalizeText(day);
  const labels: Record<string, string> = {
    segunda: 'Segundas',
    terca: 'Terças',
    quarta: 'Quartas',
    quinta: 'Quintas',
    sexta: 'Sextas',
    sabado: 'Sábados',
    domingo: 'Domingos'
  };

  return labels[normalized] ?? day;
}

function formatDaysForUx(days: string[]): string {
  const labels = days.map(formatDayLabel);
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0].toLowerCase();
  if (labels.length === 2) return `${labels[0].toLowerCase()} e ${labels[1].toLowerCase()}`;

  return `${labels.slice(0, -1).map((label) => label.toLowerCase()).join(', ')} e ${labels[labels.length - 1].toLowerCase()}`;
}

function parseStartMinutes(horario: string): number {
  const match = horario.match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return (hours * 60) + minutes;
}

function formatHorario(horario: string): string {
  return horario.replace(/\s*-\s*/g, ' as ');
}

function formatFaixaEtaria(aula: ClassGroup): string | null {
  if (aula.faixaEtaria && aula.faixaEtaria.trim()) {
    const faixa = aula.faixaEtaria.trim();
    const normalized = normalizeText(faixa);

    if (/\banos?\b/.test(normalized)) return faixa;
    if (/^\d+\s*\+\s*$/.test(faixa)) return `${faixa.replace(/\s+/g, '')} anos`;
    if (/^\d+\s*a\s*\d+$/.test(normalized)) return `${faixa} anos`;
    if (/^\d+$/.test(normalized)) return `${faixa} anos`;

    return faixa;
  }
  if (aula.idadeMin != null && aula.idadeMax != null) return `${aula.idadeMin} a ${aula.idadeMax} anos`;
  if (aula.idadeMin != null) return `${aula.idadeMin}+ anos`;
  if (aula.idadeMax != null) return `ate ${aula.idadeMax} anos`;
  return null;
}

function formatTurmaLabel(turma: string): string {
  const lower = turma.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function formatScheduleSummary(aula: ClassGroup): string {
  return aula.horarios
    .map((slot) => `${formatDaysForUx(slot.dias)} (${formatHorario(slot.horario)})`)
    .join('; ');
}

function groupClassesByTurma(items: ApiClassItem[]): ClassGroup[] {
  const groupedMap = new Map<
    string,
    {
      faixaEtaria: string | null;
      idadeMin: number | null;
      idadeMax: number | null;
      horariosByTurma: Map<string, Set<string>>;
    }
  >();

  for (const item of items) {
    const turma = normalizeTurmaName(item.turma);
    const group =
      groupedMap.get(turma) ??
      {
        faixaEtaria: item.faixa_etaria?.trim() || null,
        idadeMin: item.idade_min ?? null,
        idadeMax: item.idade_max ?? null,
        horariosByTurma: new Map<string, Set<string>>()
      };
    const daysForHorario = group.horariosByTurma.get(item.horario) ?? new Set<string>();

    daysForHorario.add(item.dias.trim());
    group.horariosByTurma.set(item.horario, daysForHorario);

    if (!group.faixaEtaria && item.faixa_etaria?.trim()) group.faixaEtaria = item.faixa_etaria.trim();
    if (group.idadeMin == null && item.idade_min != null) group.idadeMin = item.idade_min;
    if (group.idadeMax == null && item.idade_max != null) group.idadeMax = item.idade_max;

    groupedMap.set(turma, group);
  }

  return Array.from(groupedMap.entries())
    .map(([turma, group]) => {
      const horarios = Array.from(group.horariosByTurma.entries())
        .map(([horario, daysSet]) => ({ horario, dias: sortDays(Array.from(daysSet)) }))
        .sort((a, b) => {
          const dayDiff = getWeekdayIndex(a.dias[0] ?? '') - getWeekdayIndex(b.dias[0] ?? '');
          if (dayDiff !== 0) return dayDiff;
          return parseStartMinutes(a.horario) - parseStartMinutes(b.horario);
        });

      return {
        turma,
        faixaEtaria: group.faixaEtaria,
        idadeMin: group.idadeMin,
        idadeMax: group.idadeMax,
        horarios
      };
    })
    .sort((a, b) => {
      const aIndex = TURMA_ORDER.indexOf(a.turma as (typeof TURMA_ORDER)[number]);
      const bIndex = TURMA_ORDER.indexOf(b.turma as (typeof TURMA_ORDER)[number]);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return a.turma.localeCompare(b.turma, 'pt-BR');
    });
}

function renderCards(items: ClassGroup[]): string {
  if (items.length === 0) {
    return `
      <p class="col-span-full text-cor-texto/70 text-sm md:text-base">
        Nenhum horario disponivel no momento.
      </p>
    `;
  }

  return items
    .map(
      (aula) => `
            <article
              data-anim="class-card"
              class="surface-card group relative rounded-3xl p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-cor-primaria/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div class="relative">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-cor-primaria text-cor-escura rounded-full text-[11px] md:text-xs font-extrabold mb-3 uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 rounded-full bg-cor-escura"></span>
                  ${formatTurmaLabel(aula.turma)}
                </div>

                ${formatFaixaEtaria(aula) ? `
                  <p class="text-cor-texto/70 text-xs md:text-sm mt-1 mb-4">
                    Faixa etaria: <span class="text-cor-texto/90 font-semibold">${formatFaixaEtaria(aula)}</span>
                  </p>
                ` : ''}

                <div class="border-t border-cor-texto/15 pt-4 space-y-2.5">
                  ${aula.horarios
                    .map(
                      (slot) => `
                        <div class="surface-card-soft rounded-xl px-3 py-2.5">
                          <div class="flex flex-col gap-1.5">
                            <p class="text-cor-texto/55 text-[11px] uppercase tracking-wider">Dias</p>
                            <p class="text-cor-texto/90 text-sm md:text-base font-medium">${formatDaysForUx(slot.dias)}</p>
                          </div>
                          <div class="mt-2 flex flex-col gap-1">
                            <p class="text-cor-texto/55 text-[11px] uppercase tracking-wider">Horario</p>
                            <p class="text-cor-primaria font-bold text-sm md:text-base">${formatHorario(slot.horario)}</p>
                          </div>
                        </div>
                      `
                    )
                    .join('')}
                </div>

                <button
                  type="button"
                  data-agendar-btn
                  data-turma="${escapeAttribute(formatTurmaLabel(aula.turma))}"
                  data-faixa-etaria="${escapeAttribute(formatFaixaEtaria(aula) ?? '')}"
                  data-horarios="${escapeAttribute(formatScheduleSummary(aula))}"
                  class="mt-5 inline-flex items-center gap-2 text-cor-primaria font-semibold text-sm md:text-base transition-transform duration-300 group-hover:translate-x-1"
                >
                  Quero agendar
                  <span>→</span>
                </button>
              </div>
            </article>
          `
    )
    .join('');
}

export function ClassesSection() {
  return `
    <section id="aulas" data-anim="classes" class="relative py-24 md:py-32 bg-cor-fundo">
      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-12 md:mb-16">
          <div data-anim="classes-line" class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span data-anim="classes-kicker" class="block text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">
            Nossas Aulas
          </span>
          <h2 data-anim="classes-title" class="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight">
            HORARIOS
          </h2>
          <p data-anim="classes-subtitle" class="mt-4 text-cor-texto/70 text-base md:text-lg max-w-2xl">
            Escolha a turma que  se encaixa com sua idade!
          </p>
        </div>

        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <div data-classes-grid class="contents">
            <p class="col-span-full text-cor-texto/70 text-sm md:text-base">Carregando horarios...</p>
          </div>
        </div>

        <div data-anim="classes-footnote" class="text-center mt-12 md:mt-14">
          <p class="text-cor-texto/55 text-xs md:text-sm tracking-wide uppercase">
            Aula experimental gratuita para novos alunos
          </p>
        </div>

        <div data-schedule-modal class="hidden fixed inset-0 z-[80] p-0 md:p-6">
          <div data-schedule-backdrop class="absolute inset-0 bg-cor-fundo/85 backdrop-blur-sm"></div>
          <div class="surface-card relative w-full max-w-2xl mx-auto mt-16 md:mt-10 rounded-t-3xl md:rounded-3xl shadow-2xl p-4 md:p-7 max-h-[86vh] md:max-h-[88vh] overflow-y-auto pb-[max(env(safe-area-inset-bottom),1rem)]">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">Agendamento rapido</p>
                <h3 class="text-cor-texto text-lg md:text-2xl font-black mt-2">Enviar mensagem no WhatsApp</h3>
              </div>
              <button type="button" data-schedule-close class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-cor-texto/20 text-cor-texto/70 hover:text-cor-primaria hover:border-cor-primaria/40 leading-none">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <form data-schedule-form class="mt-4 md:mt-5 space-y-4">
              <p class="text-cor-texto/80 text-sm">
                Turma selecionada:
                <span data-schedule-turma class="font-semibold text-cor-texto"></span>
              </p>

              <div>
                <label for="schedule-name" class="block text-cor-texto/70 text-xs md:text-sm uppercase tracking-wider mb-1.5">
                  Nome do aluno(a) (opcional)
                </label>
                <input
                  id="schedule-name"
                  data-schedule-name
                  type="text"
                  maxlength="80"
                  class="w-full rounded-xl border border-cor-texto/15 bg-cor-fundo/55 text-cor-texto text-sm md:text-base p-3 focus:outline-none focus:border-cor-primaria"
                  placeholder="Ex.: Maria"
                />
              </div>

              <div>
                <label for="schedule-age" class="block text-cor-texto/70 text-xs md:text-sm uppercase tracking-wider mb-1.5">
                  Idade do aluno(a)
                </label>
                <input
                  id="schedule-age"
                  data-schedule-age
                  type="number"
                  inputmode="numeric"
                  min="2"
                  max="90"
                  required
                  class="w-full rounded-xl border border-cor-texto/15 bg-cor-fundo/55 text-cor-texto text-sm md:text-base p-3 focus:outline-none focus:border-cor-primaria"
                  placeholder="Ex.: 10"
                />
              </div>

              <div class="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button type="button" data-schedule-close class="px-5 py-3 rounded-full border border-cor-texto/20 text-cor-texto/80 text-sm md:text-base hover:border-cor-primaria hover:text-cor-primaria transition-colors">
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cor-primaria text-cor-escura font-bold text-sm md:text-base hover:bg-cor-destaque transition-colors"
                >
                  Pedir aula experimental
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function setupScheduleModal() {
  const section = document.querySelector<HTMLElement>('#aulas');
  if (!section || section.dataset.scheduleModalBound === '1') return;
  section.dataset.scheduleModalBound = '1';

  const modal = section.querySelector<HTMLElement>('[data-schedule-modal]');
  const turmaEl = section.querySelector<HTMLElement>('[data-schedule-turma]');
  const formEl = section.querySelector<HTMLFormElement>('[data-schedule-form]');
  const nameEl = section.querySelector<HTMLInputElement>('[data-schedule-name]');
  const ageEl = section.querySelector<HTMLInputElement>('[data-schedule-age]');
  if (!modal || !turmaEl || !formEl || !nameEl || !ageEl) return;

  const whatsappNumber = normalizeWhatsappNumber(
    section.dataset.whatsappNumber || WHATSAPP_NUMBER_FALLBACK
  );
  let currentPayload: { turma: string; faixaEtaria: string; horarios: string } | null = null;

  const openWhatsapp = (message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    formEl.reset();
  };

  const openModal = (payload: { turma: string; faixaEtaria: string; horarios: string }) => {
    currentPayload = payload;
    turmaEl.textContent = payload.turma;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    nameEl.focus({ preventScroll: true });
  };

  section.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;

    const closeBtn = target.closest('[data-schedule-close], [data-schedule-backdrop]');
    if (closeBtn) {
      closeModal();
      return;
    }

    const trigger = target.closest<HTMLButtonElement>('[data-agendar-btn]');
    if (!trigger) return;

    openModal({
      turma: trigger.dataset.turma ?? 'Turma',
      faixaEtaria: trigger.dataset.faixaEtaria ?? '',
      horarios: trigger.dataset.horarios ?? ''
    });
  });

  formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!currentPayload) return;

    const age = Number(ageEl.value);
    if (!Number.isFinite(age) || age < 2 || age > 90) {
      ageEl.focus();
      return;
    }

    const name = nameEl.value.trim();
    const message = [
      'Ola! Tudo bem?',
      `Gostaria de agendar uma aula experimental para a turma ${currentPayload.turma}.`,
      `Idade do aluno(a): ${age} anos.`,
      name ? `Nome do aluno(a): ${name}.` : '',
      currentPayload.horarios ? `Horarios da turma: ${currentPayload.horarios}.` : ''
    ]
      .filter(Boolean)
      .join('\n');

    openWhatsapp(message);
    closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

export async function hydrateClassesSection() {
  const aulasSection = document.querySelector<HTMLElement>('#aulas');
  if (aulasSection) {
    const apiContact = await fetchOrganizationContact();
    aulasSection.dataset.whatsappNumber = apiContact?.whatsappNumber || normalizeWhatsappNumber(WHATSAPP_NUMBER_FALLBACK);
  }

  setupScheduleModal();

  const grid = document.querySelector<HTMLElement>('[data-classes-grid]');
  if (!grid) return;

  const apiUrl = import.meta.env.VITE_CLASSES_API_URL;
  if (!apiUrl) {
    grid.innerHTML = `
      <p class="col-span-full text-red-300/80 text-sm md:text-base">
        URL da API nao configurada.
      </p>
    `;
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar horarios: ${response.status}`);
    }

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) {
      throw new Error('Resposta da API de horarios nao e uma lista');
    }

    const parsedItems = data.filter((item): item is ApiClassItem => {
      if (typeof item !== 'object' || item === null) return false;
      const record = item as Record<string, unknown>;
      return (
        typeof record.id === 'number' &&
        typeof record.turma === 'string' &&
        typeof record.dias === 'string' &&
        typeof record.horario === 'string' &&
        (record.faixa_etaria == null || typeof record.faixa_etaria === 'string') &&
        (record.idade_min == null || typeof record.idade_min === 'number') &&
        (record.idade_max == null || typeof record.idade_max === 'number')
      );
    });

    if (parsedItems.length === 0) {
      grid.innerHTML = renderCards([]);
      return;
    }

    const groupedItems = groupClassesByTurma(parsedItems);
    grid.innerHTML = renderCards(groupedItems);
  } catch (error) {
    console.error('Erro ao carregar horarios da API.', error);
    grid.innerHTML = `
      <p class="col-span-full text-red-300/80 text-sm md:text-base">
        Nao foi possivel carregar os horarios agora.
      </p>
    `;
  }
}
