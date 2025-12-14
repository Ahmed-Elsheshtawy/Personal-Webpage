// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const text = codeBlock.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    });
}

// Copy link to clipboard
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
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