// src/components/slideshow.ts
let slideAtual = 1;

export function mudarSlide(numero: number) {
  const slide1 = document.getElementById('slide-1');
  const slide2 = document.getElementById('slide-2');
  
  if (!slide1 || !slide2) return;
  
  slide1.style.opacity = numero === 1 ? '1' : '0';
  slide2.style.opacity = numero === 2 ? '1' : '0';
  
  const botoes = document.querySelectorAll('[data-slide]');
  botoes.forEach((btn, index) => {
    if (index + 1 === numero) {
      btn.classList.add('bg-amber-500');
      btn.classList.remove('bg-white/40');
    } else {
      btn.classList.remove('bg-amber-500');
      btn.classList.add('bg-white/40');
    }
  });
  
  slideAtual = numero;
}

export function iniciarSlideshow() {
  setInterval(() => {
    const proximo = slideAtual === 1 ? 2 : 1;
    mudarSlide(proximo);
  }, 4000);
}