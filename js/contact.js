// ============================================
// ФОРМА — С КРАСИВЫМ УВЕДОМЛЕНИЕМ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby25fQ2XxGYlFD-3qX05_fbo70hzMSNosxgvRZlvnltVM_mn3lsdBZ6vRLYIojs2MPS0Q/exec';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.getElementById('formName');
        var phone = document.getElementById('formPhone');
        var email = document.getElementById('formEmail');
        var message = document.getElementById('formMessage');

        [name, phone, email, message].forEach(function(field) {
            field.style.borderColor = '';
        });

        var errors = [];

        if (name.value.trim().length < 2) {
            errors.push('Имя должно содержать минимум 2 символа');
            name.style.borderColor = '#e74c3c';
        }

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

        var data = {
            name: name.value.trim(),
            contact: contact,
            text: message.value.trim()
        };

        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(function() {
            // ✅ ПОКАЗЫВАЕМ КРАСИВОЕ УВЕДОМЛЕНИЕ
            showNotification();
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

// ============================================
// ФУНКЦИЯ ПОКАЗА УВЕДОМЛЕНИЯ
// ============================================
function showNotification() {
    var notification = document.getElementById('formNotification');
    notification.classList.add('active');
}

function closeNotification() {
    var notification = document.getElementById('formNotification');
    notification.classList.remove('active');
}

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeNotification();
    }
});

// Закрытие по клику на фон
document.getElementById('formNotification').addEventListener('click', function(e) {
    if (e.target === this) {
        closeNotification();
    }
});