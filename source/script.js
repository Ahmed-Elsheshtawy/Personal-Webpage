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
        
        // Control the window's scroll bar directly
        if (window.innerWidth > 768) {
            // Desktop/Laptop: Use precise scroll control
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Mobile/Phone: Use scrollIntoView
            window.scrollTo({
                top: 720, // scroll to just below the fixed header
                behavior: 'smooth'
            });
        }

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
    } else {
        // Default to About section if no hash is present
        activateSection('about', false);
    }
}

// Load section on page load and handle browser back/forward buttons
loadSectionFromHash();
window.addEventListener('hashchange', loadSectionFromHash);

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

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCategories = document.querySelectorAll('.project-category-card');

// Ensure all categories are visible on page load
projectCategories.forEach(cat => {
    cat.classList.remove('hidden');
    cat.style.display = 'block';
});

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        if (filterValue === 'featured') {
            // Show only categories that contain featured projects
            projectCategories.forEach(category => {
                const hasFeaturedProject = category.querySelector('.featured-project');
                if (hasFeaturedProject) {
                    category.classList.remove('hidden');
                    category.style.display = 'block';
                    
                    // Hide non-featured projects within this category
                    const allProjects = category.querySelectorAll('.project-item');
                    allProjects.forEach(project => {
                        if (project.classList.contains('featured-project')) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    });
                } else {
                    category.classList.add('hidden');
                    category.style.display = 'none';
                }
            });
        } else {
            // Regular filtering logic
            projectCategories.forEach(category => {
                const categoryValue = category.getAttribute('data-category');
                
                // Show all projects within visible categories
                const allProjects = category.querySelectorAll('.project-item');
                allProjects.forEach(project => {
                    project.style.display = 'block';
                });
                
                if (filterValue === 'all') {
                    category.classList.remove('hidden');
                    category.style.display = 'block';
                } else {
                    if (categoryValue === filterValue) {
                        category.classList.remove('hidden');
                        category.style.display = 'block';
                    } else {
                        category.classList.add('hidden');
                        category.style.display = 'none';
                    }
                }
            });
        }
    });
});
