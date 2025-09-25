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

// ===== MATERI05.HTML SPECIFIC FUNCTIONS =====
// Interactive functions for sports injury page

// Muscle Map Interaction System - MATERI05 SPECIFIC
const muscleData = {
    '4': {
        title: 'Cedera Kepala (Concussion)',
        description: 'Gegar otak akibat benturan keras pada kepala',
        prevention: 'Gunakan helm pelindung, hindari head-to-head contact, teknik tackling yang benar'
    },
    '5': {
        title: 'Rotator Cuff Tendinopathy',
        description: 'Peradangan pada sendi bahu yang berputar',
        prevention: 'Pemanasan bahu, teknik stroke yang benar, istirahat cukup'
    },
    '6': {
        title: 'Overuse Injuries',
        description: 'Cedera akibat penggunaan berlebihan tanpa istirahat cukup',
        prevention: 'Istirahat adequate, variasi latihan, listen to your body'
    },
    '7': {
        title: 'Carpal Tunnel Syndrome',
        description: 'Nyeri dan mati rasa pada tangan akibat saraf terjepit',
        prevention: 'Wrist strengthening, proper grip, frequent breaks'
    },
    '8': {
        title: 'Groin Strains',
        description: 'Nyeri pangkal paha akibat penekanan hingga otot tegang/robek',
        prevention: 'Pemanasan adductor, hip flexibility, gradual training increase'
    },
    '9': {
        title: 'Achilles Tendinopathy',
        description: 'Iritasi dan peradangan akibat kerja otot berlebihan',
        prevention: 'Calf stretching, gradual training, proper footwear'
    },
    '10': {
        title: 'Ankle Sprain',
        description: 'Cedera keseleo pada pergelangan kaki',
        prevention: 'Ankle strengthening, proper footwear, avoid uneven surfaces'
    },
    '11': {
        title: 'Neck Strain',
        description: 'Ketegangan atau kelelahan otot leher',
        prevention: 'Pemanasan leher, teknik yang benar, hindari gerakan ekstrem'
    },
    '12': {
        title: 'Lower Back Injury',
        description: 'Cedera tulang belakang bagian bawah',
        prevention: 'Core strengthening, postur yang benar, pemanasan punggung'
    },
    '13': {
        title: 'Lower Back Pain',
        description: 'Nyeri punggung bawah akibat overuse atau postur buruk',
        prevention: 'Strengthen core, flexibility training, proper form'
    },
    '14': {
        title: 'Shin Splint',
        description: 'Nyeri tungkai bawah sisi depan akibat lari berlebihan',
        prevention: 'Proper footwear, gradual training, strengthen calves'
    },
    '15': {
        title: 'Muscle Fatigue',
        description: 'Kelelahan otot akibat latihan berlebihan',
        prevention: 'Proper recovery, balanced nutrition, adequate sleep'
    }
};

// Sport-specific injury data - MATERI05 SPECIFIC
const sportInjuryData = {
    'football': {
        title: 'Sepak Bola',
        commonInjuries: [
            'Ankle Sprain (25%)',
            'Knee Ligament Rupture (20%)',
            'Groin Strains (15%)',
            'Hamstring Strain (12%)',
            'Shin Splints (10%)'
        ],
        prevention: [
            'Gunakan sepatu dengan stud yang sesuai lapangan',
            'Lakukan pemanasan dinamis 15-20 menit',
            'Latihan proprioception untuk ankle stability',
            'Strengthen hamstring dan quadriceps',
            'Hindari overtraining'
        ]
    },
    'basketball': {
        title: 'Bola Basket',
        commonInjuries: [
            'Ankle Sprain (40%)',
            'Knee Injuries (20%)',
            'Finger Injuries (15%)',
            'Lower Back Pain (10%)',
            'Shoulder Impingement (8%)'
        ],
        prevention: [
            'Gunakan sepatu basket dengan ankle support',
            'Latihan jump landing technique',
            'Finger taping untuk proteksi',
            'Core strengthening',
            'Proper shooting form'
        ]
    },
    'running': {
        title: 'Lari',
        commonInjuries: [
            'Runner\'s Knee (20%)',
            'Shin Splints (15%)',
            'Achilles Tendinopathy (12%)',
            'Plantar Fasciitis (10%)',
            'IT Band Syndrome (8%)'
        ],
        prevention: [
            'Pilih sepatu lari yang sesuai gait pattern',
            'Tingkatkan jarak lari maksimal 10% per minggu',
            'Lakukan strength training 2x/minggu',
            'Variasikan surface lari (track, road, trail)',
            'Replace sepatu setiap 500-800km'
        ]
    },
    'tennis': {
        title: 'Tenis',
        commonInjuries: [
            'Tennis Elbow (30%)',
            'Shoulder Impingement (20%)',
            'Ankle Sprain (15%)',
            'Lower Back Pain (12%)',
            'Wrist Tendinitis (10%)'
        ],
        prevention: [
            'Gunakan grip size yang tepat',
            'Teknik backhand dua tangan untuk pemula',
            'Strengthen rotator cuff muscles',
            'Proper footwork dan court positioning',
            'Regular string tension check'
        ]
    },
    'swimming': {
        title: 'Renang',
        commonInjuries: [
            'Swimmer\'s Shoulder (60%)',
            'Lower Back Pain (15%)',
            'Knee Pain (Breaststroke) (10%)',
            'Neck Strain (8%)',
            'Ankle Impingement (5%)'
        ],
        prevention: [
            'Proper stroke technique dengan coach',
            'Shoulder blade stability exercises',
            'Rotate stroke types dalam training',
            'Adequate rest between high-intensity sets',
            'Pool deck exercises untuk injury prevention'
        ]
    },
    'volleyball': {
        title: 'Bola Voli',
        commonInjuries: [
            'Finger Injuries (25%)',
            'Ankle Sprain (20%)',
            'Shoulder Impingement (18%)',
            'Knee Pain (15%)',
            'Lower Back Pain (12%)'
        ],
        prevention: [
            'Proper spiking dan blocking technique',
            'Finger taping dan strengthening',
            'Jump landing training',
            'Rotator cuff strengthening',
            'Court awareness untuk avoid collision'
        ]
    }
};

// Muscle Map Interaction Functions - MATERI05 SPECIFIC
function initializeMuscleMap() {
    const injuryButtons = document.querySelectorAll('.injury-btn');
    const muscleOverlays = document.querySelectorAll('.muscle-overlay');
    const injuryInfo = document.getElementById('injury-info');
    const injuryTitle = document.getElementById('injury-title');
    const injuryDescription = document.getElementById('injury-description');
    const injuryPrevention = document.getElementById('injury-prevention');

    if (!injuryButtons.length) return; // Exit if not on materi05 page

    // Show injury info panel by default
    injuryInfo.classList.add('active');

    injuryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const muscleNumber = this.getAttribute('data-muscle');
            const muscleInfo = muscleData[muscleNumber];
            
            // Hide all overlays
            muscleOverlays.forEach(overlay => {
                overlay.style.display = 'none';
                overlay.classList.remove('active');
            });
            
            // Show specific muscle overlay
            const targetOverlay = document.querySelector(`[data-muscle="${muscleNumber}"]`);
            if (targetOverlay && targetOverlay.classList.contains('muscle-overlay')) {
                targetOverlay.style.display = 'block';
                setTimeout(() => targetOverlay.classList.add('active'), 10);
            }
            
            // Update info panel
            if (muscleInfo) {
                injuryTitle.textContent = muscleInfo.title;
                injuryDescription.textContent = muscleInfo.description;
                injuryPrevention.innerHTML = `<strong>Pencegahan:</strong> ${muscleInfo.prevention}`;
            }
            
            // Add active state to button
            button.classList.add('active');
        });
        
        button.addEventListener('mouseleave', function() {
            const muscleNumber = this.getAttribute('data-muscle');
            
            // Hide muscle overlay
            const targetOverlay = document.querySelector(`[data-muscle="${muscleNumber}"]`);
            if (targetOverlay && targetOverlay.classList.contains('muscle-overlay')) {
                targetOverlay.classList.remove('active');
                setTimeout(() => targetOverlay.style.display = 'none', 300);
            }
            
            // Reset info panel
            injuryTitle.textContent = 'Hover Button untuk Melihat Area Cedera';
            injuryDescription.textContent = 'Arahkan mouse ke button cedera untuk melihat visualisasi pada gambar tubuh dan informasi detail.';
            injuryPrevention.innerHTML = '';
            
            // Remove active state from button
            button.classList.remove('active');
        });
    });
}

// Initialize materi05 specific functions - MATERI05 SPECIFIC
function initMateri05Functions() {
    initializeMuscleMap();
    initSportInjurySelector();
    initRiceMethodInteraction();
    initInjurySeverityAssessment();
    initPreventionChecklist();
}

// Sport injury selector - MATERI05 SPECIFIC
function initSportInjurySelector() {
    const sportOptions = document.querySelectorAll('.sport-option');
    const sportInfoPanel = document.getElementById('sport-injury-info');
    const sportTitle = document.getElementById('sport-title');
    const sportCommonInjuries = document.getElementById('sport-common-injuries');
    const sportPreventionTips = document.getElementById('sport-prevention-tips');

    if (!sportOptions.length) return; // Exit if not on materi05 page

    sportOptions.forEach(option => {
        option.addEventListener('click', function() {
            sportOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            const sport = this.getAttribute('data-sport');
            const data = sportInjuryData[sport];
            
            if (data) {
                sportTitle.textContent = data.title;
                
                sportCommonInjuries.innerHTML = `
                    <h4>🏥 Cedera Umum:</h4>
                    <ul>${data.commonInjuries.map(injury => `<li>${injury}</li>`).join('')}</ul>
                `;
                
                sportPreventionTips.innerHTML = `
                    <h4>🛡️ Tips Pencegahan:</h4>
                    <ul>${data.prevention.map(tip => `<li>${tip}</li>`).join('')}</ul>
                `;
                
                sportInfoPanel.classList.add('show');
            }
        });
    });
}

// RICE method interaction - MATERI05 SPECIFIC
function initRiceMethodInteraction() {
    const riceSteps = document.querySelectorAll('.rice-step');
    const riceDetails = document.querySelectorAll('.rice-detail');

    if (!riceSteps.length) return; // Exit if not on materi05 page

    riceSteps.forEach(step => {
        step.addEventListener('click', function() {
            riceSteps.forEach(s => s.classList.remove('active'));
            riceDetails.forEach(d => d.classList.remove('active'));
            
            this.classList.add('active');
            const stepType = this.getAttribute('data-step');
            const detail = document.getElementById(`rice-${stepType}`);
            if (detail) {
                detail.classList.add('active');
            }
        });
    });
}

// Injury severity assessment - MATERI05 SPECIFIC
function initInjurySeverityAssessment() {
    const severityOptions = document.querySelectorAll('.severity-option');
    let answers = {};

    if (!severityOptions.length) return; // Exit if not on materi05 page

    severityOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const score = parseInt(this.getAttribute('data-score'));
            
            // Remove active from other options in same question
            document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            this.classList.add('selected');
            answers[question] = score;
        });
    });
}

// Prevention checklist - MATERI05 SPECIFIC
function initPreventionChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    const checklistFill = document.getElementById('checklist-progress-fill');
    const checklistPercentage = document.getElementById('checklist-percentage');
    const checklistFeedback = document.getElementById('checklist-feedback');
    let checkedCount = 0;

    if (!checklistItems.length) return; // Exit if not on materi05 page

    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            const checkbox = this.querySelector('.checklist-checkbox');
            const checkIcon = checkbox.querySelector('i');
            
            if (this.classList.contains('checked')) {
                this.classList.remove('checked');
                checkIcon.style.display = 'none';
                checkedCount--;
            } else {
                this.classList.add('checked');
                checkIcon.style.display = 'block';
                checkedCount++;
            }
            
            const percentage = Math.round((checkedCount / checklistItems.length) * 100);
            checklistFill.style.width = percentage + '%';
            checklistPercentage.textContent = percentage + '%';
            
            if (percentage === 0) {
                checklistFeedback.textContent = 'Mulai centang item di atas untuk melihat progress Anda!';
                checklistFeedback.style.color = '#6c757d';
            } else if (percentage < 50) {
                checklistFeedback.textContent = 'Terus tingkatkan! Masih ada beberapa hal yang perlu diperhatikan.';
                checklistFeedback.style.color = '#dc3545';
            } else if (percentage < 80) {
                checklistFeedback.textContent = 'Bagus! Anda sudah memperhatikan sebagian besar aspek pencegahan.';
                checklistFeedback.style.color = '#ffc107';
            } else {
                checklistFeedback.textContent = 'Excellent! Anda sudah siap berolahraga dengan aman! 🎉';
                checklistFeedback.style.color = '#28a745';
            }
        });
    });
}

// Injury severity assessment function - MATERI05 SPECIFIC
function assessInjury() {
    const answers = {};
    document.querySelectorAll('.severity-option.selected').forEach(option => {
        const question = option.getAttribute('data-question');
        const score = parseInt(option.getAttribute('data-score'));
        answers[question] = score;
    });
    
    if (Object.keys(answers).length < 4) {
        alert('Mohon jawab semua pertanyaan terlebih dahulu!');
        return;
    }
    
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const resultDiv = document.getElementById('severity-result');
    const levelDiv = document.getElementById('severity-level');
    const descDiv = document.getElementById('severity-description');
    const recomDiv = document.getElementById('severity-recommendations');
    
    let level, description, recommendations, bgColor;
    
    if (totalScore <= 6) {
        level = '🟢 RINGAN (Skor: ' + totalScore + '/16)';
        description = 'Cedera ringan yang dapat ditangani sendiri dengan perawatan dasar.';
        recommendations = `
            <strong>Rekomendasi:</strong>
            <ul>
                <li>Aplikasikan metode RICE</li>
                <li>Istirahat 1-3 hari</li>
                <li>Monitor perkembangan</li>
                <li>Konsultasi dokter jika tidak membaik dalam 3 hari</li>
            </ul>
        `;
        bgColor = 'linear-gradient(135deg, #28a745, #20c997)';
    } else if (totalScore <= 10) {
        level = '🟡 SEDANG (Skor: ' + totalScore + '/16)';
        description = 'Cedera sedang yang memerlukan perhatian lebih dan mungkin konsultasi medis.';
        recommendations = `
            <strong>Rekomendasi:</strong>
            <ul>
                <li>Aplikasikan metode RICE segera</li>
                <li>Istirahat 3-7 hari</li>
                <li>Konsultasi tenaga medis dalam 24-48 jam</li>
                <li>Avoid weight bearing jika cedera di kaki</li>
                <li>Monitor tanda-tanda memburuk</li>
            </ul>
        `;
        bgColor = 'linear-gradient(135deg, #ffc107, #fd7e14)';
    } else {
        level = '🔴 BERAT (Skor: ' + totalScore + '/16)';
        description = 'Cedera berat yang memerlukan penanganan medis segera.';
        recommendations = `
            <strong>Rekomendasi URGENT:</strong>
            <ul>
                <li>🚨 SEGERA ke dokter atau rumah sakit</li>
                <li>Jangan menggerakkan area yang cedera</li>
                <li>Aplikasikan RICE sambil menunggu bantuan medis</li>
                <li>Jangan konsumsi obat tanpa resep dokter</li>
                <li>Dokumentasikan gejala untuk dokter</li>
            </ul>
        `;
        bgColor = 'linear-gradient(135deg, #dc3545, #c82333)';
    }
    
    levelDiv.textContent = level;
    descDiv.textContent = description;
    recomDiv.innerHTML = recommendations;
    resultDiv.style.background = bgColor;
    resultDiv.classList.add('show');
}

// Recovery timeline simulation - MATERI05 SPECIFIC
function startRecoverySimulation() {
    const progressBar = document.getElementById('recovery-progress');
    const statusDiv = document.getElementById('timeline-status');
    
    if (!progressBar || !statusDiv) return; // Exit if not on materi05 page
    
    // Reset
    progressBar.style.width = '0%';
    statusDiv.textContent = 'Memulai simulasi pemulihan...';
    
    const phases = [
        { width: '25%', text: 'Fase Akut - Peradangan dan nyeri (Hari 1-2)', time: 1000 },
        { width: '50%', text: 'Fase Subakut - Pembentukan jaringan parut (Hari 3-7)', time: 2000 },
        { width: '75%', text: 'Fase Pemulihan - Remodeling jaringan (Minggu 2-6)', time: 3000 },
        { width: '100%', text: 'Fully Recovered - Kembali ke aktivitas normal (Bulan 2+)', time: 4000 }
    ];
    
    phases.forEach((phase, index) => {
        setTimeout(() => {
            progressBar.style.width = phase.width;
            statusDiv.textContent = phase.text;
            
            if (index === phases.length - 1) {
                statusDiv.innerHTML = `
                    <strong style="color: #28a745;">✅ ${phase.text}</strong>
                    <br><small>Simulasi selesai! Klik tombol untuk mengulang.</small>
                `;
            }
        }, phase.time);
    });
}

// Initialize materi05 functions when DOM is loaded - MATERI05 SPECIFIC
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on materi05 page by looking for specific elements
    if (document.querySelector('.muscle-map-container') || 
        document.querySelector('.injury-btn') || 
        document.querySelector('.rice-step')) {
        initMateri05Functions();
    }
});