let directive1Audio = new Audio("audio/explore6/directive1.mp3");
let directive2Audio = new Audio("audio/explore6/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on");
  popWait();
  scale();
});

directive2Audio.addEventListener("ended", function () {
  autoNextPage(2000, "explore7.html");
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop() {
  $(".drag_area").addClass("hide");
  $(".box_wrap").addClass("on");
  // $(".box_wrap").addClass("on");
  $(".ani_area .mgn").addClass("on");

  setTimeout(function () {
    directive2Audio.play();
    $(".quiz_area").addClass("finish");
    seqGif("#seqGif1");
  }, 3000);
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area, .has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});
