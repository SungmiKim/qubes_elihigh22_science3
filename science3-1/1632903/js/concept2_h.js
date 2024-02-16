window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  $(".quiz_area").removeClass("on");

  directiveAudio.src = "audio/concept2_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
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

    qs(".blank").classList.add("hide");
  });
}

function dropCorrect(fixDragBox) {
  answerAudio(true);

  qs(`.drag_box[data-name='${fixDragBox}']`).classList.add("hide");
  qs(`.drop_box[data-name='${fixDragBox}']`).parentNode.classList.add("on");

  if ($(".screen1 .box_wrap.on").length == 2) {
    if ($(".screen2").hasClass("hide")) {
      setTimeout(function () {
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2, .blank").removeClass("hide");

        directive(2);
      }, 2000);
    }
  }

  if (qsa(".screen2 .box_wrap.on").length == 3) {
    $(".screen2 .drag_area").addClass("hide");
    playFeedback();
  }
}

function dropIncorrect() {}
