window.addEventListener("load", function() {
    const form = document.querySelector(".login-form");
    const emailI = form[0]
    const emailE = document.querySelector('.login-form p.email-error')
    const passI = form[1]
    const passE = document.querySelector('.login-form p.pass-error')
    console.log(emailI, passI)

    emailI.addEventListener("blur", () => {
        if (emailI.value.trim() == "") {
            emailI.classList.add("error-input");
            emailE.classList.remove("hidden");
            emailE.innerHTML =
            "<span class='material-symbols-outlined error-span'>error</span> Debes colocar un Email";
        } else {
            emailI.classList.remove("error-input");
            emailE.classList.add("hidden");
        }
      });

      passI.addEventListener("blur", () => {
        if (passI.value.trim() == "") {
            passI.classList.add("error-input");
            passE.classList.remove("hidden");
            passE.innerHTML =
            "<span class='material-symbols-outlined error-span'>error</span> Debes colocar una contraseña";
        } else {
            passI.classList.remove("error-input");
            passE.classList.add("hidden");
        }
      });
    
    form.addEventListener("submit", function(event) {
        let errores = []
        if (!validateForm(errores)) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    function validateForm(errorArray) {
        

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailI.value.trim())) {
            emailI.classList.add("error-input");
            emailE.classList.remove("hidden");
            emailE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> Debe ingresar un Email"
            errorArray.push('email error')
        }

        // Password validation
        if (passI.value.trim().length === 0) {
            passI.classList.add("error-input");
            passE.classList.remove("hidden");
            passE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> La contraseña es obligatoria"
            errorArray.push('pass error')
        }

        if(errorArray.length >0){
            return false
        }
        
        return true; // Return true if all validations pass
    }
});