document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initThemeToggle();
    initScrollAnimations();
});

/**
 * Control del menú de navegación móvil (Burguer Menu)
 */
function initMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            // Cambia el icono de barras por una 'X' al estar activo
            const icon = menuBtn.querySelector("i");
            if(navbar.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }
}

/**
 * Control Dinámico de Modo Claro / Modo Oscuro con LocalStorage
 */
function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const themeText = themeToggle.querySelector(".theme-toggle__text");
    const themeIcon = themeToggle.querySelector(".theme-toggle__icon");

    // Verificar si el usuario ya tenía una preferencia guardada
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
        updateToggleButton(true);
    } else {
        updateToggleButton(false);
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        
        // Guardar estado del modo para recordar en las siguientes páginas
        localStorage.setItem("theme", isLight ? "light" : "dark");
        updateToggleButton(isLight);
    });

    function updateToggleButton(isLight) {
        if (isLight) {
            themeText.textContent = "Modo Oscuro";
            themeIcon.textContent = "🌙";
        } else {
            themeText.textContent = "Modo Claro";
            themeIcon.textContent = "☀️";
        }
    }
}

/**
 * Animaciones al hacer Scroll (Línea de tiempo paso a paso)
 */
function initScrollAnimations() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timelineItems.length === 0) return;

    const showTimelineOnScroll = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.85;

            if (itemTop < triggerPoint) {
                item.classList.add("show");
            }
        });
    };

    // Ejecutar al cargar la página y al hacer scroll
    window.addEventListener("scroll", showTimelineOnScroll);
    showTimelineOnScroll();
}
