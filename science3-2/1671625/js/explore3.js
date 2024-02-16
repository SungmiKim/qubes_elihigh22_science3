let directive1Audio = new Audio("audio/explore3/directive.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
  $(".page_title, .guide_ani").removeClass("hide");
  setTimeout(function () {
    // playGif(".guide_ani .ani");
    $("#seqGif1").addClass("on");
    seqGif("#seqGif1");
  }, 500);
});

// directive1Audio.addEventListener("ended", function () {
//   setTimeout(function () {
//     popWait();
//     $(".guide_ani").addClass("hide");
//     window.addEventListener("devicemotion", handleOrientation);
//   }, 2000);
// });

let plusY = false;
let minusY = false;
let y;
function handleOrientation(event) {
  y = event.accelerationIncludingGravity.y;
  // $(".page_title").text("y : " + y + " // plusY : " + plusY + " // minusY : " + minusY);

  if (qs(".pop_ct.pop_wait").style.display != "block") {
    if (y > 3) {
      plusY = true;
    }
    if (y > -3) {
      minusY = true;
    }
    if (plusY == true && minusY == true) {
      window.removeEventListener("devicemotion", handleOrientation);
      orientationEnd();
    }
  }
}

function orientationEnd() {
  seqGif("#seqGif2");
  completeAudio.play();
  $(".page_title").addClass("hide");

  setTimeout(function () {
    autoNextPage(2000, "explore4.html");
  }, 8500);
}

$(".screen1 .ani img").each(function () {
  var target = this;
  var _target = $(this);
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target.attr("src") == "./img/explore3/gif5/70.webp") {
        stopSeqGif("#seqGif2");
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");

        seqGif("#seqGif3");
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

$(".seq_img img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore3/gif4/70.webp") {
        setTimeout(function () {
          popWait();
          $(".guide_ani").addClass("hide");
          window.addEventListener("devicemotion", handleOrientation);
        }, 1000);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
