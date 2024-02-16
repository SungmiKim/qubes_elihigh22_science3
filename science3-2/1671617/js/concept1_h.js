let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  popWait();
  $(".screen1 .click_obj").addClass("scale");

  $(".blank").addClass("hide");
});

$(".screen1 .click_obj").click(function () {
  $(".screen1 .click_obj").removeClass("scale");
  $(".blank").removeClass("hide");

  if ($(this).hasClass("c1")) {
    answerAudio(true);
    $(".screen1 .click_wrap").addClass("on");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    answerAudio(false);
    $(".screen1 .click_wrap").addClass("off");

    setTimeout(function () {
      $(".screen1 .click_obj").addClass("scale");
      $(".screen1 .click_wrap").removeClass("off");
      $(".blank").addClass("hide");
    }, 2000);
  }
});

directive2Audio.addEventListener("ended", function () {
  popWait();
  $(".screen2 .click_obj").addClass("scale");

  $(".blank").addClass("hide");
});

$(".screen2 .click_obj").click(function () {
  $(".screen2 .click_obj").removeClass("scale");
  $(".blank").removeClass("hide");

  if ($(this).hasClass("c1")) {
    answerAudio(true);
    $(".screen2 .click_wrap").addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    answerAudio(false);
    $(".screen2 .click_obj.c2").addClass("vibration");

    setTimeout(function () {
      $(".screen2 .click_obj").addClass("scale");
      $(".screen2 .click_obj.c2").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});
