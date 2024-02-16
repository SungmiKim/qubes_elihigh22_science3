let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen1 .quiz_area").addClass("scale");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen2 .quiz_area").addClass("scale");
  popWait();
});

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  if ($(".screen2").hasClass("hide")) {
    //활동1
    $(".drag_box[data-num=" + dataNum + "]").addClass("on");

    $(".drag_box[data-name=" + dataNum + "]").addClass("hide");
    $(".drop_box[data-name=" + dataNum + "]")
      .parent()
      .addClass("on");
    $(".drop_box[data-name=" + dataNum + "]")
      .parent()
      .prev()
      .addClass("on");

    if ($(".screen1 .box_wrap.on").length == 2) {
      $(".screen1 .quiz_area").addClass("finish");
      setTimeout(function () {
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");

        directive2Audio.play();
      }, 2000);
    } else {
      setTimeout(function () {
        $(".blank").addClass("hide");
      }, 500);
    }
  } else {
    $(".drag_box[data-name=" + dataNum + "]").addClass("hide");
    $(".drop_box[data-name=" + dataNum + "]")
      .parent()
      .addClass("on");

    if ($(".screen2 .box_wrap.on").length == 2) {
      $(".screen2 .quiz_area").addClass("finish");

      var t = 0;
      const callback = function () {
        console.log(t);
        if (t == 120) {
          playFeedback();
        } else if (t < 120) {
          t++;
          requestAnimationFrame(callback);
        }
      };
      requestAnimationFrame(callback);
    } else {
      setTimeout(function () {
        $(".blank").addClass("hide");
      }, 500);
    }
  }
}

function dropIncorrect() {}

$(".screen1 .drag_box").bind("mousedown touchstart", function () {
  $(".screen1 .quiz_area").removeClass("scale");
});

$(".screen1 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen1 .quiz_area").addClass("scale");
  }, 500);
});

$(".screen2 .drag_box").bind("mousedown touchstart", function () {
  $(".screen2 .quiz_area").removeClass("scale");
});

$(".screen2 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen2 .quiz_area").addClass("scale");
  }, 500);
});
