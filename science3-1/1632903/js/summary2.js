if (sessionStorage.getItem("summaryNum") >= 2) {
  popWait();
  $(".has_guide").addClass("hide");
  qs(".blank").classList.add("hide");
  $(".name_list li").addClass("on");
  qs(".btn.sub_move.btn_next").classList.add("active");
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

  let directiveAudio = new Audio();
  let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

  qsa(".name_list li").forEach((click) => {
    click.addEventListener("click", function () {
      clearTimeout(guide);
      $(".has_guide").addClass("hide");
      $(".name_tag").addClass("on");
      sparkleAudio.play();
      this.classList.add("on");
      $(".name_tag").removeClass("on");
      qs(".blank").classList.remove("hide");
      if (this.classList.contains("name1")) {
        directiveAudio.src = "audio/summary2/directive1.mp3";
      } else {
        directiveAudio.src = "audio/summary2/directive2.mp3";
      }
      sparkleAudio.addEventListener("ended", function () {
        directiveAudio.play();
      });
    });
  });

  directiveAudio.addEventListener("ended", function () {
    qs(".blank").classList.add("hide");
    $(".name_tag").parent().not(".on").find(".name_tag").addClass("on");
    console.log(qsa(".name_list li.on").length);
    if (qsa(".name_list li.on").length == 2) {
      qs(".btn.sub_move.btn_next").classList.add("active");
      sessionStorage.setItem("summaryNum", 2);
    }
  });
}
