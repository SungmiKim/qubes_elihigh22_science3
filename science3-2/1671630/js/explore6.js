let directive1Audio = new Audio("audio/explore6/directive1.mp3");
let directive2Audio = new Audio("audio/explore6/directive2.mp3");
let directive3Audio = new Audio("audio/explore6/directive3.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");
let pouring = new Audio("audio/effect/water-pouring.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
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

$(".click_wrap .obj").click(function () {
  popWait();
  $(".blank").removeClass("hide");
  clearTimeout(guide);
  $(".click_wrap").removeClass("scale");
  $(".has_guide, .page_title").addClass("hide");
  completeAudio.play();

  seqGif("#seqGif1");
  $(".screen1 .center, .screen1 .next").addClass("on");
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");
    directive3Audio.play();
  }, 1500);
});

directive3Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});

$(".center .next .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore6/gif7/68.webp") {
        pouring.play();
      }
      if (_target3.attr("src") == "./img/explore6/gif7/120.webp") {
        popWait();
        directive2Audio.play();
        $(".center .next").addClass("hide");
        $(".center .next2").addClass("on");
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
