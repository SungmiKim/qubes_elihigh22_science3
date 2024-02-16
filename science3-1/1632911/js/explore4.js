let directive1Audio = new Audio("audio/explore/directive3_1.mp3");
let directive2Audio = new Audio("audio/explore/directive3_2.mp3");
let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on").removeClass("hide");
  popWait();
  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
    $(".has_guide").removeClass("on").addClass("hide");
  }, 2000);
}

directive2Audio.addEventListener("ended", function () {
  autoNextPage(2000, "explore5.html");
});

$("#shape").roundSlider({
  start: function () {
    dripAudio.play();
    $(".has_guide").removeClass("on").addClass("hide");
  },
  drag: function (e) {
    if (e.value == 100) {
      sparkleAudio.play();
      $("#shape").roundSlider("disable").roundSlider("destroy");
      setTimeout(function () {
        $("#seqGif4").addClass("on");
        seqGif("#seqGif4");
        setTimeout(function () {
          directive2Audio.play();
        }, 5000);
      }, 500);
    }
  },
});
