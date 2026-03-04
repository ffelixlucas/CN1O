import { fetchOrganizationProfile } from '../data/organization';

const DEFAULT_ADDRESS = 'Rua Alamanda, 384 A';
const DEFAULT_CITY_STATE = 'Jardim Karla, Pinhais - PR';
const DEFAULT_PHONE = '(41) 99964-4301';
const DEFAULT_EMAIL = 'contato@capoeiranota10.com.br';
const DEFAULT_MAP_QUERY = 'Rua Alamanda 384 A Pinhais PR';

function toMapsEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function toMapsLink(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function LocationSection() {
  return `
    <section id="localizacao" class="relative py-24 md:py-32 bg-cor-fundo scroll-mt-24 md:scroll-mt-28 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-b from-cor-fundo via-cor-fundo to-cor-secundaria/20"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6">
        <div class="max-w-3xl mb-10 md:mb-12">
          <div class="inline-block w-20 h-1.5 bg-cor-primaria rounded-full mb-4"></div>
          <span class="block text-cor-primaria text-xs md:text-sm tracking-[0.18em] uppercase font-semibold">Onde estamos</span>
          <h2 class="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-cor-texto tracking-tight">LOCALIZACAO</h2>
          <p class="mt-4 text-cor-texto/70 text-base md:text-lg max-w-2xl">
            Venha conhecer nossa roda e viver a capoeira de perto.
          </p>
        </div>

        <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 md:gap-8 items-stretch">
          <div class="rounded-3xl border border-cor-texto/10 bg-cor-secundaria/30 p-6 md:p-8">
            <div class="space-y-6">
              <div>
                <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">Endereco</p>
                <p data-loc-address class="mt-2 text-cor-texto/85 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  ${DEFAULT_ADDRESS}\n${DEFAULT_CITY_STATE}
                </p>
              </div>

              <div>
                <p class="text-[11px] uppercase tracking-[0.14em] text-cor-primaria font-semibold">Contato</p>
                <div class="mt-3 space-y-2.5">
                  <a
                    href="https://wa.me/${onlyDigits(DEFAULT_PHONE)}"
                    data-loc-whatsapp-link
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 text-cor-texto/85 text-sm md:text-base hover:text-cor-primaria transition-colors"
                  >
                    <svg class="w-4 h-4 text-[#25D366]" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7c0 39.1 10.2 77.3 29.6 111L0 480l118.7-31.1c32.6 17.8 69.4 27.2 107.4 27.2h.1c122.3 0 221.7-99.3 221.7-221.7c0-59.3-23.1-115-65-157M223.9 438.7h-.1c-33.2 0-65.7-8.9-94-25.6l-6.7-4l-70.4 18.5l18.8-68.7l-4.3-7.1c-18.5-29.4-28.2-63.4-28.2-98.3c0-102.6 83.5-186.1 186.1-186.1c49.7 0 96.4 19.4 131.5 54.6c35.1 35.1 54.5 81.9 54.5 131.5c-.1 102.7-83.6 186.2-186.2 186.2m101.5-138.2c-5.5-2.8-32.8-16.1-37.9-17.9c-5.1-1.9-8.8-2.8-12.5 2.8c-3.7 5.6-14.3 17.9-17.5 21.6c-3.2 3.7-6.5 4.2-12 1.4c-32.6-16.3-54-29.1-75.4-66c-5.7-9.8 5.7-9.1 16.3-30.3c1.8-3.7 .9-6.9-.5-9.7c-1.4-2.8-12.5-30.2-17.1-41.3c-4.5-10.8-9.1-9.3-12.5-9.5c-3.2-.2-6.9-.2-10.6-.2c-3.7 0-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3c0 27.3 19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.8 94.8 83.8c35.2 15.2 49 16.5 66.7 14c10.8-1.6 32.8-13.4 37.4-26.3c4.6-12.9 4.6-24 3.2-26.3c-1.3-2.4-5-3.8-10.5-6.6"/>
                    </svg>
                    <span data-loc-whatsapp-text>${DEFAULT_PHONE}</span>
                  </a>

                  <a
                    href="mailto:${DEFAULT_EMAIL}"
                    data-loc-email-link
                    class="flex items-center gap-2 text-cor-texto/85 text-sm md:text-base hover:text-cor-primaria transition-colors"
                  >
                    <svg class="w-4 h-4 text-cor-primaria" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                      <path d="M4 8L12 13L20 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span data-loc-email-text>${DEFAULT_EMAIL}</span>
                  </a>
                </div>
              </div>

              <a
                href="${toMapsLink(DEFAULT_MAP_QUERY)}"
                data-loc-map-link
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 mt-2 bg-cor-primaria hover:bg-cor-destaque text-cor-escura px-5 py-3 rounded-full font-semibold uppercase tracking-wide text-xs md:text-sm transition-colors"
              >
                Abrir no mapa
                <span>→</span>
              </a>
            </div>
          </div>

          <div class="rounded-3xl border border-cor-texto/10 overflow-hidden min-h-[320px]">
            <iframe
              title="Mapa - Capoeira Nota 10"
              src="${toMapsEmbedUrl(DEFAULT_MAP_QUERY)}"
              data-loc-map-embed
              class="w-full h-full min-h-[320px]"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function hydrateLocationSection() {
  const addressEl = document.querySelector<HTMLElement>('[data-loc-address]');
  const whatsappLinkEl = document.querySelector<HTMLAnchorElement>('[data-loc-whatsapp-link]');
  const whatsappTextEl = document.querySelector<HTMLElement>('[data-loc-whatsapp-text]');
  const emailLinkEl = document.querySelector<HTMLAnchorElement>('[data-loc-email-link]');
  const emailTextEl = document.querySelector<HTMLElement>('[data-loc-email-text]');
  const mapLinkEl = document.querySelector<HTMLAnchorElement>('[data-loc-map-link]');
  const mapEmbedEl = document.querySelector<HTMLIFrameElement>('[data-loc-map-embed]');
  if (!addressEl || !whatsappLinkEl || !whatsappTextEl || !emailLinkEl || !emailTextEl || !mapLinkEl || !mapEmbedEl) return;

  const profile = await fetchOrganizationProfile();
  if (!profile) return;

  const cityStateCountry = [profile.cidade, profile.estado, profile.pais].filter(Boolean).join(' - ');
  const addressBlock = [profile.endereco, cityStateCountry].filter(Boolean).join('\n');
  if (addressBlock) {
    addressEl.textContent = addressBlock;
  }

  const phone = profile.whatsappContato || profile.telefone || '';
  if (phone) {
    whatsappTextEl.textContent = phone;
    whatsappLinkEl.href = `https://wa.me/${onlyDigits(phone)}`;
  }

  if (profile.email) {
    emailTextEl.textContent = profile.email;
    emailLinkEl.href = `mailto:${profile.email}`;
  }

  const mapQuery = [profile.endereco, profile.cidade, profile.estado, profile.pais].filter(Boolean).join(' ');
  if (mapQuery) {
    mapLinkEl.href = toMapsLink(mapQuery);
    mapEmbedEl.src = toMapsEmbedUrl(mapQuery);
  }
}
