const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// SMOOTH SCROLLING FOR ANCHOR LINKS

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// SCROLL ANIMATIONS

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with slide-up class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .why-us-card, .process-step, .industry-card, .highlight-card');
    
    animatedElements.forEach(el => {
        el.classList.add('slide-up');
        observer.observe(el);
    });
});

// SECTION REVEAL ANIMATIONS

const sectionObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

// Observe all sections with reveal class (excluding hero)
document.addEventListener('DOMContentLoaded', () => {
    const revealSections = document.querySelectorAll('section.reveal');
    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// ACTIVE NAV LINK ON SCROLL


const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// CONTACT FORM HANDLING

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    console.log('Form submitted:', formData);
    
    // Show success message (you can replace this with a proper notification)
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
});

// SET CURRENT YEAR IN FOOTER

document.getElementById('currentYear').textContent = new Date().getFullYear();

// PERFORMANCE OPTIMIZATION

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}


// Add loading state to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.type === 'submit') {
            this.style.opacity = '0.7';
            this.style.cursor = 'wait';
        }
    });
});

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

const scrollToggleBtn = document.getElementById('scrollToggleBtn');
const scrollToggleIcon = document.getElementById('scrollToggleIcon');
const SCROLL_THRESHOLD = 100; 

function updateScrollToggleButton() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollY > SCROLL_THRESHOLD) {

        scrollToggleIcon.classList.add('scroll-up');
    } else {
 
        scrollToggleIcon.classList.remove('scroll-up');
    }
}

scrollToggleBtn.addEventListener('click', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollY > SCROLL_THRESHOLD) {
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
    
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Update button on scroll
window.addEventListener('scroll', updateScrollToggleButton);

// Initial check on page load
updateScrollToggleButton();
