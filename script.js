document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const counter = document.getElementById('slide-counter');

    // Slide 6 specific state
    const seqItems = document.querySelectorAll('#slide-6-list .seq-item');
    let seqIndex = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'past');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('past');
            }
        });
        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;

        // Reset slide 6 sequences if we navigate away
        if (currentSlide !== 5) {
            seqIndex = 0;
            seqItems.forEach(item => item.classList.remove('active'));
            if(seqItems[0]) seqItems[0].classList.add('active');
        }

        // Auto-scroller for Slide 5 iframe
        // Since we cannot inject script into cross-origin iframe to scroll it natively,
        // we will try to focus it so user arrow keys work out of the box.
        if (currentSlide === 4) {
            const iframe = document.getElementById('ai-graph-iframe');
            if(iframe) iframe.focus();
        }
    }

    function nextSlide() {
        // Special logic for Slide 6
        if (currentSlide === 5 && seqIndex < seqItems.length - 1) {
            seqItems[seqIndex].classList.remove('active');
            seqIndex++;
            seqItems[seqIndex].classList.add('active');
            return;
        }

        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function prevSlide() {
        // Special logic for Slide 6
        if (currentSlide === 5 && seqIndex > 0) {
            seqItems[seqIndex].classList.remove('active');
            seqIndex--;
            seqItems[seqIndex].classList.add('active');
            return;
        }

        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    // Event Listeners for Navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Slide 2 specific interaction
    const aiArrow = document.getElementById('ai-arrow');
    const slide2Dim = document.getElementById('slide-2-dim');
    const slide2Question = document.getElementById('slide-2-question');

    if (aiArrow) {
        aiArrow.addEventListener('click', () => {
            slide2Dim.classList.add('active');
            slide2Question.classList.add('active');
        });
        
        // Hide overlay if clicked again
        slide2Dim.addEventListener('click', () => {
            slide2Dim.classList.remove('active');
            slide2Question.classList.remove('active');
        });
        slide2Question.addEventListener('click', () => {
            slide2Dim.classList.remove('active');
            slide2Question.classList.remove('active');
        });
    }

    // Initialize
    updateSlides();
});
