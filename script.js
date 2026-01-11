// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const getStartedBtn = document.getElementById('getStartedBtn');
const demoBtn = document.getElementById('demoBtn');
const loginBtn = document.getElementById('loginBtn');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animated Counter
function animateCounter() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let count = 0;
        const increment = target / 100;
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + suffix;
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target + suffix;
            }
        };
        updateCount();
    });
}

// Scroll Animations
function checkScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
            
            // Animate counters when they become visible
            if (element.querySelector('[data-count]')) {
                setTimeout(animateCounter, 300);
            }
            
            // Animate progress bars
            const progressBars = element.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
    });
}

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success notification
        notificationText.textContent = `Thank you, ${name}! Your message has been sent.`;
        notification.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }, 2000);
});

// Button Click Events
getStartedBtn.addEventListener('click', () => {
    notificationText.textContent = "Getting started! Redirecting to signup page...";
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
});

demoBtn.addEventListener('click', () => {
    notificationText.textContent = "Opening live demo in new tab...";
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    notificationText.textContent = "Login modal opening... Enter your credentials.";
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
});

// Initialize on load
window.addEventListener('load', () => {
    checkScroll();
    
    // Animate initial elements
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('visible');
                }
            }, index * 200);
        });
    }, 500);
});

// Check scroll on scroll
window.addEventListener('scroll', checkScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
