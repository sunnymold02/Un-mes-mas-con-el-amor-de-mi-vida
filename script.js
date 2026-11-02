const pages = document.querySelectorAll(".screen");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

function openPage(pageId) {
  pages.forEach(page => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#" + pageId);
  }
}

function goHome() {
  openPage("home");
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ Música encendida";
    } catch (error) {
      musicButton.textContent = "No se pudo reproducir";
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ Música";
  }
});

music.addEventListener("ended", () => {
  musicButton.textContent = "♫ Música";
});

// Crear pequeños destellos decorativos
const sparkleContainer = document.getElementById("sparkles");

for (let i = 0; i < 32; i++) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > 0.5 ? "✦" : "♡";
  sparkle.style.left = Math.random() * 100 + "%";
  sparkle.style.top = Math.random() * 100 + "%";
  sparkle.style.fontSize = (9 + Math.random() * 15) + "px";
  sparkle.style.animationDelay = (Math.random() * 5) + "s";
  sparkleContainer.appendChild(sparkle);
});

// Abrir la sección indicada en el enlace, si existe
const initialPage = location.hash.replace("#", "");
if (initialPage && document.getElementById(initialPage)) {
  openPage(initialPage);
}
