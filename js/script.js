// ============================================
// СЛАЙДШОУ
// ============================================
(function() {
    const SLIDES_FOLDER = 'slides/';
    const EXT = 'jpg';
    const TOTAL = 3;
    const INTERVAL = 4500;

    const bg = document.getElementById('heroBg');
    const dotsContainer = document.getElementById('heroDots');

    let slides = [];
    let dots = [];
    let current = 0;
    let interval;
    let loadedCount = 0;

    function createSlides() {
        bg.innerHTML = '';
        dotsContainer.innerHTML = '';
        slides = [];
        dots = [];

        for (let i = 1; i <= TOTAL; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            if (i === 1) slide.classList.add('active');
            slide.style.backgroundColor = '#0a0a0a';

            const img = new Image();
            img.onload = function() {
                slide.style.backgroundImage = `url('${SLIDES_FOLDER}${i}.${EXT}')`;
                loadedCount++;
                if (i === 1 && loadedCount === 1) {
                    slide.classList.add('loaded');
                }
            };
            img.onerror = function() {
                slide.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
                console.warn('⚠️ Слайд ' + i + ' не загружен');
            };
            img.src = SLIDES_FOLDER + i + '.' + EXT;

            bg.appendChild(slide);
            slides.push(slide);

            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 1) dot.classList.add('active');
            dot.dataset.index = i - 1;
            dot.addEventListener('click', function() {
                goTo(parseInt(this.dataset.index));
                resetInterval();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    function goTo(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(function(s) {
            s.classList.remove('active');
            s.style.transform = 'scale(1)';
        });
        dots.forEach(function(d) {
            d.classList.remove('active');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        current = index;
    }

    function next() {
        goTo(current + 1);
    }

    function startInterval() {
        if (interval) clearInterval(interval);
        interval = setInterval(next, INTERVAL);
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    var hero = document.getElementById('hero');
    hero.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    hero.addEventListener('mouseleave', function() {
        startInterval();
    });

    var touchStartX = 0;
    var touchStartY = 0;
    hero.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    hero.addEventListener('touchend', function(e) {
        var diffX = touchStartX - e.changedTouches[0].screenX;
        var diffY = touchStartY - e.changedTouches[0].screenY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
            if (diffX > 0) next();
            else goTo(current - 1);
            resetInterval();
        }
    }, { passive: true });

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(interval);
        } else {
            startInterval();
        }
    });

    createSlides();
    startInterval();
})();

// ============================================
// БУРГЕР
// ============================================
var burger = document.getElementById('burger');
var navMenu = document.getElementById('navMenu');

burger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        burger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// ============================================
// ХЕДЕР ПРИ СКРОЛЛЕ
// ============================================
var header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('load', handleScroll);

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer)
// ============================================
var fadeElements = document.querySelectorAll('.fade-up');

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(function(el) {
    observer.observe(el);
});

// ============================================
// КНОПКА НАВЕРХ
// ============================================
var backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// ============================================
// ЗАПРЕТ КОНТЕКСТНОГО МЕНЮ
// ============================================
document.addEventListener('contextmenu', function(e) {
    // Запрещаем на изображениях
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});