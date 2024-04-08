window.addEventListener('load',()=>{
    let productsQuantity = document.querySelectorAll('.product-quantity')
    let total = document.querySelector('tfoot .total')
    let subTotals = document.querySelectorAll('.subtotal')    

    function actualizarTotal() {
        const suma = calcularSumaTotal();
        total.innerHTML = suma;
    }    

    function calcularSumaTotal(){
        let suma = 0;
        subTotals.forEach(subTotal => {
            let subTotalNumber = parseFloat(subTotal.innerHTML.replace(/\./g, '').replace(',', '.'))
            suma += subTotalNumber;
        });
        return suma.toLocaleString('es-Ar',{style:
            'decimal',minimumFractionDigits: 2,maximumFractionDigits: 2});
    }

    productsQuantity.forEach(productQuantity =>{
        let fila = productQuantity.closest('tr')
        let precio = fila.querySelector('.price').innerHTML
        let precioNumber = parseFloat(precio.replace(/\./g, '').replace(',', '.'))
        let subTotal = fila.querySelector('.subtotal')
        actualizarTotal()
        productQuantity.addEventListener('change',()=>{
            subTotal.innerHTML = (precioNumber*productQuantity.value).toLocaleString('es-Ar',{style:
                'decimal',minimumFractionDigits: 2,maximumFractionDigits: 2})
            actualizarTotal()
        })
    })
})