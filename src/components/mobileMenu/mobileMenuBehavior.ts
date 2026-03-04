export function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn') as HTMLButtonElement | null;
  const closeBtn = document.getElementById('close-menu') as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement | null;
  const menuPanel = document.getElementById('menu-panel') as HTMLDivElement | null;
  const menuOverlay = document.getElementById('menu-overlay') as HTMLDivElement | null;
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.menu-link');

  if (!menuBtn || !mobileMenu || !menuPanel || !menuOverlay) {
    return;
  }

  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let lastActiveElement: HTMLElement | null = null;

  function trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const focusables = Array.from(menuPanel!.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMenu() {
    lastActiveElement = document.activeElement as HTMLElement | null;
    mobileMenu!.classList.remove('invisible');
    mobileMenu!.setAttribute('aria-hidden', 'false');
    menuBtn!.setAttribute('aria-expanded', 'true');

    setTimeout(() => {
      menuOverlay!.classList.remove('opacity-0');
      menuOverlay!.classList.add('opacity-100');
      menuPanel!.classList.remove('translate-x-full');
      const firstLink = menuPanel!.querySelector<HTMLElement>(focusableSelector);
      firstLink?.focus();
    }, 10);

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', trapFocus);
  }

  function closeMenu() {
    menuOverlay!.classList.remove('opacity-100');
    menuOverlay!.classList.add('opacity-0');
    menuPanel!.classList.add('translate-x-full');

    setTimeout(() => {
      mobileMenu!.classList.add('invisible');
      mobileMenu!.setAttribute('aria-hidden', 'true');
    }, 500);

    document.body.style.overflow = '';
    menuBtn!.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', trapFocus);
    lastActiveElement?.focus();
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu!.classList.contains('invisible')) {
      closeMenu();
    }
  });
}
