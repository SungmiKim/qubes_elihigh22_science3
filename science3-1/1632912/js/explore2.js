let directive1Audio = new Audio("audio/explore2/directive1.mp3");
let directive2Audio = new Audio("audio/explore2/directive2.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");

window.addEventListener("load", function () {
  playGif(".guide_ani .ani");
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    popWait();
    $(".guide_ani").addClass("hide");
    window.addEventListener("devicemotion", handleOrientation);
  }, 1000);
});

function handleOrientation(event) {
  const y = event.accelerationIncludingGravity.y;

  if (qs(".pop_ct.pop_wait").style.display != "block") {
    if (y < -5) {
      window.removeEventListener("devicemotion", handleOrientation);
      orientationEnd();
    }
  }
}

function orientationEnd() {
  $(".content").addClass("on");
  completeAudio.play();
  setTimeout(function () {
    directive2Audio.play();
  }, 2000);
}

directive2Audio.addEventListener("ended", function () {
  autoNextPage(2000, "explore3.html");
});
