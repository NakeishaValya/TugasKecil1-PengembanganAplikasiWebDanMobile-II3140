const materiData = [
    {
        icon: "📚",
        title: "Materi 01",
        description: "Pendahuluan dan Aspek dalam Olahraga",
        theme: "primary"
    },
    {
        icon: "🎯",
        title: "Materi 02",
        description: "Komponen dan Prinsip Latihan Berolahraga",
        theme: "success"
    },
    {
        icon: "💡",
        title: "Materi 03",
        description: "Mengenali Kondisi Fisik dalam Berolahraga",
        theme: "warning"
    },
    {
        icon: "🔬",
        title: "Materi 04",
        description: "Metode Pengetesan dalam mata kuliah Olahraga",
        theme: "info"
    },
    {
        icon: "🎨",
        title: "Materi 05",
        description: "Bentuk Cedera dalam Berolahraga",
        theme: "danger"
    },
    {
        icon: "🚀",
        title: "Materi 06",
        description: "Macam-macam Cabang Olahraga",
        theme: "dark"
    }
];

const themes = {
    primary: {
        color: '#26445d',
        hoverColor: '#1a3347',
        gradient: 'linear-gradient(135deg, #26445d, #1a3347)'
    },
    success: {
        color: '#28a745',
        hoverColor: '#1e7e34',
        gradient: 'linear-gradient(135deg, #28a745, #1e7e34)'
    },
    warning: {
        color: '#ffc107',
        hoverColor: '#e0a800',
        gradient: 'linear-gradient(135deg, #ffc107, #e0a800)'
    },
    info: {
        color: '#17a2b8',
        hoverColor: '#117a8b',
        gradient: 'linear-gradient(135deg, #17a2b8, #117a8b)'
    },
    danger: {
        color: '#dc3545',
        hoverColor: '#bd2130',
        gradient: 'linear-gradient(135deg, #dc3545, #bd2130)'
    },
    dark: {
        color: '#343a40',
        hoverColor: '#1d2124',
        gradient: 'linear-gradient(135deg, #343a40, #1d2124)'
    }
};

function generateCardHTML(data) {
    return `
        <div class="card-item" data-title="${data.title}" data-theme="${data.theme}">
            <div class="card-icon">${data.icon}</div>
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="card-overlay">
                <button class="card-btn">Pelajari Lebih Lanjut</button>
            </div>
        </div>
    `;
}

function renderCards() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';
    materiData.forEach(item => {
        gridContainer.innerHTML += generateCardHTML(item);
    });
    addCardEventListeners();
}

function addCardEventListeners() {
    const cardItems = document.querySelectorAll('.card-item');
    
    cardItems.forEach((card, index) => {
        card.addEventListener('click', () => {
            handleCardClick(card, materiData[index]);
        });
        
        card.addEventListener('mouseenter', () => {
            applyHoverStyles(card);
        });
        
        card.addEventListener('mouseleave', () => {
            removeHoverStyles(card);
        });
        
        card.style.animation = `cardFadeIn 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        applyInitialCardStyles(card);
    });
}

function handleCardClick(card, data) {
    createRippleEffect(card);
    setTimeout(() => {
        alert(`Membuka materi: ${data.title}\n\n${data.description}`);
    }, 200);
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    element.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function applyInitialCardStyles(card) {
    const theme = themes[card.dataset.theme] || themes.primary;
    
    card.style.background = 'rgba(255, 255, 255, 0.95)';
    card.style.padding = '35px 50px';
    card.style.borderRadius = '20px';
    card.style.textAlign = 'center';
    card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
    card.style.transition = 'all 0.4s ease';
    card.style.cursor = 'pointer';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.style.backdropFilter = 'blur(10px)';
    card.style.border = `1px solid ${theme.color}30`;
    card.style.minHeight = '320px';
    card.style.aspectRatio = '1.1/1';
    
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.fontSize = '3.2em';
        icon.style.marginBottom = '22px';
        icon.style.transition = 'all 0.3s ease';
        icon.style.color = theme.color;
    }
    
    const title = card.querySelector('h3');
    if (title) {
        title.style.fontSize = '1.6em';
        title.style.color = theme.color;
        title.style.marginBottom = '18px';
        title.style.fontWeight = '600';
        title.style.transition = 'color 0.3s ease';
        title.style.lineHeight = '1.3';
    }
    
    const description = card.querySelector('p');
    if (description) {
        description.style.color = '#666';
        description.style.fontSize = '1em';
        description.style.lineHeight = '1.5';
        description.style.margin = '0 0 25px 0';
        description.style.transition = 'color 0.3s ease';
        description.style.maxWidth = '90%';
        description.style.marginLeft = 'auto';
        description.style.marginRight = 'auto';
    }
    
    const overlay = card.querySelector('.card-overlay');
    if (overlay) {
        overlay.style.position = 'absolute';
        overlay.style.bottom = '-100px';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.padding = '20px 30px';
        overlay.style.background = theme.gradient.replace('135deg', 'to top') + '95';
        overlay.style.transition = 'bottom 0.3s ease';
        
        const button = overlay.querySelector('.card-btn');
        if (button) {
            button.style.background = 'white';
            button.style.color = theme.color;
            button.style.border = 'none';
            button.style.padding = '10px 30px';
            button.style.borderRadius = '25px';
            button.style.fontWeight = '600';
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
            button.style.fontSize = '0.9em';
            button.style.minWidth = '160px';
            
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
        }
    }
    
    const shimmer = document.createElement('div');
    shimmer.style.content = '';
    shimmer.style.position = 'absolute';
    shimmer.style.top = '0';
    shimmer.style.left = '-100%';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = `linear-gradient(90deg, transparent, ${theme.color}20, transparent)`;
    shimmer.style.transition = 'left 0.6s ease';
    shimmer.className = 'card-shimmer';
    card.appendChild(shimmer);
}

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

function applyResponsiveStyles() {
    const isMobile = window.innerWidth <= 768;
    const cards = document.querySelectorAll('.card-item');
    
    cards.forEach(card => {
        if (isMobile) {
            card.style.padding = '30px 40px';
            card.style.minHeight = '280px';
            card.style.aspectRatio = '1.05/1';
            
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.fontSize = '2.8em';
                icon.style.marginBottom = '18px';
            }
            
            const title = card.querySelector('h3');
            if (title) {
                title.style.fontSize = '1.4em';
                title.style.marginBottom = '15px';
            }
            
            const description = card.querySelector('p');
            if (description) {
                description.style.fontSize = '0.95em';
                description.style.marginBottom = '20px';
                description.style.maxWidth = '95%';
            }
            
            const overlay = card.querySelector('.card-overlay');
            if (overlay) {
                overlay.style.position = 'static';
                overlay.style.background = 'none';
                overlay.style.padding = '8px 0 0 0';
                
                const button = overlay.querySelector('.card-btn');
                if (button) {
                    button.style.padding = '8px 25px';
                    button.style.fontSize = '0.85em';
                    button.style.minWidth = '140px';
                }
            }
        } else {
            card.style.padding = '35px 50px';
            card.style.minHeight = '320px';
            card.style.aspectRatio = '1.1/1';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    applyResponsiveStyles();
});

window.addEventListener('resize', applyResponsiveStyles);

window.MateriCards = {
    renderCards,
    materiData,
    applyResponsiveStyles,
    themes
};
