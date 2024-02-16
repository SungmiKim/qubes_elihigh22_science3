let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/concept3_h/directive1.mp3";
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  popWait();
  $(".quiz_area").addClass("on");
  $(".blank").addClass("hide");
});

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  $(".blank").removeClass("hide");
  setTimeout(function () {
    $(".blank").addClass("hide");
    $(".quiz_area").addClass("on");
  }, 500);
});

let position;
function dropCorrect(dataNum, dropBox) {
  answerAudio(true);

  if (dataNum != 4) {
    if (dropBox.parent().index() == 0) {
      position = "left1";
    } else {
      position = "right1";
    }

    dropBox.parent().addClass("hide");
    qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("top");
    qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("left");
    qs(`.drag_box[data-num='${dataNum}']`).style.zIndex = 0;
    qs(`.drag_box[data-num='${dataNum}']`).classList.add("on", position);
  }

  if (qsa(".screen1 .drag_box.on").length >= 2) {
    if (qs(".screen2").classList.contains("hide")) {
      $(".screen1 .box_wrap, .screen1 .drag_box:not(.on)").addClass("hide");
      $(".screen1 .drag_box").addClass("on");
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        qs(".quiz_cnt").classList.remove("cnt1");
        qs(".quiz_cnt").classList.add("cnt2");
        qs(".screen1").classList.add("hide");
        qs(".screen2").classList.remove("hide");
        qs(".blank").classList.remove("hide");
        directiveAudio.src = "audio/concept3_h/directive2.mp3";
        directiveAudio.play();
      }, 2000);
    } else {
      qs(".blank").classList.remove("hide");
      $(".drag_area").addClass("hide");
      // qs(`.drag_box[data-name='${dataNum}']`).classList.add("hide");
      $(".box_wrap, .drag_box").addClass("on");
      setTimeout(function () {
        playFeedback();
      }, 2000);
    }
  }
}

function dropIncorrect() {}
