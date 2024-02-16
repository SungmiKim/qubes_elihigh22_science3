let directiveAudio = new Audio("audio/explore3/directive1.mp3");
let clickAudio = new Audio("../common/sound/effect/click.mp3");

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
    $(".click_wrap").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".click_area li").click(function () {
  clearTimeout(guide);
  $(".click_wrap").removeClass("scale");
  $(".has_guide").addClass("hide");
  clickAudio.play();
  $(this).addClass("on");
  if ($(".map_tag").attr("data-num") == 0) {
    if ($(this).hasClass("c1")) {
      $(".map_tag").attr("data-num", 1);
    } else {
      $(".map_tag").attr("data-num", 2);
    }
    setTimeout(function () {
      $(".click_wrap").addClass("scale");
    }, 500);
  } else {
    $(".click_wrap, .map_tag").addClass("finish");
    autoNextPage(2000, "explore4.html");
  }
});
