let directive1Audio = new Audio("audio/explore3/directive1.mp3");
let directive2Audio = new Audio("audio/explore3/directive2_1.mp3");
let directive3Audio = new Audio("audio/explore3/directive2_2.mp3");
let directive4Audio = new Audio("audio/explore3/directive2_3.mp3");

let completeAudio = new Audio("../common/sound/effect/complete.mp3");

window.addEventListener("load", function () {
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
    // orientationEnd();
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
  completeAudio.play();
  $(".page_title").addClass("hide");
  seqGif("#seqGif1");
}

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    directive3Audio.play();
    $(".screen2 .point.p1").addClass("on");
  }, 1000);
});

directive3Audio.addEventListener("ended", function () {
  setTimeout(function () {
    directive4Audio.play();

    $(".screen2 .point.p1").removeClass("on");
    $(".screen2 .point.p1").addClass("off");

    $(".screen2 .point.p2").addClass("on");
  }, 1000);
});

directive4Audio.addEventListener("ended", function () {
  $(".screen2 .point.p2").removeClass("on");
  $(".screen2 .point.p2").addClass("off");

  setTimeout(function () {
    playFeedback();
  }, 2000);
});

$(".center .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore3/gif3/100.webp") {
        setTimeout(function () {
          $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
          $(".screen1").addClass("hide");
          $(".screen2, .blank").removeClass("hide");

          popWait();
          directive2Audio.play();
        }, 1000);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
