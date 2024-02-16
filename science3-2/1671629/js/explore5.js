let directive1Audio = new Audio("audio/explore5/directive1.mp3");
let directive2Audio = new Audio("audio/explore5/directive2.mp3");
let dropEffect1 = new Audio("audio/explore5/wood-plastic_loud.mp3");
let dropEffect2 = new Audio("audio/explore5/wood-plastic_loud.mp3");
let dropEffect3 = new Audio("audio/explore5/wood-plastic_loud.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
  $(".page_title, .guide_ani").removeClass("hide");
  setTimeout(function () {
    seqGif("#seqDim");
  }, 1000);
});

directive1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    popWait();
    $(".guide_ani").addClass("hide");
    window.addEventListener("devicemotion", handleOrientation);
    // orientationEnd();
  }, 1000);
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
  $(".page_title").addClass("hide");
  seqGif("#seqGif1");

  setTimeout(function () {
    dropEffect1.play();
    setTimeout(function () {
      dropEffect2.play();
    }, 200);
    setTimeout(function () {
      dropEffect3.play();
    }, 240);
  }, 1500);

  setTimeout(function () {
    directive2Audio.play();
  }, 2500);
}

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});
