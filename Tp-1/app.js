var button = document.querySelector('button');

button.addEventListener("click", function () {


    this.previousElementSibling.innerHTML = "Monsieur z meurt a la fin "
    this.previousElementSibling.style.opacity = "1";
    this.style.display = "none";
    
})