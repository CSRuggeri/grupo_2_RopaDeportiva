// formValidations.js

window.addEventListener("load", function () {
  const form = document.querySelector(".registro");
  let nameI = document.querySelector('.registro input[name="name"]');
  let emailI = document.querySelector('.registro input[name="email"]');
  let passI = document.querySelector('.registro input[name="password"]');
  let passConfI= document.querySelector('.registro input[name="pass_confirm"]')
  let passConfE= document.querySelector('.registro p.pass-conf-error')
  let dateI= document.querySelector('.registro input[name="birth_date"]')
  let dateE= document.querySelector('.registro p.date-error')
  let avatarI = document.querySelector('.registro input[name="avatar"]');
  let avatarE = document.querySelector('.registro p.avatar-error')
  let emailE = document.querySelector(".registro p.email-error");
  let passE = document.querySelector(".registro p.pass-error");
  let nameE = document.querySelector(".registro p.name-error");
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

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

  avatarI.addEventListener('change',()=>{
    if (avatarI.files[0].name != "" && !allowedExtensions.exec(avatarI.files[0].name)) {
      avatarE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF)";
      avatarE.classList.remove("hidden");  
    } else {
      avatarE.classList.add("hidden");
    }
  })

  // form.addEventListener("submit", function (event) {
    
  //   let errores = []
  //   validateForm(errores)
  //   if(errores.length>0){
  //     event.preventDefault()
  //   }
  // });

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
    if (avatarI.files[0] && avatarI.files[0].name != "" && !allowedExtensions.exec(avatarI.files[0].name)) {
      avatarE.innerHTML = "<span class='material-symbols-outlined error-span'>error</span> El archivo de imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF)";
      avatarE.classList.remove("hidden");  
      errorArray.push('avatar error')
    }
  }
});
