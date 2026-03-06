import { HomeLayout } from './layouts/HomeLayout';
import { NewsListPage } from './pages/NewsListPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { EventsListPage } from './pages/EventsListPage';

export type AppRoute =
  | { name: 'home' }
  | { name: 'events-list' }
  | { name: 'news-list' }
  | { name: 'news-detail'; id: string };

function normalizePath(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

export function getCurrentRoute(pathname = window.location.pathname): AppRoute {
  const path = normalizePath(pathname);

  if (path === '/noticias') {
    return { name: 'news-list' };
  }

  if (path === '/eventos') {
    return { name: 'events-list' };
  }

  if (path.startsWith('/noticias/')) {
    const id = decodeURIComponent(path.slice('/noticias/'.length)).trim();
    if (id) return { name: 'news-detail', id };
  }

  return { name: 'home' };
}

export function App(route = getCurrentRoute()) {
  if (route.name === 'events-list') return EventsListPage();
  if (route.name === 'news-list') return NewsListPage();
  if (route.name === 'news-detail') return NewsDetailPage();
  return HomeLayout();
}
