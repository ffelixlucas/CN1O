import { NAV_LINKS, STORE_LINK } from '../data/constants';
import { fetchOrganizationProfile } from '../data/organization';

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function toGmailComposeUrl(email: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

export function Footer() {
  const sectionLinks = NAV_LINKS.filter((link) => link.href.startsWith('#'));
  const currentYear = new Date().getFullYear();

  return `
    <footer class="relative bg-cor-fundo border-t border-cor-texto/10 py-14 md:py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-10">
          <div class="space-y-4">
            <img src="/media/logo.png" class="h-14" alt="Capoeira Nota 10">
            <p data-footer-tagline class="text-cor-texto/65 text-sm leading-relaxed">
              Arte, cultura e transformacao social atraves da capoeira.
            </p>
          </div>

          <div>
            <h4 class="text-cor-primaria text-xs uppercase tracking-[0.16em] font-semibold mb-4">Navegacao</h4>
            <ul class="space-y-2 text-sm text-cor-texto/70">
              ${sectionLinks
                .map((link) => `<li><a href="${link.href}" class="hover:text-cor-primaria transition-colors">${link.label}</a></li>`)
                .join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-cor-primaria text-xs uppercase tracking-[0.16em] font-semibold mb-4">Acessos</h4>
            <ul class="space-y-2 text-sm text-cor-texto/70">
              <li><a href="${STORE_LINK}" class="hover:text-cor-primaria transition-colors">Loja online</a></li>
              <li><a data-footer-pre-matricula href="https://capoeira-base.vercel.app/matricula/cn10" class="hover:text-cor-primaria transition-colors">Pre-matricula</a></li>
              <li><a href="/noticias" data-route class="hover:text-cor-primaria transition-colors">Blog de noticias</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-cor-primaria text-xs uppercase tracking-[0.16em] font-semibold mb-4">Contato</h4>
            <ul data-footer-contact-list class="space-y-2 text-sm text-cor-texto/70">
              <li>
                <a
                  href="https://wa.me/5541999644301"
                  data-footer-phone-link
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 hover:text-cor-primaria transition-colors"
                >
                  <svg class="w-4 h-4 text-[#25D366]" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7c0 39.1 10.2 77.3 29.6 111L0 480l118.7-31.1c32.6 17.8 69.4 27.2 107.4 27.2h.1c122.3 0 221.7-99.3 221.7-221.7c0-59.3-23.1-115-65-157M223.9 438.7h-.1c-33.2 0-65.7-8.9-94-25.6l-6.7-4l-70.4 18.5l18.8-68.7l-4.3-7.1c-18.5-29.4-28.2-63.4-28.2-98.3c0-102.6 83.5-186.1 186.1-186.1c49.7 0 96.4 19.4 131.5 54.6c35.1 35.1 54.5 81.9 54.5 131.5c-.1 102.7-83.6 186.2-186.2 186.2m101.5-138.2c-5.5-2.8-32.8-16.1-37.9-17.9c-5.1-1.9-8.8-2.8-12.5 2.8c-3.7 5.6-14.3 17.9-17.5 21.6c-3.2 3.7-6.5 4.2-12 1.4c-32.6-16.3-54-29.1-75.4-66c-5.7-9.8 5.7-9.1 16.3-30.3c1.8-3.7 .9-6.9-.5-9.7c-1.4-2.8-12.5-30.2-17.1-41.3c-4.5-10.8-9.1-9.3-12.5-9.5c-3.2-.2-6.9-.2-10.6-.2c-3.7 0-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3c0 27.3 19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.8 94.8 83.8c35.2 15.2 49 16.5 66.7 14c10.8-1.6 32.8-13.4 37.4-26.3c4.6-12.9 4.6-24 3.2-26.3c-1.3-2.4-5-3.8-10.5-6.6"/>
                  </svg>
                  <span data-footer-phone>(41) 99964-4301</span>
                </a>
              </li>
              <li>
                <a
                  href="${toGmailComposeUrl('contato@capoeiranota10.com.br')}"
                  data-footer-email-link
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 hover:text-cor-primaria transition-colors"
                >
                  <svg class="w-4 h-4 text-cor-primaria" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                    <path d="M4 8L12 13L20 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span data-footer-email>contato@capoeiranota10.com.br</span>
                </a>
              </li>
              <li data-footer-city>Pinhais - PR</li>
            </ul>
          </div>
        </div>

        <div data-footer-copy class="border-t border-cor-texto/10 mt-10 pt-6 text-center text-cor-texto/45 text-xs md:text-sm">
          © ${currentYear} Capoeira Nota 10. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  `;
}

export async function hydrateFooter() {
  const profile = await fetchOrganizationProfile();
  if (!profile) return;

  const phoneEl = document.querySelector<HTMLElement>('[data-footer-phone]');
  const phoneLinkEl = document.querySelector<HTMLAnchorElement>('[data-footer-phone-link]');
  const emailEl = document.querySelector<HTMLElement>('[data-footer-email]');
  const emailLinkEl = document.querySelector<HTMLAnchorElement>('[data-footer-email-link]');
  const cityEl = document.querySelector<HTMLElement>('[data-footer-city]');
  const copyEl = document.querySelector<HTMLElement>('[data-footer-copy]');
  const taglineEl = document.querySelector<HTMLElement>('[data-footer-tagline]');
  const preMatriculaEl = document.querySelector<HTMLAnchorElement>('[data-footer-pre-matricula]');

  const mainName = profile.nomeFantasia || profile.nome || 'Capoeira Nota 10';
  const cityState = [profile.cidade, profile.estado].filter(Boolean).join(' - ');

  const phone = profile.whatsappContato || profile.telefone || '';
  if (phoneEl && phone) {
    phoneEl.textContent = phone;
  }

  if (phoneLinkEl && phone) {
    phoneLinkEl.href = `https://wa.me/${onlyDigits(phone)}`;
  }

  if (emailEl && profile.email) {
    emailEl.textContent = profile.email;
  }

  if (emailLinkEl && profile.email) {
    emailLinkEl.href = toGmailComposeUrl(profile.email);
  }

  if (cityEl && cityState) {
    cityEl.textContent = cityState;
  }

  if (taglineEl) {
    taglineEl.textContent = `Arte, cultura e transformacao social atraves da capoeira em ${mainName}.`;
  }

  if (copyEl) {
    copyEl.textContent = `© ${new Date().getFullYear()} ${mainName}. Todos os direitos reservados.`;
  }

  if (preMatriculaEl && profile.slug) {
    preMatriculaEl.href = `https://capoeira-base.vercel.app/matricula/${profile.slug}`;
  }
}
