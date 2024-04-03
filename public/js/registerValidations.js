// formValidations.js

window.addEventListener("load", function () {
  const form = document.querySelector(".registro");
  let nameI = document.querySelector('.registro input[name="name"]');
  let emailI = document.querySelector('.registro input[name="email"]');
  let passI = document.querySelector('.registro input[name="password"]');
  let passConfI= document.querySelector('.registro input[name="pass_confirm"]')
  let passConfE= document.querySelector('p.pass-conf-error')
  let dateI= document.querySelector('.registro input[name="birth_date"]')
  let dateE= document.querySelector('p.date-error')
  let avatarI = document.querySelector('.registro input[name="avatar"]');
  let avatarE = document.querySelector('p.avatar-error')
  let emailE = document.querySelector("p.email-error");
  let passE = document.querySelector("p.pass-error");
  let nameE = document.querySelector("p.name-error");
  console.log(nameI, emailI, passI);

  nameI.addEventListener("blur", () => {
    if (nameI.value.trim() == "") {
      nameI.classList.add("error-input");
      nameE.classList.remove("hidden");
      nameE.innerHTML =
        "<span class='material-symbols-outlined error-span'>error</span> Debes colocar un nombre";
    } else {
      nameI.classList.remove("error-input");
      nameE.classList.add("hidden");
    }
  });

  emailI.addEventListener("blur", () => {
    if (emailI.value.trim() == "") {
      emailI.classList.add("error-input");
      emailE.classList.remove("hidden");
      emailE.innerHTML =
        "<span class='material-symbols-outlined error-span'>error</span> Debes colocar un email valido";
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

  passConfI.addEventListener("blur", () => {
    if (passI.value.trim() != passConfI.value.trim()) {
        passConfI.classList.add("error-input");
        passConfE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> Las contraseñas no coinciden";
        passConfE.classList.remove("hidden");
    } else {
        passConfI.classList.remove("error-input");
        passConfE.classList.add("hidden");
    }
  });

  dateI.addEventListener('blur',()=>{
    if(dateI.value == ''){
        dateE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> Ingresa tu fecha de nacimiento";
        dateE.classList.remove("hidden");
    } else {
        dateE.classList.remove("error-input");
        dateE.classList.add("hidden");
    }
  })

//   form.addEventListener("submit", function (event) {
//     let errores = []
//     validateForm(errores)
    
//     // const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
//     // if (!allowedExtensions.exec(avatarI)) {
//     //     avatarE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF)";
//     //     avatarE.classList.remove("hidden");  
//     //     errores.push('avatar error')
//     // }
//     if(errores.length>0){
//         event.preventDefault()
//     }
//   });

  function validateForm(errorArray) {
    if (nameI.value.trim().length < 2) {
        nameI.classList.add("error-input");
        nameE.classList.remove("hidden");
        nameE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> El nombre y apellido debe tener al menos 2 caracteres";
        errorArray.push('name error')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailI.value.trim())) {
      emailI.classList.add("error-input");
      emailE.classList.remove("hidden");
      emailE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> El email ingresado no es válido";
      errorArray.push('email error')
    }
    if (passI.value.trim().length < 8) {
        passI.classList.add("error-input");
        passE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> La contraseña debe tener al menos 8 caracteres";
        passE.classList.remove("hidden");
        errorArray.push('pass error')
    }
    if(passConfI.value.trim() != passI.value.trim()){
        passConfI.classList.add("error-input");
        passConfE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> Las contraseñas no coinciden";
        passConfE.classList.remove("hidden");
        errorArray.push('pass confirm error')
    }
    if(dateI.value == ''){
        dateE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> Ingresa tu fecha de nacimiento";
        dateE.classList.remove("hidden");
        errorArray.push('date error')
    }
    // Optional password pattern matching
    // if (!passwordRegex.test(password)) {
    //     alert("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.");
    //     return false;
    // }

    // Avatar validation
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    // if (!allowedExtensions.exec(avatar)) {
    //   alert(
    //     "El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF)."
    //   );
    //   return false;
    // }
     // Return true if all validations pass
  }
});
