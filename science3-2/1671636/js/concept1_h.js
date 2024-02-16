let directive1_1Audio = new Audio("audio/concept1_h/directive1_1.mp3");
let directive1_2Audio = new Audio("audio/concept1_h/directive1_2.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1_1Audio.play();
  if (/SM-T583/i.test(navigator.userAgent)) {
    $("#seqGif1").attr("data-option", "gif7_2//55//once//50");
    $("#seqGif1 img").attr("src", "./img/concept1_h/gif7_2/1.webp");
  }
});

directive1_1Audio.addEventListener("ended", function () {
  $(".quiz_area").addClass("on");
  $(".blank").addClass("hide");
  popWait();
});

function dropCorrect(fixDragBox) {
  answerAudio(true);

  $(".drag_box[data-name=" + fixDragBox + "]").addClass("hide");
  $(".drop_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("on");
  $(".quiz_area").addClass("finish");

  setTimeout(function () {
    seqGif("#seqGif1");
    directive1_2Audio.play();
  }, 1000);
}

directive1_2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");

    directive2Audio.play();
  }, 3000);
});

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});

directive2Audio.addEventListener("ended", function () {
  $(".screen2 .click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();

  $(".screen2 .click_obj").click(function () {
    $(".screen2 .click_wrap").removeClass("scale");
    $(".blank").removeClass("hide");

    if ($(this).hasClass("c2")) {
      answerAudio(true);
      $(".screen2 .click_wrap").addClass("on");

      setTimeout(function () {
        playFeedback();
      }, 2000);
    } else {
      answerAudio(false);

      setTimeout(function () {
        $(".screen2 .click_wrap").addClass("scale");
        $(".blank").addClass("hide");
      }, 500);
    }
  });
});
