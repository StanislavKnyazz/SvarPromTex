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
                slide.style.backgroundImage = `
                    url('${SLIDES_FOLDER}${i}.${EXT}')
                `;
                loadedCount++;
                if (i === 1 && loadedCount === 1) {
                    slide.classList.add('loaded');
                }
            };
            img.onerror = function() {
                slide.style.background = `
                    linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)
                `;
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
// ПОРТФОЛИО — ЗАГРУЗКА ИЗОБРАЖЕНИЙ
// ============================================
(function() {
    var grid = document.getElementById('portfolioGrid');

    var works = [
        { img: 'img/portfolio/work-1.jpg', title: 'Изготовлеие буровых штанг', desc:''},
        { img: 'img/portfolio/work-2.jpg', title: 'Сварка кронштейна для робота-краулера', desc:''},
        { img: 'img/portfolio/work-3.jpg', title: 'Сварка рамы для ЧПУ станка', desc:''},
        { img: 'img/portfolio/work-4.jpg', title: 'Сварка рамы для ЧПУ станка', desc:''},
        { img: 'img/portfolio/work-5.jpg', title: 'Сварка рамы', desc:''},
        { img: 'img/portfolio/work-6.jpg', title: 'Сварка Кронштейна', desc:''}
    ];

    works.forEach(function(work, index) {
        var item = document.createElement('div');
        item.className = 'portfolio-item fade-up';
        item.style.animationDelay = (index * 0.08) + 's';

        var img = document.createElement('img');
        img.src = work.img;
        img.alt = work.title;
        img.loading = 'lazy';

        var overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = '<h4>' + work.title + '</h4><span>' + work.desc + '</span>';

        item.appendChild(img);
        item.appendChild(overlay);
        grid.appendChild(item);
    });

    document.querySelectorAll('.portfolio-item').forEach(function(el) {
        observer.observe(el);
    });
})();

// ============================================
// ФОРМА — ВАЛИДАЦИЯ И ОТПРАВКА
// ============================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('formName');
    var phone = document.getElementById('formPhone');
    var email = document.getElementById('formEmail');
    var message = document.getElementById('formMessage');

    var fields = [name, phone, email, message];
    fields.forEach(function(field) {
        field.style.borderColor = '';
    });

    var errors = [];

    if (name.value.trim().length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
        name.style.borderColor = '#e74c3c';
    }

    var phoneClean = phone.value.replace(/[\s()-]/g, '');
    if (!/^\+?\d{10,}$/.test(phoneClean)) {
        errors.push('Введите корректный номер телефона (минимум 10 цифр)');
        phone.style.borderColor = '#e74c3c';
    }

    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.push('Введите корректный email');
        email.style.borderColor = '#e74c3c';
    }

    if (message.value.trim().length < 5) {
        errors.push('Опишите вашу задачу подробнее (минимум 5 символов)');
        message.style.borderColor = '#e74c3c';
    }

    if (errors.length > 0) {
        alert('⚠️ Пожалуйста, исправьте ошибки:\n\n• ' + errors.join('\n• '));
        return;
    }

    var btn = this.querySelector('.btn-primary');
    var originalText = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    setTimeout(function() {
        alert('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        document.getElementById('contactForm').reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1200);
});