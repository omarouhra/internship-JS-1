var links = document.querySelectorAll('.links li')
var content= document.querySelectorAll('.contents p')

for (var i = 0; i < links.length; i++){

    links[i].addEventListener('click', function (e) {
        e.preventDefault()

        var section = this.parentNode.parentNode
        var href = this.firstChild.getAttribute('href')

        if (this.classList.contains("active")) {
            return false;
        }
        
        this.parentNode.querySelector('.links .active').classList.remove('active');
        this.classList.add('active');
        section.querySelector(".contents .active").classList.remove('active');
        section.querySelector(href).classList.add('active')


    
    })
}