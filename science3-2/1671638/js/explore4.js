let directive1_1Audio = new Audio("audio/explore4/directive1_1.mp3");
let directive1_2Audio = new Audio("audio/explore4/directive1_2.mp3");
let directive2_1Audio = new Audio("audio/explore4/directive2_1.mp3");
let directive2_2Audio = new Audio("audio/explore4/directive2_2.mp3");

let soundLoud = new Audio("audio/effect/soundLoud.mp3");

let soundPlay1 = new Audio();
let soundPlay2 = new Audio();

window.addEventListener("load", function () {
  directive1_1Audio.play();
});

directive1_1Audio.addEventListener("ended", function () {
  $(".has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("scale");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop() {
  $(".quiz_area").addClass("finish");
  $(".drag_area").addClass("hide");
  $(".box_wrap").addClass("on");
  $(".screen1 .tag").addClass("hide");
  $(".page_title").addClass("hide");

  setTimeout(function () {
    seqGif("#seqGif1");

    setTimeout(function () {
      soundLoud.play();
    }, 1000);

    setTimeout(function () {
      soundLoud.pause();
    }, 7500);
  }, 2000);
}

directive1_2Audio.addEventListener("ended", function () {
  popWait();
  $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
  $(".screen1").addClass("hide");
  $(".screen2").removeClass("hide");
  $(".page_title").removeClass("hide");

  setTimeout(function () {
    soundPlay1.src = "audio/effect/soundLow.mp3";
    soundPlay1.play();
    seqGif("#seqGif2");

    setTimeout(function () {
      soundPlay1.pause();
    }, 6500);
  }, 1000);
});

directive2_1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    popWait();
    directive2_2Audio.play();
  }, 1000);
});

directive2_2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area").removeClass("scale");
  $(".has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});

$(".drop_box.next .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore4/gif4/94.webp") {
        popWait();

        setTimeout(function () {
          directive1_2Audio.play();
        }, 1000);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});

$(".left .ani.next img").each(function () {
  var target4 = this;
  var _target4 = $(this);
  var observer4 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target4.attr("src") == "./img/explore4/gif5/84.webp") {
        setTimeout(function () {
          $(".screen2 .left").removeClass("on");
          $(".screen2 .left").addClass("off");
          $(".screen2 .right").removeClass("off");
          $(".screen2 .right").addClass("on");

          setTimeout(function () {
            soundPlay2.src = "audio/effect/soundLoud.mp3";
            soundPlay2.play();
            seqGif("#seqGif3");

            setTimeout(function () {
              soundPlay2.pause();
            }, 6500);
          }, 1000);
        }, 1000);
      }
    });
  });

  var config4 = {
    attributes: true,
  };

  observer4.observe(target4, config4);
});

$(".right .ani.next img").each(function () {
  var target5 = this;
  var _target5 = $(this);
  var observer5 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target5.attr("src") == "./img/explore4/gif6/88.webp") {
        setTimeout(function () {
          $(".screen2 .left").removeClass("off");
          $(".screen2 .right").removeClass("on");
          directive2_1Audio.play();

          setTimeout(function () {
            $(".screen2 .effect").addClass("on");
          }, 800);
        }, 1000);
      }
    });
  });

  var config5 = {
    attributes: true,
  };

  observer5.observe(target5, config5);
});
