import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateAbout() {
  const about = document.querySelector<HTMLElement>('section[data-anim="about"]');
  if (!about) return;

  const q = gsap.utils.selector(about);
  const line = q('[data-anim="about-line"]');
  const title = q('[data-anim="about-title"]');
  const subtitle = q('[data-anim="about-subtitle"]');
  const copy = q('[data-anim="about-copy"]');
  const image = q('[data-anim="about-image"]');
  const targets = [...line, ...title, ...subtitle, ...copy, ...image];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(targets, { autoAlpha: 1, clearProps: 'transform' });
    return;
  }

  gsap.set(targets, { willChange: 'transform,opacity' });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: about,
      start: 'top 75%',
      once: true
    }
  });

  tl.addLabel('aboutStart', 0)
    .fromTo(
      line,
      { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 },
      { scaleX: 1, autoAlpha: 1, duration: 0.55 },
      'aboutStart'
    )
    .fromTo(title, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 'aboutStart+=0.08')
    .fromTo(subtitle, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, 'aboutStart+=0.2')
    .fromTo(copy, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 'aboutStart+=0.25')
    .fromTo(
      image,
      { x: 24, autoAlpha: 0, scale: 0.985 },
      { x: 0, autoAlpha: 1, scale: 1, duration: 0.8 },
      'aboutStart+=0.28'
    );

  tl.eventCallback('onComplete', () => {
    gsap.set(targets, { clearProps: 'willChange' });
  });
}
