import { STUDENT_PORTAL_LINK, MATRICULA_LINK } from '../data/constants';

const DIALOG_TITLE_ID = 'student-portal-dialog-title';
const DIALOG_DESC_ID = 'student-portal-dialog-desc';

let lastFocusedElement: HTMLElement | null = null;

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function getOrCreateFloatingButton(): HTMLAnchorElement {
  let button = document.querySelector<HTMLAnchorElement>('[data-floating-student-portal]');
  if (button) return button;

  button = document.createElement('a');
  button.setAttribute('data-floating-student-portal', '1');
  button.setAttribute('target', '_blank');
  button.setAttribute('rel', 'noopener noreferrer');
  button.setAttribute('aria-label', 'Acessar área do aluno');
  button.setAttribute('aria-haspopup', 'dialog');
  // Posicionado logo acima do botão de WhatsApp (w-14/h-14) para nao se sobrepor em mobile.
  // Mais compacto e discreto no mobile (44px) que o WhatsApp (56px); cresce levemente no desktop.
  button.className = [
    'fixed right-[1.125rem] bottom-[calc(max(env(safe-area-inset-bottom),1rem)+4.45rem)] md:right-5 md:bottom-[5.75rem] z-[90]',
    'group inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full',
    'bg-cor-fundo/90 text-cor-primaria shadow-[0_6px_16px_rgba(0,0,0,0.22)]',
    'border border-cor-primaria/45 transition-transform duration-200 hover:scale-105',
    'focus:outline-none focus:ring-2 focus:ring-cor-primaria/40'
  ].join(' ');

  button.innerHTML = `
    <svg class="relative w-5 h-5 md:w-6 md:h-6" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
    </svg>
    <span class="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-cor-fundo/80 px-2 py-0.5 text-[10px] font-semibold leading-none text-cor-primaria/90 shadow-[0_4px_10px_rgba(0,0,0,0.18)] md:hidden">
      Área do aluno
    </span>
    <span class="hidden md:inline-block absolute right-14 whitespace-nowrap rounded-full bg-cor-fundo/95 border border-cor-texto/15 text-cor-texto text-xs font-semibold px-3 py-1.5 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
      Área do aluno
    </span>
  `;

  document.body.appendChild(button);
  return button;
}

function getModal(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-student-portal-modal]');
}

function closeModal() {
  const modal = getModal();
  if (!modal) return;
  modal.remove();
  document.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('overflow-hidden');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
  }
}

function openModal() {
  if (getModal()) return;
  lastFocusedElement = document.activeElement as HTMLElement | null;

  const overlay = document.createElement('div');
  overlay.setAttribute('data-student-portal-modal', '1');
  overlay.className = [
    'fixed inset-0 z-[100] flex items-center justify-center',
    'bg-black/55 backdrop-blur-[1px] px-4'
  ].join(' ');

  overlay.innerHTML = `
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="${DIALOG_TITLE_ID}"
      aria-describedby="${DIALOG_DESC_ID}"
      tabindex="-1"
      data-student-portal-panel
      class="relative w-full max-w-sm bg-cor-fundo text-cor-texto border border-cor-primaria/25 shadow-[0_20px_50px_rgba(0,0,0,0.45)] rounded-2xl p-5"
    >
      <button
        type="button"
        data-student-portal-close
        aria-label="Fechar confirmação"
        class="absolute right-3 top-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-cor-texto/70 hover:text-cor-texto hover:bg-cor-texto/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cor-primaria/40"
      >
        <svg class="w-5 h-5" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </button>

      <h2 id="${DIALOG_TITLE_ID}" class="text-lg font-bold text-cor-primaria pr-8">
        Você já é aluno?
      </h2>
      <p id="${DIALOG_DESC_ID}" class="mt-2 text-sm text-cor-texto/80">
        A área do aluno é para quem já possui matrícula na CN10.
      </p>

      <div class="mt-5 flex flex-col gap-2.5">
        <button
          type="button"
          data-student-portal-confirm
          class="inline-flex items-center justify-center min-h-[44px] w-full rounded-full bg-cor-primaria text-cor-fundo font-semibold px-4 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cor-primaria/50"
        >
          Sim, acessar painel
        </button>
        <button
          type="button"
          data-student-portal-enroll
          class="inline-flex items-center justify-center min-h-[44px] w-full rounded-full bg-transparent border border-cor-primaria/45 text-cor-primaria font-semibold px-4 transition-colors hover:bg-cor-primaria/10 focus:outline-none focus:ring-2 focus:ring-cor-primaria/40"
        >
          Ainda não sou aluno
        </button>
      </div>
    </div>
  `;

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  const panel = overlay.querySelector<HTMLElement>('[data-student-portal-panel]');
  const closeBtn = overlay.querySelector<HTMLButtonElement>('[data-student-portal-close]');
  const confirmBtn = overlay.querySelector<HTMLButtonElement>('[data-student-portal-confirm]');
  const enrollBtn = overlay.querySelector<HTMLButtonElement>('[data-student-portal-enroll]');

  closeBtn?.addEventListener('click', closeModal);
  confirmBtn?.addEventListener('click', () => {
    openExternal(STUDENT_PORTAL_LINK);
    closeModal();
  });
  enrollBtn?.addEventListener('click', () => {
    openExternal(MATRICULA_LINK);
    closeModal();
  });

  document.body.appendChild(overlay);
  document.body.classList.add('overflow-hidden');
  document.addEventListener('keydown', onKeydown);

  // Foco inicial no botão principal (fallback para o painel).
  (confirmBtn ?? panel)?.focus();
}

export function initFloatingStudentPortal() {
  const button = getOrCreateFloatingButton();
  button.href = STUDENT_PORTAL_LINK;

  if (button.dataset.bound === '1') return;
  button.dataset.bound = '1';
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
}
