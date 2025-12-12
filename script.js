// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll to top of main content
                document.querySelector('.main-content').scrollTop = 0;
            }
        });
    });

    // Smooth scroll for anchor links within content
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('nav-link')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Add scroll effect to main content
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('scroll', function() {
        if (this.scrollTop > 50) {
            document.querySelector('.header').style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            document.querySelector('.header').style.boxShadow = 'none';
        }
    });