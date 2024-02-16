let directive1Audio = new Audio("audio/explore7/directive1.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

setTimeout(function () {
  $(".egg").addClass("scale");
}, 2000);

setTimeout(function () {
  $(".tadpole").addClass("scale");
}, 3500);

setTimeout(function () {
  $(".frog").addClass("scale");
}, 5000);

directive1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".screen2").removeClass("op0");
    setTimeout(function () {
      playFeedback();
    }, 1000);
  }, 1000);
});
