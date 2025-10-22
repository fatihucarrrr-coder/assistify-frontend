// Menü-Button und Navigation auswählen
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Klick-Event für das Hamburger-Menü
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Automatisch das Jahr im Footer aktualisieren
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Optional: Menü schließen, wenn ein Link geklickt wird
const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("open");
  });
});
