window.addEventListener('load',()=>{
    let prev = document.querySelector('.prev')
    let next = document.querySelector('.next')
    let dots = document.querySelectorAll('.dot')
    let slideIndex = 1;

    prev.addEventListener('click',()=>{
        plusSlides(-1)
    })
    next.addEventListener('click',()=>{
        plusSlides(1)
    })
    dots.forEach((dot,i)=>{
        dot.addEventListener('click',()=>{
            currentSlide(i+1)
        })
    })

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    let dots = document.querySelectorAll(".dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
})
