let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

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
  $(".screen2 .click_wrap").addClass("scale");
  popWait();
});

$(".screen1 .click_obj").click(function () {
  $(".blank").removeClass("hide");
  $(".screen1 .click_wrap").removeClass("scale");
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
    $(this).find(".obj").addClass("vibration");
    setTimeout(function () {
      $(".blank").addClass("hide");
      $(".screen1 .click_wrap").addClass("scale");
      $(".screen1 .click_obj .obj").removeClass("vibration");
    }, 500);
  }
});

$(".screen2 .click_obj").click(function () {
  $(".blank").removeClass("hide");
  $(".screen2 .click_wrap").removeClass("scale");
  if ($(this).hasClass("c2")) {
    answerAudio(true);
    $(".screen2 .click_wrap").addClass("on");
    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");
    setTimeout(function () {
      $(".blank").addClass("hide");
      $(".screen2 .click_wrap").addClass("scale");
      $(".screen2 .click_obj .obj").removeClass("vibration");
    }, 500);
  }
});
