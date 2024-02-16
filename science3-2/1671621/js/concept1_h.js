let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

$(".click_obj").click(function () {
  $(".click_wrap").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c1")) {
    answerAudio(true);
    $(".click_wrap").addClass("on");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2, .blank").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".click_wrap").addClass("scale");
      $(".click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});

directive2Audio.addEventListener("ended", function () {
  $(".quiz_area").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

function dropCorrect(fixDragBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");
  $(".box_wrap").addClass("on");
  $(".quiz_area").addClass("finish");

  setTimeout(function () {
    playFeedback();
  }, 2000);
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("scale");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});
