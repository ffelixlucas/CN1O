import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateClasses() {
  const section = document.querySelector<HTMLElement>('section[data-anim="classes"]');
  if (!section) return;

  const q = gsap.utils.selector(section);
  const line = q('[data-anim="classes-line"]');
  const kicker = q('[data-anim="classes-kicker"]');
  const title = q('[data-anim="classes-title"]');
  const subtitle = q('[data-anim="classes-subtitle"]');
  const cards = q('[data-anim="class-card"]');
  const footnote = q('[data-anim="classes-footnote"]');
  const targets = [...line, ...kicker, ...title, ...subtitle, ...cards, ...footnote];

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

  tl.addLabel('classesStart', 0)
    .fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 },
      { scaleX: 1, autoAlpha: 1, duration: 0.5 },
      'classesStart'
    )
    .fromTo(kicker, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, 'classesStart+=0.08')
    .fromTo(title, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 'classesStart+=0.12')
    .fromTo(subtitle, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, 'classesStart+=0.2')
    .fromTo(
      cards,
      { y: 28, autoAlpha: 0, scale: 0.985 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.1 },
      'classesStart+=0.25'
    )
    .fromTo(footnote, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 'classesStart+=0.65');

  tl.eventCallback('onComplete', () => {
    gsap.set(targets, { clearProps: 'willChange' });
  });
}
