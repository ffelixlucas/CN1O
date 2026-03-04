export type OrganizationContact = {
  whatsappNumber: string | null;
  rawContact: string | null;
};

export type OrganizationPublicProfile = {
  nome: string | null;
  nomeFantasia: string | null;
  email: string | null;
  telefone: string | null;
  whatsappContato: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  slug: string | null;
  siteUrl: string | null;
};

function normalizeDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function firstNonEmptyString(values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

export function buildOrganizacaoApiUrl(): string | null {
  const direct = import.meta.env.VITE_ORGANIZACAO_API_URL;
  if (typeof direct === 'string' && direct.trim()) return direct.trim();

  const candidates = [
    import.meta.env.VITE_CLASSES_API_URL,
    import.meta.env.VITE_NOTICIAS_API_URL,
    import.meta.env.VITE_EDITAIS_API_URL
  ].filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  for (const baseUrl of candidates) {
    const normalized = baseUrl.trim();

    const fromClasses = normalized.match(/^(.*)\/api\/public\/horarios\/([^/?#]+).*$/i);
    if (fromClasses) {
      return `${fromClasses[1]}/api/public/organizacoes/${fromClasses[2]}`;
    }

    const fromNotices = normalized.match(/^(.*)\/api\/public\/(?:noticias|galeria)\/([^/?#]+).*$/i);
    if (fromNotices) {
      return `${fromNotices[1]}/api/public/organizacoes/${fromNotices[2]}`;
    }
  }

  return null;
}

export async function fetchOrganizationContact(): Promise<OrganizationContact | null> {
  const profile = await fetchOrganizationProfile();
  if (!profile) return null;

  const rawContact = firstNonEmptyString([profile.whatsappContato, profile.telefone]);
  if (!rawContact) return null;

  const digits = normalizeDigits(rawContact);
  return {
    whatsappNumber: digits || null,
    rawContact
  };
}

export async function fetchOrganizationProfile(): Promise<OrganizationPublicProfile | null> {
  const apiUrl = buildOrganizacaoApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) return null;
    const data = (await response.json()) as Record<string, unknown>;
    return {
      nome: firstNonEmptyString([data.nome]),
      nomeFantasia: firstNonEmptyString([data.nome_fantasia]),
      email: firstNonEmptyString([data.email]),
      telefone: firstNonEmptyString([data.telefone]),
      whatsappContato: firstNonEmptyString([data.whatsapp_contato]),
      endereco: firstNonEmptyString([data.endereco]),
      cidade: firstNonEmptyString([data.cidade]),
      estado: firstNonEmptyString([data.estado]),
      pais: firstNonEmptyString([data.pais]),
      slug: firstNonEmptyString([data.slug]),
      siteUrl: firstNonEmptyString([data.site_url])
    };
  } catch {
    return null;
  }
}

export function normalizeWhatsappNumber(value: string): string {
  return normalizeDigits(value);
}
