import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateNotices() {
  const section = document.querySelector<HTMLElement>('section[data-anim="notices"]');
  if (!section) return;

  const q = gsap.utils.selector(section);
  const line = q('[data-anim="notices-line"]');
  const kicker = q('[data-anim="notices-kicker"]');
  const title = q('[data-anim="notices-title"]');
  const subtitle = q('[data-anim="notices-subtitle"]');
  const featured = q('[data-anim="notice-featured"]');
  const list = q('[data-anim="notice-list"]');
  const items = q('[data-anim="notice-item"]');
  const targets = [...line, ...kicker, ...title, ...subtitle, ...featured, ...list, ...items];

  if (targets.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(targets, { autoAlpha: 1, clearProps: 'transform' });
    return;
  }

  gsap.set(targets, { willChange: 'transform,opacity' });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: section,
      start: 'top 72%',
      once: true
    }
  });

  tl.addLabel('noticesStart', 0)
    .fromTo(line, { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.45 }, 'noticesStart')
    .fromTo(kicker, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 'noticesStart+=0.06')
    .fromTo(title, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, 'noticesStart+=0.1')
    .fromTo(subtitle, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, 'noticesStart+=0.18')
    .fromTo(featured, { y: 24, autoAlpha: 0, scale: 0.99 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.65 }, 'noticesStart+=0.24')
    .fromTo(list, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, 'noticesStart+=0.3')
    .fromTo(items, { x: 16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 }, 'noticesStart+=0.38');

  tl.eventCallback('onComplete', () => {
    gsap.set(targets, { clearProps: 'willChange' });
  });
}
