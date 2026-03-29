const slides = Array.from(document.querySelectorAll(".blog-slide"));
const postPanels = Array.from(document.querySelectorAll(".blog-post-panel"));
const readerTitle = document.getElementById("reader-title");
const readerDate = document.getElementById("reader-date");

const DEFAULT_READER_TITLE = "Select a blog post";
const DEFAULT_READER_DATE = "Date will appear here";

function setReaderHeader(title, date) {
    if (readerTitle) {
        readerTitle.textContent = title || DEFAULT_READER_TITLE;
    }

    if (readerDate) {
        readerDate.textContent = date || DEFAULT_READER_DATE;
    }
}

function updateActiveState(postId) {
    const activeSlide = slides.find((slide) => slide.dataset.postId === postId);
    const activePanel = postPanels.find((panel) => panel.dataset.postId === postId);

    if (!activeSlide || !activePanel) {
        return;
    }

    slides.forEach((slide) => {
        const isActive = slide.dataset.postId === postId;
        slide.classList.toggle("active", isActive);
        slide.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    postPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.postId === postId);
    });

    setReaderHeader(activeSlide.dataset.postTitle, activeSlide.dataset.postDate);

    const nextHash = `#${postId}`;
    if (window.location.hash !== nextHash) {
        window.location.hash = postId;
    }
}

function getInitialPostId() {
    const hashId = window.location.hash.replace("#", "").trim();
    const hashMatchesSlide = slides.some((slide) => slide.dataset.postId === hashId);

    if (hashMatchesSlide) {
        return hashId;
    }

    if (slides.length > 0) {
        return slides[0].dataset.postId;
    }

    return "";
}

function setupSlideEvents() {
    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            const targetPostId = slide.dataset.postId;
            if (targetPostId) {
                updateActiveState(targetPostId);
            }
        });
    });
}

function setupHashNavigation() {
    window.addEventListener("hashchange", () => {
        const hashId = window.location.hash.replace("#", "").trim();
        if (!hashId) {
            return;
        }

        const hashMatchesSlide = slides.some((slide) => slide.dataset.postId === hashId);
        if (hashMatchesSlide) {
            updateActiveState(hashId);
        }
    });
}

function initializeBlogPage() {
    setReaderHeader(DEFAULT_READER_TITLE, DEFAULT_READER_DATE);
    setupSlideEvents();
    setupHashNavigation();

    const initialPostId = getInitialPostId();
    if (initialPostId) {
        updateActiveState(initialPostId);
    }
}

document.addEventListener("DOMContentLoaded", initializeBlogPage);
