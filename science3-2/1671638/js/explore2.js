let directive1Audio = new Audio("audio/explore2/directive1.mp3");
let directive2Audio = new Audio("audio/explore2/directive2.mp3");

let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let soundLow = new Audio("audio/effect/soundLow.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

var hand = 1;
directive1Audio.addEventListener("ended", function () {
  $(".screen1 .has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  hand++;
  playGuide();
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".has_guide").addClass("hide");
    if (hand == 1) {
      $(".screen1 .quiz_area").addClass("scale");
    } else {
      $(".screen2 .click_obj").addClass("scale");
    }
  }, 3000);
}

function drop() {
  $(".screen1 .quiz_area").addClass("finish");
  $(".screen1 .drag_area").addClass("hide");
  $(".screen1 .tag").addClass("hide");
  $(".screen1 .box_wrap").addClass("on");

  $(".screen1  .page_title").addClass("hide");

  seqGif("#seqGif1");
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".screen1 .quiz_area").removeClass("scale");
  $(".screen1 .has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen1 .quiz_area").addClass("scale");
  }, 500);
});

$(".click_obj .obj.speaker").click(function () {
  clearTimeout(guide);
  sparkleAudio.play();

  $(".blank").removeClass("hide");
  $(".click_obj").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".page_title").addClass("hide");

  $(".click_wrap").addClass("on");

  setTimeout(function () {
    seqGif("#seqGif2");
    soundLow.play();

    setTimeout(function () {
      soundLow.pause();
    }, 6500);
  }, 1000);
});

$(".drop_box.next .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore2/gif2/60.webp") {
        setTimeout(function () {
          $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
          $(".screen1").addClass("hide");
          $(".screen2").removeClass("hide");
          $(".page_title").removeClass("hide");

          directive2Audio.play();
        }, 500);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});

$(".obj.next  img").each(function () {
  var target4 = this;
  var _target4 = $(this);
  var observer4 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target4.attr("src") == "./img/explore2/gif3/84.webp") {
        autoNextPage(2000, "explore3.html");
      }
    });
  });

  var config4 = {
    attributes: true,
  };

  observer4.observe(target4, config4);
});
