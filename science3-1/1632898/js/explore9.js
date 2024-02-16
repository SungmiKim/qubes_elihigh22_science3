// let beta;
let y;

window.addEventListener("load", function () {
  let directive1Audio = new Audio("audio/explore9/directive1.mp3");
  directive1Audio.play();

  playGif(".blank .ella");

  directive1Audio.addEventListener("ended", function () {
    popWait();
    qs(".blank").classList.add("hide");
    // window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("devicemotion", handleOrientation);
  });
});

function handleOrientation(event) {
  // beta = event.beta;
  const y = event.accelerationIncludingGravity.y;

  if (qs(".pop_ct.pop_wait").style.display != "block") {
    if (y > 5) {
      // window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleOrientation);
      orientationEnd();
    }
  }
}
function orientationEnd() {
  playGif(".prev");

  let effectAudio = new Audio("../common/sound/effect/complete.mp3");
  effectAudio.play();

  setTimeout(function () {
    qs(".slope").classList.add("on");
    qs(".name_list").classList.add("on");

    setTimeout(function () {
      qs(".page_title").classList.add("hide");
      let directive2Audio = new Audio("audio/explore9/directive2.mp3");
      directive2Audio.play();

      directive2Audio.addEventListener("ended", function () {
        // 피드백 + 다음 버튼 + 10초 팝업 활성화
        playFeedback();
      });
    }, 3000);
  }, 3500);
}
