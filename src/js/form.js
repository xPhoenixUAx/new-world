
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.modal__form');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const submitButton = form.querySelector('.modal__button');
      submitButton.disabled = true;

      fetch('send-mail.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Formularz został pomyślnie wysłany!');
            form.reset();
          } else {
            alert(data.message || 'Wystąpił błąd. Spróbuj ponownie.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Wystąpił błąd podczas wysyłania formularza.');
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  });
