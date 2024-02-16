let directive1Audio = new Audio("audio/explore2/directive1.mp3");
let directive2Audio = new Audio("audio/explore2/directive2.mp3");
let chicken1Audio = new Audio("audio/explore2/chicken1.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let jumpAudio = new Audio("../common/sound/effect/click.mp3");
let pageAudio = new Audio("audio/page-flip.wav");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".book_wrap .index li").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".book_wrap .index li").click(function () {
  clearTimeout(guide);
  $(".book_wrap .index li").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".blank").removeClass("hide");

  $(".book_wrap").addClass("on");
  sparkleAudio.play();
  setTimeout(function () {
    seqGif("#seqGif1");
    pageAudio.play();
    setTimeout(function () {
      $(".screen1 .book_wrap .index_dim").addClass("on");
    }, 200);
  }, 1500);
  setTimeout(function () {
    directive2Audio.play();
  }, 3000);
});

directive2Audio.addEventListener("ended", function () {
  zoom(1);

  setTimeout(function () {
    chickGif();
    chicken1Audio.play();
  }, 2000);
});

chicken1Audio.addEventListener("ended", function () {
  $(".screen2").attr("data-num", 2);
  clearInterval(seqChickGif0);
  playGif(".ani.a2");
  autoNextPage(2000, "explore3.html");
});
