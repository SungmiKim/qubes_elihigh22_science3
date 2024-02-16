let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/concept1_h/directive1.mp3";
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

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  if (screen == 1) {
    $(".screen" + screen + " .drag_box[data-name=" + dataNum + "]").addClass("hide");
    $(".screen" + screen + " .drop_box[data-name=" + dataNum + "]")
      .parent()
      .addClass("on");
  } else {
    dropBox.addClass("hide");
    dropBox
      .parent()
      .addClass("on")
      .addClass("on" + (dataNum - 2));
    dropBox.addClass("hide");

    $(".screen" + screen + " .drag_box[data-num=" + dataNum + "]").addClass("hide");
  }

  if (qsa(".screen1 .box_wrap.on").length == 2) {
    if (qs(".screen2").classList.contains("hide")) {
      $(".screen1 .drag_area").addClass("hide");
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2, .blank").removeClass("hide");

        directiveAudio.src = "audio/concept1_h/directive2.mp3";
        directiveAudio.play();
      }, 2000);
    }
  }

  if ($(".screen2 .box_wrap.on").length == 2) {
    $(".screen2 .quiz_area").addClass("finish");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}
