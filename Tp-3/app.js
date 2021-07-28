(function () {
  var scrollY = function () {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

    return supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
  };

  var nav = document.querySelector(".navigation");
  var top = nav.getBoundingClientRect().top + scrollY();
  var fakeBox = document.createElement('div')
  fakeBox.style.height=top+"px"

  var onScroll = function () {
    var alredyFixed = nav.classList.contains("fixed");
    if (scrollY() > top && !alredyFixed) {
      console.log("add");
      nav.classList.add("fixed");
      nav.parentNode.insertBefore(fakeBox,nav)
    } else if (scrollY() < top && alredyFixed) {
      nav.classList.remove("fixed");
      nav.parentNode.removeChild(fakeBox)
      console.log("remove");
    };
  };
  window.addEventListener("scroll", onScroll);
})();
