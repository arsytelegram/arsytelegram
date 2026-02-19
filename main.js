// js/main.js

/**
 * ARSY iOS 26 - Main JavaScript
 * Обработка частиц, параллакса и анимаций
 */

// Функция для создания частиц
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Очищаем предыдущие частицы
    particlesContainer.innerHTML = '';
    
    // Создаем 30 частиц
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайное позиционирование
        particle.style.left = Math.random() * 100 + '%';
        
        // Случайные задержки и длительность анимации
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = 10 + Math.random() * 20 + 's';
        
        // Случайный размер
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Функция для параллакс эффекта при движении мыши
function setupParallax() {
    document.addEventListener('mousemove', function(e) {
        const spheres = document.querySelectorAll('.decoration-sphere');
        const card = document.querySelector('.glass-card');
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Движение декоративных сфер
        spheres.forEach((sphere, index) => {
            const speed = (index + 1) * 20;
            sphere.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
        });

        // Наклон карточки
        if (card) {
            const rotateX = (y - 0.5) * 5;
            const rotateY = (x - 0.5) * 5;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        }
    });
}

// Функция для анимации кнопок при загрузке
function animateButtonsOnLoad() {
    const buttons = document.querySelectorAll('.ios-button');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.95)';
        button.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.8s cubic-bezier(0.2, 0.9, 0.3, 1)';
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
            button.style.filter = 'blur(0)';
        }, 300 + (index * 150));
    });
}

// Функция для эффекта при скролле
function setupScrollEffect() {
    window.addEventListener('scroll', function() {
        const card = document.querySelector('.glass-card');
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        if (card && !isNaN(scrollPercent)) {
            card.style.opacity = 1 - (scrollPercent * 0.5);
            card.style.filter = 'blur(' + (scrollPercent * 5) + 'px)';
        }
    });
}

// Функция для обработки ресайза окна
function handleResize() {
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Пересоздаем частицы при ресайзе для лучшей адаптации
            createParticles();
        }, 250);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupParallax();
    animateButtonsOnLoad();
    setupScrollEffect();
    handleResize();
    
    // Логирование для отладки
    console.log('ARSY iOS 26 сайт успешно загружен');
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Произошла ошибка:', e.error);
});

// Оптимизация для мобильных устройств
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}