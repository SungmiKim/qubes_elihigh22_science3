window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();
let screen;

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    // qs(".screen" + num + " .has_guide").classList.remove("hide");
    // qs(".screen" + num + " .has_guide").classList.add("on");

    // qs(".screen" + num + " .has_guide").addEventListener(
    //   "animationend",
    //   function () {
    // qs(".screen" + num + " .has_guide").classList.add("hide");

    $(".drag_box").bind("mousedown touchstart", function () {
      qs(".screen" + num + " .quiz_area").classList.remove("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      setTimeout(function () {
        qs(".screen" + num + " .quiz_area").classList.add("on");
      }, 500);
    });

    qs(".screen" + num + " .quiz_area").classList.add("on");
    qs(".blank").classList.add("hide");
    // }
    // );
  });
}

function dropCorrect(fixDragBox) {
  answerAudio(true);
  if (fixDragBox == 1) {
    screen = 1;
  } else if (fixDragBox == 4) {
    screen = 2;
  } else if (fixDragBox == 5 || fixDragBox == 6) {
    screen = 3;
  }

  if (screen < 3) {
    qs(".blank").classList.remove("hide");
    qs(".screen" + screen + " .drag_area").classList.add("hide");
    qs(".screen" + screen + " .name_list").classList.add("hide");
    qs(".screen" + screen + " .drop_area").style.background = "url(./img/concept1_h/drop" + screen + "_o.png) no-repeat center / 100%";

    if (fixDragBox == 1) {
      qs(".screen" + screen + " .box_wrap").classList.add("hide");
    }

    setTimeout(function () {
      qs(".quiz_cnt").classList.replace("cnt" + screen, "cnt" + (screen + 1));
      qs(".screen" + screen).classList.add("hide");
      qs(".screen" + (screen + 1)).classList.remove("hide");
      directive(screen + 1);
    }, 2000);
  } else {
    if (fixDragBox == 5) {
      qs(".screen" + screen + " .drag_box.d2").classList.add("hide");
      qs(".screen" + screen + " .name_list .obj2").classList.add("hide");
      qs(".screen" + screen + " .box_wrap.d1").classList.add("on");
      screen3();
    } else if (fixDragBox == 6) {
      qs(".screen" + screen + " .drag_box.d1").classList.add("hide");
      qs(".screen" + screen + " .name_list .obj1").classList.add("hide");
      qs(".screen" + screen + " .box_wrap.d2").classList.add("on");
      screen3();
    }
  }
}

function dropIncorrect() {}

function screen3() {
  if (qsa(".screen3 .drag_box.hide").length == 2) {
    // 피드백 + 다음 버튼 + 10초 팝업 활성화
    playFeedback();
  }
}
