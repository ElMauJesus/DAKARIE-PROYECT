const FADE_IN_SELECTOR = '.fade-in';
const SEQUENTIAL_GROUP_SELECTOR = '.animated-group'; // Nuevo selector para tus 3 o más contenedores

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;

      // 1. Lógica para animaciones secuenciales (fade-en)
      if (target.classList.contains(SEQUENTIAL_GROUP_SELECTOR.substring(1))) {
        // Busca todos los elementos con la clase '.fade-en' DENTRO del contenedor actual
        const icons = target.querySelectorAll('.fade-en');

        icons.forEach((icon, i) => {
          setTimeout(() => {
            icon.classList.add('show');
          }, i * 140); // 200ms de retraso entre cada elemento
        });
        
        // Una vez animado, deja de observar el contenedor
        observer.unobserve(target);

      } 
      // 2. Lógica para la animación normal (fade-in)
      else if (target.classList.contains(FADE_IN_SELECTOR.substring(1))) {
        target.classList.add('show');
        // Una vez animado, deja de observar el elemento
        observer.unobserve(target);
      }
    }
  });
}, {
    // Opciones para el IntersectionObserver (opcional, pero útil)
    rootMargin: '0px',
    threshold: 0.1 // Disparar cuando el 10% del elemento sea visible
});

// --- Asignación de Observadores ---

// 1. Observar TODOS los contenedores que deben tener la animación secuencial (fade-en)
document.querySelectorAll(SEQUENTIAL_GROUP_SELECTOR).forEach(el => {
    observer.observe(el);
});

// 2. Observar TODOS los elementos individuales con la clase 'fade-in' (animación normal)
document.querySelectorAll(FADE_IN_SELECTOR).forEach(el => {
    // Asegúrate de que los elementos 'fade-in' no estén DENTRO de un grupo secuencial si ya animaste el grupo
    // Esto previene dobles animaciones si accidentalmente tienen ambas clases.
    if (!el.closest(SEQUENTIAL_GROUP_SELECTOR)) {
        observer.observe(el);
    }
});