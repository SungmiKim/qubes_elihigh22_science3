let directive1Audio = new Audio();
let directive2Audio = new Audio();
let completeAudio = new Audio("../common/sound/effect/complete.mp3");
let magnetAudio = new Audio("audio/magnet.mp3");
let x;
let screen = 1;

window.addEventListener("load", function () {
  directive(screen);
});

function directive(num) {
  directive1Audio.src = "audio/explore3/directive" + num + "_1.mp3";
  directive1Audio.play();
  seqDim("#seqDim");
}

// directive1Audio.addEventListener("ended", function () {
//   setTimeout(function () {
//     popWait();
//     qs(".blank").classList.add("hide");
//     window.addEventListener("devicemotion", handleOrientation);
//   }, 1500);
// });

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
  if (screen < 3) {
    $(".screen" + screen + " .seq_img").addClass("on");
    completeAudio.play();
  }

  setTimeout(function () {
    seqGif("#seqGif" + screen);
    setTimeout(function () {
      magnetAudio.play();
    }, 1300);

    setTimeout(function () {
      directive2Audio.src = "audio/explore3/directive" + screen + "_2.mp3";
      directive2Audio.play();
      screen++;
    }, 2000);
  }, 1000);
}

directive2Audio.addEventListener("ended", function () {
  popWait();
  if (screen < 4) {
    setTimeout(function () {
      $(".screen" + (screen - 1)).addClass("hide");
      $(".screen" + screen).removeClass("hide");
      if (screen == 3) {
        $(".page_title").addClass("hide");
        setTimeout(function () {
          orientationEnd();
        }, 1000);
      } else {
        directive(screen);
      }
    }, 2000);
  } else {
    autoNextPage(2000, "explore4.html");
  }
});
