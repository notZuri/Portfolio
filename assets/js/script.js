// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Typewriter effect for hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const taglineText = heroTagline.getAttribute('data-type') || heroTagline.textContent;
        heroTagline.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < taglineText.length) {
                heroTagline.textContent += taglineText.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            } else {
                // Optional: pause, then reset and repeat
                setTimeout(() => {
                    heroTagline.textContent = '';
                    i = 0;
                    typeWriter();
                }, 1800);
            }
        }
        typeWriter();
    }

    // Form validation with enhanced UX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // If validation passes, show success message
            showNotification('Thank you for your message! This is a demo form, so no message was actually sent.', 'success');
            contactForm.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('has-value');
            });
        });
    }

    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
            } else {
                entry.target.style.width = '0';
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Responsive Navbar Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('open');
        });
        // Close nav on link click (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth Scroll for Nav Links
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact Form Feedback (UI only)
    const formFeedback = document.getElementById('form-feedback');
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple validation
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            if (!name || !email || !message) {
                formFeedback.textContent = 'Please fill in all fields.';
                formFeedback.style.color = '#e74c3c';
                formFeedback.style.display = 'block';
                return;
            }
            // Simulate success
            formFeedback.textContent = 'Thank you! Your message has been sent (demo only).';
            formFeedback.style.color = '#4CAF50';
            formFeedback.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 4000);
        });
    }

    // Counting animation for About Me highlights
    const aboutSection = document.querySelector('.about');
    const highlightNumbers = document.querySelectorAll('.about-highlights .highlight-number');
    function animateCount(el, targetStr, duration = 1500) {
        // Extract number and suffix (e.g., 1000+)
        const match = targetStr.match(/([\d,]+)/);
        if (!match) return;
        const number = parseInt(match[1].replace(/,/g, ''));
        const suffix = targetStr.replace(match[1], '');
        let start = 0;
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * number);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = number.toLocaleString() + suffix;
            }
        }
        requestAnimationFrame(update);
    }
    if (aboutSection && highlightNumbers.length) {
        const aboutObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    highlightNumbers.forEach(numberEl => {
                        const valueEl = numberEl.querySelector('.highlight-value');
                        if (valueEl) {
                            const targetStr = valueEl.getAttribute('data-count');
                            animateCount(valueEl, targetStr);
                        }
                    });
                } else {
                    // Reset numbers to 0+ or 0 (with suffix) using data-count
                    highlightNumbers.forEach(numberEl => {
                        const valueEl = numberEl.querySelector('.highlight-value');
                        if (valueEl) {
                            const targetStr = valueEl.getAttribute('data-count');
                            const match = targetStr.match(/([\d,]+)/);
                            const suffix = match ? targetStr.replace(match[1], '') : '';
                            valueEl.textContent = '0' + suffix;
                        }
                    });
                }
            });
        }, { threshold: 0.4 });
        aboutObserver.observe(aboutSection);
    }
});

// Section reveal on scroll
(function() {
    const revealElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for old browsers
        revealElements.forEach(el => el.classList.add('visible'));
    }
})();

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Dark mode toggle logic
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
    const html = document.documentElement;
    const darkIcon = '🌙';
    const lightIcon = '☀️';

    function setTheme(isDark) {
        if (isDark) {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = lightIcon;
        } else {
            html.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = darkIcon;
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setTheme(true);
    else if (savedTheme === 'light') setTheme(false);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = !html.hasAttribute('data-theme') || html.getAttribute('data-theme') !== 'dark';
            setTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
})();

// Project modal logic
(function() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    let leftCol = null;
    let rightCol = null;
    let lastFocusedElement = null; // Track the opener for focus return
    // Carousel image lists for projects
    const projectCarousels = {
        'Shoepee': [
            'assets/img/shoepee/shoepee-main.png',
            'assets/img/shoepee/shoepee-desktopmobile2.png',
            'assets/img/shoepee/Shoepee-login.png',
            'assets/img/shoepee/shoepee-login-mobile.png',
            'assets/img/shoepee/shoepee-home.png',
            'assets/img/shoepee/shoepee-popular.png',
            'assets/img/shoepee/shoepee-quickview-modal.png',
            'assets/img/shoepee/shoepee-contact.png',
            'assets/img/shoepee/shoepee-products1.png',
            'assets/img/shoepee/shoepee-products2.png',
            'assets/img/shoepee/shoepee-selection-modal.png',
            'assets/img/shoepee/shoepee-cart-modal.png',
            'assets/img/shoepee/shoepee-info-modal.png',
            'assets/img/shoepee/shoepee-receipt1-modal.png',
            'assets/img/shoepee/shoepee-receipt2-modal.png',
            'assets/img/shoepee/shoepee-receipt3-modal.png',
            'assets/img/shoepee/shoepee-orderhistory.png',
            'assets/img/shoepee/shoepeemobile.png',
        ],
        'Attendance System': [
            'assets/img/Attendance-System/AS-main.png',
            'assets/img/Attendance-System/AS-prof-home-laptop-mobile.png',
            'assets/img/Attendance-System/AS-login.png',
            'assets/img/Attendance-System/AS-login-mobile.png',
            'assets/img/Attendance-System/AS-prof-home.png',
            'assets/img/Attendance-System/AS-prof-home-notification.png',
            'assets/img/Attendance-System/AS-prof-home-mobile.png',
            'assets/img/Attendance-System/AS-prof-home2.png',
            'assets/img/Attendance-System/AS-prof-home3.png',
            'assets/img/Attendance-System/AS-prof-students.png',
            'assets/img/Attendance-System/AS-prof-schedule.png',
            'assets/img/Attendance-System/AS-prof-attendance.png',
            'assets/img/Attendance-System/AS-prof-summary.png',
            'assets/img/Attendance-System/AS-reports1.png',
            'assets/img/Attendance-System/AS-reports2.png',
            'assets/img/Attendance-System/AS-prof-profile.png',
            'assets/img/Attendance-System/AS-student-home.png',
            'assets/img/Attendance-System/AS-student-home2.png',
            'assets/img/Attendance-System/AS-student-notification.png',
            'assets/img/Attendance-System/AS-student-notification-mobile.png',
            'assets/img/Attendance-System/AS-student-attendance.png',
            'assets/img/Attendance-System/AS-student-profile.png',
            'assets/img/Attendance-System/AS-student-profile2.png',
            
        

        ],
        'WTF Dashboard': [
            'assets/img/WTF-Dashboard/WTF-Dashboard-main.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard-main2.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard1.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard2.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard3.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard-mobile.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard-mobile2.png',
        ],
        'Portfolio': [
            'assets/img/Portfolio/portfolio-desktop-mobile1.png',
            'assets/img/Portfolio/portfolio-desktop-mobile2.png',
            'assets/img/Portfolio/portfolio-home.png',
            'assets/img/Portfolio/portfolio-mobile1.png',
            
        ],

    };

    function createCarousel(images, projectTitle) {
        let carouselIndex = 0;
        // let isAnimating = false; // Remove lock for rapid navigation
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'modal-carousel';
        images.forEach((src, i) => {
            const image = document.createElement('img');
            image.src = src;
            image.alt = projectTitle + ' screenshot ' + (i+1);
            image.className = 'carousel-image' + (i === 0 ? ' active' : '');
            image.style.display = i === 0 ? 'block' : 'none';
            carouselContainer.appendChild(image);
        });
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav prev';
        prevBtn.innerHTML = '&#10094;';
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav next';
        nextBtn.innerHTML = '&#10095;';
        carouselContainer.appendChild(prevBtn);
        carouselContainer.appendChild(nextBtn);
        // Add page counter
        const pageCounter = document.createElement('div');
        pageCounter.className = 'carousel-counter';
        pageCounter.textContent = `1 / ${images.length}`;
        carouselContainer.appendChild(pageCounter);
        const carouselIndicators = document.createElement('div');
        carouselIndicators.className = 'carousel-indicators';
        images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                animateToIndex(i);
            });
            carouselIndicators.appendChild(dot);
        });
        function clearAnimationClasses(imgs) {
            imgs.forEach(img => {
                img.classList.remove('slide-in-left', 'slide-in-right');
            });
        }
        let queuedIndex = null;
        function animateToIndex(newIndex) {
            if (newIndex === carouselIndex) return;
            const imgs = carouselContainer.querySelectorAll('.carousel-image');
            // If an animation is in progress, queue the last requested index
            if (carouselContainer._isAnimating) {
                queuedIndex = newIndex;
                return;
            }
            carouselContainer._isAnimating = true;
            // Remove all animation classes and force reflow
            imgs.forEach((img, i) => {
                img.classList.remove('from-left', 'from-right', 'to-left', 'to-right', 'active');
                void img.offsetWidth;
            });
            const direction = newIndex > carouselIndex ? 'left' : 'right';
            const outgoing = imgs[carouselIndex];
            const incoming = imgs[newIndex];
            // Set up initial state for incoming image
            incoming.style.display = 'block';
            incoming.classList.add(direction === 'left' ? 'from-right' : 'from-left');
            // Force reflow to apply initial transform
            void incoming.offsetWidth;
            // Start transition
            requestAnimationFrame(() => {
                outgoing.classList.add(direction === 'left' ? 'to-left' : 'to-right');
                outgoing.classList.remove('active');
                incoming.classList.remove('from-left', 'from-right');
                incoming.classList.add('active');
            });
            // After transition, clean up classes and hide outgoing image
            setTimeout(() => {
                imgs.forEach((img, i) => {
                    img.classList.remove('from-left', 'from-right', 'to-left', 'to-right');
                    img.style.display = i === newIndex ? 'block' : 'none';
                    if (i === newIndex) img.classList.add('active');
                    else img.classList.remove('active');
                });
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
                prevBtn.style.zIndex = 10;
                nextBtn.style.zIndex = 10;
                carouselContainer._isAnimating = false;
                if (queuedIndex !== null && queuedIndex !== newIndex) {
                    const nextQueued = queuedIndex;
                    queuedIndex = null;
                    animateToIndex(nextQueued);
                }
            }, 400);
            carouselIndex = newIndex;
            updateIndicators();
        }
        function showCarouselImage(direction) {
            const imgs = carouselContainer.querySelectorAll('.carousel-image');
            clearAnimationClasses(imgs);
            imgs.forEach((img, i) => {
                img.style.display = i === carouselIndex ? 'block' : 'none';
            });
            if (typeof direction === 'string') {
                imgs[carouselIndex].classList.add(direction === 'left' ? 'slide-in-left' : 'slide-in-right');
                setTimeout(() => {
                    imgs[carouselIndex].classList.remove('slide-in-left', 'slide-in-right');
                }, 500);
            }
            updateIndicators();
        }
        function updateIndicators() {
            const dots = carouselIndicators.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === carouselIndex);
            });
            const counter = carouselContainer.querySelector('.carousel-counter');
            if (counter) {
                counter.textContent = `${carouselIndex + 1} / ${images.length}`;
            }
        }
        prevBtn.onclick = () => {
            const newIndex = (carouselIndex - 1 + images.length) % images.length;
            animateToIndex(newIndex);
        };
        nextBtn.onclick = () => {
            const newIndex = (carouselIndex + 1) % images.length;
            animateToIndex(newIndex);
        };
        // Keyboard navigation
        carouselContainer.setAttribute('tabindex', '0');
        carouselContainer.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
        // Focus is now handled in openModal to avoid conflicts
        // setTimeout(() => { carouselContainer.focus(); }, 100);
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        return { carouselContainer, carouselIndicators, showCarouselImage };
    }

    function openModal(card) {
        lastFocusedElement = document.activeElement;
        // Remove old columns if present
        if (leftCol) { leftCol.remove(); leftCol = null; }
        if (rightCol) { rightCol.remove(); rightCol = null; }
        // Create new columns
        leftCol = document.createElement('div');
        leftCol.className = 'modal-left';
        rightCol = document.createElement('div');
        rightCol.className = 'modal-right';
        // Remove old carousel if any
        // The createCarousel function now handles its own carouselContainer and carouselIndicators
        // So we don't need to remove them here.
        // Get modal-content and clear it except close button
        const modalContent = modal.querySelector('.modal-content');
        Array.from(modalContent.children).forEach(child => {
            if (!child.classList.contains('modal-close')) child.remove();
        });
        // IMAGE/CAROUSEL LEFT
        const projectTitle = card.getAttribute('data-title');
        if (projectCarousels[projectTitle]) {
            const { carouselContainer, carouselIndicators, showCarouselImage } = createCarousel(projectCarousels[projectTitle], projectTitle);
            leftCol.appendChild(carouselContainer);
            leftCol.appendChild(carouselIndicators);
            showCarouselImage();
        } else {
            // Single image fallback
            const img = document.createElement('img');
            img.className = 'modal-image';
            img.src = card.getAttribute('data-image') || '';
            img.alt = projectTitle + ' image';
            leftCol.appendChild(img);
        }
        // DETAILS RIGHT
        const title = document.createElement('h3');
        title.className = 'modal-title';
        title.textContent = card.getAttribute('data-title') || '';
        const desc = document.createElement('p');
        desc.className = 'modal-description';
        desc.textContent = card.getAttribute('data-description') || '';
        // Tech tags
        const techLabel = document.createElement('div');
        techLabel.className = 'modal-tech-label';
        techLabel.textContent = 'Technologies';
        const tech = document.createElement('div');
        tech.className = 'modal-tech';
        (card.getAttribute('data-tech') || '').split(',').forEach(t => {
            if (t.trim()) {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = t.trim();
                tech.appendChild(tag);
            }
        });
        // Remove features section (no longer needed)
        // Links
        const links = document.createElement('div');
        links.className = 'modal-links';
        const demo = card.getAttribute('data-demo');
        const github = card.getAttribute('data-github');
        if (demo) {
            const a = document.createElement('a');
            a.href = demo;
            a.className = 'project-link live';
            a.target = '_blank';
            a.rel = 'noopener';
            a.innerHTML = '<span>🌐</span> Live Demo';
            links.appendChild(a);
        }
        if (github) {
            const a = document.createElement('a');
            a.href = github;
            a.className = 'project-link github';
            a.target = '_blank';
            a.rel = 'noopener';
            a.innerHTML = '<svg class="github-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub';
            links.appendChild(a);
        }
        rightCol.appendChild(title);
        rightCol.appendChild(desc);
        rightCol.appendChild(techLabel);
        rightCol.appendChild(tech);
        // No features appended
        rightCol.appendChild(links);
        // Add columns to modal
        modalContent.appendChild(leftCol);
        modalContent.appendChild(rightCol);
        modal.style.display = 'flex';
        modal.removeAttribute('inert');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { modal.focus(); }, 10);
        // Focus trap logic
        setTimeout(() => {
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
            const modalContent = modal.querySelector('.modal-content');
            const focusableEls = Array.from(modalContent.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
            // Prioritize focusing the carousel for immediate arrow key navigation
            const carouselContainer = modal.querySelector('.modal-carousel');
            if (carouselContainer) {
                carouselContainer.focus();
            } else if (focusableEls.length) {
                focusableEls[0].focus();
            }
            function trapFocus(e) {
                if (e.key !== 'Tab') return;
                const firstEl = focusableEls[0];
                const lastEl = focusableEls[focusableEls.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
            modal.addEventListener('keydown', trapFocus);
            modal._trapFocusHandler = trapFocus;
        }, 100);
    }
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        // Use inert if supported, fallback to tabindex="-1"
        if ('inert' in modal) {
            modal.inert = true;
        } else {
            modal.setAttribute('tabindex', '-1');
        }
        document.body.style.overflow = '';
        if (leftCol) { leftCol.remove(); leftCol = null; }
        if (rightCol) { rightCol.remove(); rightCol = null; }
        // Return focus to the last focused element (opener)
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
        // Remove focus trap
        if (modal._trapFocusHandler) {
            modal.removeEventListener('keydown', modal._trapFocusHandler);
            delete modal._trapFocusHandler;
        }
    }
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('a')) return;
            openModal(card);
        });
    });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (modal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
    });
    // Remove inert and tabindex when modal is shown
    if (modal.style.display !== 'none') {
        modal.removeAttribute('inert');
        modal.removeAttribute('tabindex');
    }
})();

// Resume Modal Logic
(function() {
    const resumeModal = document.getElementById('resume-modal');
    const resumeBtn = document.querySelector('.resume-btn');
    const closeBtn = resumeModal ? resumeModal.querySelector('.resume-modal-close') : null;
    const overlay = resumeModal ? resumeModal.querySelector('.resume-modal-overlay') : null;
    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.style.display = 'flex';
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Focus trap
        setTimeout(() => {
            const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
            const modalContent = resumeModal.querySelector('.resume-modal-content');
            const focusableEls = Array.from(modalContent.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
            if (focusableEls.length) {
                focusableEls[0].focus();
            }
            function trapFocus(e) {
                if (e.key !== 'Tab') return;
                const firstEl = focusableEls[0];
                const lastEl = focusableEls[focusableEls.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
            resumeModal.addEventListener('keydown', trapFocus);
            resumeModal._trapFocusHandler = trapFocus;
        }, 100);
    }
    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.style.display = 'none';
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // Remove focus trap
        if (resumeModal._trapFocusHandler) {
            resumeModal.removeEventListener('keydown', resumeModal._trapFocusHandler);
            delete resumeModal._trapFocusHandler;
        }
    }
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openResumeModal();
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeResumeModal);
    }
    if (overlay) {
        overlay.addEventListener('click', closeResumeModal);
    }
    // ESC key closes modal
    document.addEventListener('keydown', function(e) {
        if (resumeModal && resumeModal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) {
            closeResumeModal();
        }
    });
})();

// --- Smoke Effect for Hero Section ---
(function() {
    const hero = document.getElementById('hero');
    const canvas = document.getElementById('smoke-canvas');
    if (!hero || !canvas) return;
    let ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0, hovering: false };
    let dpr = window.devicePixelRatio || 1;
    let colorIndex = 0;
    // Get theme colors from CSS variables
    function getThemeColors() {
        const styles = getComputedStyle(document.documentElement);
        return [
            styles.getPropertyValue('--primary-color').trim(),
            styles.getPropertyValue('--secondary-color').trim(),
            styles.getPropertyValue('--accent-color').trim()
        ];
    }
    let themeColors = getThemeColors();
    // Listen for theme changes (if any)
    const observer = new MutationObserver(() => {
        themeColors = getThemeColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function resizeCanvas() {
        const rect = hero.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle(x, y) {
        // Cycle through theme colors for each particle
        colorIndex = (colorIndex + 1) % themeColors.length;
        const baseColor = themeColors[colorIndex];
        // Add alpha for blending
        const color = baseColor.replace(/#([0-9a-fA-F]{6})/, (m, hex) => {
            // Convert hex to rgba
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `rgba(${r},${g},${b},0.22)`;
        });
        return {
            x: x + randomBetween(-10, 10),
            y: y + randomBetween(-10, 10),
            radius: randomBetween(30, 60),
            alpha: 1,
            color,
            dx: randomBetween(-0.5, 0.5),
            dy: randomBetween(-0.5, 0.5),
            fade: randomBetween(0.008, 0.018)
        };
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            ctx.save();
            ctx.globalAlpha = p.alpha;
            let grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            grad.addColorStop(0, p.color);
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= p.fade;
            if (p.alpha <= 0) particles.splice(i, 1);
        }
    }

    function animate() {
        drawParticles();
        requestAnimationFrame(animate);
    }

    function addSmoke(e) {
        if (!mouse.hovering) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left);
        const y = (e.clientY - rect.top);
        for (let i = 0; i < 3; i++) {
            particles.push(createParticle(x, y));
        }
    }

    hero.addEventListener('mouseenter', () => { mouse.hovering = true; });
    hero.addEventListener('mouseleave', () => { mouse.hovering = false; });
    hero.addEventListener('mousemove', addSmoke);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
})();
