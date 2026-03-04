import {
  fetchOrganizationContact,
  normalizeWhatsappNumber
} from '../data/organization';

const DEFAULT_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '5541999644301';

function buildDefaultMessage() {
  return encodeURIComponent('Ola! Vim pelo site e gostaria de mais informaçoẽs!');
}

function buildWhatsappUrl(number: string): string {
  return `https://wa.me/${number}?text=${buildDefaultMessage()}`;
}

function getOrCreateFloatingButton(): HTMLAnchorElement {
  let button = document.querySelector<HTMLAnchorElement>('[data-floating-whatsapp]');
  if (button) return button;

  button = document.createElement('a');
  button.setAttribute('data-floating-whatsapp', '1');
  button.setAttribute('target', '_blank');
  button.setAttribute('rel', 'noopener noreferrer');
  button.setAttribute('aria-label', 'Falar no WhatsApp');
  button.className = [
    'fixed right-4 bottom-5 md:bottom-6 z-[90]',
    'group inline-flex items-center justify-center w-14 h-14 rounded-full',
    'bg-[#25D366] text-white shadow-[0_16px_34px_rgba(37,211,102,0.38)]',
    'border border-white/30 transition-all duration-300 hover:scale-105',
    'focus:outline-none focus:ring-2 focus:ring-[#25D366]/45'
  ].join(' ');

  button.innerHTML = `
    <span class="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-md animate-pulse"></span>
    <svg class="relative w-7 h-7" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7c0 39.1 10.2 77.3 29.6 111L0 480l118.7-31.1c32.6 17.8 69.4 27.2 107.4 27.2h.1c122.3 0 221.7-99.3 221.7-221.7c0-59.3-23.1-115-65-157M223.9 438.7h-.1c-33.2 0-65.7-8.9-94-25.6l-6.7-4l-70.4 18.5l18.8-68.7l-4.3-7.1c-18.5-29.4-28.2-63.4-28.2-98.3c0-102.6 83.5-186.1 186.1-186.1c49.7 0 96.4 19.4 131.5 54.6c35.1 35.1 54.5 81.9 54.5 131.5c-.1 102.7-83.6 186.2-186.2 186.2m101.5-138.2c-5.5-2.8-32.8-16.1-37.9-17.9c-5.1-1.9-8.8-2.8-12.5 2.8c-3.7 5.6-14.3 17.9-17.5 21.6c-3.2 3.7-6.5 4.2-12 1.4c-32.6-16.3-54-29.1-75.4-66c-5.7-9.8 5.7-9.1 16.3-30.3c1.8-3.7 .9-6.9-.5-9.7c-1.4-2.8-12.5-30.2-17.1-41.3c-4.5-10.8-9.1-9.3-12.5-9.5c-3.2-.2-6.9-.2-10.6-.2c-3.7 0-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3c0 27.3 19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.8 94.8 83.8c35.2 15.2 49 16.5 66.7 14c10.8-1.6 32.8-13.4 37.4-26.3c4.6-12.9 4.6-24 3.2-26.3c-1.3-2.4-5-3.8-10.5-6.6"/>
    </svg>
    <span class="hidden md:inline-block absolute right-16 whitespace-nowrap rounded-full bg-cor-fundo/95 border border-cor-texto/15 text-cor-texto text-xs font-semibold px-3 py-1.5 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
      Fale conosco
    </span>
  `;

  document.body.appendChild(button);
  return button;
}

export async function initFloatingWhatsApp() {
  const button = getOrCreateFloatingButton();
  const fallbackNumber = normalizeWhatsappNumber(DEFAULT_WHATSAPP);
  button.href = buildWhatsappUrl(fallbackNumber);

  const contact = await fetchOrganizationContact();
  const resolved = contact?.whatsappNumber || fallbackNumber;
  button.href = buildWhatsappUrl(resolved);
}
