document.addEventListener('DOMContentLoaded', () => {
    const userEmail = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole !== 'worker' || !userEmail) {
        alert('Access Denied. Please log in as a worker.');
        window.location.href = 'index.html';
        return;
    }

    // --- State Management ---
    let collectedCount = 0;
    let issuesReported = 0;
    let routeData = [
        { id: 1, address: '123 Gandhi Rd, R.S. Puram', fill: 95 },
        { id: 2, address: '456 Avinashi Rd, Peelamedu', fill: 80 },
        { id: 3, address: '789 Race Course Rd', fill: 75 }
    ];

    // --- Element Selectors ---
    const userNameElement = document.getElementById('user-display-name');
    const routeListContainer = document.getElementById('route-list-container');
    const routeProgressElement = document.getElementById('route-progress');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const issueForm = document.getElementById('issue-form');

    // --- Initialization ---
    function init() {
        userNameElement.textContent = userEmail;
        document.getElementById('profile-email').textContent = userEmail;
        renderRoute();
        setupEventListeners();
    }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        document.getElementById('logout-button').addEventListener('click', logout);
        document.getElementById('add-priority-bin').addEventListener('click', addPriorityBin);
        routeListContainer.addEventListener('click', handleRouteClick);
        navLinks.forEach(link => link.addEventListener('click', handleNavClick));
        issueForm.addEventListener('submit', handleIssueSubmit);
    }

    // --- Core Functions ---
    function renderRoute() {
        routeListContainer.innerHTML = '';
        routeData.forEach(bin => {
            const isCollected = bin.collected;
            const itemHTML = `
                <div class="route-item ${isCollected ? 'collected' : ''}" data-id="${bin.id}">
                    <div class="flex gap-4 bg-[#1f251d] p-3 rounded-lg justify-between items-center">
                        <div class="flex items-center gap-4 flex-grow">
                            <div class="icon-container"><span class="material-symbols-outlined text-2xl">delete_outline</span></div>
                            <div class="details">
                                <p class="font-medium">Bin #${bin.id}</p>
                                <p class="text-sm ${bin.fill >= 90 ? 'text-red-400' : 'text-[#a5b6a0]'}">Fill Level: ${bin.fill}%</p>
                                <p class="text-sm text-[#a5b6a0]">${bin.address}</p>
                            </div>
                        </div>
                        <button class="collect-btn" ${isCollected ? 'disabled' : ''}>${isCollected ? 'Done' : 'Collect'}</button>
                    </div>
                </div>`;
            routeListContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
        updateProgress();
    }

    function updateProgress() {
        collectedCount = routeData.filter(b => b.collected).length;
        routeProgressElement.textContent = `(${collectedCount}/${routeData.length})`;
        // Update profile stats
        document.getElementById('stat-bins').textContent = collectedCount;
        document.getElementById('stat-progress').textContent = `${Math.round((collectedCount / routeData.length) * 100)}%`;
        document.getElementById('stat-issues').textContent = issuesReported;
    }

    function addPriorityBin() {
        const newBin = { id: routeData.length + 1, address: '555 Urgent Pickup, Saibaba Colony', fill: 98 };
        routeData.unshift(newBin); // Add to the beginning of the route
        renderRoute();
        alert('New high-priority bin added to the top of your route!');
    }

    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }

    // --- Event Handlers ---
    function handleRouteClick(event) {
        const target = event.target;
        const routeItem = target.closest('.route-item');
        if (!routeItem) return;

        const binId = parseInt(routeItem.dataset.id);
        const bin = routeData.find(b => b.id === binId);

        if (target.classList.contains('collect-btn')) {
            bin.collected = true;
            renderRoute();
        } else {
            alert(`Details for Bin #${bin.id}\nAddress: ${bin.address}\nFill Level: ${bin.fill}%`);
        }
    }

    function handleNavClick(event) {
        event.preventDefault();
        const targetPageId = this.dataset.page;

        pages.forEach(page => page.classList.toggle('hidden', page.id !== targetPageId));
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === targetPageId));
    }

    function handleIssueSubmit(event) {
        event.preventDefault();
        const issueType = document.getElementById('issue-type').value;
        alert(`Issue "${issueType}" has been reported successfully!`);
        issuesReported++;
        updateProgress();
        this.reset();
    }

    init(); // Start the application
});