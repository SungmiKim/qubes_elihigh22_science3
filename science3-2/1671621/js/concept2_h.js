let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/concept2_h/directive1.mp3";
  directiveAudio.play();
});

let screen = 0;
directiveAudio.addEventListener("ended", function () {
  screen++;
  popWait();

  if (screen == 1) {
    $(".screen1 .quiz_area").addClass("scale");
  } else {
    $(".screen2 .quiz_area").addClass("on");
  }
  $(".blank").addClass("hide");
});

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  if (screen == 1) {
    if (dataNum == 1) {
      dropBox.addClass("hide");
      dropBox.parent().addClass("on").addClass("on2");
    } else {
      dropBox.addClass("hide");
      dropBox.parent().addClass("on").addClass("on3");
    }
    $(".screen1 .drag_box.d" + dataNum).addClass("hide");
  } else {
    $(".screen2 .drag_box[data-num=" + dataNum + "]").addClass("on");
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

  if ($(".screen2 .drag_box.on").length == 2) {
    $(".screen2 .box_wrap").addClass("on");
    $(".screen2 .quiz_area").addClass("finish");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}

$(".screen1 .drag_box").bind("mousedown touchstart", function () {
  $(".screen1 .quiz_area").removeClass("scale");
});

$(".screen1 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen1 .quiz_area").addClass("scale");
  }, 500);
});

$(".screen2 .drag_box").bind("mousedown touchstart", function () {
  $(".screen2 .quiz_area").removeClass("on");
});

$(".screen2 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen2 .quiz_area").addClass("on");
  }, 500);
});
