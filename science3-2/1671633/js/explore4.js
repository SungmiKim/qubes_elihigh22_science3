let directive1Audio = new Audio("audio/explore4/directive1_1.mp3");
let directive2Audio = new Audio();
let directive3Audio = new Audio();

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  if (screen == 1) {
    $(".screen" + screen + " .has_guide").addClass("on");
    $(".blank").addClass("hide");
    popWait();
    scale();
  } else {
    popWait();
    directive2Audio.src = "audio/explore4/directive" + screen + "_2.mp3";
    directive2Audio.play();
  }
});

directive2Audio.addEventListener("ended", function () {
  popWait();
  if (screen == 1) {
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");
    screen++;

    setTimeout(function () {
      directive1Audio.src = "audio/explore4/directive" + screen + "_1.mp3";
      directive1Audio.play();
    }, 1000);

    setTimeout(function () {
      $(".screen" + screen + " .left").addClass("on");
    }, 500);
    setTimeout(function () {
      $(".screen" + screen + " .center").addClass("on");
    }, 3500);
    setTimeout(function () {
      $(".screen" + screen + " .right").addClass("on");
    }, 6600);
    setTimeout(function () {
      $(".screen" + screen + " .left .shape").addClass("on");
      $(".screen" + screen + " .left .gram").addClass("on");
    }, 9800);
    setTimeout(function () {
      $(".screen" + screen + " .right .shape").addClass("on");
      $(".screen" + screen + " .right .gram").addClass("on");
    }, 11400);
  } else {
    playFeedback();
  }
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("scale");
    $(".has_guide").removeClass("on");
  }, 3000);
}

let screen = 1;
function drop() {
  $(".quiz_area").addClass("finish");
  $(".drag_area, .page_title, .tag.t2").addClass("hide");
  $(".box_wrap").addClass("on");

  setTimeout(function () {
    directive2Audio.src = "audio/explore4/directive" + screen + "_2.mp3";
    directive2Audio.play();
  }, 1000);
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area").removeClass("scale");
  $(".has_guide").removeClass("on");
  $(".tag.t1").addClass("hide");
});

$(".drag_box").bind("mouseup touchend", function () {
  $(".tag.t1").removeClass("hide");
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});
