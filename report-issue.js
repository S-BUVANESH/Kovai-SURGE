document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SESSION AUTHENTICATION ---
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
        alert('Access Denied. Please log in.');
        window.location.href = 'login.html';
        return;
    }

    // --- 2. FORM HANDLING ---
    const issueForm = document.getElementById('issue-form');
    const photoInput = document.getElementById('issue-photo');
    const fileNameSpan = document.getElementById('file-name');

    photoInput.addEventListener('change', () => {
        fileNameSpan.textContent = photoInput.files.length > 0 ? photoInput.files[0].name : 'Choose a file...';
    });

    issueForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your issue report has been submitted.');
        // In a real app, you would upload data here.
        window.location.href = 'citizen-dashboard.html';
    });
});