let directive1Audio = new Audio();
let directive2Audio = new Audio();
let directive3Audio = new Audio();
let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

var bar;
var RADIUS = 240; //반지름
var CIRCUMFERENCE = 2 * Math.PI * RADIUS; //원둘레

function progress(per) {
  var progress = per / 100;
  var dashoffset = CIRCUMFERENCE * (1 - progress);

  bar.style.strokeDashoffset = dashoffset;
}

let cnt, timerId;
var ani = 1; //screen
let drip;

window.addEventListener("load", function () {
  directive1Audio.src = "audio/explore4/directive1_1.mp3";
  directive1Audio.play();

  drip = setInterval(function () {
    dripAudio.load();
  }, 5000);
});

directive1Audio.addEventListener("ended", function () {
  bar = document.querySelector(".screen" + ani + " .bar");
  popWait();
  qs(".blank").classList.add("hide");
  bar.style.strokeDashoffset = CIRCUMFERENCE;
  playGuide();
  setTimeout(function () {
    $(".has_guide").addClass("hide");
  }, 1800);
});

let d3 = 2;
directive2Audio.addEventListener("ended", function () {
  popWait();
  if (ani == 2) {
    setTimeout(function () {
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive1Audio.src = "audio/explore4/directive2_1.mp3";
      directive1Audio.play();
    }, 1000);
  } else {
    setTimeout(function () {
      $(".screen2").addClass("hide");
      $(".screen3").removeClass("hide");
      directive3Audio.src = "audio/explore4/directive3_1.mp3";
      directive3Audio.play();
      setTimeout(function () {
        seqGif("#seqGif3");
        $(".screen3 .left .arrow_wrap").addClass("on");
        setTimeout(function () {
          $(".screen3 .left .arrow").addClass("on");
        }, 1000);
      }, 500);
    }, 1000);
  }
});

directive3Audio.addEventListener("ended", function () {
  $(".screen3 .arrow_wrap").removeClass("on");
  popWait();

  if (d3 == 2) {
    $(".screen3 .left").addClass("on");
    $(".screen3 .right").removeClass("on");
    directive3Audio.src = "audio/explore4/directive3_" + d3 + ".mp3";
    directive3Audio.play();
    setTimeout(function () {
      seqGif("#seqGif4");
      $(".screen3 .right .arrow_wrap").addClass("on");
      setTimeout(function () {
        $(".screen3 .right .arrow").addClass("on");
      }, 1000);
    }, 500);
    d3++;
  } else {
    $(".screen3 .left").removeClass("on");
    setTimeout(function () {
      playFeedback();
    }, 1000);
  }
});

let circleTimeout;
let circle = true;

// touchArea.addEventListener("mousedown", function () {
$(".touch_area").on("touchstart", function () {
  dripAudio.play();
  qs(".blank").classList.remove("hide");
  setTimeout(function () {
    qs(".blank").classList.add("hide");
  }, 1200);
  $(".screen" + ani + " .has_guide").addClass("hide");

  if (circle == true) {
    circle = false;
    clearTimeout(circleTimeout);
    clearInterval(timerId);
    bar.style.strokeDashoffset = CIRCUMFERENCE;
    $(".screen" + ani + " .circle_progress_wrap").addClass("hide");
    circleTimeout = setTimeout(function () {
      sparkleAudio.play();
      qs(".blank").classList.remove("hide");
      $(".screen" + ani + " .page_title").addClass("hide");
      $(".screen" + ani + " .touch_area").addClass("hide");
      $(".screen" + ani + " .ani_area").addClass("on");

      setTimeout(function () {
        gifEnd(ani);
      }, 1000);
    }, 1150);
    $(".screen" + ani + " .circle").css("transform", "rotate(90deg) translate(-240px) rotate(-90deg)");
    $(".screen" + ani + " .circle_progress_wrap").removeClass("hide");
    bar.style.strokeDasharray = CIRCUMFERENCE;
    cnt = 1;
    rotate = 90;
    timerId = setInterval(function () {
      if (cnt > 99) {
        clearInterval(timerId);
      }
      $(".screen" + ani + " .circle").css("transform", "rotate(" + rotate + "deg) translate(-240px) rotate(-" + rotate + "deg)");
      rotate = rotate + 3.63;
      progress(cnt);
      ++cnt;
    }, 10);
  }
});

// touchArea.addEventListener("mouseup", function () {
$(".touch_area").on("touchend", function () {
  if (circle == false) {
    circle = true;
    clearTimeout(circleTimeout);
    clearInterval(timerId);
    bar.style.strokeDashoffset = CIRCUMFERENCE;
    $(".screen" + ani + " .circle_progress_wrap").addClass("hide");
  }
});

function gifEnd() {
  qs(".blank").classList.remove("hide");

  directive2Audio.src = "audio/explore4/directive" + ani + "_2.mp3";
  directive2Audio.play();
  seqGif("#seqGif" + ani);
  ani++;
}
