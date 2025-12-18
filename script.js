/**
         * NMA ACADEMY WEBSITE LOGIC
         * Handles: Preloader, Navigation, Mobile Menu, Scroll Animations, Forms, and Reviews
         */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. PRELOADER
    // =========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // =========================================
    // 2. STICKY NAVIGATION BAR
    // =========================================
    const header = document.querySelector("#header");
    if (header) {
        window.addEventListener("scroll", function () {
            // Adds 'sticky' class when scrolled down > 0 pixels
            header.classList.toggle("sticky", window.scrollY > 0);
        });
    }

    // =========================================
    // 3. MOBILE HAMBURGER MENU
    // =========================================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        // Toggle menu open/close on click
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when a link is clicked (UX improvement)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // =========================================
    // 4. BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================
    // 5. SCROLL REVEAL ANIMATION
    // =========================================
    window.addEventListener('scroll', reveal);

    function reveal() {
        var reveals = document.querySelectorAll('.reveal');

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150; // Trigger distance from bottom

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    // Trigger once on load to show elements already in view
    reveal();

    // =========================================
    // 6. GENERIC FORM HANDLER FUNCTION
    // =========================================
    function handleFormSubmit(formId, btnSelector, successMsg, callback) {
        const form = document.querySelector(formId);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector(btnSelector);
                const originalText = btn.innerHTML; // Support HTML inside buttons (icons)

                // Visual Feedback
                btn.innerHTML = 'Processing...'; // Simple text or spinner could be passed
                btn.style.opacity = '0.7';
                btn.style.cursor = 'not-allowed';

                // Simulate Server Delay (1.5s)
                setTimeout(() => {
                    // Success State
                    btn.innerHTML = successMsg;
                    btn.style.backgroundColor = '#28a745'; // Green
                    btn.style.borderColor = '#28a745';
                    btn.style.color = '#fff';
                    btn.style.opacity = '1';

                    // Run specific callback (e.g., adding review to list)
                    if (callback) callback(this);

                    this.reset();

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                        btn.style.cursor = 'pointer';
                    }, 3000);
                }, 1500);
            });
        }
    }

    // =========================================
    // 7. INITIALIZE FORMS
    // =========================================

    // Contact Form
    handleFormSubmit('#contactForm', 'button', "Success! We'll contact you soon.");

    // Newsletter Form
    handleFormSubmit('.footer-form', 'button', '<i class="fas fa-check"></i> Subscribed!');

    // Review Form with Custom Logic
    handleFormSubmit('#reviewForm', 'button', 'Review Posted!', function (form) {
        const name = form.querySelector('#reviewName').value;
        const rating = form.querySelector('#reviewRating').value;
        const text = form.querySelector('#reviewText').value;
        const reviewsList = document.getElementById('reviewsList');

        // Create Stars HTML
        let starsHtml = '';
        for (let i = 0; i < rating; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }

        // Create New Review Card
        const newReview = document.createElement('div');
        newReview.classList.add('review-card');
        newReview.style.animation = "fadeIn 0.5s ease"; // Animation

        newReview.innerHTML = `
                    <div class="review-stars">${starsHtml}</div>
                    <p class="review-text">"${text}"</p>
                    <h4 class="review-author">- ${name}</h4>
                `;

        // Add to the top of the list
        if (reviewsList) {
            reviewsList.prepend(newReview);
            newReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

});