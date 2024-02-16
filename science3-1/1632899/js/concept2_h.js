window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  $(".quiz_area").removeClass("on");

  directiveAudio.src = "audio/concept2_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    // playGuide();
    popWait();

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

    scale();
  });
}

var guide;
function scale() {
  $(".quiz_area").addClass("on");
  // guide = setTimeout(function () {
  // $(".has_guide").addClass("hide");
  // }, 2500);
}

function dropCorrect(fixDragBox) {
  answerAudio(true);
  qs(`.drag_box[data-name='${fixDragBox}']`).classList.add("hide");
  qs(`.drop_box[data-name='${fixDragBox}']`).parentNode.classList.add("on");

  $(".quiz_area").removeClass("on");

  if (fixDragBox == 3) {
    $(".screen1 .drag_area").addClass("hide");
  }

  if (fixDragBox == 4) {
    playGif(".ani1");
  } else if (fixDragBox == 5) {
    playGif(".ani2");
  }

  setTimeout(function () {
    if (fixDragBox == 3) {
      if (qs(".screen2").classList.contains("hide")) {
        qs(".quiz_cnt").classList.remove("cnt1");
        qs(".quiz_cnt").classList.add("cnt2");
        qs(".screen1").classList.add("hide");
        qs(".screen2").classList.remove("hide");
        qs(".blank").classList.remove("hide");

        directive(2);
      }
    }
  }, 1000);

  if (qsa(".screen2 .box_wrap.on").length == 2) {
    playFeedback();
  }
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area").removeClass("on");
  $(".has_guide").addClass("hide");
});
