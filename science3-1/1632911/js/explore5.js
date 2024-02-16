let directive1Audio = new Audio("audio/explore/directive4_1.mp3");
let directive2Audio = new Audio("audio/explore/directive4_2.mp3");
let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on").removeClass("hide");
  popWait();
  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
    $(".has_guide").removeClass("on").addClass("hide");
  }, 3000);
}

function drop() {
  $(".quiz_area").addClass("finish");
  directive2Audio.play();
}

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 1000);
});

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on").addClass("hide");
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});
