let directive1Audio = new Audio("audio/explore5/directive1.mp3");
let directive2Audio = new Audio("audio/explore5/directive2.mp3");
let frog1Audio = new Audio("audio/explore5/frog1.mp3");
let pageAudio = new Audio("audio/page-flip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let lakeAudio = new Audio("audio/explore5/lake.mp3");

window.addEventListener("load", function () {
  setTimeout(function () {
    $(".book_wrap").addClass("on");
    setTimeout(function () {
      seqGif("#seqGif3");
      pageAudio.play();
      setTimeout(function () {
        pageAudio.play();
        setTimeout(function () {
          directive1Audio.play();
          $(".page_title").removeClass("hide");
        }, 2800);
      }, 2000);
    }, 1000);
  }, 1000);
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
    $(".book_wrap .index").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".book_wrap .index").click(function () {
  $(this).addClass("hide");
  clearTimeout(guide);
  $(".book_wrap .index").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".blank").removeClass("hide");
  $(".screen1 .book_wrap .book.b4").addClass("on");
  $(".screen1 .book_wrap .book.b3").addClass("hide");
  seqGif("#seqGif4");
  // sparkleAudio.play();
  pageAudio.play();
  setTimeout(function () {
    directive2Audio.play();
  }, 2000);
});
directive2Audio.addEventListener("ended", function () {
  zoom(1);

  setTimeout(function () {
    seqGifSec("#seqGif1");

    setTimeout(function () {
      frog1Audio.play();
    }, 1000);
  }, 3500);
});

frog1Audio.addEventListener("ended", function () {
  $(".screen2 .ani3").addClass("on");
  clearInterval(seqGif0);
  playGif(".screen2 .ani3");
  setTimeout(function () {
    lakeAudio.play();
  }, 800);
  setTimeout(function () {
    autoNextPage(2000, "explore6.html");
  }, 1000);
});
