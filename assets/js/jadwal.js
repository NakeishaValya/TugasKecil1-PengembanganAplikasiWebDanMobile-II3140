let addEl = document.getElementById('addEl');
const scheduleData = {
    materi: [
        {
            time: "15 Agustus 2025",
            title: "Materi 01",
            location: "Lapangan Bola Jatinangor",
            description: "Membahas Materi 01 dengan implementasi latihan"
        },
        {
            time: "22 Agustus 2025",
            title: "Materi 02",
            location: "Lapangan Basket Jatinangor",
            description: "Membahas Materi 02 dengan implementasi latihan"
        },
        {
            time: "29 Agustus 2025",
            title: "Materi 02",
            location: "Lapangan Basket Jatinangor",
            description: "Membahas Materi 02 dengan implementasi latihan"
        },
        {
            time: "5 Desember 2025",
            title: "Materi 04",
            location: "GYM Jatinangor",
            description: "Membahas Materi 04 dengan implementasi latihan"
        }
    ],
    ujian: [
        {
            time: "5 September 2025",
            title: "Quiz 01",
            location: "Ruang Ujian A101",
            description: "Evaluasi pemahaman materi 2 dengan latihan"
        },
        {
            time: "10 Oktober 2025",
            title: "Ujian Tengah Semester",
            location: "Lapangan Olahraga",
            description: "Ujian tengah semester untuk mengevaluasi pemahaman materi 1-3"
        },
        {
            time: "10 Oktober 2025",
            title: "Quiz 02",
            location: "Lapangan Olahraga",
            description: "Evaluasi pemahaman materi 6 dengan latihan"
        },
        {
            time: "15 November 2025",
            title: "Ujian Akhir Semester",
            location: "Ruang Ujian B202",
            description: "Ujian akhir semester untuk evaluasi komprehensif seluruh materi"
        }
        
    ],
    "tes-fisik": [
        {
            time: "20 Agustus 2025",
            title: "Tes Kebugaran Awal",
            location: "Lapangan Atletik",
            description: "Tes kebugaran awal untuk mengukur kondisi fisik dasar mahasiswa"
        },
        {
            time: "25 September 2025",
            title: "Endurance Training Test",
            location: "Track Lari Jatinangor",
            description: "Tes lari 12 menit untuk mengukur daya tahan kardiovaskular"
        },
        {
            time: "20 Agustus 2025",
            title: "Interval",
            location: "Lapangan Atletik",
            description: "Tes kebugaran awal untuk mengukur kondisi fisik dasar mahasiswa"
        },
        {
            time: "25 September 2025",
            title: "Strength Training Test",
            location: "Track Lari Jatinangor",
            description: "Tes lari 12 menit untuk mengukur daya tahan kardiovaskular"
        }

    ]
};

function generateTimeline() {
    Object.keys(scheduleData).forEach(category => {
        const categorySection = document.querySelector(`[data-category="${category}"]`);
        const timeline = categorySection?.querySelector('.category-timeline');
        
        if (!timeline) return;
        
        scheduleData[category].forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            const isMateriItem = category === 'materi' && item.title.includes('Materi');
            const detailAction = isMateriItem 
                ? `onclick="navigateToMateri('${item.title}')"`
                : `onclick="showDetailModal('${item.title}', '${item.description}', '${item.location}', '${item.time}')"`;
            
            timelineItem.innerHTML = `
                <div class="timeline-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-time">${item.time}</div>
                    <h2>${item.title}</h2>
                    <p><strong>${item.location}</strong></p>
                    <p>${item.description}</p>
                    <a href="#" class="btn" ${detailAction}>Detail</a>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    });
}

function initCategoryFilter() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="materi">Materi</button>
            <button class="filter-btn" data-filter="ujian">Ujian</button>
            <button class="filter-btn" data-filter="tes-fisik">Tes Fisik</button>
        </div>
    `;
    
    const timeline = document.getElementById('timeline');
    timeline.parentNode.insertBefore(filterContainer, timeline);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            document.querySelectorAll('.category-section').forEach(section => {
                const category = section.getAttribute('data-category');
                
                if (category === filter) {
                    section.style.display = 'block';
                    setTimeout(() => {
                        section.querySelectorAll('.timeline-item').forEach(item => {
                            item.classList.remove('animate');
                        });
                        animateOnScroll();
                    }, 100);
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

function navigateToMateri(title) {
    const materiNumber = title.replace('Materi ', '').padStart(2, '0');
    window.location.href = `kumpulanMateri/materi${materiNumber}.html`;
}

function showDetailModal(title, description, location, time) {
    let modal = document.getElementById('schedule-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'schedule-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="closeModal()">&times;</span>
                <div class="modal-body">
                    <h2 id="modal-title"></h2>
                    <div id="modal-time" class="modal-time"></div>
                    <p id="modal-description"></p>
                    <button class="btn btn-primary" onclick="closeModal()">Tutup</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }
    
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-time').textContent = time;
    document.getElementById('modal-description').innerHTML = `
        <p><strong>${location}</strong></p>
        <p>${description}</p>
    `;
    
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('schedule-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

function updateCurrentTime() {
    const now = new Date();
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('id-ID', timeOptions);
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const dateString = now.toLocaleDateString('id-ID', dateOptions);
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

document.addEventListener('DOMContentLoaded', () => {
    generateTimeline();
    initCategoryFilter();
    document.querySelectorAll('.category-section').forEach(section => {
        const category = section.getAttribute('data-category');
        if (category !== 'materi') {
            section.style.display = 'none';
        }
    });

    if (addEl) {
        // Initialize addEl with hidden state
        addEl.style.opacity = '0';
        addEl.style.transform = 'translateY(200px)';
        addEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        addEl.style.pointerEvents = 'none';
        
        // Debug: Check if element is found
        console.log('AddEl element found:', addEl);
    } else {
        console.log('AddEl element not found!');
    }

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let windowHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;
    let maxScrollHeight = documentHeight - windowHeight;
    let halfScrollPoint = maxScrollHeight * 0.5;
    
    if (addEl) {
        if (scrollY > halfScrollPoint) {
            addEl.style.opacity = '0.85';
            addEl.style.transform = 'translateY(0px)';
            addEl.style.pointerEvents = 'auto';
        } else {
            addEl.style.opacity = '0';
            addEl.style.transform = 'translateY(200px)';
            addEl.style.pointerEvents = 'none';
        }
        
        // Debug scroll information
        console.log(`Scroll: ${scrollY}, Half point: ${halfScrollPoint}, Element visible: ${scrollY > halfScrollPoint}`);
    }
    
    let scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
});
    
    animateOnScroll();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000); 
    
    console.log('📅 Jadwal page initialized!');
});