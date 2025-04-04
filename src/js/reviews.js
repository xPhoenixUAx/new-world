document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.reviews__wrapper');
    const items = document.querySelectorAll('.reviews__item');
    const dots = document.querySelectorAll('.reviews__dot');
    const prevBtn = document.querySelector('.reviews__nav-prev');
    const nextBtn = document.querySelector('.reviews__nav-next');
    let currentIndex = 0;
    const totalItems = items.length;
    const visibleItems = 3;

    const cloneItems = () => {
        for (let i = 0; i < visibleItems; i++) {
            const clone = items[i].cloneNode(true);
            wrapper.appendChild(clone);
        }
        for (let i = 0; i < visibleItems; i++) {
            const clone = items[totalItems - 1 - i].cloneNode(true);
            wrapper.insertBefore(clone, wrapper.firstChild);
        }
        wrapper.style.transform = `translateX(-${visibleItems * (items[0].offsetWidth + 20)}px)`;
    };

    const updateSlider = () => {
        const itemWidth = items[0].offsetWidth + 20;
        wrapper.style.transform = `translateX(-${(currentIndex + visibleItems) * itemWidth}px)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[Math.abs(currentIndex) % (totalItems / visibleItems)].classList.add('active');

        if (currentIndex >= totalItems) {
            setTimeout(() => {
                wrapper.style.transition = 'none';
                currentIndex = 0;
                wrapper.style.transform = `translateX(-${(currentIndex + visibleItems) * itemWidth}px)`;
                setTimeout(() => {
                    wrapper.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        } else if (currentIndex < -totalItems) {
            setTimeout(() => {
                wrapper.style.transition = 'none';
                currentIndex = 0;
                wrapper.style.transform = `translateX(-${(currentIndex + visibleItems) * itemWidth}px)`;
                setTimeout(() => {
                    wrapper.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        }
    };

    cloneItems();
    updateSlider();

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * (totalItems / visibleItems);
            updateSlider();
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            currentIndex++;
            updateSlider();
        }
        if (touchEndX - touchStartX > 50) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);
});