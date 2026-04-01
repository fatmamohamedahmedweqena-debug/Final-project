// ===== DOM LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('mainNav');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Counter Animation
    animateCounters();

    // Portfolio Filter
    initPortfolioFilter();

    // Smooth Scrolling
    initSmoothScroll();

    // Animate on Scroll
    initScrollAnimations();

    // Contact Form
    initContactForms();

    // Portfolio Items
    loadPortfolioItems();

    // Testimonials Slider
    initTestimonialsSlider();

    // Navbar Active Link
    setActiveNavLink();
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + (counter.getAttribute('data-suffix') || '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                    }
                };
                updateCounter();
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.portfolio-filters button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll, .service-card, .portfolio-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== CONTACT FORM =====
function initContactForms() {
    const forms = document.querySelectorAll('.contact-form, #contactForm');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('تم إرسال رسالتك بنجاح! سيتم الرد عليك خلال 24 ساعة.');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
}

// ===== PORTFOLIO ITEMS =====
function loadPortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const portfolioData = [
        {
            img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
            title: 'متجر إلكتروني',
            category: 'web',
            description: 'تطوير متجر إلكتروني كامل باستخدام React وNode.js'
        },
        {
            img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
            title: 'تطبيق موبايل',
            category: 'mobile',
            description: 'تطبيق توصيل طعام باستخدام React Native'
        },
        {
            img: 'https://images.unsplash.com/photo-1559028005-483782c23f0c?w=400&h=250&fit=crop',
            title: 'لوحة تحكم',
            category: 'web',
            description: 'Dashboard إداري باستخدام Vue.js وLaravel'
        },
        {
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
            title: 'تصميم UI Kit',
            category: 'design',
            description: 'مجموعة تصاميم UI/UX كاملة باستخدام Figma'
        },
        {
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop',
            title: 'Portfolio شخصي',
            category: 'web',
            description: 'موقع Portfolio احترافي باستخدام Next.js'
        },
        {
            img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop',
            title: 'تطبيق SaaS',
            category: 'mobile',
            description: 'تطبيق اشتراكي باستخدام Flutter وFirebase'
        }
    ];
    
    portfolioData.forEach(item => {
        const portfolioItem = `
            <div class="col-lg-4 col-md-6 portfolio-item ${item.category} animate-on-scroll">
                <img src="${item.img}" alt="${item.title}" class="img-fluid">
                <div class="portfolio-overlay">
                    <h5 class="mb-2">${item.title}</h5>
                    <p class="mb-3">${item.description}</p>
                    <div class="portfolio-links">
                        <a href="#" class="me-3"><i class="fas fa-eye"></i></a>
                        <a href="#"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            </div>
        `;
        portfolioGrid.innerHTML += portfolioItem;
    });
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    
    setInterval(() => {
        testimonials[currentSlide].style.opacity = '0.5';
        testimonials[currentSlide].style.transform = 'translateX(20px)';
        
        currentSlide = (currentSlide + 1) % testimonials.length;
        
        testimonials[currentSlide].style.opacity = '1';
        testimonials[currentSlide].style.transform = 'translateX(0)';
    }, 5000);
}

// ===== NAVBAR ACTIVE LINK =====
function setActiveNavLink() {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'btn btn-primary back-to-top rounded-circle shadow-lg';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 60px;
        height: 60px;
        z-index: 1000;
        display: none;
        border: none;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTop);
    
       window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== WOW SCROLL REVEAL =====
function initWowAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Observe all animate elements
    document.querySelectorAll('[class*="animate__"], .service-card, .portfolio-item, .testimonial-card, .contact-item').forEach(el => {
        revealObserver.observe(el);
    });
}

// ===== PARTICLE BACKGROUND (Hero Section) =====
function initParticles() {
    const heroSection = document.querySelector('.hero-section');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102,126,234,0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        heroSection.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    setInterval(createParticle, 300);
}

// ===== STATS ANIMATION =====
function animateStats() {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('h3');
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        let current = 0;
                        const duration = 2000;
                        const increment = target / (duration / 16);
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }, 16);
                    });
                }
            });
        });
        statsObserver.observe(statsSection);
    }
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ===== MOBILE MENU SMOOTH CLOSE =====
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show');
    });
    
    // Close menu when clicking on link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            });
            
            if (isValid) {
                submitForm(form);
            }
        });
    });
}

function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success message
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            تم إرسال رسالتك بنجاح! 
            سيتم الرد عليك خلال 24 ساعة.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Reset form
        form.reset();
        form.querySelectorAll('.is-valid').forEach(field => field.classList.remove('is-valid'));
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Auto remove alert
        setTimeout(() => {
            const alert = new bootstrap.Alert(alertDiv);
            alert.close();
        }, 5000);
    }, 1500);
}

// ===== ACTIVE PAGE CHECK (for multi-page) =====
function checkActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || href === `about.html` && currentPage === 'about.html') {
            link.classList.add('active');
        }
    });
}

// ===== INITIALIZATION =====
function initAll() {
    // Core features
    animateCounters();
    initPortfolioFilter();
    initSmoothScroll();
    initScrollAnimations();
    initContactForms();
    loadPortfolioItems();
    initTestimonialsSlider();
    setActiveNavLink();
    createBackToTop();
    initWowAnimations();
    initParticles();
    animateStats();
    initParallax();
    initMobileMenu();
    initFormValidation();
    
    // Page specific
    checkActivePage();
    
    console.log('🎉 AhmedDev Portfolio - Fully Loaded & Ready! 🚀');
}

// ===== WINDOW EVENTS =====
window.addEventListener('load', initAll);
window.addEventListener('resize', () => {
    // Re-init on resize for mobile
    setTimeout(initAll, 250);
});

// ===== SERVICE WORKER (PWA Ready) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// ===== EXPORT FUNCTIONS (for external use) =====
window.AhmedDevPortfolio = {
    reloadPortfolio: loadPortfolioItems,
    animateCounters,
    initSmoothScroll
};