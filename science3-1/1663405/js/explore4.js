let directive1Audio = new Audio("audio/explore4/directive1.mp3");
let directive2Audio = new Audio("audio/explore4/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
  $(".tag1").addClass("on");
  $(".tag2").addClass("off");
  setTimeout(function () {
    $(".tag2").removeClass("off");
    $(".tag2").addClass("on");
    $(".tag1").addClass("off");
  }, 3500);
});

directive1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".tag1").removeClass("off");
    directive2Audio.play();
  }, 1000);
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});
