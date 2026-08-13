/* ==========================================================
   Datos del catálogo
   Reemplaza estos productos por los tuyos: id, name, material
   ('oro' o 'plata'), price, img (ruta a tu foto) y desc.
   ========================================================== */
function catalog() {
  return {
    filter: 'todo',
    selected: null,
    products: [
      { id: 1, name: 'Anillo Hilo', material: 'oro', price: '$1,450 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c7a24c?text=Anillo+Hilo',
        desc: 'Anillo delgado en oro, ideal para usar solo o combinado con otros anillos.' },
      { id: 2, name: 'Aretes Gota', material: 'plata', price: '$650 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c6cbd1?text=Aretes+Gota',
        desc: 'Aretes colgantes en plata .925, ligeros para uso diario.' },
      { id: 3, name: 'Cadena Bruma', material: 'plata', price: '$980 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c6cbd1?text=Cadena+Bruma',
        desc: 'Cadena fina en plata con broche de mosquetón reforzado.' },
      { id: 4, name: 'Anillo Nudo', material: 'oro', price: '$1,690 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c7a24c?text=Anillo+Nudo',
        desc: 'Anillo con diseño trenzado en oro, acabado satinado.' },
      { id: 5, name: 'Pulsera Cauce', material: 'oro', price: '$1,120 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c7a24c?text=Pulsera+Cauce',
        desc: 'Pulsera de eslabones en oro, ajustable con extensor.' },
      { id: 6, name: 'Aretes Media Luna', material: 'plata', price: '$720 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c6cbd1?text=Aretes+Media+Luna',
        desc: 'Aretes en plata con forma de media luna, acabado pulido.' },
      { id: 7, name: 'Anillo Doble Línea', material: 'oro', price: '$1,340 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c7a24c?text=Anillo+Doble+Linea',
        desc: 'Anillo de dos líneas paralelas en oro, corte recto.' },
      { id: 8, name: 'Cadena Listón', material: 'plata', price: '$890 MXN',
        img: 'https://placehold.co/600x750/1f1c19/c6cbd1?text=Cadena+Liston',
        desc: 'Cadena tipo listón en plata, brillo espejo.' }
    ],
    filtered() {
      if (this.filter === 'todo') return this.products;
      return this.products.filter(p => p.material === this.filter);
    },
    openProduct(product) {
      this.selected = product;
    },
    shine(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    }
  };
}

/* ==========================================================
   Animaciones con Anime.js
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof anime === 'undefined') {
    document.querySelectorAll('.reveal-item').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  /* --- Secuencia de entrada del hero --- */
  anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: '[data-anim="eyebrow"]',
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 700
    })
    .add({
      targets: '.hero-title .line',
      opacity: [0, 1],
      translateY: [26, 0],
      duration: 900,
      delay: anime.stagger(120)
    }, '-=500')
    .add({
      targets: '[data-anim="sub"]',
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700
    }, '-=400')
    .add({
      targets: '[data-anim="actions"]',
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700
    }, '-=450');

  /* --- Brillo continuo en el titular (gradiente en movimiento) --- */
  anime({
    targets: '.hero-title',
    backgroundPosition: ['0% 0%', '-220% 0%'],
    duration: 6000,
    easing: 'linear',
    loop: true
  });

  /* --- Scroll reveal para tarjetas y secciones --- */
  const revealTargets = document.querySelectorAll('.reveal-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 700,
          easing: 'easeOutQuart'
        });
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  /* Alpine renderiza el catálogo tras su propio init; observamos
     también con un pequeño retraso para capturar las tarjetas nuevas. */
  document.addEventListener('alpine:initialized', () => {
    document.querySelectorAll('.product-grid .reveal-item').forEach(el => observer.observe(el));
  });
});
