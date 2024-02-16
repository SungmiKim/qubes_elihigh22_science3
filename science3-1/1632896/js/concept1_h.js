window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    if (qs(".screen1").classList.contains("hide")) {
      qs(".quiz_area").classList.add("on");
    }

    $(".click_obj").addClass("scale");

    $(".drag_box").bind("mousedown touchstart", function () {
      qs(".screen2 .quiz_area").classList.remove("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      setTimeout(function () {
        qs(".screen2 .quiz_area").classList.add("on");
      }, 500);
    });

    qs(".blank").classList.add("hide");
  });
}

qsa(".screen1 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    $(".click_obj").removeClass("scale");
    if (this.classList.contains("c1")) {
      qs(".blank").classList.remove("hide");
      playGif(".c1 .obj");
      playGif(".c2 .obj");
      answerAudio(true);

      this.parentNode.classList.add("on");

      setTimeout(function () {
        if (qs(".screen2").classList.contains("hide")) {
          qs(".quiz_cnt").classList.remove("cnt1");
          qs(".quiz_cnt").classList.add("cnt2");
          qs(".screen1").classList.add("hide");
          qs(".screen2").classList.remove("hide");
          directive(2);
        }
      }, 2000);
    } else {
      qs(".blank").classList.remove("hide");
      playGif(".c2 .obj");
      answerAudio(false);

      setTimeout(function () {
        $(".click_obj").addClass("scale");
        $(".c2 .obj").attr("src", "./img/concept1_h/obj1_2.png");
        qs(".blank").classList.add("hide");
      }, 2000);
    }
  });
});

function dropCorrect(dataNum) {
  answerAudio(true);

  qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("top");
  qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("left");
  qs(`.drag_box[data-num='${dataNum}']`).style.pointerEvents = "none";
  qs(`.drag_box[data-num='${dataNum}']`).style.zIndex = 0;
  qs(`.drag_box[data-num='${dataNum}']`).classList.add("on");

  if (qsa(".screen2 .drag_box[data-name='1'].on").length == 2) {
    qs(".box_wrap.d1").classList.add("on");
  }
  if (qsa(".screen2 .drag_box[data-name='2'].on").length == 2) {
    qs(".box_wrap.d2").classList.add("on");
  }

  if (qsa(".screen2 .drag_box.on").length == 4) {
    playFeedback();
  }
}

function dropIncorrect() {}
