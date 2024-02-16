function summaryFn(pageNum, cnt, last) {
  if (sessionStorage.getItem("summaryNum") >= pageNum) {
    if (last) {
      $(".has_guide").addClass("hide");
      qs(".blank").classList.add("hide");
      $(".name_list li").addClass("on");
      qs(".btn_next").classList.add("active");
      popNext();
    } else {
      popWait();
      $(".has_guide").addClass("hide");
      qs(".blank").classList.add("hide");
      $(".name_list li").addClass("on");
      qs(".btn.sub_move.btn_next").classList.add("active");
    }
    $(".ani_area").addClass("finish");
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
        var idx = $(this).attr("data-num");
        directiveAudio.src = "audio/summary" + pageNum + "/directive" + idx + ".mp3";
        sparkleAudio.addEventListener("ended", function () {
          directiveAudio.play();
          $(".ani_area").addClass("on");
          if ($("#wrap").attr("data-page") === "summary3") {
            setTimeout(function () {
              // $(".ani_area").removeClass("on");
              $(".ani_area").addClass("on1");
            }, 2500);
          }
        });
      });
    });

    directiveAudio.addEventListener("ended", function () {
      $(".ani_area").addClass("finish");
      qs(".blank").classList.add("hide");
      $(".name_tag").parent().not(".on").find(".name_tag").addClass("on");
      if (qsa(".name_list li.on").length == cnt) {
        if (last) {
          playFeedback();
        } else {
          qs(".btn.sub_move.btn_next").classList.add("active");
        }
        sessionStorage.setItem("summaryNum", pageNum);
      }
    });
  }
}
