// ======================================
// CARLA & JHON - NUESTRO UNIVERSO ♡
// ======================================


// 1. NAVEGACIÓN ENTRE LAS CUATRO PÁGINAS

function showPage(pageId) {

  const pages = document.querySelectorAll('.page');
  const buttons = document.querySelectorAll('.nav-btn');

  pages.forEach(page => {
    page.classList.remove('active');
  });

  buttons.forEach(button => {
    button.classList.remove('active');
  });

  const selectedPage = document.getElementById(pageId);

  if (!selectedPage) return;

  selectedPage.classList.add('active');

  const selectedButton = document.querySelector(
    `.nav-btn[data-page="${pageId}"]`
  );

  if (selectedButton) {
    selectedButton.classList.add('active');
  }

  // Actualizar la dirección sin recargar la página.

  history.replaceState(null, '', '#' + pageId);

  // Volver arriba al cambiar de sección.

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


// Activar los botones del menú.

document.querySelectorAll('.nav-btn').forEach(button => {

  button.addEventListener('click', () => {
    showPage(button.dataset.page);
  });

});


// Permitir abrir directamente una sección mediante su enlace.

const initialPage = location.hash.replace('#', '');

if (document.getElementById(initialPage)) {
  showPage(initialPage);
}


// 2. CREAR ESTRELLAS EN EL FONDO

const starsContainer = document.getElementById('stars');

for (let i = 0; i < 85; i++) {

  const star = document.createElement('span');

  star.className = 'star';

  star.textContent = Math.random() > 0.5 ? '✦' : '·';

  star.style.left = Math.random() * 100 + '%';

  star.style.top = Math.random() * 100 + '%';

  star.style.fontSize =
    (Math.random() * 12 + 5) + 'px';

  star.style.animationDelay =
    Math.random() * 4 + 's';

  star.style.animationDuration =
    (Math.random() * 3 + 2) + 's';

  starsContainer.appendChild(star);

}


// 3. CORAZONES FLOTANTES

const heartsContainer = document.getElementById('hearts');

function createHeart() {

  const heart = document.createElement('span');

  heart.className = 'heart';

  const symbols = ['♡', '♥', '💕', '💗', '✧'];

  heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + 'vw';

  heart.style.fontSize =
    (Math.random() * 20 + 12) + 'px';

  heart.style.animationDuration =
    (Math.random() * 5 + 6) + 's';

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 11000);

}

setInterval(createHeart, 950);


// 4. REPRODUCTOR DE MÚSICA

const musicPlayer = document.getElementById('musicPlayer');

musicPlayer.addEventListener('error', () => {

  console.log(
    'No se pudo cargar la canción. Revisa musica/Arctic Monkeys - Do I Wanna Know? (Official Video).mp3'
  );

});


// 5. ANIMACIÓN SUAVE DE LAS FOTOGRAFÍAS

const photoCards = document.querySelectorAll('.photo-card');

photoCards.forEach((card, index) => {

  card.style.opacity = '0';

  card.style.animation =
    `photoAppear 0.8s ease ${index * 0.12}s forwards`;

});


// Si una fotografía todavía no existe, mostrar un aviso bonito.

document.querySelectorAll('.photo-card img').forEach(img => {

  img.addEventListener('error', () => {

    img.style.display = 'none';

    const placeholder = document.createElement('div');

    placeholder.className = 'photo-placeholder';

    placeholder.innerHTML = `
      <span>♡</span>
      <p>Tu recuerdo especial</p>
    `;

    img.parentElement.insertBefore(
      placeholder,
      img.nextSibling
    );

  });

});


// 6. MENSAJE DE BIENVENIDA EN LA CONSOLA

console.log(`
  ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡

       CARLA & JHON

  Un pequeño universo creado
       con muchísimo amor.

  ♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡♡
`);


// 7. EFECTO DE APARICIÓN DE FOTOGRAFÍAS

const animationStyle = document.createElement('style');

animationStyle.textContent = `

  @keyframes photoAppear {

    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }

  }

  .photo-placeholder {

    width: 100%;
    height: 290px;
    background: linear-gradient(135deg, #321b3d, #160d20);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e8a1cf;
    border-radius: 9px;
    gap: 10px;

  }

  .photo-placeholder span {
    font-size: 45px;
  }

  .photo-placeholder p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 21px;
  }

  @media(max-width:700px) {

    .photo-placeholder {
      height: 190px;
    }

  }

  @media(max-width:370px) {

    .photo-placeholder {
      height: 260px;
    }

  }

`;

document.head.appendChild(animationStyle);
