let directive1Audio = new Audio("audio/explore7/directive1.mp3");
let directive2Audio = new Audio("audio/explore7/directive2.mp3");

let screen = 0;
window.addEventListener("load", function () {
  if (sessionStorage.getItem("soilLeft") == 3) {
    screen = 3;
    $(".screen1").addClass("hide");
    $(".screen3").removeClass("hide");
  } else {
    screen = 1;
  }
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on").removeClass("hide");
  popWait();
  scale();
});

directive2Audio.addEventListener("ended", function () {
  playFeedback();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("scale");
    $(".has_guide").removeClass("on").addClass("hide");
  }, 3000);
}

function drop() {
  $(".box_wrap").addClass("on");
  $(".quiz_area").addClass("finish");
  seqGif("#seqGif" + screen);
  setTimeout(function () {
    $(".screen" + screen).addClass("hide");
    $(".screen" + (screen + 1)).removeClass("hide");
    directive2Audio.play();
  }, 6000);
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on").addClass("hide");
  $(".quiz_area").removeClass("scale");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});
