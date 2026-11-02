document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS PRINCIPALES
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll("[data-page]");
  const goButtons = document.querySelectorAll("[data-go]");
  const footerButtons = document.querySelectorAll(".footer-center button");

  // NAVEGACIÓN ENTRE LAS OCHO VENTANILLAS
  function showPage(pageId, updateHash = true) {
    const target = document.getElementById(pageId);

    if (!target || !target.classList.contains("page")) return;

    pages.forEach(page => {
      page.classList.remove("active");
    });

    target.classList.add("active");

    navButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.page === pageId
      );
    });

    footerButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.go === pageId
      );
    });

    if (updateHash) {
      history.replaceState(null, "", `#${pageId}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setTimeout(observeReveals, 100);
  }

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  goButtons.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  footerButtons.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  // ABRIR LA SECCIÓN INDICADA EN LA DIRECCIÓN
  const initialPage = location.hash.replace("#", "");

  if (initialPage && document.getElementById(initialPage)?.classList.contains("page")) {
    showPage(initialPage, false);
  } else {
    showPage("inicio", false);
  }

  window.addEventListener("hashchange", () => {
    const pageId = location.hash.replace("#", "");
    if (pageId) showPage(pageId, false);
  });


  // MÚSICA
  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");
  const musicLabel = document.getElementById("musicLabel");

  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicButton.classList.add("playing");
        musicLabel.textContent = "SONANDO";
      } catch (error) {
        musicLabel.textContent = "INTENTA OTRA VEZ";
      }
    } else {
      music.pause();
      musicButton.classList.remove("playing");
      musicLabel.textContent = "ESCUCHAR";
    }
  });

  music.addEventListener("ended", () => {
    musicButton.classList.remove("playing");
    musicLabel.textContent = "ESCUCHAR";
  });


  // GALERÍA Y FOTOGRAFÍAS
  const photos = Array.from(
    document.querySelectorAll(".photo-card img")
  ).map(img => img.src);

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");

  const closeLightbox = document.getElementById("closeLightbox");
  const previousPhoto = document.getElementById("previousPhoto");
  const nextPhoto = document.getElementById("nextPhoto");

  let currentPhoto = 0;

  function updateLightbox() {
    lightboxImage.src = photos[currentPhoto];
    lightboxCounter.textContent =
      `${String(currentPhoto + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
  }

  function openLightbox(index) {
    currentPhoto = index;
    updateLightbox();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeLightbox.focus();
  }

  function hideLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function changePhoto(direction) {
    currentPhoto =
      (currentPhoto + direction + photos.length) % photos.length;

    updateLightbox();
  }

  document.querySelectorAll(".photo-card").forEach(card => {
    card.addEventListener("click", () => {
      openLightbox(Number(card.dataset.photo));
    });
  });

  closeLightbox.addEventListener("click", hideLightbox);

  previousPhoto.addEventListener("click", () => {
    changePhoto(-1);
  });

  nextPhoto.addEventListener("click", () => {
    changePhoto(1);
  });

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      hideLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
      hideLightbox();
    }

    if (event.key === "ArrowRight") {
      changePhoto(1);
    }

    if (event.key === "ArrowLeft") {
      changePhoto(-1);
    }
  });


  // ANIMACIONES AL APARECER LOS ELEMENTOS
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  function observeReveals() {
    document.querySelectorAll(".page.active .reveal:not(.visible)")
      .forEach(element => observer.observe(element));
  }

  observeReveals();

});
