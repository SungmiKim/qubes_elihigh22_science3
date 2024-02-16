let directive1Audio = new Audio("audio/explore5/directive1.mp3");
let directive2Audio = new Audio("audio/explore5/directive2.mp3");
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

  if ($(this).hasClass("p1")) {
    $(".screen1 .center, .screen1 .next").addClass("on");
    seqGif("#seqGif1");
  }

  if ($(this).hasClass("p2")) {
    $(".screen2 .center, .screen2 .next").addClass("on");
    seqGif("#seqGif2");
  }
});

directive2Audio.addEventListener("ended", function () {
  autoNextPage(2000, "explore6.html");
});

$(".center .next img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore5/gif5/58.webp") {
        pouring.play();
      }
      if (_target3.attr("src") == "./img/explore5/gif5/100.webp") {
        setTimeout(function () {
          $(".screen1, .blank").addClass("hide");
          $(".screen2, .page_title").removeClass("hide");
          $(".click_wrap").addClass("scale");
        }, 500);
      }
      if (_target3.attr("src") == "./img/explore5/gif6/60.webp") {
        pouring.play();
      }
      if (_target3.attr("src") == "./img/explore5/gif6/100.webp") {
        setTimeout(function () {
          $(".screen2").addClass("hide");
          $(".screen3").removeClass("hide");
          directive2Audio.play();
          $(".shape").addClass("on");
        }, 500);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
