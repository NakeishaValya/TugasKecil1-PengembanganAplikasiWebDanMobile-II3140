let cloud_left = document.getElementById('cloud_left');
let cloud_right = document.getElementById('cloud_right');
let cloud_right2 = document.getElementById('cloud_left2');
let cloud = document.getElementById('cloud');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;
    
    cloud_left.style.transform = `translateY(${scrollY * -1}px)`;
    cloud_right.style.transform = `translateY(${scrollY * -1}px)`;
    cloud_left2.style.transform = `translateY(${scrollY * -1}px)`;
    cloud.style.transform = `translateY(${scrollY * -1}px)`;
    
    let scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    
    if (cloud) {
        if (scrollPercentage > 70) {
            let opacity = Math.min((scrollPercentage - 70) / 30, 1);
            cloud.style.opacity = opacity;
            cloud.style.transform = `translateY(${(1 - opacity) * 50}px)`;
        } else {
            cloud.style.opacity = '0';
            cloud.style.transform = 'translateY(50px)';
        }
    }
});

const themes = {
    primary: {color: '#26445d', hoverColor: '#1a3347', gradient: 'linear-gradient(135deg, #26445d, #1a3347)'},
    success: {color: '#28a745', hoverColor: '#1e7e34', gradient: 'linear-gradient(135deg, #28a745, #1e7e34)'},
    warning: {color: '#ffc107', hoverColor: '#e0a800', gradient: 'linear-gradient(135deg, #ffc107, #e0a800)'},
    info: {color: '#17a2b8', hoverColor: '#117a8b', gradient: 'linear-gradient(135deg, #17a2b8, #117a8b)'},
    danger: {color: '#dc3545', hoverColor: '#bd2130', gradient: 'linear-gradient(135deg, #dc3545, #bd2130)'},
    dark: {color: '#343a40', hoverColor: '#1d2124', gradient: 'linear-gradient(135deg, #343a40, #1d2124)'}
};

function applyHoverStyles(card) {
    const theme = themes[card.dataset.theme] || themes.primary;
    
    card.style.boxShadow = `0 25px 50px ${theme.color}40`;
    card.style.background = 'rgba(255, 255, 255, 1)';
    card.style.border = `2px solid ${theme.color}`;
    
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.transform = 'scale(1.3) rotate(10deg)';
        icon.style.color = theme.hoverColor;
    }
    
    const title = card.querySelector('h3');
    if (title) {
        title.style.color = theme.hoverColor;
    }
    
    const description = card.querySelector('p');
    if (description) {
        description.style.color = '#444';
    }
    
    const overlay = card.querySelector('.card-overlay');
    if (overlay) {
        overlay.style.bottom = '0';
    }
    
    const shimmer = card.querySelector('.card-shimmer');
    if (shimmer) {
        shimmer.style.left = '100%';
    } else {
        const newShimmer = document.createElement('div');
        newShimmer.style.position = 'absolute';
        newShimmer.style.top = '0';
        newShimmer.style.left = '-100%';
        newShimmer.style.width = '100%';
        newShimmer.style.height = '100%';
        newShimmer.style.background = `linear-gradient(90deg, transparent, ${theme.color}20, transparent)`;
        newShimmer.style.transition = 'left 0.6s ease';
        newShimmer.className = 'card-shimmer';
        card.appendChild(newShimmer);
        
        setTimeout(() => {
            newShimmer.style.left = '100%';
        }, 10);
    }
}

function removeHoverStyles(card) {
    const theme = themes[card.dataset.theme] || themes.primary;
    
    card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
    card.style.background = 'rgba(255, 255, 255, 0.95)';
    card.style.border = `1px solid ${theme.color}30`;
    
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.color = theme.color;
    }
    
    const title = card.querySelector('h3');
    if (title) {
        title.style.color = theme.color;
    }
    
    const description = card.querySelector('p');
    if (description) {
        description.style.color = '#666';
    }
    
    const overlay = card.querySelector('.card-overlay');
    if (overlay) {
        overlay.style.bottom = '-100px';
    }
    
    const shimmer = card.querySelector('.card-shimmer');
    if (shimmer) {
        shimmer.style.left = '-100%';
    }
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.background = 'rgba(255, 255, 255, 0.7)';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function setupCardEventListeners() {
    const cardItems = document.querySelectorAll('.card-item');
    
    cardItems.forEach((card) => {
        card.addEventListener('click', () => {
            createRippleEffect(card);
            const title = card.querySelector('h3').textContent;
            
            const materiNumber = title.replace('Materi ', '').padStart(2, '0');
            
            setTimeout(() => {
                window.location.href = `kumpulanMateri/materi${materiNumber}.html`;
            }, 200);
        });
        
        card.addEventListener('mouseenter', () => {
            applyHoverStyles(card);
        });
        
        card.addEventListener('mouseleave', () => {
            removeHoverStyles(card);
        });
        
        const button = card.querySelector('.card-btn');
        if (button) {
            const theme = themes[card.dataset.theme] || themes.primary;
            
            button.addEventListener('mouseenter', () => {
                button.style.background = theme.color;
                button.style.color = 'white';
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'white';
                button.style.color = theme.color;
                button.style.transform = 'scale(1)';
            });
            
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event
                const title = card.querySelector('h3').textContent;
                const materiNumber = title.replace('Materi ', '').padStart(2, '0');
                window.location.href = `kumpulanMateri/materi${materiNumber}.html`;
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupCardEventListeners();
});
