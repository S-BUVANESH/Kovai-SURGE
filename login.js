document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');

    loginForm.addEventListener('submit', (event) => {
        // Prevent the form from actually submitting
        event.preventDefault();

        const email = emailInput.value.trim().toLowerCase();

        if (!email) {
            alert('Please enter an email address.');
            return;
        }

        // --- Role-Based Redirection Logic ---

        if (email.endsWith('@ad.in')) {
            // 1. Store user data in the session
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userRole', 'admin');

            // 2. Redirect to Admin Dashboard
            window.location.href = 'admin-dashboard.html'; 

        } else if (email.endsWith('@td.in')) {
            // 1. Store user data in the session
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userRole', 'worker');

            // 2. Redirect to Worker Dashboard
            window.location.href = 'worker-dashboard.html';

        } else if (email.endsWith('@gmail.com')) {
            // 1. Store user data in the session
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userRole', 'citizen');

            // 2. Redirect to Citizen Dashboard
            window.location.href = 'citizen-dashboard.html';
            
        } else {
            // Invalid or unauthorized domain
            alert('Access Denied: Your email domain is not authorized for this system.');
        }
    });
});