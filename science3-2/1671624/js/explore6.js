let directive1Audio = new Audio("audio/explore6/directive1.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");
let timeAudio1 = new Audio("audio/explore6/tictok.mp3");
let timeAudio2 = new Audio("audio/explore6/tictok.mp3");

window.addEventListener("load", function () {
  if (sessionStorage.getItem("soilLeft") == 3) {
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");
  }
  directive1Audio.play();
  $(".page_title, .guide_ani").removeClass("hide");
  setTimeout(function () {
    playGif(".guide_ani .ani");
    $("#seqGif1").addClass("on");
  }, 2000);
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
  if (!$(".screen1").hasClass("hide")) {
    seqGif("#seqGif1");
  } else {
    seqGif("#seqGif2");
  }

  setTimeout(function () {
    $(".time").addClass("on");
    seqGif("#seqGif3");

    timeAudio1.play();
    setTimeout(function () {
      timeAudio2.play();
    }, 2000);
  }, 5000);

  setTimeout(function () {
    $(".time").removeClass("on");
    $(".page_title").addClass("hide");

    if (sessionStorage.getItem("soilLeft") == 3) {
      $(".result.r2").removeClass("hide");
    } else {
      $(".result.r1").removeClass("hide");
    }
  }, 10000);

  completeAudio.play();
  setTimeout(function () {
    autoNextPage(2000, "explore7.html");
  }, 11000);
}
