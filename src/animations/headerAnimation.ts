// src/animations/headerAnimation.ts
import gsap from 'gsap';

export function animateHeader() {
  const hero = document.querySelector<HTMLElement>('header[data-anim="hero"]');
  if (!hero) return gsap.timeline();

  const q = gsap.utils.selector(hero);
  const nav = q('[data-anim="hero-nav"]');
  const line = q('[data-anim="hero-line"]');
  const title = q('[data-anim="hero-title"]');
  const copy = q('[data-anim="hero-copy"]');
  const ctas = q('[data-anim="hero-cta"]');
  const hint = q('[data-anim="hero-hint"]');
  const indicators = q('[data-anim="hero-indicator"]');
  const animatedTargets = [hero, ...nav, ...line, ...title, ...copy, ...ctas, ...hint, ...indicators];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(animatedTargets, { autoAlpha: 1, clearProps: 'transform' });
    return gsap.timeline();
  }

  gsap.set(animatedTargets, { willChange: 'transform,opacity' });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  tl.addLabel('heroStart', 0)
    .fromTo(hero, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 'heroStart')
    .fromTo(nav, { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 'heroStart+=0.3')
    .fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 },
      { scaleX: 1, autoAlpha: 1, duration: 0.65 },
      'heroStart+=0.5'
    )
    .fromTo(title, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.95 }, 'heroStart+=0.55')
    .fromTo(copy, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, 'heroStart+=0.75')
    .fromTo(
      ctas,
      { autoAlpha: 0, scale: 0.98 },
      { autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.06 },
      'heroStart+=0.8'
    )
    .fromTo(hint, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55 }, 'heroStart+=1.0')
    .fromTo(
      indicators,
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.04 },
      'heroStart+=1.0'
    );

  tl.eventCallback('onComplete', () => {
    gsap.set(animatedTargets, { clearProps: 'willChange' });
  });

  return tl;
}
