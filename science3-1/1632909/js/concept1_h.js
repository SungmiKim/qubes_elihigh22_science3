let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");
let magnetAudio = new Audio("audio/magnet.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  popWait();
  $(".quiz_area").addClass("on");

  $(".drag_box").bind("mousedown touchstart", function () {
    qs(".screen1 .quiz_area").classList.remove("on");
  });

  $(".drag_box").bind("mouseup touchend", function () {
    setTimeout(function () {
      qs(".screen1 .quiz_area").classList.add("on");
    }, 500);
  });

  qs(".blank").classList.add("hide");
});

directive2Audio.addEventListener("ended", function () {
  popWait();
  $(".quiz_area").addClass("on");

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

function dropCorrect(dataNum) {
  answerAudio(true);

  if (dataNum != 3) {
    $(".screen1 .drag_area").addClass("hide");
    console.log("dd");
    setTimeout(function () {
      magnetAudio.play();
    }, 1500);
  } else {
    $(".screen2 .drag_area").addClass("hide");
  }
  $(`.drag_box[data-name='${dataNum}']`).addClass("hide");
  $(`.drop_box[data-name='${dataNum}']`).parents(".quiz_area").addClass("finish");

  setTimeout(function () {
    if ($(".screen1 .quiz_area.finish").length == 1) {
      if ($(".screen2").hasClass("hide")) {
        $(".quiz_area").removeClass("on");
        $(".quiz_cnt").removeClass("cnt1");
        $(".quiz_cnt").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");
        $(".blank").removeClass("hide");

        directive2Audio.play();
      } else {
        playFeedback();
      }
    }
  }, 3500);
}

function dropIncorrect() {}
