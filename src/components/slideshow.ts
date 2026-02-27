// src/components/slideshow.ts
let slideAtual = 1
let intervalo: number | undefined

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

function iniciarIntervalo() {
  intervalo = window.setInterval(() => {
    const proximo = slideAtual === 1 ? 2 : 1
    mudarSlide(proximo)
  }, 4500)
}

function resetarIntervalo() {
  if (intervalo) {
    clearInterval(intervalo)
  }
  iniciarIntervalo()
}

export function iniciarSlideshow() {
  mudarSlide(1)
  iniciarIntervalo()

  document.querySelectorAll('[data-slide]').forEach(btn => {
    btn.addEventListener('click', () => {
      const numero = Number(btn.getAttribute('data-slide'))
      if (!numero) return

      mudarSlide(numero)
      resetarIntervalo() // 🔥 reinicia contagem
    })
  })
}