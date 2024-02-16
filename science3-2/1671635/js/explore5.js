let directive1Audio = new Audio("audio/explore5/directive1.mp3");
let directive2Audio = new Audio("audio/explore5/directive2.mp3");
let dripAudio = new Audio("../common/sound/effect/drip.wav");

let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let drumLow_10 = new Audio("audio/effect/drumLow_10.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

var hand = 1;
directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on");
  popWait();
  scale();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
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
      hand++;
    } else {
      $(".screen2 .click_obj").addClass("scale");
    }
  }, 2000);
}

function drop() {
  $(".quiz_area").addClass("finish");
  $(".drag_area").addClass("hide");
  $(".box_wrap").addClass("on");

  $(".page_title").addClass("hide");
  seqGif("#seqGif1");

  setTimeout(function () {
    $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");
    $(".page_title").removeClass("hide");

    directive2Audio.play();
  }, 6500);
}

$(".screen1 .drag_box").bind("mousedown touchstart", function () {
  $(".screen1 .quiz_area").removeClass("scale");
  $(".has_guide").removeClass("on");
});

$(".screen1 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen1 .quiz_area").addClass("scale");
  }, 500);
});

$(".click_box .box").click(function () {
  clearTimeout(guide);
  sparkleAudio.play();

  $(".blank").removeClass("hide");
  $(".click_obj").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".page_title").addClass("hide");

  setTimeout(function () {
    $(".click_wrap").addClass("on");
    seqGif("#seqGif2");
  }, 800);
  setTimeout(function () {
    drumLow_10.play();
  }, 1000);

  setTimeout(function () {
    autoNextPage(2000, "explore6.html");
  }, 5500);
});
