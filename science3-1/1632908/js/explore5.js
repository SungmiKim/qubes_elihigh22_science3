let directive1Audio = new Audio("audio/explore5/directive1.mp3");
let directive2Audio = new Audio("audio/explore5/directive2.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");
let magnetAudio1 = new Audio("audio/magnet.mp3");
let magnetAudio2 = new Audio("audio/magnet.mp3");
let magnetAudio3 = new Audio("audio/magnet.mp3");
let magnetAudio4 = new Audio("audio/magnet.mp3");
let x;

window.addEventListener("load", function () {
  directive1Audio.play();
  seqDim("#seqDim", true);
});

directive1Audio.addEventListener("ended", function () {
  $("#seqDim").addClass("hide");
  popWait();
  qs(".blank").classList.add("hide");
  window.addEventListener("devicemotion", handleOrientation);
});

function handleOrientation(event) {
  const x = event.accelerationIncludingGravity.x;

  if (qs(".pop_ct.pop_wait").style.display != "block") {
    if (x > 9) {
      window.removeEventListener("devicemotion", handleOrientation);
      orientationEnd();
    }
  }
}
function orientationEnd() {
  completeAudio.play();
  setTimeout(function () {
    setTimeout(function () {
      magnetAudio1.play();
      setTimeout(function () {
        magnetAudio2.play();
      }, 50);
      setTimeout(function () {
        magnetAudio3.play();
      }, 100);
      setTimeout(function () {
        magnetAudio4.play();
      }, 150);
    }, 1000);

    seqGif("#seqGif1");

    setTimeout(function () {
      $(".page_title").addClass("hide");
      $(".content").addClass("on");
    }, 5000);
    setTimeout(function () {
      directive2Audio.play();
    }, 7000);
  }, 1000);
}

directive2Audio.addEventListener("ended", function () {
  playFeedback();
});
