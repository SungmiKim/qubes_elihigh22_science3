let directiveAudio = new Audio("audio/explore4/directive1.mp3");
let directive2Audio = new Audio("audio/explore4/directive2.mp3");
let directive3Audio = new Audio("audio/explore4/directive3.mp3");

let bellAudio = new Audio("audio/effect/bell_water.mp3");
let clickAudio = new Audio("audio/effect/click.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
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
  $(".page_title").addClass("hide");

  seqGif("#seqGif1");
}
bellAudio.addEventListener("ended", function () {
  setTimeout(function () {
    directive2Audio.play();
  }, 1000);
});
directive2Audio.addEventListener("ended", function () {
  popWait();
  stopSeqGif("#seqGif2");
  $(".screen1, .blank").addClass("hide");
  $(".screen2, .page_title").removeClass("hide");

  setTimeout(function () {
    directive3Audio.play();

    setTimeout(function () {
      $(".screen2 .air_dim").addClass("on");
      $(".screen2 .water .sound_wrap").addClass("on2");
    }, 1800);
    setTimeout(function () {
      $(".screen2 .air_dim").removeClass("on");
    }, 4000);
    setTimeout(function () {
      $(".screen2 .water").addClass("on");
      $(".screen2 .air .sound_wrap").addClass("on2");
    }, 7000);
    setTimeout(function () {
      $(".screen2 .water").removeClass("on");
    }, 9500);
  }, 1000);
});
directive3Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 3000);
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
      if (_target3.attr("src") == "./img/explore4/gif2/35.webp") {
        clickAudio.play();
      }
      if (_target3.attr("src") == "./img/explore4/gif2/98.webp") {
        bellAudio.play();
        setTimeout(function () {
          seqGif("#seqGif2");
          $(".drop_box.next .a1").addClass("off");
          $(".drop_box.next .a2").removeClass("off");
        }, 100);
        setTimeout(function () {
          $(".drop_box .sound_wrap").addClass("on");
        }, 400);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
