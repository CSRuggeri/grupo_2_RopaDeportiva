document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-login");

    form.addEventListener("submit", function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    function validateForm() {
        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("El email ingresado no es válido.");
            return false;
        }

        // Password validation
        if (password.length === 0) {
            alert("La contraseña es obligatoria.");
            return false;
        }

        return true; // Return true if all validations pass
    }
});