let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directive(2);
});

function directive(num) {
  $(".quiz_area").removeClass("on");
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();
}

directiveAudio.addEventListener("ended", function () {
  popWait();

  if (!$(".screen2").hasClass("hide")) {
    $(".click_wrap").addClass("on");
  } else {
    $(".quiz_area").addClass("on");

    $(".drag_box").bind("mousedown touchstart", function () {
      $(this).parents(".quiz_area").removeClass("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      var drag_box = $(this).parents(".quiz_area");
      setTimeout(function () {
        drag_box.addClass("on");
      }, 500);
    });
  }
  $(".blank").addClass("hide");
});

function dropCorrect(fixDragBox) {
  $(".blank").removeClass("hide");
  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  answerAudio(true);

  qs(`.drag_box[data-num='${fixDragBox}']`).style.removeProperty("top");
  qs(`.drag_box[data-num='${fixDragBox}']`).style.removeProperty("left");
  qs(`.drag_box[data-num='${fixDragBox}']`).style.pointerEvents = "none";
  qs(`.drag_box[data-num='${fixDragBox}']`).style.zIndex = 0;
  qs(`.drag_box[data-num='${fixDragBox}']`).classList.add("on");

  if (qsa(".screen1 .drag_box[data-name='1'].on").length == 2) {
    qs(".box_wrap.d1").classList.add("on");
  }
  if (qsa(".screen1 .drag_box[data-name='2'].on").length == 2) {
    qs(".box_wrap.d2").classList.add("on");
  }

  if ($(".screen1 .box_wrap.on").length == 2) {
    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}

$(".click_obj").click(function () {
  $(".click_wrap").removeClass("on");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c2")) {
    answerAudio(true);
    $(".click_wrap").addClass("finish");

    setTimeout(function () {
      if (!$(".screen2").hasClass("hide")) {
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen2").addClass("hide");
        $(".screen1, .blank").removeClass("hide");

        directive(1);
      }
    }, 2000);
  } else {
    answerAudio(false);
    $(this).addClass("vibration");
    setTimeout(function () {
      $(".click_obj").removeClass("vibration");
      $(".click_wrap").addClass("on");
      $(".blank").addClass("hide");
    }, 500);
  }
});
