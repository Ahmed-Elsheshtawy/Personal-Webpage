// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !mobileMenuToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Helper function to activate a section (removes redundancy)
function activateSection(sectionId, updateHistory = false) {
    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (targetSection && targetLink) {
        // Remove active class from all
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Activate target
        targetLink.classList.add('active');
        targetSection.classList.add('active');
        
        // Update URL if needed (for click events, not for page load)
        if (updateHistory) {
            history.pushState(null, null, '#' + sectionId);
        }
    }
}

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        activateSection(targetId, true);
    });
});

// Handle page load with hash in URL, if the user edits the URL manually or uses back/forward buttons
function loadSectionFromHash() {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        activateSection(targetId, false);
    }
}

// Load section on page load and handle browser back/forward buttons
loadSectionFromHash();
window.addEventListener('hashchange', loadSectionFromHash);

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

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'OF8ZlZC_lm_VYzqqu';
const EMAILJS_SERVICE_ID = 'service_m82qcpx';
const EMAILJS_TEMPLATE_ID = 'template_e756pg7';

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
            from_title: document.getElementById('title').value,
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
// Disabling right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disabling text selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Disabling drag and drop for images and media
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});