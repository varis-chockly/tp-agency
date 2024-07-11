document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.card-slider');
    const cards = document.querySelector('.cards');
    const dotsContainer = document.querySelector('.dots');
    
    let currentIndex = 0;
    let cardWidth = 320; // Default: 300px card width + 20px margin
    let visibleCards = 3;
    const totalCards = document.querySelectorAll('.card').length;
    let maxIndex = totalCards - visibleCards;
    let startX = 0;
    let isDragging = false;
    let startTouchX = 0;

    function updateSliderConfig() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
            cardWidth = 155; // 150px card width + 5px margin
            visibleCards = 2;
        } else if (screenWidth <= 768) {
            cardWidth = 210; // 200px card width + 10px margin
            visibleCards = 3;
        } else {
            cardWidth = 320; // 300px card width + 20px margin
            visibleCards = 3;
        }
        maxIndex = Math.max(0, totalCards - visibleCards);
        createDots();
        updateSlider();
    }

    function createDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        cards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function handleTouchStart(e) {
        startX = cards.scrollLeft + e.touches[0].clientX;
        startTouchX = e.touches[0].clientX;
        isDragging = true;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        const touchX = e.touches[0].clientX;
        const moveX = startTouchX - touchX;
        cards.scrollLeft = startX + moveX;
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        const touchX = e.changedTouches[0].clientX;
        const moveX = startTouchX - touchX;
        if (Math.abs(moveX) > 50) { // adjust threshold as needed
            if (moveX > 0 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (moveX < 0 && currentIndex > 0) {
                currentIndex--;
            }
        }
        updateSlider();
    }

    // Initialize slider
    updateSliderConfig();
    window.addEventListener('resize', updateSliderConfig);

    // Add touch event listeners
    cards.addEventListener('touchstart', handleTouchStart);
    cards.addEventListener('touchmove', handleTouchMove);
    cards.addEventListener('touchend', handleTouchEnd);
});
