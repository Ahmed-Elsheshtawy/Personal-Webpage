// Sidebar template - single source of truth for all blog pages
const sidebarHTML = `
    <aside class="sidebar">
        <div class="profile-top-section">
            <div class="profile-section">
                <div class="blog-author-image">
                    <img src="../img/personal_photo_Expanded.jpeg" alt="Ahmed Elsheshtawy">
                </div>
                <h1 class="name">Ahmed's Blog</h1>
                <p class="blog-tagline">Thoughts on Tech, Entrepreneurship & Innovation</p>
            </div>
            
            <div class="blog-author-bio">
                <h3 class="bio-header"><i class="fas fa-user-pen"></i>About the Author</h3>
                <p class="bio-text">
                    Computer Engineering student at Qatar University passionate about AI, 
                    hackathons, and building solutions that matter. When I'm not coding, 
                    I'm probably working on my next startup idea or exploring new technologies.
                </p>
            </div>

            <nav class="blog-nav">
                <a href="../index.html" class="blog-nav-link">
                    <i class="fas fa-home"></i> Back to Main Site
                </a>
                <a href="../index.html#blog" class="blog-nav-link">
                    <i class="fas fa-newspaper"></i> All Blog Posts
                </a>
                <a target="_blank" href="mailto:ahmedk.elsheshtawy@gmail.com" class="blog-nav-link">
                    <i class="fas fa-envelope"></i> Contact Me
                </a>
            </nav>

            <div class="blog-social-links">
                <a href="https://www.linkedin.com/in/ahmedk-elsheshtawy/" class="blog-social-icon" target="_blank" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Ahmed-Elsheshtawy" class="blog-social-icon" target="_blank" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://www.instagram.com/a.07_ae/" class="blog-social-icon" target="_blank" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>
        </div>
        <div>
            <div class="copy-right">
                &copy; 2025 Ahmed Khedr Elsheshtawy. All rights reserved.
            </div>
        </div>
    </aside>
`;

// Inject sidebar into the page
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebarHTML;
    }
});
