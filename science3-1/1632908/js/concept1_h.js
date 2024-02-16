let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.src = "audio/concept1_h/directive1.mp3";
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

let position, num;
function dropCorrect(dataNum, dropBox) {
  answerAudio(true);

  if (dataNum != 6) {
    if (dropBox.index() == 0) {
      position = "left";
    } else {
      position = "right";
    }

    if (dataNum == 5) {
      num = 1;
    } else {
      num = 2;
    }

    if (!$(".mgn").attr("data-position")) {
      $(".mgn").attr("data-position", position).attr("data-num", num);
    } else {
      if ($(".mgn").attr("data-position") == position) {
        $(".mgn").attr("data-num", 3);
      } else {
        $(".mgn").attr("data-position", "both");
        if ((position == "left" && num == 1) || (position == "right" && num == 2)) {
          $(".mgn").attr("data-num", 1);
        } else {
          $(".mgn").attr("data-num", 2);
        }
      }
    }

    qs(`.drag_box[data-num='${dataNum}']`).classList.add("hide");
  }

  if (qsa(".screen1 .drag_box.hide").length == 2) {
    if (qs(".screen2").classList.contains("hide")) {
      $(".screen1 .box_wrap, .screen1 .drag_area").addClass("hide");
      $(".screen1 .drag_box").addClass("on");
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        qs(".quiz_cnt").classList.remove("cnt1");
        qs(".quiz_cnt").classList.add("cnt2");
        qs(".screen1").classList.add("hide");
        qs(".screen2").classList.remove("hide");
        qs(".blank").classList.remove("hide");
        directiveAudio.src = "audio/concept1_h/directive2.mp3";
        directiveAudio.play();
      }, 2000);
    } else {
      $(".quiz_area").addClass("finish");
      setTimeout(function () {
        playFeedback();
      }, 2000);
    }
  }
}

function dropIncorrect() {}
