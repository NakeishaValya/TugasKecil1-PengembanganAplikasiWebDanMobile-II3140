document.addEventListener('DOMContentLoaded', function() {
    initTableOfContents();
    initProgressTracking();
    initSmoothScrolling();
    initReadingProgress();
    initHighlightOnScroll();
});

function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-list a[href^="#"]');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveLink(this);
            }
        });
    });
}

function updateActiveLink(activeLink) {
    document.querySelectorAll('.toc-list a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function initProgressTracking() {
    const sections = document.querySelectorAll('.section');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (!progressFill || !progressText) return;
    
    let completedSections = 0;
    const totalSections = sections.length;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const section = entry.target;
                if (!section.dataset.viewed) {
                    section.dataset.viewed = 'true';
                    completedSections++;
                    updateProgress();
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    function updateProgress() {
        const percentage = Math.round((completedSections / totalSections) * 100);
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${completedSections}/${totalSections} bagian selesai (${percentage}%)`;
    }
}

function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initReadingProgress() {
    let readingStartTime = Date.now();
    let isReading = true;
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isReading = false;
        } else {
            isReading = true;
            readingStartTime = Date.now();
        }
    });
    
    window.addEventListener('beforeunload', function() {
        if (isReading) {
            const readingTime = Math.round((Date.now() - readingStartTime) / 1000);
            localStorage.setItem('materi01_reading_time', readingTime);
        }
    });
}

function initHighlightOnScroll() {
    const sections = document.querySelectorAll('.section');
    const tocLinks = document.querySelectorAll('.toc-list a[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.toc-list a[href="#${sectionId}"]`);
                
                if (correspondingLink) {
                    tocLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: [0.3],
        rootMargin: '-100px 0px -50% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.content-block, .technique-card, .tips-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

window.addEventListener('load', animateOnScroll);