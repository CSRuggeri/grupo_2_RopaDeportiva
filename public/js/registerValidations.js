// formValidations.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-register");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            this.submit();
        }
    });

    function validateForm() {
        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();
        const avatar = document.querySelector('input[name="avatar"]').value.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Name validation
        if (name.length < 2) {
            alert("El nombre y apellido debe tener al menos 2 caracteres.");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("El email ingresado no es válido.");
            return false;
        }

        // Password validation
        if (password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return false;
        }
        // Optional password pattern matching
        // if (!passwordRegex.test(password)) {
        //     alert("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.");
        //     return false;
        // }

        // Avatar validation
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(avatar)) {
            alert("El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
            return false;
        }

        return true; // Return true if all validations pass
    }
});