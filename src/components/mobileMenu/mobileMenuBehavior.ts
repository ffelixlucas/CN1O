export function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn') as HTMLButtonElement | null;
  const closeBtn = document.getElementById('close-menu') as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement | null;
  const menuPanel = document.getElementById('menu-panel') as HTMLDivElement | null;
  const menuOverlay = document.getElementById('menu-overlay') as HTMLDivElement | null;
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.menu-link');

  if (!menuBtn || !mobileMenu || !menuPanel || !menuOverlay) {
    console.warn('[mobileMenu] Elementos não encontrados');
    return;
  }

  function openMenu() {
    mobileMenu!.classList.remove('invisible');

    setTimeout(() => {
      menuOverlay!.classList.remove('opacity-0');
      menuOverlay!.classList.add('opacity-100');
      menuPanel!.classList.remove('translate-x-full');
    }, 10);

    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay!.classList.remove('opacity-100');
    menuOverlay!.classList.add('opacity-0');
    menuPanel!.classList.add('translate-x-full');

    setTimeout(() => {
      mobileMenu!.classList.add('invisible');
    }, 500);

    document.body.style.overflow = '';
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