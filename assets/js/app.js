/* ==========================================================
   Datos del catálogo
   Los productos ya NO se escriben aquí a mano: se cargan desde
   productos.json (mismo folder que index.html). Para agregar,
   quitar o editar una pieza, solo edita ese archivo — no toques
   este JS. Cada producto necesita: id, name, material ('oro' o
   'plata'), price, img (ruta a la foto) y desc.
   ========================================================== */
function catalog() {
  return {
    filter: 'todo',
    selected: null,
    products: [],
    loading: true,
    loadError: false,

    // Alpine llama a init() automáticamente al montar el componente.
    async init() {
      try {
        const res = await fetch('productos.json');
        if (!res.ok) throw new Error('No se pudo leer productos.json');
        this.products = await res.json();
      } catch (err) {
        console.error(err);
        this.loadError = true;
      } finally {
        this.loading = false;
      }
    },

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
   Animaciones con Anime.js v4
   (v4 ya no expone una función global anime(); en su lugar se
   usan funciones con nombre: animate, createTimeline, stagger.
   El bundle UMD las deja disponibles dentro del objeto "anime".)
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof anime === 'undefined') {
    // Sin animaciones: cualquier tarjeta que llegue después (por ejemplo
    // desde productos.json) debe mostrarse directo, sin quedar oculta.
    window.observeReveal = (el) => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    };
    document.querySelectorAll('.reveal-item').forEach(window.observeReveal);
    return;
  }

  const { animate, createTimeline, stagger } = anime;

  /* --- Secuencia de entrada del hero --- */
  createTimeline({ defaults: { ease: 'outExpo' } })
    .add('[data-anim="eyebrow"]', {
      opacity: [0, 1],
      y: [12, 0],
      duration: 700
    })
    .add('.hero-title .line', {
      opacity: [0, 1],
      y: [26, 0],
      duration: 900,
      delay: stagger(120)
    }, '-=500')
    .add('[data-anim="sub"]', {
      opacity: [0, 1],
      y: [16, 0],
      duration: 700
    }, '-=400')
    .add('[data-anim="actions"]', {
      opacity: [0, 1],
      y: [16, 0],
      duration: 700
    }, '-=450');

  /* --- Brillo continuo en el titular (gradiente en movimiento) --- */
  animate('.hero-title', {
    backgroundPosition: ['0% 0%', '-220% 0%'],
    duration: 6000,
    ease: 'linear',
    loop: true
  });

  /* --- Scroll reveal para tarjetas y secciones --- */
  const revealTargets = document.querySelectorAll('.reveal-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target, {
          opacity: [0, 1],
          y: [24, 0],
          duration: 700,
          ease: 'outQuart'
        });
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  // Las tarjetas de producto se agregan después (async, desde
  // productos.json), así que dejamos esta función disponible para
  // engancharlas al mismo observer en cuanto existan en el DOM.
  window.observeReveal = (el) => observer.observe(el);
});