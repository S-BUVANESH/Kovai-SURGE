document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let greenPoints = 1250;
    const notifications = [
        { icon: 'recycling', text: 'You recycled 12 plastic bottles. +24 GP' },
        { icon: 'task_alt', text: 'Weekly waste report is ready. Great job!' },
        { icon: 'volunteer_activism', text: 'You earned the "Eco-Warrior" badge. +50 GP' }
    ];
    const rewards = [
        { name: 'Eco-Friendly Tote Bag', cost: 500, img: url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/6130a094622557.5e8373506b486.jpg') },
        { name: '$5 Cafe Voucher', cost: 1000, img:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrODvuNsmyDpR2EzSZWp0MBelFd4gK6eNdug&s' },
        { name: 'Plant a Tree Donation', cost: 1500, img: 'https://heartfulness.org/forests/static/gifting-edfd53858cd8be6a08671bdc7e2afb5a.png' },
        { name: 'Reusable Water Bottle', cost: 2000, img: 'https://img.freepik.com/free-photo/top-view-floating-water_23-2151013921.jpg?semt=ais_hybrid&w=740&q=80' }
    ];

    // --- AUTHENTICATION & PERSONALIZATION ---
    const userEmail = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole !== 'citizen' || !userEmail) {
        alert('Access Denied. Please log in.');
        window.location.href = 'index.html';
        return;
    }
    
    // --- INITIALIZATION ---
    function init() {
        document.getElementById('user-display-name').textContent = userEmail;
        document.getElementById('welcome-message').textContent = `Welcome back, ${userEmail}!`;
        renderNotifications();
        renderRewards();
        updatePointsBalance();
        updateDashboardStats();
        setupEventListeners();
        initTheme();
    }
    
    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', handleNavClick));
        document.getElementById('logout-button').addEventListener('click', logout);
        document.getElementById('rewards-grid').addEventListener('click', handleRedemption);
        document.getElementById('theme-toggle').addEventListener('change', toggleTheme);
    }
    
    // --- DYNAMIC RENDERING ---
    function renderNotifications() {
        const container = document.getElementById('notifications-container');
        container.innerHTML = notifications.map(n => `
            <div class="notification-card">
                <span class="material-symbols-outlined text-primary text-2xl">${n.icon}</span>
                <p class="text-charcoal dark:text-light-gray">${n.text}</p>
            </div>
        `).join('');
    }

    function renderRewards() {
        const grid = document.getElementById('rewards-grid');
        grid.innerHTML = rewards.map(r => `
            <div class="reward-card">
                <img src="${r.img}" alt="${r.name}" class="w-full h-40 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-bold text-charcoal dark:text-white">${r.name}</h3>
                    <p class="text-primary font-semibold my-2">${r.cost.toLocaleString()} GP</p>
                    <button class="redeem-btn" data-cost="${r.cost}">Redeem</button>
                </div>
            </div>
        `).join('');
    }
    
    // --- CORE FUNCTIONALITIES ---
    // In citizen-dashboard.js, find the handleNavClick function and replace it with this:

function handleNavClick(e) {
    // If the link has a real destination, let the browser handle it
    if (this.getAttribute('href') !== '#') {
        return; 
    }
    
    e.preventDefault(); // Only prevent default for single-page toggles
    const targetPageId = this.dataset.page;
    
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === targetPageId));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l === this));
}

    function logout() {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
    
    function updateDashboardStats() {
        animateValue('stat-recycled', 0, 1234, 1500);
        animateValue('stat-reduced', 0, 56, 1500);
        animateValue('stat-points', 0, greenPoints, 1500);
        document.getElementById('stat-recycled-change').textContent = `+10% this month`;
        document.getElementById('stat-reduced-change').textContent = `+5% this month`;
        document.getElementById('stat-points-change').textContent = `+12% this month`;
    }

    function handleRedemption(e) {
        if (!e.target.matches('.redeem-btn')) return;
        
        const cost = parseInt(e.target.dataset.cost);
        const balanceCard = document.getElementById('points-balance-card');

        if (greenPoints >= cost) {
            greenPoints -= cost;
            updatePointsBalance();
            e.target.textContent = 'Redeemed!';
            e.target.disabled = true;
            alert('Reward redeemed successfully!');
        } else {
            alert('Not enough Green Points!');
            balanceCard.classList.add('shake');
            setTimeout(() => balanceCard.classList.remove('shake'), 500);
        }
    }
    
    function updatePointsBalance() {
        animateValue('points-balance', parseInt(document.getElementById('points-balance').textContent.replace(/,/g, '')) || 0, greenPoints, 500);
    }

    // --- THEME SWITCHER ---
    function initTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            document.getElementById('theme-toggle').checked = true;
        }
    }
    function toggleTheme(e) {
        document.documentElement.classList.toggle('dark', e.target.checked);
        localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
    }

    // --- ANIMATION HELPER ---
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            obj.innerHTML = currentValue.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    init(); // Start the application
});


