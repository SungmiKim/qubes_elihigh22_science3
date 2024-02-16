let directiveAudio = new Audio("audio/explore2/directive1.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".screen" + screen + " .has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
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
  $(".screen" + screen + " .box_wrap").addClass("on");

  if (screen == 1) {
    setTimeout(function () {
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directiveAudio.src = "audio/explore2/directive2.mp3";
      directiveAudio.play();
      screen++;
    }, 2000);
  } else if (screen == 2) {
    setTimeout(function () {
      $(".screen2").addClass("hide");
      $(".screen3").removeClass("hide");

      directiveAudio.src = "audio/explore2/directive3.mp3";
      directiveAudio.play();
      screen++;
    }, 2000);
  } else {
    autoNextPage(2000, "explore3.html");
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
