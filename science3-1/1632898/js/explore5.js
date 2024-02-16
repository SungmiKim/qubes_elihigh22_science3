window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/explore5/directive.mp3");
  directiveAudio.play();

  qs(".obj1").classList.add("on");
  setTimeout(function () {
    qs(".obj2").classList.add("on");
    setTimeout(function () {
      qs(".obj3").classList.add("on");
      setTimeout(function () {
        qs(".obj4").classList.add("on");
        setTimeout(function () {
          qs(".content .ct_arrow").classList.add("on");
          qs(".content .ct_arrow").addEventListener("transitionend", function () {
            autoNextPage(2000, "explore6.html");
          });
        }, 1800);
      }, 1500);
    }, 1500);
  }, 1500);
});
