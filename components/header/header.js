function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate-key');
  
      if (element.querySelector('[data-translate-key]')) return;
  
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'IMG') {
          element.setAttribute('alt', translations[lang][key]);
        } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', translations[lang][key]);
        } else {
          element.innerHTML = translations[lang][key];
        }
      }
    });
  }
  
  function getCurrentLanguage() {
    return localStorage.getItem('language') || 'pl';
  }
  
  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations(lang);
  }
  
  function loadHeader() {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'components/header/header.css';
    document.head.appendChild(style);
  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/header/header.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.body.insertAdjacentHTML('afterbegin', xhr.responseText);
  
        var burger = document.querySelector('.header__burger');
        var nav = document.querySelector('.header__nav');
        burger.addEventListener('click', function () {
          burger.classList.toggle('active');
          nav.classList.toggle('active');
        });
  
        var langToggle = document.querySelector('.header__lang-toggle');
        var langList = document.querySelector('.header__lang-list');
        var langFlag = document.querySelector('.header__lang-flag');
        var langText = document.querySelector('.header__lang-text');
        var langArrow = document.querySelector('.header__lang-arrow');
        var langItems = document.querySelectorAll('.header__lang-list li');
        var langData = {
          pl: { icon: '/src/img/icon/len-pl.svg', alt: 'PL' },
          uk: { icon: '/src/img/icon/len-ua.svg', alt: 'UK' },
          ru: { icon: '/src/img/icon/len-rus.svg', alt: 'RU' },
          en: { icon: '/src/img/icon/len-usa.svg', alt: 'EN' }
        };
  
        const currentLang = getCurrentLanguage();
        langItems.forEach(function (item) {
          if (item.getAttribute('data-lang') === currentLang) {
            const selectedLang = item.getAttribute('data-lang');
            langFlag.src = langData[selectedLang].icon;
            langFlag.alt = selectedLang.toUpperCase();
            langText.textContent = selectedLang.toUpperCase();
          }
        });
        applyTranslations(currentLang);
  
        langToggle.addEventListener('click', function (e) {
          e.stopPropagation();
          langToggle.classList.toggle('active');
          langList.classList.toggle('active');
        });
  
        langItems.forEach(function (item) {
          item.addEventListener('click', function () {
            var selectedLang = item.getAttribute('data-lang');
            langFlag.src = langData[selectedLang].icon;
            langFlag.alt = selectedLang.toUpperCase();
            langText.textContent = selectedLang.toUpperCase();
            langList.classList.remove('active');
            langToggle.classList.remove('active');
  
            setLanguage(selectedLang);
          });
        });
  
        document.addEventListener('click', function (e) {
          if (!langToggle.contains(e.target) && !langList.contains(e.target)) {
            langList.classList.remove('active');
            langToggle.classList.remove('active');
          }
        });
      }
    };
    xhr.send();
  }
  
  function loadFooter() {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'components/footer/footer.css';
    document.head.appendChild(style);
  
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'components/footer/footer.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.body.insertAdjacentHTML('beforeend', xhr.responseText);
  
        const currentLang = getCurrentLanguage();
        applyTranslations(currentLang);
  
        const form = document.querySelector('.footer-form');
        form.addEventListener('submit', function (event) {
          event.preventDefault();
  
          const formData = new FormData(form);
          const submitButton = form.querySelector('.footer-form-button');
          submitButton.disabled = true;
  
          fetch('send-mail.php', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert(translations[currentLang]['form_success_message'] || 'Formularz został pomyślnie wysłany!');
                form.reset();
              } else {
                alert(data.message || translations[currentLang]['form_error_message'] || 'Wystąpił błąd. Spróbuj ponownie.');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert(translations[currentLang]['form_error_message'] || 'Wystąpił błąd podczas wysyłania formularza.');
            })
            .finally(() => {
              submitButton.disabled = false;
            });
        });
      }
    };
    xhr.send();
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    loadHeader();
    loadFooter();
  });