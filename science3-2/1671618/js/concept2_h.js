let directive1Audio = new Audio("audio/concept2_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept2_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen1 .click_wrap").addClass("scale");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen2 .quiz_area").addClass("on");
  popWait();
});

$(".screen1 .click_obj").click(function () {
  $(".screen1 .click_wrap").removeClass("scale");
  $(".blank").removeClass("hide");

  if ($(this).hasClass("c2")) {
    answerAudio(true);
    $(".screen1 .click_wrap").addClass("finish");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".screen1 .click_wrap").addClass("scale");
      $(".screen1 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});

function dropCorrect(fixDragBox) {
  answerAudio(true);

  $(".drag_box[data-name=" + fixDragBox + "]").addClass("hide");
  $(".drop_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("on");
  $(".quiz_area").addClass("finish");

  setTimeout(function () {
    playFeedback();
  }, 2000);
}

function dropIncorrect() {}

$(".screen2 .drag_box").bind("mousedown touchstart", function () {
  $(".screen2 .quiz_area").removeClass("on");
});

$(".screen2 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen2 .quiz_area").addClass("on");
  }, 500);
});
