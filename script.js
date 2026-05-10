document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor Removed ---

    // --- 2. Mobile Menu Toggle ---
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar) navbar.classList.remove('active');
            if (menuIcon) menuIcon.querySelector('i').classList.replace('bx-x', 'bx-menu');
        });
    });

    // --- 3. Sticky Header & Scroll Spy ---
    const header = document.getElementById('header') || document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scroll Progress Bar
        if (scrollProgress) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (current && href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 4. Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const textArray = ["Data Science Enthusiast", "Cybersecurity Learner", "Python Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before new text
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        setTimeout(type, 1500);
    }

    // --- 5. Reveal Animations on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger Skill Bars if inside
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const targetWidth = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 500);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.pb-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');

    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // --- 7. Magnetic Buttons Effect ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    if (window.innerWidth > 768) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function (e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // --- 8. Removed Timeline Scroll Animation ---

    // --- 9. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const statsContainer = document.getElementById('stats-container');
    let counted = false;

    if (statsContainer) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;

                        // Increment speed based on target
                        const inc = target / 50;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.5 });

        counterObserver.observe(statsContainer);
    }

    // --- 10. Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic animation for button
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = originalText;
                successMessage.classList.add('show');
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 1500);
        });
    }

    // --- 11. Image Lightbox ---
    const galleryImages = document.querySelectorAll('.gallery-img, img[alt="Organizing Committee Flyer"]');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.title = 'Click to zoom';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // --- 12. Auto-archive passed events ---
    const autoArchiveCards = document.querySelectorAll('.auto-archive-role');
    const pastRolesGrids = document.querySelectorAll('.volunteer-grid');
    if (autoArchiveCards.length > 0 && pastRolesGrids.length >= 2) {
        const pastGrid = pastRolesGrids[1]; // The second grid corresponds to Past Roles
        const today = new Date();
        autoArchiveCards.forEach(card => {
            const endDateAttr = card.getAttribute('data-end-date');
            if (endDateAttr) {
                const endDate = new Date(endDateAttr);
                // Set the time to end of day
                endDate.setHours(23, 59, 59, 999);
                if (today > endDate) {
                    // Update 'Present' to actual end date
                    const dateSpan = card.querySelector('span[style*="font-size: 0.85rem"]');
                    if (dateSpan) {
                        const formattedEndDate = endDateAttr.replace(/-/g, '/');
                        dateSpan.innerHTML = dateSpan.innerHTML.replace('- Present', `- ${formattedEndDate}`);
                    }
                    // Move to Past Roles
                    pastGrid.prepend(card);
                    // Update visual order since it shifts
                    card.style.transitionDelay = '0.1s';
                }
            }
        });
    }
});
