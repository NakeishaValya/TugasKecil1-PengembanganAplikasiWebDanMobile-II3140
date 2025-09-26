let header = document.querySelector('header');
let lastScrollTop = 0;

function initNavbar() {
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollY > lastScrollTop && scrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollY;
    });
}

function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initProfileDropdown() {
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
        
        // Handle profile menu items
        const profileItems = profileDropdown.querySelectorAll('.profile-item');
        profileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const text = item.querySelector('span').textContent;
                
                if (text === 'Keluar') {
                    if (confirm('Apakah Anda yakin ingin keluar?')) {
                        // Handle logout
                        console.log('Logging out...');
                        profileDropdown.classList.remove('show');
                    }
                } else if (text === 'Profil Saya') {
                    // Handle profile view
                    console.log('Opening profile...');
                    profileDropdown.classList.remove('show');
                } else if (text === 'Pengaturan') {
                    // Handle settings
                    console.log('Opening settings...');
                    profileDropdown.classList.remove('show');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    setActiveNavigation();
    initProfileDropdown();
});
