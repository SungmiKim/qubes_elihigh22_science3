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

  setTimeout(function () {
    if (qsa(".screen1 .box_wrap.on").length == 3) {
      if (qs(".screen2").classList.contains("hide")) {
        qs(".quiz_cnt").classList.remove("cnt1");
        qs(".quiz_cnt").classList.add("cnt2");
        qs(".screen1").classList.add("hide");
        qs(".screen2").classList.remove("hide");
        qs(".blank").classList.remove("hide");

        directive(2);
      }
    }
  }, 3000);

  if (fixDragBox == 6) {
    $(".quiz_area").removeClass("on");
    $(".drag_area").addClass("hide");
    qs(".blank").classList.remove("hide");
    playFeedback();
  }
}

function dropIncorrect() {}
