// Calendar and Workout Management
let currentDate = new Date();
let selectedDate = new Date();
let progressChart = null;

const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Sample workout data
let workoutData = [
    {
        id: 1,
        date: '2025-09-25',
        type: 'cardio',
        time: '09:00',
        duration: 90,
        intensity: 'moderate',
        calories: 450,
        notes: 'Latihan kardio pagi untuk endurance'
    },
    {
        id: 2,
        date: '2025-09-26',
        type: 'strength',
        time: '16:00',
        duration: 120,
        intensity: 'high',
        calories: 380,
        notes: 'Latihan beban untuk upper body'
    },
    {
        id: 3,
        date: '2025-09-28',
        type: 'yoga',
        time: '07:00',
        duration: 60,
        intensity: 'low',
        calories: 180,
        notes: 'Yoga untuk relaksasi dan fleksibilitas'
    },
    {
        id: 4,
        date: '2025-10-01',
        type: 'hiit',
        time: '18:00',
        duration: 45,
        intensity: 'extreme',
        calories: 520,
        notes: 'High Intensity Interval Training'
    },
    {
        id: 5,
        date: '2025-09-24',
        type: 'running',
        time: '06:30',
        duration: 45,
        intensity: 'moderate',
        calories: 320,
        notes: 'Lari pagi di taman untuk kebugaran'
    },
    {
        id: 6,
        date: '2025-09-22',
        type: 'swimming',
        time: '17:00',
        duration: 60,
        intensity: 'moderate',
        calories: 400,
        notes: 'Renang untuk latihan kardio dan otot'
    },
    {
        id: 7,
        date: '2025-09-20',
        type: 'cycling',
        time: '08:00',
        duration: 90,
        intensity: 'high',
        calories: 480,
        notes: 'Bersepeda keliling kampus'
    }
];

// Fitness test data
let fitnessTestData = [
    {
        id: 1,
        date: '2025-09-20',
        type: 'push-up',
        result: '25',
        unit: 'repetisi',
        score: 'B',
        category: 'pre-test',
        notes: 'Tes awal untuk mengukur kekuatan otot dada'
    },
    {
        id: 2,
        date: '2025-09-15',
        type: 'run-12min',
        result: '2.4',
        unit: 'km',
        score: 'A',
        category: 'mid-test',
        notes: 'Lari 12 menit untuk tes kardiovaskular'
    }
];

// DOM Elements
const currentMonthElement = document.getElementById('currentMonth');
const calendarDaysElement = document.getElementById('calendarDays');
const todayDateElement = document.getElementById('todayDate');
const workoutModal = document.getElementById('workoutModal');
const workoutForm = document.getElementById('workoutForm');
const addWorkoutBtn = document.getElementById('addWorkoutBtn');
const fitnessTestModal = document.getElementById('fitnessTestModal');
const fitnessTestForm = document.getElementById('fitnessTestForm');
const addFitnessTestBtn = document.getElementById('addFitnessTestBtn');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    initializeProgressChart();
    setupEventListeners();
    updateTodayInfo();
    updateTodayWorkout();
    
    // Auto-select today's date
    const today = new Date().toISOString().split('T')[0];
    selectDate(today);
});

function initializeCalendar() {
    renderCalendar();
    updateCurrentMonth();
}

function setupEventListeners() {
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        updateCurrentMonth();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        updateCurrentMonth();
    });

    // Modal controls
    addWorkoutBtn.addEventListener('click', openModal);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    
    // Fitness test modal controls
    addFitnessTestBtn.addEventListener('click', openFitnessTestModal);
    document.getElementById('closeFitnessTestModal').addEventListener('click', closeFitnessTestModal);
    document.getElementById('cancelFitnessTestBtn').addEventListener('click', closeFitnessTestModal);
    
    // Form submission
    workoutForm.addEventListener('submit', handleFormSubmit);
    fitnessTestForm.addEventListener('submit', handleFitnessTestSubmit);

    // Progress period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateProgressChart(e.target.dataset.period);
        });
    });

    // Close modal when clicking outside
    workoutModal.addEventListener('click', (e) => {
        if (e.target === workoutModal) {
            closeModal();
        }
    });
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let daysHTML = '';
    
    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        daysHTML += `<div class="day other-month">${day}</div>`;
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = isDateToday(year, month, day);
        const hasWorkout = hasWorkoutOnDate(dateStr);
        const isSelected = isDateSelected(year, month, day);
        
        let classes = 'day';
        if (isToday) classes += ' today';
        if (hasWorkout) classes += ' has-workout';
        if (isSelected) classes += ' selected';
        
        daysHTML += `<div class="${classes}" data-date="${dateStr}" onclick="selectDate('${dateStr}')">${day}</div>`;
    }
    
    // Next month's days
    const totalCells = 42;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
        daysHTML += `<div class="day other-month">${day}</div>`;
    }
    
    calendarDaysElement.innerHTML = daysHTML;
}

function updateCurrentMonth() {
    const monthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    currentMonthElement.textContent = monthYear;
}

function isDateToday(year, month, day) {
    const today = new Date();
    return year === today.getFullYear() && 
           month === today.getMonth() && 
           day === today.getDate();
}

function isDateSelected(year, month, day) {
    return year === selectedDate.getFullYear() && 
           month === selectedDate.getMonth() && 
           day === selectedDate.getDate();
}

function hasWorkoutOnDate(dateStr) {
    return workoutData.some(workout => workout.date === dateStr);
}

function selectDate(dateStr) {
    selectedDate = new Date(dateStr + 'T00:00:00');
    
    // Remove previous selection
    document.querySelectorAll('.day.selected').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selection to clicked date
    document.querySelector(`[data-date="${dateStr}"]`)?.classList.add('selected');
    
    // Update "Hari Ini" section with selected date info
    updateSelectedDateInfo(dateStr);
}

function updateSelectedDateInfo(dateStr) {
    const workouts = workoutData.filter(workout => workout.date === dateStr);
    const todayDateElement = document.getElementById('todayDate');
    const todayWorkoutElement = document.getElementById('todayWorkout');
    
    // Update date display
    todayDateElement.textContent = formatDate(dateStr);
    
    // Update workout display
    if (workouts.length > 0) {
        let workoutHTML = '';
        workouts.forEach(workout => {
            workoutHTML += `
                <div class="workout-item">
                    <span class="workout-time">${workout.time}</span>
                    <span class="workout-name">${getWorkoutTypeLabel(workout.type)}</span>
                </div>
            `;
        });
        todayWorkoutElement.innerHTML = workoutHTML;
    } else {
        todayWorkoutElement.innerHTML = '<div class="workout-item"><span class="workout-name">Tidak ada latihan terjadwal</span></div>';
    }
}

function updateTodayInfo() {
    const today = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    };
    todayDateElement.textContent = today.toLocaleDateString('id-ID', options);
}

function updateTodayWorkout() {
    const today = new Date().toISOString().split('T')[0];
    const todayWorkouts = workoutData.filter(workout => workout.date === today);
    
    const todayWorkoutElement = document.getElementById('todayWorkout');
    
    if (todayWorkouts.length > 0) {
        let workoutHTML = '';
        todayWorkouts.forEach(workout => {
            workoutHTML += `
                <div class="workout-item">
                    <span class="workout-time">${workout.time}</span>
                    <span class="workout-name">${getWorkoutTypeLabel(workout.type)}</span>
                </div>
            `;
        });
        todayWorkoutElement.innerHTML = workoutHTML;
    } else {
        todayWorkoutElement.innerHTML = '<div class="workout-item"><span class="workout-name">Tidak ada latihan hari ini</span></div>';
    }
}

function getWorkoutTypeLabel(type) {
    const labels = {
        'cardio': 'Kardio',
        'strength': 'Kekuatan',
        'flexibility': 'Fleksibilitas',
        'hiit': 'HIIT',
        'yoga': 'Yoga',
        'running': 'Lari',
        'cycling': 'Bersepeda',
        'swimming': 'Renang'
    };
    return labels[type] || type;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        weekday: 'long',
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
}

// Progress Chart Functions
function initializeProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{
                label: 'Kalori Terbakar',
                data: [450, 0, 380, 0, 520, 300, 0],
                borderColor: '#26445d',
                backgroundColor: 'rgba(38, 68, 93, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#26445d',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        color: '#666'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666'
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

function updateProgressChart(period) {
    let labels, data;
    
    switch(period) {
        case 'week':
            labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
            data = [450, 0, 380, 0, 520, 300, 0];
            break;
        case 'month':
            labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
            data = [1200, 980, 1450, 1100];
            break;
        case 'year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
            data = [4500, 5200, 4800, 5600, 6100, 5900];
            break;
    }
    
    progressChart.data.labels = labels;
    progressChart.data.datasets[0].data = data;
    progressChart.update();
}

// Modal Functions
function openModal() {
    workoutModal.style.display = 'flex';
    setTimeout(() => {
        workoutModal.style.opacity = '1';
        document.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Set default date to selected date from calendar or today
    const defaultDate = selectedDate || new Date();
    const dateStr = `${defaultDate.getFullYear()}-${String(defaultDate.getMonth() + 1).padStart(2, '0')}-${String(defaultDate.getDate()).padStart(2, '0')}`;
    document.getElementById('workoutDate').value = dateStr;
}

function closeModal() {
    workoutModal.style.opacity = '0';
    document.querySelector('.modal-content').style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        workoutModal.style.display = 'none';
        workoutForm.reset();
    }, 300);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const timeMinutes = parseInt(document.getElementById('timeMinutes').value) || 0;
    const timeSeconds = parseInt(document.getElementById('timeSeconds').value) || 0;
    const totalTimeMinutes = timeMinutes + (timeSeconds / 60);
    const evidenceFile = document.getElementById('evidenceFile').files[0];
    
    const newWorkout = {
        id: Date.now(),
        date: document.getElementById('workoutDate').value,
        session: parseInt(document.getElementById('latmanSession').value),
        distance: parseFloat(document.getElementById('distance').value),
        pace: document.getElementById('pace').value,
        timeMinutes: timeMinutes,
        timeSeconds: timeSeconds,
        totalTime: totalTimeMinutes,
        evidenceFile: evidenceFile ? evidenceFile.name : null,
        type: 'latman'
    };
    
    // Add to workout data
    workoutData.push(newWorkout);
    workoutData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Update UI
    renderCalendar();
    updateTodayWorkout();
    closeModal();
    
    // Show success message
    setTimeout(() => {
        alert(`✅ Latman Ke-${newWorkout.session} berhasil ditambahkan pada ${formatDate(newWorkout.date)}`);
    }, 500);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (workoutModal.style.display === 'flex') {
            closeModal();
        }
        if (fitnessTestModal.style.display === 'flex') {
            closeFitnessTestModal();
        }
    }
    
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
    
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        openFitnessTestModal();
    }
});

// Fitness Test Modal Functions
function openFitnessTestModal() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('testDate').value = today;
    
    fitnessTestModal.style.display = 'flex';
    setTimeout(() => {
        fitnessTestModal.style.opacity = '1';
        fitnessTestModal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function closeFitnessTestModal() {
    fitnessTestModal.style.opacity = '0';
    fitnessTestModal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        fitnessTestModal.style.display = 'none';
        fitnessTestForm.reset();
    }, 300);
}

function handleFitnessTestSubmit(e) {
    e.preventDefault();
    
    const testType = document.getElementById('testType').value;
    
    // Collect basic data
    const newTest = {
        id: fitnessTestData.length + 1,
        studentName: document.getElementById('studentName').value,
        studentNIM: document.getElementById('studentNIM').value,
        studentAge: document.getElementById('studentAge').value,
        chestNumber: document.getElementById('chestNumber').value,
        recorderNIM: document.getElementById('recorderNIM').value,
        date: document.getElementById('testDate').value,
        type: testType,
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        sleepDuration: parseFloat(document.getElementById('sleepDuration').value),
        lastMealTime: document.getElementById('lastMealTime').value,
        initialHeartRate: parseInt(document.getElementById('initialHeartRate').value),
        finalHeartRate: parseInt(document.getElementById('finalHeartRate').value),
        rpeScore: parseInt(document.getElementById('rpeScore').value)
    };
    
    // Add test-specific data
    if (testType === 'kebugaran-awal' || testType === 'endurance-training' || testType === 'strength-training') {
        newTest.batteryTest = {
            pushUp: parseInt(document.getElementById('pushUpCount').value) || 0,
            sitUp: parseInt(document.getElementById('sitUpCount').value) || 0,
            backUp: parseInt(document.getElementById('backUpCount').value) || 0,
            squatJump: parseInt(document.getElementById('squatJumpCount').value) || 0
        };
        newTest.cooperTest = {
            lap1: document.getElementById('lap1Time').value || '',
            lap2: document.getElementById('lap2Time').value || '',
            lap3: document.getElementById('lap3Time').value || '',
            lap4: document.getElementById('lap4Time').value || '',
            lap5: document.getElementById('lap5Time').value || '',
            lap6: document.getElementById('lap6Time').value || ''
        };
    } else if (testType === 'interval') {
        newTest.intervalTest = {
            interval1: document.getElementById('interval1Time').value || '',
            interval2: document.getElementById('interval2Time').value || '',
            interval3: document.getElementById('interval3Time').value || '',
            interval4: document.getElementById('interval4Time').value || '',
            interval5: document.getElementById('interval5Time').value || '',
            interval6: document.getElementById('interval6Time').value || ''
        };
    }
    
    // Add to fitness test data
    fitnessTestData.push(newTest);
    fitnessTestData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Update UI
    renderCalendar();
    closeFitnessTestModal();
    
    // Show success message
    setTimeout(() => {
        alert(`✅ Hasil "${getTestTypeLabel(newTest.type)}" berhasil disimpan untuk ${newTest.studentName}`);
    }, 500);
}

function getTestTypeLabel(type) {
    const testTypes = {
        'kebugaran-awal': 'Tes Kebugaran Awal',
        'endurance-training': 'Endurance Training Test',
        'strength-training': 'Strength Training Test',
        'interval': 'Interval Test'
    };
    return testTypes[type] || type;
}

// Toggle test sections based on selected test type
function toggleTestSections() {
    const testType = document.getElementById('testType').value;
    const batterySection = document.getElementById('batteryTestSection');
    const cooperSection = document.getElementById('cooperTestSection');
    const intervalSection = document.getElementById('intervalTestSection');
    
    // Hide all sections first
    batterySection.style.display = 'none';
    cooperSection.style.display = 'none';
    intervalSection.style.display = 'none';
    
    // Show relevant sections based on test type
    if (testType === 'kebugaran-awal' || testType === 'endurance-training' || testType === 'strength-training') {
        batterySection.style.display = 'block';
        cooperSection.style.display = 'block';
    } else if (testType === 'interval') {
        intervalSection.style.display = 'block';
    }
}

// Make function globally available
window.toggleTestSections = toggleTestSections;

// Auto-refresh today info every minute
setInterval(updateTodayInfo, 60000);

// Export for global access
window.LatmanApp = {
    workoutData,
    fitnessTestData,
    renderCalendar,
    openModal,
    closeModal,
    openFitnessTestModal,
    closeFitnessTestModal,
    updateProgressChart
};
