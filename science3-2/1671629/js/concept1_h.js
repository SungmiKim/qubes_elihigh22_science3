let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".quiz_area").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  $(".drag_box[data-num=" + dataNum + "]").addClass("hide");
  dropBox.parent().addClass("on" + dataNum);
  dropBox.addClass("hide");
  $(".screen1 .box_wrap.d2").addClass("start");

  if ($(".screen1 .drag_box.hide").length == 2) {
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

$(".screen2 .click_obj").click(function () {
  $(".screen2 .click_wrap").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c1")) {
    answerAudio(true);
    $(".screen2 .click_wrap").addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".screen2 .click_wrap").addClass("scale");
      $(".screen2 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});
