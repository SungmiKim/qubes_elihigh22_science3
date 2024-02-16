if (sessionStorage.getItem("summaryNum") >= 2) {
  popWait();
  $(".has_guide").addClass("hide");
  qs(".blank").classList.add("hide");
  $(".name_list li").addClass("on");
  qs(".btn.sub_move").classList.add("active");
} else {
  window.addEventListener("load", function () {
    playGuide();
    popWait();
    qs(".blank").classList.add("hide");

    scale();
  });

  var guide;
  function scale() {
    guide = setTimeout(function () {
      $(".has_guide").addClass("hide");
      $(".name_tag").addClass("on");
    }, 2500);
  }

  let directiveAudio = new Audio("audio/summary2/directive1.mp3");
  let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

  qs(".name_list li").addEventListener("click", function () {
    clearTimeout(guide);
    $(".has_guide").addClass("hide");
    $(".name_tag").addClass("on");
    sparkleAudio.play();
    this.classList.add("on");
    $(".name_tag").removeClass("on");
    qs(".blank").classList.remove("hide");
    sparkleAudio.addEventListener("ended", function () {
      directiveAudio.play();
    });
  });

  directiveAudio.addEventListener("ended", function () {
    qs(".blank").classList.add("hide");
    qs(".btn.sub_move").classList.add("active");
    sessionStorage.setItem("summaryNum", 2);
    popWait();
  });
}
