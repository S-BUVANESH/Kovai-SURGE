document.addEventListener('DOMContentLoaded', () => {
    
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from submitting

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // --- Validation Checks ---

        // 1. Check if email is a valid @gmail.com address
        if (!email.endsWith('@gmail.com')) {
            alert('Registration is currently only available for citizens with a @gmail.com address.');
            return;
        }

        // 2. Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // 3. Check for minimum password length
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // --- If all checks pass ---
        alert('Registration successful! You will now be redirected to the login page.');
        
        // In a real application, you would save the user's data here.
        
        // Redirect to the login page
        window.location.href = 'login.html';
    });
});