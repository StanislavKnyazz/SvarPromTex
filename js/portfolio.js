// ============================================
// ПОРТФОЛИО — ПОЛНАЯ ВЕРСИЯ
// ============================================
(function() {
    var grid = document.getElementById('portfolioGrid');

    // ==========================================
    // МАССИВ С РАБОТАМИ — РЕДАКТИРУЙ ЗДЕСЬ
    // ==========================================
    var works = [
        { img: 'img/portfolio/work-1.jpg', title: 'Изготовление буровых штанг', desc: '' },
        { img: 'img/portfolio/work-2.jpg', title: 'Сварка кронштейна для робота-краулера', desc: '' },
        { img: 'img/portfolio/work-3.jpg', title: 'Сварка рамы для ЧПУ станка', desc: '' },
        { img: 'img/portfolio/work-4.jpg', title: 'Сварка рамы для ЧПУ станка', desc: '' },
        { img: 'img/portfolio/work-5.jpg', title: 'Сварка рамы', desc: '' },
        { img: 'img/portfolio/work-6.jpg', title: 'Сварка кронштейна', desc: '' },
    ];

    // ==========================================
    // ГЕНЕРАЦИЯ КАРТОЧЕК
    // ==========================================
    if (grid) {
        works.forEach(function(work, index) {
            var item = document.createElement('div');
            item.className = 'portfolio-item';
            item.style.animationDelay = (index * 0.06) + 's';

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

            // Клик для зума
            item.addEventListener('click', function() {
                openZoom(work.img, work.title, work.desc);
            });
        });
    }

    // ==========================================
    // ЗУМ — ОТКРЫТИЕ
    // ==========================================
    function openZoom(src, title, desc) {
        var modal = document.getElementById('zoomModal');
        var image = document.getElementById('zoomImage');
        var titleEl = document.getElementById('zoomTitle');
        var descEl = document.getElementById('zoomDesc');

        if (!modal || !image) return;

        image.src = src;
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // ==========================================
    // ЗУМ — ЗАКРЫТИЕ ПО КЛИКУ НА ФОН
    // ==========================================
    var modal = document.getElementById('zoomModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeZoom();
            }
        });
    }

    // ==========================================
    // ЗУМ — ЗАКРЫТИЕ ПО ESC
    // ==========================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeZoom();
        }
    });

    function closeZoom() {
        var modal = document.getElementById('zoomModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

})();