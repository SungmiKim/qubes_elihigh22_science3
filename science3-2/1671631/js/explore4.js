let directive1Audio = new Audio("audio/explore4/directive1_1.mp3");
let directive2Audio = new Audio();
let directive3Audio = new Audio();

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  if (screen < 3) {
    $(".screen" + screen + " .has_guide").addClass("on");
    $(".blank").addClass("hide");
    popWait();
    scale();
  } else {
    popWait();
    directive2Audio.src = "audio/explore4/directive" + screen + "_2.mp3";
    directive2Audio.play();

    $(".screen" + screen + " .left").addClass("on");
    $(".screen" + screen + " .right").removeClass("on");

    setTimeout(function () {
      seqGif("#seqGif6");
    }, 6000);
  }
});

directive2Audio.addEventListener("ended", function () {
  popWait();
  directive3Audio.src = "audio/explore4/directive" + screen + "_3.mp3";
  directive3Audio.play();

  setTimeout(function () {
    $(".screen" + screen + " .effect_wrap .e2").addClass("on");
  }, 2500);

  if (screen == 3) {
    $(".screen" + screen + " .left").removeClass("on");
  }
});

directive3Audio.addEventListener("ended", function () {
  popWait();

  setTimeout(function () {
    $(".screen" + screen + " .box_wrap .n2").addClass("on");
  }, 1000);

  if (screen == 1) {
    stopSeqGif("#seqGif11");
    setTimeout(function () {
      seqGif("#seqGif2");
    }, 1000);
  } else if (screen == 2) {
    stopSeqGif("#seqGif33");
    setTimeout(function () {
      seqGif("#seqGif4");
    }, 1000);
  } else {
    playFeedback();
  }
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
    $(".screen" + screen + " .has_guide").removeClass("on");
  }, 3000);
}

let screen = 1;
function drop() {
  $(".screen" + screen + " .quiz_area").addClass("finish");
  $(".screen" + screen + " .drag_area").addClass("hide");
  $(".screen" + screen + " .box_wrap .n1").addClass("on");
  $(".screen" + screen + " .page_title").addClass("hide");
  if (screen == 1) {
    seqGif("#seqGif1");
  } else {
    seqGif("#seqGif3");
  }
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".screen" + screen + " .quiz_area").removeClass("scale");
  $(".screen" + screen + " .has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
  }, 500);
});

/**
 * gif 정지
 */
function stopGif(tag) {
  let gifImg = $(tag);
  let gifImgSrc = gifImg.attr("src").replace("gif", "png");
  let randNum = Math.floor(Math.random() * 10000);
  gifImg.attr("src", gifImgSrc + "?" + randNum);
}

$(".next .ani img").each(function () {
  var target4 = this;
  var _target4 = $(this);
  var observer4 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (screen == 1) {
        if (_target4.attr("src") == "./img/explore4/gif3/71.webp") {
          //screen1 첫번째 모션 나레이션 재생
          setTimeout(function () {
            directive2Audio.src = "audio/explore4/directive" + screen + "_2.mp3";
            directive2Audio.play();

            $(".screen" + screen + " .box_wrap .n1_1").addClass("on");
            seqGif("#seqGif11");

            setTimeout(function () {
              $(".screen" + screen + " .effect_wrap .e1").addClass("on");
            }, 6000);
          }, 500);
        }
        if (_target4.attr("src") == "./img/explore4/gif4/82.webp") {
          //두번째 모션 후 다음페이지로 넘어감
          setTimeout(function () {
            $(".screen" + screen).addClass("hide");
            $(".screen" + (screen + 1)).removeClass("hide");

            screen++;
            directive1Audio.src = "audio/explore4/directive" + screen + "_1.mp3";
            directive1Audio.play();
          }, 1000);
        }
      } else if (screen == 2) {
        if (_target4.attr("src") == "./img/explore4/gif5/65.webp") {
          //screen2 첫번째 모션 나레이션 재생
          setTimeout(function () {
            directive2Audio.src = "audio/explore4/directive" + screen + "_2.mp3";
            directive2Audio.play();

            $(".screen" + screen + " .box_wrap .n1_1").addClass("on");
            console.log(screen);
            seqGif("#seqGif33");

            setTimeout(function () {
              $(".screen" + screen + " .effect_wrap .e1").addClass("on");
            }, 6500);
          }, 500);
        }
        if (_target4.attr("src") == "./img/explore4/gif6/93.webp") {
          //두번쨰 모션 후 다음페이지로 넘어감
          setTimeout(function () {
            $(".screen" + screen).addClass("hide");
            $(".screen" + (screen + 1)).removeClass("hide");

            screen++;
            directive1Audio.src = "audio/explore4/directive" + screen + "_1.mp3";
            directive1Audio.play();

            setTimeout(function () {
              seqGif("#seqGif5");
            }, 5500);
            setTimeout(function () {
              $(".screen" + screen + " .effect_wrap .a2").addClass("on");
            }, 12500);
          }, 1000);
        }
      }
    });
  });

  var config4 = {
    attributes: true,
  };

  observer4.observe(target4, config4);
});
