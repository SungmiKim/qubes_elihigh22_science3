let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/concept1_h/directive1.mp3";
  directiveAudio.play();
});

let screen = 0;
directiveAudio.addEventListener("ended", function () {
  screen++;
  popWait();

  if (screen == 1) {
    $(".screen1 .quiz_area").addClass("on");
  } else {
    $(".screen2 .click_wrap").addClass("scale");
  }
  $(".blank").addClass("hide");
});

function dropCorrect(dataNum) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  $(".screen1 .drag_box[data-num=" + dataNum + "]").addClass("on");

  if ($(".screen1 .drag_box.on[data-name=1]").length == 2) {
    $(".screen1 .box_wrap.d1").addClass("on");
  }
  if ($(".screen1 .drag_box.on[data-name=2]").length == 2) {
    $(".screen1 .box_wrap.d2").addClass("on");
  }

  if ($(".screen1 .box_wrap.on").length == 2) {
    if ($(".screen2").hasClass("hide")) {
      $(".screen1 .quiz_area").addClass("finish");
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
}

function dropIncorrect() {}

$(".screen1 .drag_box").bind("mousedown touchstart", function () {
  $(".screen1 .quiz_area").removeClass("on");
});

$(".screen1 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen1 .quiz_area").addClass("on");
  }, 500);
});

$(".screen2 .click_obj").click(function () {
  $(".screen2 .click_wrap").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c1")) {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".screen2 .click_wrap").addClass("scale");
      $(".screen2 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  } else {
    answerAudio(true);
    $(".screen2 .click_wrap").addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
});
