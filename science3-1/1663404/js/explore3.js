let directiveAudio = new Audio("audio/explore3/directive1.mp3");
let ellaAudio = new Audio("audio/explore3/ella.mp3");
let lizyAudio = new Audio("audio/explore3/lizy.mp3");
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
    $(".click_area li").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".click_area li").click(function () {
  clickAudio.play();
  clearTimeout(guide);
  $(".blank").removeClass("hide");
  $(".click_area li").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(this).addClass("on");
  $(this).find(".flip").addClass("on");
  if ($(this).hasClass("c1")) {
    setTimeout(function () {
      ellaAudio.play();
      // $(".c1.bot").addClass("hide");
      $(".c1.ani_area").removeClass("hide");
      seqGif("#seqGif1");
    }, 500);
  } else {
    setTimeout(function () {
      lizyAudio.play();
      // $(".c2.bot").addClass("hide");
      $(".c2.ani_area").removeClass("hide");
      seqGif("#seqGif2");
    }, 500);
  }
});

ellaAudio.addEventListener("ended", function () {
  if ($(".click_area li.on").length < 2) {
    $(".blank").addClass("hide");
    $(".click_area li").addClass("scale");
  } else {
    autoNextPage(2000, "explore4.html");
  }
});

lizyAudio.addEventListener("ended", function () {
  if ($(".click_area li.on").length < 2) {
    $(".blank").addClass("hide");
    $(".click_area li").addClass("scale");
  } else {
    autoNextPage(2000, "explore4.html");
  }
});
