// createProductValidations.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-login");

    form.addEventListener("submit", function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    function validateForm() {
        const name = document.querySelector('input[name="name"]').value.trim();
        const description = document.querySelector('input[name="description"]').value.trim();
        const image = document.querySelector('input[name="image"]').value.trim();

        // Name validation
        if (name.length < 5) {
            alert("El nombre del producto debe tener al menos 5 caracteres.");
            return false;
        }

        // Description validation
        if (description.length < 20) {
            alert("La descripción del producto debe tener al menos 20 caracteres.");
            return false;
        }

        // Image validation
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(image)) {
            alert("El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF).");
            return false;
        }

        // Other validations (e.g., category, size, price, discount, stock) can be added here as needed

        return true; // Return true if all validations pass
    }
});