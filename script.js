// Carrossel de fotos
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

// Função para mostrar um slide específico
function showSlide(index) {
    // Remove active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Ajusta o índice para loop circular
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Adiciona active ao slide e indicador atual
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Função para mudar slide (próximo/anterior)
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Função para ir direto a um slide específico
function goToSlide(index) {
    showSlide(index);
}

// Tornar as funções globais para uso no HTML
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

// Auto-play do carrossel
let autoPlayInterval = setInterval(() => {
    changeSlide(1);
}, 5000); // Muda a cada 5 segundos

// Pausa o auto-play quando o mouse está sobre o carrossel
const carousel = document.querySelector('.carousel-container');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

// Retoma o auto-play quando o mouse sai
carousel.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// Adiciona suporte para navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Adiciona efeito parallax suave ao scroll
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.stars');
    const parallax2 = document.querySelector('.stars2');
    const parallax3 = document.querySelector('.stars3');
    
    if (parallax && parallax2 && parallax3) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        parallax2.style.transform = `translateY(${scrolled * 0.3}px)`;
        parallax3.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Adiciona suporte para swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1); // Swipe left - próxima foto
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1); // Swipe right - foto anterior
    }
}

// Preload das imagens para melhor performance
window.addEventListener('load', () => {
    const images = document.querySelectorAll('.carousel-item img');
    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });
});

// Mensagem de boas-vindas
console.log('%c💝 Este site foi feito com muito amor! 💝', 
    'color: #ff69b4; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c"Foi o tempo que dedicaste à tua rosa que a fez tão importante" - O Pequeno Príncipe', 
    'color: #ffd700; font-style: italic; font-size: 14px;');

// Adiciona informação sobre como adicionar as fotos
console.log('%c📸 Para adicionar as fotos dela:', 'color: #ffb6c1; font-size: 16px; font-weight: bold;');
console.log('%cSubstitua os URLs placeholder no HTML pelos URLs das fotos reais', 'color: #fff; font-size: 14px;');
console.log('%cExemplo: src="foto1.jpg" ou src="https://link-da-foto.com/foto1.jpg"', 'color: #fff; font-size: 12px; font-style: italic;');