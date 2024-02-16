let directive1Audio = new Audio("audio/explore4/directive1.mp3");
let directive2Audio = new Audio("audio/explore4/directive2.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");

window.addEventListener("load", function () {
  setTimeout(function () {
    $(".img_list").addClass("st1");
  }, 1000);
  setTimeout(function () {
    $(".img_list").addClass("st2");
  }, 3000);
  setTimeout(function () {
    $(".page_title, .guide_ani").removeClass("hide");
    playGif(".guide_ani .ani");
    $("#seqGif1").addClass("on");
    directive1Audio.play();
  }, 5500);
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
  $(".img_list").addClass("st3");
  seqGif("#seqGif1");
  completeAudio.play();
  setTimeout(function () {
    directive2Audio.play();
  }, 2000);
}

directive2Audio.addEventListener("ended", function () {
  autoNextPage(2000, "explore5.html");
});
