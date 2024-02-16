let directive1Audio = new Audio("audio/explore3/directive1.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on");
  popWait();
  scale();
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

  autoNextPage(2000, "explore4.html");
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
