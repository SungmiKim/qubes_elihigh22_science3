let directive1Audio = new Audio("audio/explore2/directive1_1.mp3");
let directive2Audio = new Audio("audio/explore2/directive1_2.mp3");
let directive3Audio = new Audio("audio/explore2/directive1_3.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  for (var i = 0; i < $(".screen1 canvas").length; i++) {
    if (i == 0) {
      scratch(i, "./img/explore2/scratch1_1.png", percent80);
    } else {
      scratch(i, "./img/explore2/scratch1_2.png", percent80);
    }
  }
  $(".blank").css("background", "none");
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".has_guide").removeClass("on");
    // $(".scratch_content").addClass("scale");
  }, 3000);
}

$("canvas, .has_guide").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on");
  // $(".scratch_content").removeClass("scale");
});

function percent80() {
  try {
    PreelemBridge.stopAudio(0);

    PreelemBridge.playAudio("common/sound/effect/sparkle.wav", 0);
  } catch (error) {
    sparkleAudio.pause();
    sparkleAudio.currentTime = 0;

    sparkleAudio.play();
  }
  // $(".scratch_content").addClass("scale");
  if ($(".screen1 canvas").length == 0 && $(".screen2 canvas").length == 3) {
    $(".blank").removeClass("hide");
    $(".page_title").addClass("hide");

    setTimeout(function () {
      directive2Audio.play();
    }, 2000);

    setTimeout(function () {
      $(".screen1 .t1").addClass("on");
      $(".screen1 .o1").addClass("scale");
    }, 3800);
    setTimeout(function () {
      $(".screen1 .t2").addClass("on");
      $(".screen1 .o2").addClass("scale");
    }, 4500);
    setTimeout(function () {
      $(".screen1 .t3").addClass("on");
      $(".screen1 .o3").addClass("scale");
    }, 7800);
    setTimeout(function () {
      $(".screen1 .t4").addClass("on");
      $(".screen1 .o4").addClass("scale");
    }, 8800);

    setTimeout(function () {
      directive3Audio.play();
    }, 10500);
    setTimeout(function () {
      $(".screen1 .t5").addClass("on");
    }, 11100);
    setTimeout(function () {
      $(".screen1 .o5").addClass("scale");
    }, 12100);
    setTimeout(function () {
      $(".screen1 .o6").addClass("scale");
    }, 12800);

    setTimeout(function () {
      $(".blank").css("background", "#fff");
    }, 17400);
    setTimeout(function () {
      // $(".scratch_content").removeClass("scale");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");
      $(".page_title").removeClass("hide");
      for (var i = 0; i < $(".screen2 canvas").length; i++) {
        if (i == 0) {
          scratch(i, "./img/explore2/scratch2_1.png", percent80);
        } else if (i == 1) {
          scratch(i, "./img/explore2/scratch2_2.png", percent80);
        } else if (i == 2) {
          scratch(i, "./img/explore2/scratch2_3.png", percent80);
        }
      }
      directive1Audio.src = "audio/explore2/directive2_1.mp3";
      directive1Audio.play();
    }, 17500);
    setTimeout(function () {
      $(".blank").css("background", "none");
    }, 17600);
  }

  if ($(".screen2 canvas").length == 0 && $(".screen3 canvas").length == 3) {
    $(".blank").removeClass("hide");
    $(".page_title").addClass("hide");

    setTimeout(function () {
      directive2Audio.src = "audio/explore2/directive2_2.mp3";
      directive2Audio.play();
    }, 2000);

    setTimeout(function () {
      $(".screen2 .t1").addClass("on");
      $(".screen2 .o1").addClass("scale");
    }, 4000);
    setTimeout(function () {
      $(".screen2 .t2").addClass("on");
      $(".screen2 .o2").addClass("scale");
    }, 5000);

    setTimeout(function () {
      directive3Audio.src = "audio/explore2/directive2_3.mp3";
      directive3Audio.play();
    }, 9200);
    setTimeout(function () {
      $(".screen2 .t3").addClass("on");
      $(".screen2 .o3").addClass("scale");
    }, 11800);
    setTimeout(function () {
      $(".screen2 .t4").addClass("on");
      $(".screen2 .o4").addClass("scale");
    }, 13000);
    setTimeout(function () {
      $(".screen2 .t5").addClass("on");
      $(".screen2 .o5").addClass("scale");
    }, 14000);

    setTimeout(function () {
      $(".blank").css("background", "#fff");
    }, 17900);
    setTimeout(function () {
      // $(".scratch_content").removeClass("scale");
      $(".screen2").addClass("hide");
      $(".screen3").removeClass("hide");
      $(".page_title").removeClass("hide");
      for (var i = 0; i < $(".screen3 canvas").length; i++) {
        if (i == 0) {
          scratch(i, "./img/explore2/scratch3_1.png", percent80);
        } else if (i == 1) {
          scratch(i, "./img/explore2/scratch3_2.png", percent80);
        } else if (i == 2) {
          scratch(i, "./img/explore2/scratch3_3.png", percent80);
        }
      }
      directive1Audio.src = "audio/explore2/directive3_1.mp3";
      directive1Audio.play();
    }, 18000);
    setTimeout(function () {
      $(".blank").css("background", "none");
    }, 18100);
  }

  if ($(".screen3 canvas").length == 0) {
    $(".blank").removeClass("hide");
    $(".page_title").addClass("hide");

    setTimeout(function () {
      directive2Audio.src = "audio/explore2/directive3_2.mp3";
      directive2Audio.play();
    }, 2000);

    setTimeout(function () {
      $(".screen3 .t1").addClass("on");
      $(".screen3 .o1").addClass("scale");
    }, 3800);
    setTimeout(function () {
      $(".screen3 .t2").addClass("on");
      $(".screen3 .o2").addClass("scale");
    }, 4500);

    setTimeout(function () {
      directive3Audio.src = "audio/explore2/directive3_3.mp3";
      directive3Audio.play();
    }, 6500);
    setTimeout(function () {
      $(".screen3 .t3").addClass("on");
      $(".screen3 .o3").addClass("scale");
    }, 8000);
    setTimeout(function () {
      $(".screen3 .t4").addClass("on");
      $(".screen3 .o4").addClass("scale");
    }, 9000);
    setTimeout(function () {
      $(".screen3 .t5").addClass("on");
      $(".screen3 .o5").addClass("scale");
    }, 10000);

    setTimeout(function () {
      playFeedback();
    }, 14500);
  }
}
