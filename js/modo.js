// ...existing code...
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona todos los botones con el id "toggle-mode"
  const toggleBtns = document.querySelectorAll("#toggle-mode");
  const body = document.body;

  // Al cargar, revisa si hay preferencia guardada
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      // Guarda la preferencia
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  });
});
// ...existing code...