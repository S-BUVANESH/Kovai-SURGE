document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SESSION AUTHENTICATION & UI PERSONALIZATION ---
    const userEmail = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole !== 'admin' || !userEmail) {
        alert('Access Denied. Please log in as an administrator.');
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('user-display-name').textContent = userEmail;

    // --- 2. LOGOUT MODAL FUNCTIONALITY ---
    const logoutButton = document.getElementById('logout-button');
    const logoutModal = document.getElementById('logout-modal');
    const confirmLogoutBtn = document.getElementById('confirm-logout');
    const cancelLogoutBtn = document.getElementById('cancel-logout');

    if (logoutButton && logoutModal) {
        logoutButton.addEventListener('click', (e) => { e.preventDefault(); logoutModal.classList.add('active'); });
        cancelLogoutBtn.addEventListener('click', () => logoutModal.classList.remove('active'));
        confirmLogoutBtn.addEventListener('click', () => { sessionStorage.clear(); window.location.href = 'index.html'; });
        logoutModal.addEventListener('click', (e) => { if (e.target === logoutModal) logoutModal.classList.remove('active'); });
    }

    // --- 3. PAGE NAVIGATION ---
    const navLinks = document.querySelectorAll('#sidebar-nav .nav-link');
    const pages = document.querySelectorAll('main .page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = link.dataset.page;

            pages.forEach(page => page.classList.toggle('hidden', page.id !== targetPageId));
            pages.forEach(page => page.classList.toggle('active', page.id === targetPageId));
            navLinks.forEach(nav => nav.classList.toggle('active', nav.dataset.page === targetPageId));
        });
    });

    // --- 4. LIVE DATA SIMULATION ENGINE ---
    function updateDashboard() {
        updateKPIs();
        updateBarChart();
        populateWorkerManagement();
        populateCitizenReports();
    }

    function updateKPIs() {
        const kpiCards = document.querySelectorAll('#kpi-section > div');
        kpiCards.forEach(card => {
            const valueElement = card.children[1];
            const changeElement = card.children[2];
            let currentValue = parseFloat(valueElement.textContent);
            if (isNaN(currentValue)) currentValue = 0;
            const isPercent = valueElement.textContent.includes('%');
            const newValue = currentValue + (Math.random() - 0.5) * (currentValue * 0.1);
            const change = (newValue / currentValue - 1) * 100;
            
            valueElement.textContent = isPercent ? `${newValue.toFixed(1)}%` : `${Math.round(newValue)} ${valueElement.textContent.split(' ')[1] || ''}`;
            changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
        });
    }

    function updateBarChart() {
        const bars = document.querySelectorAll('#bar-chart-container > div.chart-bar');
        bars.forEach(bar => bar.style.height = `${Math.floor(Math.random() * 70) + 20}%`);
    }

    // --- 5. POPULATION FUNCTIONS FOR NEW PAGES ---
    function populateWorkerManagement() {
        const workerData = [
            { name: "Rajesh Kumar", status: "Online", vehicle: "TN-37-AB-1234", route: "Downtown Core", efficiency: 98 },
            { name: "Priya Sharma", status: "Online", vehicle: "TN-38-CD-5678", route: "Peelamedu Loop", efficiency: 95 },
            { name: "Anjali Singh", status: "Offline", vehicle: "TN-37-EF-9012", route: "Standby", efficiency: 0 },
            { name: "Vikram Reddy", status: "Online", vehicle: "TN-38-GH-3456", route: "South Zone", efficiency: 92 },
        ];
        const tableBody = document.getElementById('worker-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = workerData.map(w => `
            <tr>
                <td>${w.name}</td>
                <td><span class="status-badge ${w.status.toLowerCase()}">${w.status}</span></td>
                <td>${w.vehicle}</td>
                <td>${w.route}</td>
                <td class="${w.efficiency >= 95 ? 'text-primary' : 'text-white'}">${w.efficiency}%</td>
            </tr>
        `).join('');
    }

    function populateCitizenReports() {
        const reportData = [
            { type: "Overflowing Bin", location: "Near Ganga Hospital, R.S. Puram", time: "15m ago" },
            { type: "Illegal Dumping", location: "Behind VOC Park Ground", time: "45m ago" },
            { type: "Damaged Bin", location: "Cross-Cut Rd, Gandhipuram", time: "2h ago" },
        ];
        const container = document.getElementById('citizen-reports-container');
        if (!container) return;
        container.innerHTML = reportData.map(r => `
            <div class="report-card">
                <div class="flex justify-between items-start"><h3>${r.type}</h3><span class="text-xs text-[#a5b6a0]">${r.time}</span></div>
                <p class="location text-sm mt-1">${r.location}</p>
                <div class="flex gap-2 mt-4">
                    <button class="action-button text-xs flex-1">Assign</button>
                    <button class="action-button text-xs flex-1 bg-transparent border border-primary text-primary hover:bg-primary/10">Resolve</button>
                </div>
            </div>
        `).join('');
    }

    // --- 6. RUN THE DASHBOARD ---
    updateDashboard(); // Initial update to populate all pages
    setInterval(updateDashboard, 5000); // Continue updating every 5 seconds
});