window.addEventListener('load',()=>{
    let menuBtn = document.querySelector('header .menu-button button')
    let nav = document.querySelector('header nav')
    let loginPass = document.querySelector('.login-password')
    let loginPassIcon = document.querySelector('.login-pass-icon')
    let avatarInput = document.querySelector('.avatar-input')
    let img = document.querySelector('.pfp-preview')
    let defaultPfp = '/images/default-pfp.png'
    let pfpLabel = document.querySelector('.pfp-label')

    menuBtn.addEventListener('click',()=>{
        nav.classList.toggle('nav-visibility')
    })
    loginPassIcon.addEventListener('click',(e)=>{
        console.log(e)
       
        if (loginPassIcon.innerHTML === 'visibility') {
            loginPassIcon.innerHTML = 'visibility_off'
            console.log('vis off')
        } else {
            loginPassIcon.innerHTML = 'visibility'
            console.log('vis oon')
        }
        loginPass.setAttribute('type',loginPass.getAttribute('type') == 'password' ? 'text' : 'password')
    })
    avatarInput.addEventListener('change',(e)=>{
        if(e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = function (e) {
                img.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
            pfpLabel.innerHTML = 'Cambiar imagen'
        } else {
            img.src = defaultPfp
            pfpLabel.innerHTML = 'Elegir imagen'
        }
    })

   
})