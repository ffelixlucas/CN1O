export type ApiEventItem = {
  id: number;
  titulo?: string;
  descricao_curta?: string;
  descricao_completa?: string;
  local?: string;
  endereco?: string;
  telefone_contato?: string;
  whatsapp_url?: string | null;
  data_inicio?: string;
  data_fim?: string | null;
  inscricoes_ate?: string | null;
  imagem_url?: string | null;
  valor?: string | number | null;
  com_inscricao?: boolean | number | null;
  configuracoes?: Record<string, unknown> | string | null;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  fullDescription: string | null;
  image: string;
  date: string;
  time: string | null;
  local: string | null;
  endereco: string | null;
  telefoneContato: string | null;
  whatsappUrl: string | null;
  inscricaoUrl: string | null;
  imageFocusX: number;
  imageFocusY: number;
  timestamp: number;
  isPast: boolean;
};

const FALLBACK_EVENT_IMAGE = '/media/capoeira-nota10-social-1200x630.jpg';
const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});
const TIME_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
});

function firstNonEmptyString(values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

function normalizeTimestamp(rawDate: string | null, fallback: number): number {
  if (!rawDate) return fallback;
  const parsed = Date.parse(rawDate);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function buildEventsApiUrl(): string | null {
  const direct = import.meta.env.VITE_EVENTS_API_URL;
  if (typeof direct === 'string' && direct.trim()) return direct.trim();

  const classesUrl = import.meta.env.VITE_CLASSES_API_URL as string | undefined;
  if (classesUrl && classesUrl.trim()) {
    const match = classesUrl.trim().match(/^(.*)\/api\/public\/horarios\/([^/?#]+).*$/i);
    if (match) {
      const base = match[1];
      const slug = match[2];
      return `${base}/api/public/agenda?slug=${encodeURIComponent(slug)}`;
    }
  }

  return null;
}

function getOrganizationSlugFromApiUrl(apiUrl: string): string | null {
  const fromQuery = apiUrl.match(/[?&]slug=([^&#]+)/i);
  if (fromQuery) {
    try {
      return decodeURIComponent(fromQuery[1]);
    } catch {
      return fromQuery[1];
    }
  }

  const classesUrl = import.meta.env.VITE_CLASSES_API_URL as string | undefined;
  if (classesUrl) {
    const fromClasses = classesUrl.trim().match(/\/api\/public\/horarios\/([^/?#]+).*$/i);
    if (fromClasses) return fromClasses[1];
  }

  return null;
}

function toNumber(value: string | number | null | undefined): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

function extractEventArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (typeof data !== 'object' || data === null) return [];

  const record = data as Record<string, unknown>;
  if (Array.isArray(record.data)) return record.data;
  if (Array.isArray(record.items)) return record.items;
  return [];
}

function normalizeConfiguracoes(raw: ApiEventItem['configuracoes']): Record<string, unknown> {
  if (!raw) return {};
  if (typeof raw === 'object') return raw as Record<string, unknown>;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown;
      return typeof parsed === 'object' && parsed !== null
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return {};
}

function parseFocusValue(value: unknown, fallback = 50): number {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(100, Math.max(0, parsed));
}

function normalizeInscricaoUrl(item: ApiEventItem): string | null {
  const config = normalizeConfiguracoes(item.configuracoes);
  const externalFromConfig = firstNonEmptyString([config.inscricao_externa_url]);
  if (externalFromConfig) {
    if (/^https?:\/\//i.test(externalFromConfig)) return externalFromConfig;
    return `https://${externalFromConfig}`;
  }

  const comInscricao = item.com_inscricao === true || item.com_inscricao === 1;
  const hasInscricaoAte = typeof item.inscricoes_ate === 'string' && item.inscricoes_ate.trim().length > 0;
  const valor = toNumber(item.valor);
  const hasValor = typeof valor === 'number' && valor > 0;
  const hasSubscription = comInscricao || hasInscricaoAte || hasValor;
  if (!hasSubscription) return null;

  const adminUrl = import.meta.env.VITE_ADMIN_URL as string | undefined;
  if (!adminUrl) return null;
  const base = adminUrl.replace(/\/+$/, '');
  const apiUrl = buildEventsApiUrl();
  const slug = apiUrl ? getOrganizationSlugFromApiUrl(apiUrl) : null;
  if (!slug || !item.id) return `${base}/inscricoes`;
  return `${base}/inscrever/${encodeURIComponent(slug)}/${encodeURIComponent(String(item.id))}`;
}

export function normalizeEvents(data: unknown): EventItem[] {
  const source = extractEventArray(data);
  if (source.length === 0) return [];

  return source
    .map((rawItem, index): EventItem | null => {
      if (typeof rawItem !== 'object' || rawItem === null) return null;
      const item = rawItem as ApiEventItem;
      const timestamp = normalizeTimestamp(
        firstNonEmptyString([item.data_inicio, item.inscricoes_ate, item.data_fim]),
        Date.now() + index * 60_000
      );

      const title = firstNonEmptyString([item.titulo]) ?? `Evento ${index + 1}`;
      const description =
        firstNonEmptyString([item.descricao_curta, item.descricao_completa, item.local, item.endereco]) ??
        'Detalhes do evento em breve.';
      const image = firstNonEmptyString([item.imagem_url]) ?? FALLBACK_EVENT_IMAGE;
      const fullDescription = firstNonEmptyString([item.descricao_completa]);
      const local = firstNonEmptyString([item.local]);
      const endereco = firstNonEmptyString([item.endereco]);
      const telefoneContato = firstNonEmptyString([item.telefone_contato]);
      const whatsappUrl = firstNonEmptyString([item.whatsapp_url]);
      const configuracoes = normalizeConfiguracoes(item.configuracoes);
      const imageFocusX = parseFocusValue(configuracoes.imagem_foco_x, 50);
      const imageFocusY = parseFocusValue(configuracoes.imagem_foco_y, 50);

      return {
        id: String(item.id ?? `evento-${index}`),
        title,
        description,
        fullDescription,
        image,
        date: DATE_FORMATTER.format(new Date(timestamp)),
        time: (() => {
          const formatted = TIME_FORMATTER.format(new Date(timestamp));
          return formatted === '00:00' ? null : formatted;
        })(),
        local,
        endereco,
        telefoneContato,
        whatsappUrl,
        inscricaoUrl: normalizeInscricaoUrl(item),
        imageFocusX,
        imageFocusY,
        timestamp,
        isPast: timestamp < Date.now()
      };
    })
    .filter((item): item is EventItem => item !== null)
    .sort((a, b) => {
      if (a.isPast !== b.isPast) return a.isPast ? 1 : -1;
      return a.timestamp - b.timestamp;
    });
}

export async function fetchEvents(): Promise<EventItem[]> {
  const apiUrl = buildEventsApiUrl();
  if (!apiUrl) return [];

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) return [];
    const data = (await response.json()) as unknown;
    return normalizeEvents(data);
  } catch {
    return [];
  }
}
