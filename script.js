// NAVEGACIÓN ENTRE LAS OCHO VENTANILLAS

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

function showPage(pageName) {
  const selectedPage = document.getElementById(pageName);

  if (!selectedPage) return;

  pages.forEach(page => {
    page.classList.remove("active");
  });

  selectedPage.classList.add("active");

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  history.replaceState(null, "", "#" + pageName);
}

// Botones del menú
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    showPage(link.dataset.page);
  });
});

// Logo
document.querySelector(".brand").addEventListener("click", event => {
  event.preventDefault();
  showPage("inicio");
});

// Botones que llevan a otras secciones
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

// Abrir directamente una sección mediante el enlace
const initialPage = window.location.hash.replace("#", "");

if (initialPage && document.getElementById(initialPage)) {
  showPage(initialPage);
}


// REPRODUCTOR DE MÚSICA

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add("playing");
      musicText.textContent = "Música encendida";
    } catch (error) {
      musicText.textContent = "No se pudo reproducir";
    }
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicText.textContent = "Música apagada";
  }
});

music.addEventListener("ended", () => {
  musicButton.classList.remove("playing");
  musicText.textContent = "Música apagada";
});


// GALERÍA DE FOTOGRAFÍAS

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".photo").forEach(photo => {
  photo.addEventListener("click", () => {
    const imagePath = photo.dataset.photo;

    lightboxImage.src = imagePath;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closePhoto() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  lightboxImage.src = "";
}

closeLightbox.addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

// Cerrar fotografía con Escape
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePhoto();
  }
});
