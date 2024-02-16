let directiveAudio = new Audio("audio/explore2/directive1.mp3");
let directive2Audio = new Audio("audio/explore2/directive2.mp3");

let doAudio = new Audio("audio/effect/1_do.mp3");
let reAudio = new Audio("audio/effect/2_re.mp3");
let miAudio = new Audio("audio/effect/3_mi.mp3");
let faAudio = new Audio("audio/effect/4_fa.mp3");
let solAudio = new Audio("audio/effect/5_sol.mp3");
let laAudio = new Audio("audio/effect/6_la.mp3");
let tiAudio = new Audio("audio/effect/7_ti.mp3");
let do2Audio = new Audio("audio/effect/8_do.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("scale");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop() {
  $(".quiz_area").addClass("finish");
  $(".drag_area").addClass("hide");
  $(".box_wrap").addClass("on");
  $(".page_title").addClass("hide");

  requestAnimationFrame(performAnimation);
}
let raf;
var timing = 0;
var cnt = 0;

const performAnimation = () => {
  if (cnt > 99) {
    cancelAnimationFrame(raf);

    setTimeout(function () {
      directive2Audio.play();
    }, 1000);
    return;
  }

  timing++;
  if (timing % 4 === 0) {
    cnt++;
    $("#seqGif1 img").attr("src", `./img/explore2/gif2/${cnt}.webp`);
    if (cnt == 14) {
      doAudio.play();
    } else if (cnt == 25) {
      reAudio.play();
    } else if (cnt == 36) {
      miAudio.play();
    } else if (cnt == 47) {
      faAudio.play();
    } else if (cnt == 58) {
      solAudio.play();
    } else if (cnt == 69) {
      laAudio.play();
    } else if (cnt == 80) {
      tiAudio.play();
    } else if (cnt == 91) {
      do2Audio.play();
    }
  }

  raf = requestAnimationFrame(performAnimation);
};

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    autoNextPage(2000, "explore3.html");
  }, 500);
});

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area").removeClass("scale");
  $(".has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});
