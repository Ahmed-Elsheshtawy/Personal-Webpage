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

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'OF8ZlZC_lm_VYzqqu';
const EMAILJS_SERVICE_ID = 'service_m82qcpx';
const EMAILJS_TEMPLATE_ID = 'template_xdpbb3h';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Handle form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        console.log('Sending email with data:', formData);
        
        // Send the email using EmailJS with template params
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
            .then(
                function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(function() {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                    }, 3000);
                }
            )
            .catch(function(error) {
                console.error('FAILED...', error);
                console.error('Error details:', JSON.stringify(error));
                
                // Show error message
                submitBtn.textContent = '✗ Failed to Send';
                submitBtn.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            });
    });
}