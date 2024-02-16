let directive1Audio = new Audio("audio/explore3/directive1.mp3");
let directive2Audio = new Audio("audio/explore3/directive2.mp3");
let directive3Audio = new Audio("audio/explore3/directive3.mp3");
let directive4Audio = new Audio("audio/explore3/directive4.mp3");
let chicken1Audio = new Audio("audio/explore3/chicken1.mp3");
let chickAudio = new Audio("audio/chick.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  chicken1Audio.play();
});

chicken1Audio.addEventListener("ended", function () {
  $(".page_title").removeClass("hide");
  directive1Audio.play();
  clearInterval(id1);
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
    $(".egg").addClass("scale");
    $(".has_guide").addClass("hide");
    $(".chicken").attr("src", "./img/explore3/chicken1_1.png");
  }, 2000);
}

$(".click_box").click(function () {
  clearTimeout(guide);
  $(".egg").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".blank").removeClass("hide");

  $(".screen1").addClass("hide");
  $(".screen2").removeClass("hide");
  clearInterval(id1);
  sparkleAudio.play();
});

sparkleAudio.addEventListener("ended", function () {
  directive2Audio.play();
});

directive2Audio.addEventListener("ended", function () {
  directive3Audio.play();
  setTimeout(function () {
    $(".screen2").attr("data-num", 1);
  }, 1000);
});

directive3Audio.addEventListener("ended", function () {
  $(".screen2 .point").hide();
  directive4Audio.play();
  setTimeout(function () {
    $(".screen2").attr("data-num", 2);
    playGif(".screen2 .egg .egg2_2");
  }, 4500);
});

directive4Audio.addEventListener("ended", function () {
  $(".screen2").attr("data-num", 3);
  chickAudio.play();
  $(".screen2 .egg").addClass("hide");
  seqGif("#seqGif1");
  setTimeout(function () {
    autoNextPage(2000, "explore4.html");
  }, 2000);
});
