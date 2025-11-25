document.addEventListener("DOMContentLoaded", () => {
const btn = document.getElementById("hamburgerBtn");
const menu = document.getElementById("sideMenu"); 
const overlay = document.getElementById('overlay');
const links = menu.querySelectorAll("a");

btn.addEventListener("click", () => {
// Toggle menú y botón
menu.classList.toggle("open");
btn.style.display = menu.classList.contains("open") ? "none" : "block";
// Toggle overlay visibility and lock scroll
if (overlay) {
  overlay.classList.toggle('active');
}
document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en cualquier enlace
links.forEach(link => {
link.addEventListener("click", () => {
menu.classList.remove("open");
btn.style.display = "block";
if (overlay) { overlay.classList.remove('active'); }
document.body.style.overflow = '';
});
});
});

// Cerrar menú al hacer clic en el overlay
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      menu.classList.remove('open');
      overlay.classList.remove('active');
      if (btn) btn.style.display = 'block';
      document.body.style.overflow = '';
    });
  }
});

// LÓGICA DEL CARRUSEL (CORREGIDA)
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  
  // 💡 Corrección: Solo ejecuta la lógica del carrusel si el elemento existe (no es 'null')
  if (carousel) {
    const totalSlides = carousel.children.length;
    let index = 0;

    function autoSlide() {
      index = (index + 1) % totalSlides;
      carousel.style.transform = `translateX(-${index * 100}vw)`;
    }

    setInterval(autoSlide, 4000); // Cada 4 segundos
  }
});

// Si tu archivo original tenía más código (como 'const menuObserver...'), 
// puedes dejarlo después de este bloque.