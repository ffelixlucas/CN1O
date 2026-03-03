// data/notices.ts

export type RawNotice = Record<string, unknown>;

export type NoticeItem = {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  autor: string;
  leituraMin: number;
  imagemUrl: string | null;
  dataLabel: string;
  horarioLabel: string | null;
  link: string | null;
  timestamp: number;
};

const NOTICES_DEBUG = import.meta.env.VITE_NOTICES_DEBUG === 'true';

const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

const TIME_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
});

function getFirstString(source: RawNotice, keys: string[]): string | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

function getFirstNumber(source: RawNotice, keys: string[]): number | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim() && !Number.isNaN(Number(value))) return Number(value);
  }
  return null;
}

function normalizeTimestamp(rawDate: string | null, fallback: number): number {
  if (!rawDate) return fallback;
  const parsed = Date.parse(rawDate);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function toDateLabel(timestamp: number): string {
  return DATE_FORMATTER.format(new Date(timestamp));
}

function toTimeLabel(timestamp: number): string {
  return TIME_FORMATTER.format(new Date(timestamp));
}

function extractNoticesArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (typeof data !== 'object' || data === null) return [];

  const record = data as Record<string, unknown>;
  if (Array.isArray(record.data)) return record.data;
  if (Array.isArray(record.items)) return record.items;
  if (Array.isArray(record.resultados)) return record.resultados;
  return [];
}

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function buildLegacyGaleriaUrl(apiUrl: string): string {
  return apiUrl
    .replace('/public/noticias/', '/public/galeria/')
    .replace('/public/noticias', '/public/galeria');
}

async function requestNotices(url: string): Promise<unknown> {
  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Falha ao buscar noticias: ${response.status}`);
  }

  return response.json();
}

export function normalizeNotices(data: unknown): NoticeItem[] {
  const source = extractNoticesArray(data);
  if (source.length === 0) return [];

  return source
    .map((item, index): NoticeItem | null => {
      if (typeof item !== 'object' || item === null) return null;
      const raw = item as RawNotice;

      const titulo = getFirstString(raw, ['titulo', 'title', 'nome', 'headline']) ?? `Publicacao ${index + 1}`;
      const resumo = getFirstString(raw, ['resumo', 'descricao_curta', 'descricao', 'legenda', 'subtitulo', 'texto']) ?? 'Confira os detalhes no conteudo completo.';
      const conteudo = getFirstString(raw, ['descricao_completa', 'conteudo', 'texto', 'descricao']) ?? resumo;
      const categoria = getFirstString(raw, ['categoria', 'tipo', 'tag']) ?? 'Noticia';
      const autor = getFirstString(raw, ['autor', 'responsavel', 'publicado_por']) ?? 'Equipe CN10';
      const imagemUrl = getFirstString(raw, ['imagem_url', 'image_url', 'imagem', 'image', 'foto_url', 'cover_url']);
      const horarioLabel = getFirstString(raw, ['horario', 'hora', 'time']);
      const rawDate = getFirstString(raw, ['data', 'data_inicio', 'data_evento', 'data_publicacao', 'published_at', 'created_at', 'criado_em']);
      const timestamp = normalizeTimestamp(rawDate, Date.now() - index * 60_000);
      const idNumber = getFirstNumber(raw, ['id']);
      const idText = getFirstString(raw, ['id', 'slug']);
      const link = getFirstString(raw, ['link', 'url', 'detalhes_url']);

      return {
        id: idText ?? String(idNumber ?? `notice-${index}`),
        titulo,
        resumo,
        conteudo,
        categoria,
        autor,
        leituraMin: estimateReadingMinutes(conteudo),
        imagemUrl,
        dataLabel: toDateLabel(timestamp),
        horarioLabel: horarioLabel ?? toTimeLabel(timestamp),
        link,
        timestamp
      };
    })
    .filter((item): item is NoticeItem => item !== null)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export async function fetchNotices(): Promise<NoticeItem[]> {
  const apiUrl = import.meta.env.VITE_NOTICIAS_API_URL || import.meta.env.VITE_EDITAIS_API_URL;
  if (!apiUrl) return [];

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });

  if (response.ok) {
    const data = (await response.json()) as unknown;
    return normalizeNotices(data);
  }

  const legacyUrl = buildLegacyGaleriaUrl(apiUrl);
  if (legacyUrl !== apiUrl) {
    try {
      const legacyData = await requestNotices(legacyUrl);
      return normalizeNotices(legacyData);
    } catch (legacyError) {
      if (NOTICES_DEBUG) {
        console.warn('[notices] Falha no fallback de noticias para galeria.', legacyError);
      }
    }
  }

  if (NOTICES_DEBUG) {
    console.warn(`[notices] API indisponivel para noticias. Status: ${response.status}`);
  }
  return [];
}

export function toNoticeDetailPath(id: string): string {
  return `/noticias/${encodeURIComponent(id)}`;
}
