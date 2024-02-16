let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen1 .quiz_area").addClass("scale");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen2 .click_obj").addClass("scale");
  popWait();
});

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  $(".drag_box[data-name=" + dataNum + "]").addClass("hide");
  $(".drop_box[data-name=" + dataNum + "]")
    .parent()
    .addClass("on");

  if ($(".screen1 .box_wrap.on")) {
    $(".screen1 .quiz_area").addClass("finish");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    setTimeout(function () {
      $(".blank").addClass("hide");
    }, 500);
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

$(".click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  $(".blank").removeClass("hide");

  if ($(this).hasClass("c1")) {
    answerAudio(true);
    $(".click_wrap").addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    answerAudio(false);

    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".blank").addClass("hide");
      $(".click_wrap").removeClass("off");
    }, 500);
  }
});
