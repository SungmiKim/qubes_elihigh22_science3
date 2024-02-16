let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directive(1);
});

function directive(num) {
  $(".quiz_area").removeClass("on");

  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();
}

directiveAudio.addEventListener("ended", function () {
  popWait();

  if (!$(".screen2").hasClass("hide")) {
    $(".click_obj").addClass("scale");
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

  if (!$(".screen1").hasClass("hide")) {
    $(".drag_box[data-name=" + fixDragBox + "]").addClass("hide");
    $(".drop_box[data-name=" + fixDragBox + "]")
      .parent()
      .addClass("on");

    if ($(".screen1 .box_wrap.on").length == 4) {
      setTimeout(function () {
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2, .blank").removeClass("hide");
        directive(2);
      }, 1500);
    }
  } else if (!$(".screen3").hasClass("hide")) {
    qs(`.drag_box[data-num='${fixDragBox}']`).style.removeProperty("top");
    qs(`.drag_box[data-num='${fixDragBox}']`).style.removeProperty("left");
    qs(`.drag_box[data-num='${fixDragBox}']`).style.pointerEvents = "none";
    qs(`.drag_box[data-num='${fixDragBox}']`).style.zIndex = 0;
    qs(`.drag_box[data-num='${fixDragBox}']`).classList.add("on");

    if (qsa(".screen3 .drag_box[data-name='5'].on").length == 2) {
      qs(".screen3 .box_wrap.d1").classList.add("on");
    }
    if (qsa(".screen3 .drag_box[data-name='6'].on").length == 2) {
      qs(".screen3 .box_wrap.d2").classList.add("on");
    }

    if (qsa(".screen3 .drag_box.on").length == 4) {
      playFeedback();
    }
  }
}

function dropIncorrect() {}

$(".click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c2")) {
    playGif(".c1 .obj img");
    playGif(".c2 .obj img");
    answerAudio(true);
    $(this).parent().addClass("on");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt2").addClass("cnt3");
      $(".screen2").addClass("hide");
      $(".screen3, .blank").removeClass("hide");
      directive(3);
    }, 3000);
  } else {
    playGif(".c1 .obj img");
    answerAudio(false);
    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".c1 .obj img").attr("src", "./img/concept1_h/obj1_1.png");
      $(".blank").addClass("hide");
    }, 3000);
  }
});
