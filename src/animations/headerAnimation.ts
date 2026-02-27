// src/animations/headerAnimation.ts
import gsap from 'gsap';

export function animateHeader() {
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" }  // ease mais leve pra menos lag
  });

  // 1. Fundo + header base (suave)
  tl.fromTo("header", 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.7 }
  , 0);

  // 2. Navbar (leve)
  tl.fromTo("nav", 
    { y: -30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8 }
  , "-=0.4");

  // 3. Linha amarela (rápida e simples)
  tl.fromTo(".w-20.h-1\\.5, .h-1\\.5.w-20", 
    { scaleX: 0, transformOrigin: "left center" }, 
    { scaleX: 1, duration: 0.7 }
  , "-=0.4");

  // 4. Título principal (ease mais simples pra menos CPU)
  tl.fromTo("h1", 
    { y: 40, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.0 }
  , "-=0.5");

  // 5. Parágrafo + botões JUNTOS (overlap forte, mas leve)
  // Botões chegam com diferença mínima
  tl.fromTo("header p.text-cor-texto, header p.leading-relaxed", 
    { y: 25, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8 }
  , "-=0.7");

  tl.fromTo(
    'header .flex a, header button', 
    { opacity: 0, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 0.7, stagger: 0.05 }  // stagger mínimo = diferença ~50ms
  , "-=1.0");  // colado no parágrafo

  // 6. Texto pequeno + indicadores (leve fechamento)
  tl.fromTo(
    "header .text-white\\/60.text-sm, header .flex.gap-3 button",
    { opacity: 0 },
    { opacity: 1, duration: 0.7 }
  , "-=0.5");

  return tl;
}