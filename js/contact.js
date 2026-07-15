// ============================================
// ФОРМА — ВАЛИДАЦИЯ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
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

        var btn = form.querySelector('.btn-primary');
        var originalText = btn.textContent;
        btn.textContent = 'Отправка...';
        btn.disabled = true;

        setTimeout(function() {
            alert('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1200);
    });
});