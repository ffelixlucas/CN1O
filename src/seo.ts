import type { NoticeItem } from './data/notices';

const SITE_NAME = 'Capoeira Nota 10';
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://capoeiranota10.com.br').replace(/\/+$/, '');
const DEFAULT_IMAGE = `${SITE_URL}/media/capoeira-nota10-social-1200x630.jpg`;

type MetaBy = 'name' | 'property';

function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (!path.startsWith('/')) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

function upsertMeta(by: MetaBy, key: string, content: string): void {
  const selector = `meta[${by}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(by, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(url: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function removeDynamicStructuredData(): void {
  const existing = document.getElementById('ld-dynamic-seo');
  if (existing) existing.remove();
}

function setDynamicStructuredData(payload: Record<string, unknown>): void {
  removeDynamicStructuredData();
  const script = document.createElement('script');
  script.id = 'ld-dynamic-seo';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
}

function applySeo(params: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): void {
  const canonical = absoluteUrl(params.path);
  const image = absoluteUrl(params.image || DEFAULT_IMAGE);
  const title = params.title;
  const description = params.description;

  document.title = title;
  setCanonical(canonical);

  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:locale', 'pt_BR');
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', image);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);
}

export function applyHomeSeo(): void {
  applySeo({
    title: 'Capoeira Nota 10 | Escola de Capoeira em Pinhais - PR',
    description:
      'Escola de capoeira em Pinhais - PR. Aulas para crianças e adultos. Arte, cultura e transformação social através da capoeira.',
    path: '/'
  });
  removeDynamicStructuredData();
}

export function applyNewsListSeo(): void {
  applySeo({
    title: 'Notícias | Capoeira Nota 10',
    description:
      'Confira as últimas notícias, eventos e atividades da Capoeira Nota 10 em Pinhais.',
    path: '/noticias'
  });
  removeDynamicStructuredData();
}

export function applyEventsListSeo(): void {
  applySeo({
    title: 'Eventos | Capoeira Nota 10',
    description:
      'Veja todos os eventos da Capoeira Nota 10 com filtros por periodo, inscricoes e contagem regressiva em tempo real.',
    path: '/eventos'
  });
  removeDynamicStructuredData();
}

export function applyNewsDetailSeo(item: NoticeItem): void {
  const path = `/noticias/${encodeURIComponent(item.id)}`;
  const description = item.resumo || 'Notícia da Capoeira Nota 10.';
  const title = `${item.titulo} | Capoeira Nota 10`;
  const image = item.imagemUrl || DEFAULT_IMAGE;

  applySeo({ title, description, path, image });

  setDynamicStructuredData({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.titulo,
    description,
    image: absoluteUrl(image),
    datePublished: new Date(item.timestamp).toISOString(),
    dateModified: new Date(item.timestamp).toISOString(),
    author: {
      '@type': 'Organization',
      name: item.autor || SITE_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/media/logo.png`
      }
    },
    mainEntityOfPage: absoluteUrl(path)
  });
}
