// ============================================
// ФОРМА — ОТПРАВКА ЗАЯВКИ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    // ==========================================
    // ВСТАВЬ ССЫЛКУ ИЗ GOOGLE APPS SCRIPT
    // ==========================================
    var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby25fQ2XxGYlFD-3qX05_fbo70hzMSNosxgvRZlvnltVM_mn3lsdBZ6vRLYIojs2MPS0Q/exec';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.getElementById('formName');
        var phone = document.getElementById('formPhone');
        var email = document.getElementById('formEmail');
        var message = document.getElementById('formMessage');

        // Сброс ошибок
        [name, phone, email, message].forEach(function(field) {
            field.style.borderColor = '';
        });

        var errors = [];

        // 1. Имя — обязательно
        if (name.value.trim().length < 2) {
            errors.push('Имя должно содержать минимум 2 символа');
            name.style.borderColor = '#e74c3c';
        }

        // 2. Контакт — телефон ИЛИ email (хотя бы один)
        var phoneClean = phone.value.replace(/[\s()-]/g, '');
        var isPhoneValid = /^\+?\d{10,}$/.test(phoneClean);
        var isEmailValid = email.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

        var contact = '';
        if (isPhoneValid) contact = 'Телефон: ' + phone.value.trim();
        if (isEmailValid) contact += (contact ? ' | ' : '') + 'Email: ' + email.value.trim();
        if (!isPhoneValid && !isEmailValid) {
            errors.push('Укажите телефон или email для связи');
            phone.style.borderColor = '#e74c3c';
            email.style.borderColor = '#e74c3c';
        }

        // 3. Сообщение — обязательно
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

        // Собираем данные
        var data = {
            name: name.value.trim(),
            contact: contact,
            text: message.value.trim()
        };

        // Отправляем
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(function() {
            alert('✅ Заявка отправлена! Мы свяжемся с вами.');
            form.reset();
        })
        .catch(function(error) {
            alert('❌ Ошибка отправки. Попробуйте позже или позвоните нам.');
            console.error('Ошибка:', error);
        })
        .finally(function() {
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
});