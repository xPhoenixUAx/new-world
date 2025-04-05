window.addEventListener('load', function() {
    var headerLinks = document.querySelectorAll('.header__link');
    console.log('Found header links:', headerLinks);
    headerLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Link clicked:', link.getAttribute('href'));
            var targetId = link.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                console.log('Target section found:', targetSection);
                var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 84;
                var targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                console.log('Scrolling to position:', targetPosition);
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                var nav = document.querySelector('.header__nav');
                var burger = document.querySelector('.header__burger');
                if (nav && nav.classList.contains('active')) {
                    burger.classList.remove('active');
                    nav.classList.remove('active');
                }
            } else {
                console.log('Target section not found for ID:', targetId);
            }
        });
    });
});