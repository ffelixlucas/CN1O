import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Menu mobile animation
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  
  if (menuBtn && mobileMenu) {
    // Abrir menu
    menuBtn.addEventListener('click', () => {
      gsap.to(mobileMenu, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out'
      });
      
      // Animar links do menu
      gsap.fromTo('.menu-link', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: 'back.out(1.2)'
        }
      );
    });
    
    // Fechar menu
    const closeMenu = () => {
      gsap.to(mobileMenu, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in'
      });
    };
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }
    
    // Fechar ao clicar nos links
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        closeMenu();
        
        // Scroll suave para a seção
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }, 500);
      });
    });
  }
  
  // Scroll animations
  gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
    gsap.fromTo(element,
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Parallax effect no header
  gsap.to('header', {
    backgroundPosition: '50% 30%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'header',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Animar cards de eventos
  gsap.utils.toArray('.event-card').forEach((card: any, i) => {
    gsap.fromTo(card,
      { 
        opacity: 0,
        scale: 0.8,
        rotation: i % 2 === 0 ? -5 : 5
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Animar tabela de horários
  gsap.fromTo('.schedule-table',
    { 
      opacity: 0,
      y: 100,
      rotationX: 15
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.schedule-table',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // Animar linhas da tabela
  gsap.utils.toArray('.table-row').forEach((row: any, i) => {
    gsap.fromTo(row,
      { 
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '.schedule-table',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Logo animation
  gsap.to('#logo', {
    scale: 1.1,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
}
