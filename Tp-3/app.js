(function () {
  var scrollY = function () {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

    return supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
      ? document.documentElement.scrollTop
      : document.body.scrollTop;

    // returns nbrs of px that the document is currently srolled
  };

  var elements = document.querySelectorAll("[data-sticky]");

  for (var i = 0; i < elements.length; i++) {
    (function (element) {
      var top = element.getBoundingClientRect().top + scrollY(); // returns element position plus srollY
      var offset = element.getAttribute("data-offset") || 0;
      
      // constraint 
      if (element.getAttribute("data-constraint")) {
        var constraint = document.querySelector(
          element.getAttribute("data-constraint")
        );
      } else {
        var constraint = document.body;
      }
      var constraintRect = constraint.getBoundingClientRect();
      var constraintBottom =
        constraintRect.top +
        scrollY() +
        constraintRect.height -
        offset -
        element.getBoundingClientRect().height;
      
      // element width 
      var width = element.getBoundingClientRect().width;

      //fake box 
      var fakeBox = document.createElement("div");
      fakeBox.style.height = top + "px";


      //scroll function 
      var onScroll = function () {
        var alredyFixed = element.classList.contains("fixed");

        
        if (scrollY() > top - offset && !alredyFixed) {
          element.classList.add("fixed");
          element.style.top = parseInt(offset) + "px";
          element.style.width = width + "px";
          element.parentNode.insertBefore(fakeBox, element);
          element.style.bottom = 'auto'
          element.style.position = 'fixed'
          console.log("add");
        } else if (scrollY() < top - offset && alredyFixed) {
          element.classList.remove("fixed");
          element.parentNode.removeChild(fakeBox);
          console.log("remove");
        } else if (scrollY() > constraintBottom) {
          element.classList.remove('fixed')
          element.style.position = 'absolute'
          element.style.bottom = '0'
          element.style.top ='auto'
        }
      };


      window.addEventListener("scroll", onScroll);


    })(elements[i]);
  }
})();
