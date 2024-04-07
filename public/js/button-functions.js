window.addEventListener('load',()=>{
    let menuBtn = document.querySelector('header .menu-button button')
    let nav = document.querySelector('header nav')
    let loginPass = document.querySelector('.login-password')
    let loginPassIcon = document.querySelector('.login-pass-icon')
    let avatarInput = document.querySelector('.avatar-input')
    let avatarImg = document.querySelector('.pfp-preview')
    let pfpLabel = document.querySelector('.pfp-label')
    let productInput = document.querySelector('.product-input')
    let productImg = document.querySelector('.product-preview')
    let productLabel = document.querySelector('.product-label')
    let defaultPfp = '/images/avatars/default-pfp.png'
    let defaultProductI = '/images/show/product-default.png'

    menuBtn.addEventListener('click',()=>{
        if (window.innerWidth <= 425) {
            nav.classList.toggle('nav-visibility')
        }
    })

    window.addEventListener('resize',()=>{
        if (window.innerWidth > 425) {
            nav.classList.remove('nav-visibility')
        }
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
                avatarImg.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
            pfpLabel.innerHTML = 'Cambiar imagen'
        } else {
            avatarImg.src = defaultPfp
            pfpLabel.innerHTML = 'Elegir imagen'
        }
    })




})