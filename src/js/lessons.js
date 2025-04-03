document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.lessons__item');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal__close');
    const formButtons = document.querySelectorAll('.modal__button[data-form]');
    const form = document.querySelector('.modal__form');


    items.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                closeAllModals();
                modal.classList.add('active');
            }
        });
    });


    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    formButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formModalId = button.getAttribute('data-form');
            const formModal = document.getElementById(formModalId);
            if (formModal) {
                closeAllModals();
                formModal.classList.add('active');
            }
        });
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('send-mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                closeAllModals();
                const successModal = document.getElementById('success-modal');
                successModal.classList.add('active');
                setTimeout(() => {
                    successModal.classList.remove('active');
                }, 2000); 
            } else {
                alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
        });
    });


    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});