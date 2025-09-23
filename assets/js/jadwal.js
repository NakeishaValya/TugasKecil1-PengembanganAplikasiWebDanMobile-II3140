// Data jadwal pembelajaran yang disederhanakan
const scheduleData = {
    materi: [
        {
            time: "08:00 - 10:00",
            title: "Matematika Dasar",
            description: "Pembelajaran konsep dasar matematika meliputi aljabar, geometri, dan statistik. Materi yang dipelajari akan membangun fondasi yang kuat untuk mata pelajaran lanjutan."
        },
        {
            time: "10:30 - 12:00",
            title: "Bahasa Indonesia",
            description: "Memahami tata bahasa, menulis karya ilmiah, dan menganalisis teks sastra Indonesia. Fokus pada peningkatan kemampuan komunikasi tertulis dan lisan."
        },
        {
            time: "13:00 - 15:00",
            title: "Fisika Eksperimen",
            description: "Praktikum laboratorium fisika dengan eksperimen langsung. Memahami konsep fisika melalui pengamatan dan percobaan ilmiah."
        },
        {
            time: "15:30 - 17:00",
            title: "Sejarah Indonesia",
            description: "Mempelajari perjuangan kemerdekaan Indonesia, tokoh-tokoh pahlawan, dan perkembangan bangsa dari masa ke masa."
        }
    ],
    ujian: [
        {
            time: "08:00 - 10:00",
            title: "Ujian Tengah Semester Matematika",
            description: "Evaluasi pemahaman materi matematika semester ini meliputi aljabar, kalkulus, dan statistik dasar. Ujian tertulis dengan soal pilihan ganda dan essay."
        },
        {
            time: "10:30 - 12:30",
            title: "Ujian Praktik Bahasa Inggris",
            description: "Tes kemampuan speaking dan listening dalam bahasa Inggris. Evaluasi pronunciation, vocabulary, dan conversation skills."
        },
        {
            time: "13:00 - 15:00",
            title: "Ujian Akhir Semester Fisika",
            description: "Ujian komprehensif materi fisika satu semester penuh. Mencakup teori, rumus, dan aplikasi dalam kehidupan sehari-hari."
        },
        {
            time: "15:30 - 17:30",
            title: "Ujian Nasional Simulasi",
            description: "Simulasi ujian nasional dengan format dan tingkat kesulitan yang sama. Persiapan menghadapi ujian sesungguhnya."
        }
    ],
    "tes-fisik": [
        {
            time: "07:00 - 08:00",
            title: "Tes Kesehatan Rutin",
            description: "Pemeriksaan kesehatan berkala meliputi pengukuran tinggi badan, berat badan, tekanan darah, dan pemeriksaan umum lainnya."
        },
        {
            time: "16:00 - 17:30",
            title: "Tes Kebugaran Jasmani",
            description: "Evaluasi kondisi fisik siswa melalui berbagai tes seperti lari 1000m, push-up, sit-up, dan tes fleksibilitas tubuh."
        },
        {
            time: "07:30 - 09:00",
            title: "Tes Koordinasi Motorik",
            description: "Pengujian kemampuan koordinasi gerak tubuh, keseimbangan, dan refleks. Penting untuk perkembangan motorik siswa."
        },
        {
            time: "15:00 - 16:00",
            title: "Screening Kesehatan Mental",
            description: "Evaluasi kesehatan mental dan psikologis siswa. Deteksi dini masalah stress, kecemasan, atau masalah emosional lainnya."
        }
    ]
};

// Fungsi sederhana untuk generate timeline
function generateTimeline() {
    // Loop melalui setiap kategori
    Object.keys(scheduleData).forEach(category => {
        const categorySection = document.querySelector(`[data-category="${category}"]`);
        const timeline = categorySection?.querySelector('.category-timeline');
        
        if (!timeline) return;
        
        // Generate items untuk kategori ini
        scheduleData[category].forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-time">${item.time}</div>
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <a href="#" class="btn" onclick="showDetailModal('${item.title}', '${item.description}', '${item.time}')">Detail</a>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    });
}

// Filter sederhana
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
    
    // Event listener untuk filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter sections
            document.querySelectorAll('.category-section').forEach(section => {
                const category = section.getAttribute('data-category');
                
                if (category === filter) {
                    section.style.display = 'block';
                    // Re-trigger animations for visible items
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

// Modal sederhana
function showDetailModal(title, description, time) {
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
    document.getElementById('modal-description').textContent = description;
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('schedule-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to animate timeline items on scroll
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
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

// Function to update current time
function updateCurrentTime() {
    const now = new Date();
    
    // Format time (HH:MM:SS)
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('id-ID', timeOptions);
    
    // Format date (Day, DD Month YYYY)
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    const dateString = now.toLocaleDateString('id-ID', dateOptions);
    
    // Update DOM
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateTimeline();
    initCategoryFilter();
    
    // Hide non-materi sections by default since "Materi" button is active
    document.querySelectorAll('.category-section').forEach(section => {
        const category = section.getAttribute('data-category');
        if (category !== 'materi') {
            section.style.display = 'none';
        }
    });
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize and update time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000); // Update every second
    
    document.body.classList.add('jadwal-page');
    
    console.log('📅 Jadwal page initialized!');
});