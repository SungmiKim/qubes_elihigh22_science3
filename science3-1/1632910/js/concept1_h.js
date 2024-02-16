let directiveAudio = new Audio("audio/concept1_h/directive.mp3");

window.addEventListener("load", function () {
  directive(1);
});

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    $(".screen" + num + " .quiz_area").addClass("on");

    $(".drag_box").bind("mousedown touchstart", function () {
      qs(".screen" + num + " .quiz_area").classList.remove("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      setTimeout(function () {
        qs(".screen" + num + " .quiz_area").classList.add("on");
      }, 500);
    });

    qs(".blank").classList.add("hide");
  });
}

function dropCorrect(fixDragBox) {
  answerAudio(true);

  if (fixDragBox == 2) {
    $(".screen1 .drag_area").addClass("hide");
  } else {
    $(".screen2 .drag_area").addClass("hide");
  }
  $(`.drag_box[data-name='${fixDragBox}']`).addClass("hide");
  $(`.drop_box[data-name='${fixDragBox}']`).parents(".quiz_area").addClass("finish");

  setTimeout(function () {
    if ($(".screen1 .quiz_area.finish").length == 1) {
      if ($(".screen2").hasClass("hide")) {
        $(".quiz_area").removeClass("on");
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2, .blank").removeClass("hide");

        directive(2);
      } else {
        playFeedback();
      }
    }
  }, 3000);
}

function dropIncorrect() {}
