const reviewsContainer = document.querySelector('.reviews-container');
    const reviewCards = document.querySelectorAll('.review-card');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;


    function updateCards() {
        reviewCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        updateIndicators();
    }


    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }


    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        updateCards();
    });

    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
        updateCards();
    });

 
    updateCards();