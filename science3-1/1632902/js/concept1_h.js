window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    $(".quiz_area").addClass("on");

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

function dropCorrect(dataNum) {
  answerAudio(true);

  if (dataNum == 1 || dataNum == 2) {
    qs(`.drag_box[data-name='${dataNum}']`).classList.add("hide");
    qs(`.drop_box[data-name='${dataNum}']`).parentNode.classList.add("on");

    setTimeout(function () {
      if (qsa(".screen1 .box_wrap.on").length == 2) {
        if (qs(".screen2").classList.contains("hide")) {
          $(".quiz_area").removeClass("on");
          qs(".quiz_cnt").classList.remove("cnt1");
          qs(".quiz_cnt").classList.add("cnt2");
          qs(".screen1").classList.add("hide");
          qs(".screen2").classList.remove("hide");
          qs(".blank").classList.remove("hide");

          directive(2);
        }
      }
    }, 1500);
  } else {
    qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("top");
    qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("left");
    qs(`.drag_box[data-num='${dataNum}']`).style.pointerEvents = "none";
    qs(`.drag_box[data-num='${dataNum}']`).style.zIndex = 0;
    qs(`.drag_box[data-num='${dataNum}']`).classList.add("on");

    if (qsa(".screen2 .drag_box[data-name='3'].on").length == 2) {
      qs(".screen2 .box_wrap.d1").classList.add("on");
    }
    if (qsa(".screen2 .drag_box[data-name='4'].on").length == 2) {
      qs(".screen2 .box_wrap.d2").classList.add("on");
    }

    if (qsa(".screen2 .box_wrap.on").length == 2) {
      playFeedback();
    }
  }
}

function dropIncorrect() {}
