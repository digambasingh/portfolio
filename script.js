document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Adjust for fixed header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler
    emailjs.init('P5A0iavTvxF5TKf6P');
    const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formMessage = document.getElementById('formMessage');
        const submitBtn = this.querySelector('button[type="submit"]');

        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const subject = this.querySelector('#subject').value.trim();
        const message = this.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all required fields';
            formMessage.className = 'form-message error';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        emailjs.send('service_avo5eij', 'template_mriyvzj', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        }, 'P5A0iavTvxF5TKf6P')
        .then(response => {
            formMessage.textContent = 'Message sent successfully! Thank you for reaching out.';
            formMessage.className = 'form-message success';
            contactForm.reset();
        }, error => {
            console.error('EmailJS Error:', error);
            formMessage.textContent = 'Failed to send message. Please try again later.';
            formMessage.className = 'form-message error';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    });
}


    // Scroll reveal animation
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < windowHeight - revealPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize sections with hidden state
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger initial check
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});