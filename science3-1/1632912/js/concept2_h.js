let directiveAudio = new Audio();
let magnetAudio1 = new Audio("audio/magnet.mp3");
let magnetAudio2 = new Audio("audio/magnet.mp3");
let magnetAudio3 = new Audio("audio/magnet.mp3");

window.addEventListener("load", function () {
  directive(1);
});

function directive(num) {
  directiveAudio.src = "audio/concept2_h/directive" + num + ".mp3";
  directiveAudio.play();
}

directiveAudio.addEventListener("ended", function () {
  popWait();
  if ($(".screen1").hasClass("hide")) {
    $(".quiz_area").addClass("on");
  } else {
    $(".click_obj").addClass("scale");
  }

  $(".blank").addClass("hide");
});

$(".click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c2")) {
    answerAudio(true);

    $(".click_wrap").addClass("on");

    setTimeout(function () {
      magnetAudio1.play();
      setTimeout(function () {
        magnetAudio2.play();
      }, 50);
      setTimeout(function () {
        magnetAudio3.play();
      }, 100);
      setTimeout(function () {
        magnetAudio4.play();
      }, 150);
    }, 1000);

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive(2);
    }, 3500);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".screen1 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});

function dropCorrect(fixDragBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  $(".drag_box.d" + fixDragBox).addClass("hide");
  $(".box_wrap.d" + fixDragBox).addClass("on");

  if ($(".box_wrap.on").length == 2) {
    $(".drag_area").addClass("hide");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});
