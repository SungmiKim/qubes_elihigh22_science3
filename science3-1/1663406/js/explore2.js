let directive1Audio = new Audio("audio/explore2/directive1_1.mp3");
let directive2Audio = new Audio("audio/explore2/directive1_2.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  for (var i = 0; i < $(".screen1 canvas").length; i++) {
    if (i == 0) {
      scratch(i, "./img/explore2/scratch1_1.png", percent80);
    } else {
      scratch(i, "./img/explore2/scratch1_3.png", percent80);
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
  }, 3500);
}

let screen2 = false;
let screen3 = false;
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
  if ($(".screen1 .scratch_content.s1 canvas").length == 0) {
    if (screen2 == false) {
      screen2 = true;
      
      $(".blank").removeClass("hide");
      setTimeout(function () {
        
        directive2Audio.play();
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");
        $(".screen2 .t1").addClass("on");
      }, 1000);
      setTimeout(function () {
        $(".screen1 .scratch_content.s1 .scratch_background").addClass("on");
        $(".screen2 .o1").removeClass("hide");
        $(".screen2 .obj_list").addClass("on");
      }, 3100);
      setTimeout(function () {
        $(".screen2 .o1").addClass("hide");
        $(".screen2 .o2").removeClass("hide");
      }, 4600);
      setTimeout(function () {
        $(".screen2 .obj_list").removeClass("on");
      }, 6500);
      setTimeout(function () {
        directive1Audio.src = "audio/explore2/directive1_3.mp3";
        directive1Audio.play();
      }, 10800);
      setTimeout(function () {
        $(".screen2").addClass("hide");
        $(".screen1").removeClass("hide");
        $(".has_guide").addClass("hide");
        
      }, 19000);
      setTimeout(function () {
        nextPage();
      }, 20000);
    }
  }

  if ($(".screen1 .scratch_content.s2 canvas").length == 0) {
    if (screen3 == false) {
      screen3 = true;

      $(".blank").removeClass("hide");

      setTimeout(function () {
        $(".screen1").addClass("hide");
        $(".screen3").removeClass("hide");
        $(".screen3 .t1").addClass("on");
        
        directive1Audio.src = "audio/explore2/directive2_1.mp3";
        directive1Audio.play();
      }, 1000);
      setTimeout(function () {
        $(".screen1 .scratch_content.s2 .scratch_background").addClass("on");
        $(".screen3 .obj.n1").removeClass("hide");
        $(".screen3 .obj").addClass("on");
      }, 3700);

      setTimeout(function () {
        $(".screen3 .obj.n1").addClass("hide");
      }, 6200);

      setTimeout(function () {
        $(".screen3").addClass("hide");
        $(".screen1").removeClass("hide");
        $(".has_guide").addClass("hide");
        $(".blank").removeClass("hide");
      }, 8000);
      setTimeout(function () {
        $(".blank").addClass("hide");
        nextPage();
      }, 9000);

    }
  }
}

function nextPage() {
  if ($(".screen1 .scratch_content canvas").length == 0) {
    setTimeout(function () {
      window.location.href = "explore3.html";
    }, 1000);
  }
}
