let directiveAudio1 = new Audio("audio/explore2/directive1_1.mp3");
let directiveAudio2 = new Audio();

window.addEventListener("load", function () {
  directiveAudio1.play();
});

directiveAudio1.addEventListener("ended", function () {
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

  $(".page_title").addClass("hide");
  directiveAudio2.src = "audio/explore2/directive" + screen + "_2.mp3";
  directiveAudio2.play();

  setTimeout(function () {
    seqGif("#seqGif1");
  }, 500);
}

directiveAudio2.addEventListener("ended", function () {
  if (screen == 1) {
    setTimeout(function () {
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");
      $(".page_title").removeClass("hide");

      directiveAudio1.src = "audio/explore2/directive2_1.mp3";
      directiveAudio1.play();
      screen++;
    }, 1000);
  } else {
    autoNextPage(2000, "explore3.html");
  }
});

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".screen" + screen + " .quiz_area").removeClass("scale");
  $(".screen" + screen + " .has_guide").removeClass("on");
  $(".screen" + screen + " .tag.t1").addClass("hide");
});

$(".drag_box").bind("mouseup touchend", function () {
  $(".screen" + screen + " .tag.t1").removeClass("hide");
  setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
  }, 500);
});
