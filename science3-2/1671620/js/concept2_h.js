let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/concept2_h/directive1.mp3";
  directiveAudio.play();
});

let screen = 0;
directiveAudio.addEventListener("ended", function () {
  screen++;
  popWait();

  $(".screen" + screen + " .drag_box").bind("mousedown touchstart", function () {
    $(".screen" + screen + " .quiz_area").removeClass("on");
  });

  $(".screen" + screen + " .drag_box").bind("mouseup touchend", function () {
    setTimeout(function () {
      $(".screen" + screen + " .quiz_area").addClass("on");
    }, 500);
  });

  $(".screen" + screen + " .quiz_area").addClass("on");
  $(".blank").addClass("hide");
});

function dropCorrect(dataNum) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  if (screen == 1) {
    $(".screen1 .drag_box[data-num=" + dataNum + "]").addClass("on");

    if ($(".screen1 .drag_box.on[data-name=1]").length == 2) {
      $(".screen1 .box_wrap.d1").addClass("on");
    }
    if ($(".screen1 .drag_box.on[data-name=2]").length == 2) {
      $(".screen1 .box_wrap.d2").addClass("on");
    }
  } else {
    $(".screen2 .drag_box[data-name=" + dataNum + "]").addClass("hide");
    $(".screen2 .drop_box[data-name=" + dataNum + "]")
      .parent()
      .addClass("on");
  }

  if ($(".screen1 .box_wrap.on").length == 2) {
    if ($(".screen2").hasClass("hide")) {
      $(".screen1 .quiz_area").addClass("finish");
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2, .blank").removeClass("hide");

        directiveAudio.src = "audio/concept2_h/directive2.mp3";
        directiveAudio.play();
      }, 2000);
    }
  }

  if ($(".screen2 .box_wrap.on").length == 3) {
    $(".screen2 .quiz_area").addClass("finish");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}
