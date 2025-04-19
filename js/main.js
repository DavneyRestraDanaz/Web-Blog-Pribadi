// main.js untuk Web Blog Pribadi
// Nama: Davney Restra Danaz
// NRP: 15-2022-069

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.post-card, .blog-post, .sidebar-widget, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Add animated class
    if (document.querySelector('.post-card, .blog-post, .sidebar-widget, .contact-item')) {
        window.addEventListener('scroll', animateOnScroll);
        // Initial check
        animateOnScroll();
    }

    // Back to top button
    const createBackToTopButton = function() {
        const button = document.createElement('button');
        button.innerHTML = '&uarr;';
        button.className = 'back-to-top';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createBackToTopButton();

    // Add CSS for back to top button
    const addBackToTopStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                border: none;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 99;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background-color: var(--primary-dark);
                transform: translateY(-3px);
            }
            
            .animated {
                animation: fadeInUp 0.5s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    };

    addBackToTopStyles();

    // Current year for copyright
    const yearElement = document.querySelector('.copyright span');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Simple image lightbox for blog images
    const setupImageLightbox = function() {
        const images = document.querySelectorAll('.post-img img, .about-image img');
        
        images.forEach(image => {
            image.style.cursor = 'pointer';
            
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                
                const closeButton = document.createElement('span');
                closeButton.className = 'lightbox-close';
                closeButton.innerHTML = '&times;';
                
                lightbox.appendChild(lightboxImg);
                lightbox.appendChild(closeButton);
                document.body.appendChild(lightbox);
                
                // Prevent scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
                
                // Close lightbox when clicking on it
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                });
            });
        });
        
        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            }
            
            .lightbox img {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            }
            
            .lightbox-close {
                position: absolute;
                top: 20px;
                right: 30px;
                color: white;
                font-size: 40px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    };
    
    setupImageLightbox();
});