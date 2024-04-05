window.addEventListener('load',()=>{
    let defaultProductI = '/images/show/product-default.png'
    let productInput = document.querySelector('.product-input')
    let productImg = document.querySelector('.product-preview')
    let productLabel = document.querySelector('.product-label')

    productInput.addEventListener('change',(e)=>{
        if(e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = function (e) {
                productImg.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
            productLabel.innerHTML = 'Cambiar imagen'
        } else {
            productImg.src = defaultProductI
            productLabel.innerHTML = 'Elegir imagen'
        }
    })
})