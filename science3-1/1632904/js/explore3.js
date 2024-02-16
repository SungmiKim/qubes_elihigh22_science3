let directive1Audio = new Audio("audio/explore3/directive1_1.mp3");
let directive2Audio = new Audio("audio/explore3/directive1_2.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  for (var i = 0; i < $(".screen1 canvas").length; i++) {
    if (i == 2) {
      scratch(i, "./img/explore3/scratch1_3.png", percent80);
    } else {
      scratch(i, "./img/explore3/scratch1_1.png", percent80);
    }
  }
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
  }, 4000);
}

$("canvas, .has_guide").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on");
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
  if ($(".screen1 canvas").length == 0 && $(".screen2 canvas").length == 2) {
    $(".blank").removeClass("hide");
    directive2Audio.play();

    setTimeout(function () {
      $(".screen1 .t1").addClass("on");
      $(".screen1 .o1").addClass("scale");
    }, 2100);
    setTimeout(function () {
      $(".screen1 .a1").addClass("on");
    }, 2300);
    setTimeout(function () {
      $(".screen1 .t2").addClass("on");
      $(".screen1 .o2").addClass("scale");
    }, 2900);
    setTimeout(function () {
      $(".screen1 .a2").addClass("on");
    }, 3100);
    setTimeout(function () {
      $(".screen1 .t3").addClass("on");
      $(".screen1 .o3").addClass("scale");
    }, 3800);
    setTimeout(function () {
      $(".screen1 .a3").addClass("on");
    }, 4000);
    setTimeout(function () {
      $(".screen1 .t4").addClass("on");
      $(".screen1 .o4").addClass("scale");
    }, 4800);

    setTimeout(function () {
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");
      for (var i = 0; i < $(".screen2 canvas").length; i++) {
        if (i == 0) {
          scratch(i, "./img/explore3/scratch2_1.png", percent80);
        } else {
          scratch(i, "./img/explore3/scratch2_2.png", percent80);
        }
      }
      directive1Audio.src = "audio/explore3/directive2_1.mp3";
      directive1Audio.play();
    }, 8500);
  }

  if ($(".screen2 canvas").length == 0) {
    $(".blank").removeClass("hide");
    directive2Audio.src = "audio/explore3/directive2_2.mp3";
    directive2Audio.play();

    setTimeout(function () {
      $(".screen2 .t1").addClass("on");
      $(".screen2 .o1").addClass("scale");
    }, 1700);
    setTimeout(function () {
      $(".screen2 .a1").addClass("on");
    }, 1900);
    setTimeout(function () {
      $(".screen2 .t2").addClass("on");
      $(".screen2 .o2").addClass("scale");
    }, 2500);
    setTimeout(function () {
      $(".screen2 .a2").addClass("on");
    }, 2700);
    setTimeout(function () {
      $(".screen2 .t3").addClass("on");
      $(".screen2 .o3").addClass("scale");
    }, 3400);

    setTimeout(function () {
      window.location.href = "explore4.html";
    }, 7000);
  }
}
