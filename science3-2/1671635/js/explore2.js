let directiveAudio = new Audio("audio/explore2/directive.mp3");

let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let drumLow_10 = new Audio("audio/effect/drumLow_10.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".click_obj").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".click_box .box").click(function () {
  clearTimeout(guide);
  sparkleAudio.play();

  $(".blank").removeClass("hide");
  $(".click_obj").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".page_title").addClass("hide");

  setTimeout(function () {
    $(".click_wrap").addClass("on");
    seqGif("#seqGif1");
  }, 800);
  setTimeout(function () {
    drumLow_10.play();
  }, 1000);

  setTimeout(function () {
    autoNextPage(2000, "explore3.html");
  }, 5500);
});
