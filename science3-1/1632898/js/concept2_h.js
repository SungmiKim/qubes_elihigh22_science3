window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();
let screen;

function directive(num) {
  directiveAudio.src = "audio/concept2_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    // qs(".screen" + num + " .has_guide").classList.remove("hide");
    // qs(".screen" + num + " .has_guide").classList.add("on");
    // qs(".screen" + num + " .has_guide").addEventListener(
    //   "animationend",
    //   function () {
    // qs(".screen" + num + " .has_guide").classList.add("hide");
    if (num < 3) {
      $(".obj").bind("click", function () {
        qs(".screen" + num + " .click_wrap").classList.remove("on");
      });

      qs(".screen" + num + " .click_wrap").classList.add("on");
    } else {
      $(".drag_box").bind("mousedown touchstart", function () {
        qs(".screen" + num + " .quiz_area").classList.remove("on");
      });

      $(".drag_box").bind("mouseup touchend", function () {
        setTimeout(function () {
          qs(".screen" + num + " .quiz_area").classList.add("on");
        }, 500);
      });

      qs(".screen" + num + " .quiz_area").classList.add("on");
    }
    qs(".blank").classList.add("hide");
    //   }
    // );
  });
}

qsa(".screen1 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    if (this.classList.contains("c2")) {
      dropIncorrect(3);
    } else {
      dropCorrect(3);
    }
  });
});

qsa(".screen2 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    if (this.classList.contains("c2")) {
      dropIncorrect(4);
    } else {
      dropCorrect(4);
    }
  });
});

function dropCorrect(fixDragBox) {
  if (fixDragBox == 3 || fixDragBox == 4) {
    if (fixDragBox == 3) {
      screen = 1;
    } else {
      screen = 2;
    }
    answerAudio(true);
    qs(".screen" + screen + " .click_wrap").classList.add("finish");
    qs(".blank").classList.remove("hide");
    setTimeout(function () {
      qs(".quiz_cnt").classList.replace("cnt" + screen, "cnt" + (screen + 1));
      qs(".screen" + screen).classList.add("hide");
      qs(".screen" + (screen + 1)).classList.remove("hide");
      directive(screen + 1);
    }, 2000);
  } else {
    answerAudio(true);
    if (fixDragBox == 1) {
      qs(".screen3 .drag_box.d2").classList.add("hide");
      qs(".screen3 .box_wrap.d1").classList.add("on");
      screen3();
    } else if (fixDragBox == 2) {
      qs(".screen3 .drag_box.d1").classList.add("hide");
      qs(".screen3 .box_wrap.d2").classList.add("on");
      screen3();
    }
  }
}

function dropIncorrect(fixDragBox) {
  if (fixDragBox == 3 || fixDragBox == 4) {
    if (fixDragBox == 3) {
      screen = 1;
    } else {
      screen = 2;
    }
    answerAudio(false);
    qs(".screen" + screen + " .c2 .obj").classList.add("vibration");
    setTimeout(function () {
      qs(".screen" + screen + " .c2 .obj").classList.remove("vibration");
      qs(".screen" + screen + " .click_wrap").classList.add("on");
    }, 500);
  } else {
  }
}

function screen3() {
  if (qsa(".screen3 .drag_box.hide").length == 2) {
    // 피드백 + 다음 버튼 + 10초 팝업 활성화
    playFeedback();
  }
}
