window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/explore2/directive.mp3");
  setTimeout(function () {
    directiveAudio.play();
  }, 1000);

  $(".init_obj .obj1").fadeIn();
  setTimeout(function () {
    qs(".init_obj .obj1").classList.add("on");

    setTimeout(function () {
      $(".init_obj .obj2").fadeIn();
      qs(".name_list .obj1").classList.add("on");
      setTimeout(function () {
        qs(".init_obj .obj2").classList.add("on");
        setTimeout(function () {
          $(".init_obj .obj3").fadeIn();
          qs(".name_list .obj2").classList.add("on");
          setTimeout(function () {
            qs(".init_obj .obj3").classList.add("on");
            setTimeout(function () {
              $(".init_obj .obj4").fadeIn();
              qs(".name_list .obj3").classList.add("on");
              setTimeout(function () {
                qs(".init_obj .obj4").classList.add("on");
                setTimeout(function () {
                  qs(".name_list .obj4").classList.add("on");
                }, 500);
              }, 1000);
            }, 500);
          }, 1000);
        }, 500);
      }, 1000);
    }, 500);
  }, 2000);

  directiveAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore3.html");
  });
});
