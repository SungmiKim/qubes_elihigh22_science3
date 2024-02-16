window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept2_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    $(".quiz_area").addClass("on");

    $(".drag_box").bind("mousedown touchstart", function () {
      qs(".screen" + num + " .quiz_area").classList.remove("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      setTimeout(function () {
        qs(".screen" + num + " .quiz_area").classList.add("on");
      }, 500);
    });

    qs(".blank").classList.add("hide");
  });
}

let correctAudio = new Audio("../common/sound/effect/correct.mp3");

function dropCorrect(dataNum) {
  answerAudio(true);

  qs(`.drag_box[data-name='${dataNum}']`).classList.add("hide");
  qs(`.drop_box[data-name='${dataNum}']`).parentNode.classList.add("on");
  if (dataNum == 2) {
    $(".screen1 .drag_box img").css("animation", "none");

    setTimeout(function () {
      if (qsa(".screen1 .box_wrap.on").length == 1) {
        if (qs(".screen2").classList.contains("hide")) {
          $(".quiz_area").removeClass("on");
          qs(".quiz_cnt").classList.remove("cnt1");
          qs(".quiz_cnt").classList.add("cnt2");
          qs(".screen1").classList.add("hide");
          qs(".screen2").classList.remove("hide");
          qs(".blank").classList.remove("hide");

          directive(2);
        }
      }
    }, 1500);
  } else {
    if (qsa(".screen2 .box_wrap.on").length == 2) {
      $(".screen2 .drag_area").addClass("hide");
      playFeedback();
    }
  }
}

function dropIncorrect() {}
