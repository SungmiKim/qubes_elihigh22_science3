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
    var idx;
    let num;

    qsa(".name_list li").forEach((click) => {
      click.addEventListener("click", function () {
        clearTimeout(guide);
        $(".has_guide").addClass("hide");
        $(".name_tag").addClass("on");
        sparkleAudio.play();
        this.classList.add("on");
        $(".name_tag").removeClass("on");
        qs(".blank").classList.remove("hide");

        idx = $(this).attr("data-num");
        // console.log(idx);
        directiveAudio.src = "audio/summary" + pageNum + "/directive" + idx + ".mp3";
        sparkleAudio.addEventListener("ended", function () {
          directiveAudio.play();
          $(".ani_area").addClass("on");
        });
        if (idx == 2) {
          setTimeout(function () {
            num = 3;
            directiveAudio.src = "audio/summary" + pageNum + "/directive3.mp3";
            directiveAudio.play();
            // setTimeout(function () {
            //   $(".name_list .txt2").addClass("on");
            // }, 500);
          }, 6200);
        }
      });
    });

    directiveAudio.addEventListener("ended", function () {
      if (idx == 1 || num == 3) {
        $(".ani_area").addClass("finish");
        qs(".blank").classList.add("hide");
        $(".name_tag").parent().not(".on").find(".name_tag").addClass("on");
        if (qsa(".name_list li.on").length == cnt) {
          if (last) {
            playFeedback();
          } else {
            // if (idx == 2) {
            //   setTimeout(function () {
            //     qs(".btn.sub_move.btn_next").classList.add("active");
            //   }, 5800);
            // } else {
            qs(".btn.sub_move.btn_next").classList.add("active");
            // }
          }
          sessionStorage.setItem("summaryNum", pageNum);
        }
      }
    });
  }
}
