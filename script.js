
/* ==========================================
   JHON & CARLA
   A LITTLE UNIVERSE
   JAVASCRIPT PRINCIPAL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENTOS PRINCIPALES
    ====================================== */

    const loader = document.getElementById("loader");
    const header = document.getElementById("header");
    const music = document.getElementById("backgroundMusic");
    const musicButton = document.getElementById("musicButton");
    const musicText = document.getElementById("musicText");
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const progress = document.getElementById("readingProgress");
    const backToTop = document.getElementById("backToTop");
    const restartButton = document.getElementById("restartButton");

    /* ======================================
       01. PANTALLA DE CARGA
    ====================================== */

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("hidden");

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }

    if (document.readyState === "complete") {
        setTimeout(hideLoader, 900);
    } else {
        window.addEventListener("load", () => {
            setTimeout(hideLoader, 900);
        }, { once: true });
    }

    /* ======================================
       02. REPRODUCTOR DE MÚSICA
    ====================================== */

    if (music && musicButton) {

        music.volume = 0.35;

        musicButton.addEventListener("click", async () => {

            if (music.paused) {

                try {
                    await music.play();

                    musicButton.classList.add("playing");
                    musicText.textContent = "REPRODUCIENDO";

                } catch (error) {

                    console.error("No se pudo reproducir la música:", error);
                    musicText.textContent = "INTENTAR DE NUEVO";

                }

            } else {

                music.pause();

                musicButton.classList.remove("playing");
                musicText.textContent = "REPRODUCIR";

            }

        });

        music.addEventListener("ended", () => {
            musicButton.classList.remove("playing");
            musicText.textContent = "REPRODUCIR";
        });

        music.addEventListener("error", () => {
            musicButton.classList.remove("playing");
            musicText.textContent = "AUDIO NO DISPONIBLE";
        });

    }

    /* ======================================
       03. MENÚ PARA CELULARES
    ====================================== */

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            navigation.classList.toggle("active");
            document.body.classList.toggle(
                "menu-open",
                navigation.classList.contains("active")
            );

        });

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");
                document.body.classList.remove("menu-open");

            });

        });

    }

    /* ======================================
       04. NAVEGACIÓN AL DESPLAZARSE
    ====================================== */

    function handleScroll() {

        const scrollPosition = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (header) {
            header.classList.toggle("scrolled", scrollPosition > 40);
        }

        if (backToTop) {
            backToTop.classList.toggle("visible", scrollPosition > 500);
        }

        if (progress) {

            const percentage = documentHeight > 0
                ? (scrollPosition / documentHeight) * 100
                : 0;

            progress.style.width = percentage + "%";

        }

    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    /* ======================================
       05. BOTÓN VOLVER ARRIBA
    ====================================== */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    if (restartButton) {

        restartButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* ======================================
       06. ANIMACIONES DE APARICIÓN
    ====================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    /* ======================================
       07. ESTRELLAS DEL UNIVERSO
    ====================================== */

    const canvas = document.getElementById("starCanvas");
    const ctx = canvas ? canvas.getContext("2d") : null;

    let stars = [];
    let canvasWidth = 0;
    let canvasHeight = 0;
    let animationFrame = null;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function resizeCanvas() {

        if (!canvas || !ctx) return;

        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;

        canvas.width = canvasWidth * pixelRatio;
        canvas.height = canvasHeight * pixelRatio;

        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        createStars();

    }

    function createStars() {

        stars = [];

        const amount = Math.min(
            Math.floor((canvasWidth * canvasHeight) / 7000),
            160
        );

        for (let i = 0; i < amount; i++) {

            stars.push({

                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight,

                radius: Math.random() * 1.5 + 0.3,

                opacity: Math.random() * 0.65 + 0.15,

                speed: Math.random() * 0.008 + 0.002,

                phase: Math.random() * Math.PI * 2

            });

        }

    }

    let starTime = 0;

    function drawStars() {

        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        starTime += 0.02;

        stars.forEach(star => {

            const opacity = reducedMotion
                ? star.opacity
                : star.opacity * (
                    0.65 + 0.35 * Math.sin(
                        starTime * (star.speed * 50) + star.phase
                    )
                );

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(238, 194, 204, ${opacity})`;

            ctx.fill();

        });

        if (!reducedMotion) {
            animationFrame = requestAnimationFrame(drawStars);
        }

    }

    if (canvas && ctx) {

        resizeCanvas();
        drawStars();

        let resizeTimeout;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(resizeCanvas, 150);

        });

    }

    /* ======================================
       08. GALERÍA Y VISOR
    ====================================== */

    const photoCards = Array.from(
        document.querySelectorAll(".photo-card")
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDescription = document.getElementById("lightboxDescription");

    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentPhoto = 0;

    function showPhoto(index) {

        if (!photoCards.length || !lightbox) return;

        currentPhoto =
            (index + photoCards.length) % photoCards.length;

        const card = photoCards[currentPhoto];

        const image = card.dataset.image;
        const title = card.dataset.title;
        const description = card.dataset.description;

        lightboxImage.src = image;
        lightboxImage.alt = title;

        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;

    }

    function openLightbox(index) {

        if (!lightbox) return;

        showPhoto(index);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

        if (lightboxClose) {
            lightboxClose.focus();
        }

    }

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

        lightboxImage.src = "";

    }

    photoCards.forEach((card, index) => {

        card.addEventListener("click", () => {
            openLightbox(index);
        });

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                openLightbox(index);

            }

        });

    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {

        lightboxPrev.addEventListener("click", () => {
            showPhoto(currentPhoto - 1);
        });

    }

    if (lightboxNext) {

        lightboxNext.addEventListener("click", () => {
            showPhoto(currentPhoto + 1);
        });

    }

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }

    document.addEventListener("keydown", event => {

        if (!lightbox || !lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentPhoto + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentPhoto - 1);
        }

    });

    /* ======================================
       09. DESLIZAR FOTOGRAFÍAS EN CELULAR
    ====================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {

        lightbox.addEventListener("touchstart", event => {

            touchStartX = event.changedTouches[0].screenX;

        }, { passive: true });

        lightbox.addEventListener("touchend", event => {

            touchEndX = event.changedTouches[0].screenX;

            const difference = touchEndX - touchStartX;

            if (Math.abs(difference) < 55) return;

            if (difference < 0) {
                showPhoto(currentPhoto + 1);
            } else {
                showPhoto(currentPhoto - 1);
            }

        }, { passive: true });

    }

    /* ======================================
       10. EFECTO DE CURSOR
    ====================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches &&
        !reducedMotion
    ) {

        window.addEventListener("mousemove", event => {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        }, { passive: true });

    }

    /* ======================================
       11. NAVEGACIÓN SUAVE
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const destination = document.querySelector(
                link.getAttribute("href")
            );

            if (!destination) return;

            event.preventDefault();

            destination.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });

    /* ======================================
       12. MENSAJE DE CONSOLA
    ====================================== */

    console.log(
        "%c JHON ♥ CARLA ",
        "background:#5c192d;color:#fff;padding:12px;font-size:18px;"
    );

    console.log(
        "%cUn pequeño universo creado con cariño.",
        "color:#d58a99;font-size:13px;"
    );

});
