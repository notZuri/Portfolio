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

    // Add typing effect to tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
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
    // Remove old content structure
    let leftCol = null;
    let rightCol = null;
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
            
        

        ],
        'WTF Dashboard': [
            'assets/img/WTF-Dashboard/WTF-Dashboard-main.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard-main2.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard1.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard2.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard3.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard-mobile.png',
            'assets/img/WTF-Dashboard/WTF-Dashboard-mobile2.png',
        ]
    };

    function createCarousel(images, projectTitle) {
        let carouselIndex = 0;
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'modal-carousel';
        images.forEach((src, i) => {
            const image = document.createElement('img');
            image.src = src;
            image.alt = projectTitle + ' screenshot ' + (i+1);
            image.className = 'carousel-image';
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
                carouselIndex = i;
                showCarouselImage();
            });
            carouselIndicators.appendChild(dot);
        });
        function showCarouselImage() {
            const imgs = carouselContainer.querySelectorAll('.carousel-image');
            imgs.forEach((img, i) => {
                img.style.display = i === carouselIndex ? 'block' : 'none';
            });
            const dots = carouselIndicators.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === carouselIndex);
            });
            // Update page counter
            const counter = carouselContainer.querySelector('.carousel-counter');
            if (counter) {
                counter.textContent = `${carouselIndex + 1} / ${images.length}`;
            }
        }
        prevBtn.onclick = () => {
            carouselIndex = (carouselIndex - 1 + images.length) % images.length;
            showCarouselImage();
        };
        nextBtn.onclick = () => {
            carouselIndex = (carouselIndex + 1) % images.length;
            showCarouselImage();
        };
        return { carouselContainer, carouselIndicators, showCarouselImage };
    }

    function openModal(card) {
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
        // Features
        const features = document.createElement('div');
        features.className = 'modal-features';
        (card.getAttribute('data-features') || '').split(',').forEach(f => {
            if (f.trim()) {
                const feat = document.createElement('span');
                feat.className = 'feature-item';
                feat.textContent = f.trim();
                features.appendChild(feat);
            }
        });
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
        rightCol.appendChild(tech);
        rightCol.appendChild(features);
        rightCol.appendChild(links);
        // Add columns to modal
        modalContent.appendChild(leftCol);
        modalContent.appendChild(rightCol);
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { modal.focus(); }, 10);
    }
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (leftCol) { leftCol.remove(); leftCol = null; }
        if (rightCol) { rightCol.remove(); rightCol = null; }
        // The createCarousel function now handles its own carouselContainer and carouselIndicators
        // So we don't need to remove them here.
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
    let colorAngle = 0;

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
        colorAngle = (colorAngle + 7) % 360;
        const color = `hsla(${colorAngle}, 70%, 70%, 0.25)`;
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
