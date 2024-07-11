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

    function handleMouseDown(e) {
        startX = e.pageX;
        isDragging = true;
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        const moveX = e.pageX - startX;
        cards.style.transform = `translateX(${-currentIndex * cardWidth + moveX}px)`;
    }

    function handleMouseUp(e) {
        if (!isDragging) return;
        const moveX = e.pageX - startX;
        if (moveX > 100 && currentIndex > 0) {
            currentIndex--;
        } else if (moveX < -100 && currentIndex < maxIndex) {
            currentIndex++;
        }
        updateSlider();
        isDragging = false;
    }

    function handleTouchStart(e) {
        startX = e.touches[0].pageX;
        isDragging = true;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        const moveX = e.touches[0].pageX - startX;
        cards.style.transform = `translateX(${-currentIndex * cardWidth + moveX}px)`;
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        const moveX = e.changedTouches[0].pageX - startX;
        if (moveX > 100 && currentIndex > 0) {
            currentIndex--;
        } else if (moveX < -100 && currentIndex < maxIndex) {
            currentIndex++;
        }
        updateSlider();
        isDragging = false;
    }

    // Initialize slider
    updateSliderConfig();
    window.addEventListener('resize', updateSliderConfig);

    // Add event listeners
    cards.addEventListener('mousedown', handleMouseDown);
    cards.addEventListener('mousemove', handleMouseMove);
    cards.addEventListener('mouseup', handleMouseUp);
    cards.addEventListener('mouseleave', handleMouseUp);

    cards.addEventListener('touchstart', handleTouchStart);
    cards.addEventListener('touchmove', handleTouchMove);
    cards.addEventListener('touchend', handleTouchEnd);
});
