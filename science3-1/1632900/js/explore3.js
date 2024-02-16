window.addEventListener("load", function () {
  directive1(1);
});

let directive1Audio = new Audio();
let directive2Audio = new Audio();
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

function directive1(num) {
  if (num != 4) {
    directive1Audio.src = "audio/explore3/directive" + num + "_1.mp3";
    directive1Audio.play();
  } else {
    directive1Audio.src = "audio/explore3/directive" + num + ".mp3";
    directive1Audio.play();
  }
}

directive1Audio.addEventListener("ended", function () {
  if (!$(".screen4").hasClass("hide")) {
    playGuide();
  } else {
    $(".has_guide").addClass("on");
  }

  popWait();

  $(".drag_box").bind("mousedown touchstart", function () {
    $(this).parents(".quiz_area").removeClass("on");
  });

  $(".drag_box").bind("mouseup touchend", function () {
    var drag_box = $(this).parents(".quiz_area");
    setTimeout(function () {
      drag_box.addClass("on");
    }, 500);
  });

  $(".blank").addClass("hide");

  scale();
});

var n;
function directive2(num) {
  if (num == 4) {
    num = 5;
  }
  n = num;
  directive2Audio.src = "audio/explore3/directive" + num + "_2.mp3";
  directive2Audio.play();
}

directive2Audio.addEventListener("ended", function () {
  if (n === 2) {
    setTimeout(function () {
      nextScreen(n);
      popWait();
    }, 7000);
  } else if (n === 3) {
    setTimeout(function () {
      nextScreen(n);
    }, 1000);
  } else if (n != 5) {
    setTimeout(function () {
      nextScreen(n);
    }, 3000);
  } else {
    playFeedback();
  }
});

function nextScreen(n) {
  $(".screen" + n).addClass("hide");
  $(".screen" + (n + 1)).removeClass("hide");
  directive1(n + 1);
}

var guide;
function scale() {
  guide = setTimeout(function () {
    if (!$(".screen4").hasClass("hide")) {
      $(".screen4 .has_guide").addClass("hide");
      $(".screen4 .ani_area .clock").addClass("on");
    } else {
      $(".has_guide").removeClass("on");
    }
    $(".quiz_area").addClass("on");
  }, 3000);
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on");
  $(".quiz_area").removeClass("on");
});

function drop(fixDragBox) {
  var time = 6000;
  var time2 = 0;
  if (fixDragBox == 4) {
    fixDragBox = 5;
  }
  if (fixDragBox < 4) {
    time2 = 2500;
  }
  $(".blank").removeClass("hide");
  $(".screen" + fixDragBox).addClass("zoom");

  setTimeout(function () {
    $(".screen" + fixDragBox).addClass("finish");
    if (fixDragBox === 5) {
      setTimeout(function () {
        directive2(fixDragBox);
      }, 5000);
      time = 5000;
    } else {
      directive2(fixDragBox);
    }
    if (fixDragBox === 1 || fixDragBox === 3) {
      setTimeout(function () {
        playGif(".screen" + fixDragBox + " .ani_area .ani1");
      }, 2000);
    } else {
      playGif(".screen" + fixDragBox + " .ani_area .ani1");
    }
    if (fixDragBox === 2) {
      setTimeout(function () {
        $(".screen" + fixDragBox + " .ani_area .obj_list").addClass("hide");
        $(".screen" + fixDragBox + " .ani_area .ani1").addClass("hide");
        $(".screen" + fixDragBox + " .ani_area .ani2").removeClass("hide");
        playGif(".screen" + fixDragBox + " .ani_area .ani2");
      }, 12500);
    } else if (fixDragBox !== 3) {
      setTimeout(function () {
        if (fixDragBox === 5) {
          $(".screen5 .ani_area .ani2").fadeIn();
          playGif(".screen5 .ani_area .ani2");
        } else {
          $(".screen" + fixDragBox + " .ani_area .ani1").attr("src", "./img/explore3/ani" + fixDragBox + "_2.png");
          playGif(".screen" + fixDragBox + " .ani_area .ani1");
          if (fixDragBox === 1) {
            setTimeout(function () {
              playGif(".screen" + fixDragBox + " .ani_area .ani1");
            }, 3000);
          }
        }
        $(".screen" + fixDragBox + " .ani_area .obj_list").addClass("hide");
      }, time);
    }
  }, time2);
}

$(".screen4 .click_box").click(function () {
  clearTimeout(guide);
  sparkleAudio.play();
  $(".quiz_area").removeClass("on");
  $(".screen4 .has_guide").addClass("hide");
  $(".blank").removeClass("hide");
  $(".screen4 .ani_area").addClass("on");
  playGif(".screen4 .clock_bg");
  $(".screen4 .ani2").addClass("on");
  setTimeout(function () {
    $(".screen4").addClass("hide");
    $(".screen5").removeClass("hide");
    directive1(5);
  }, 6000);
});
