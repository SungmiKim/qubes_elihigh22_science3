let directiveAudio = new Audio();
let directive2Audio = new Audio();
let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

let drumLow_6 = new Audio("audio/effect/drumLow_6.mp3");
let drumLoud_6 = new Audio("audio/effect/drumLoud_6.mp3");
let drumLoud_10 = new Audio("audio/effect/drumLoud_10.mp3");

var bar = document.querySelector(".bar");
var RADIUS = 239; //반지름
var CIRCUMFERENCE = 2 * Math.PI * RADIUS; //원둘레

function progress(per) {
  var progress = per / 100;
  var dashoffset = CIRCUMFERENCE * (1 - progress);

  bar.style.strokeDashoffset = dashoffset;
}

let cnt, timerId;
var ani = 1;

window.addEventListener("load", function () {
  drip = setInterval(function () {
    dripAudio.load();
  }, 5000);

  directiveAudio.src = "audio/explore3/directive1.mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    qs(".blank").classList.add("hide");
    bar.style.strokeDashoffset = CIRCUMFERENCE;

    if (ani == 2) {
      setTimeout(function () {
        $(".screen2 .left").addClass("off");
        $(".screen2 .right").removeClass("off");

        setTimeout(function () {
          $(".screen2 .right").addClass("on");
          seqGif("#seqGif3");
        }, 800);
        setTimeout(function () {
          drumLoud_6.play();
        }, 1000);

        setTimeout(function () {
          directive2Audio.src = "audio/explore3/directive2_2.mp3";
          directive2Audio.play();
        }, 4000);
      }, 1000);
    } else {
      playGuide(); //손가락 보이기
      setTimeout(function () {
        $(".has_guide").addClass("hide"); //숨기기
      }, 1800);
    }
  });
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    autoNextPage(2000, "explore4.html");
  }, 1000);
});

let touchArea = qs(".touch_area");
let circleTimeout;
let circle = true;

// touchArea.addEventListener("mousedown", function () {
touchArea.addEventListener("touchstart", function () {
  dripAudio.play();
  clearInterval(drip);

  $(".has_guide").addClass("hide");

  if (circle == true) {
    circle = false;
    clearTimeout(circleTimeout);
    clearInterval(timerId);
    bar.style.strokeDashoffset = CIRCUMFERENCE;
    qs(".circle_progress_wrap").classList.add("hide");
    circleTimeout = setTimeout(function () {
      sparkleAudio.play();

      qs(".blank").classList.remove("hide");
      qs(".touch_area").classList.add("hide");
      $(".page_title").addClass("hide");

      setTimeout(function () {
        $(".ani_area").addClass("on");
        seqGif("#seqGif1");
      }, 800);
      setTimeout(function () {
        drumLoud_10.play();
      }, 1000);

      setTimeout(function () {
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");

        setTimeout(function () {
          $(".screen2 .left").addClass("on");
          seqGif("#seqGif2");
        }, 800);
        setTimeout(function () {
          drumLow_6.play();
        }, 1000);

        setTimeout(function () {
          directiveAudio.src = "audio/explore3/directive2_1.mp3";
          directiveAudio.play();
          ani++;
        }, 4000);
      }, 7000);
    }, 1150); //동그라미 게이지 완료

    $(".circle").css("transform", "rotate(90deg) translate(-239px) rotate(-90deg)");
    qs(".circle_progress_wrap").classList.remove("hide");
    bar.style.strokeDasharray = CIRCUMFERENCE;
    cnt = 1;
    rotate = 90;
    timerId = setInterval(function () {
      if (cnt > 99) {
        clearInterval(timerId);
      }
      $(".circle").css("transform", "rotate(" + rotate + "deg) translate(-239px) rotate(-" + rotate + "deg)");
      rotate = rotate + 3.63;
      progress(cnt);
      ++cnt;
    }, 10);
  }
});

// touchArea.addEventListener("mouseup", function () {
touchArea.addEventListener("touchend", function () {
  if (circle == false) {
    circle = true;
    clearTimeout(circleTimeout);
    clearInterval(timerId);
    bar.style.strokeDashoffset = CIRCUMFERENCE;
    qs(".circle_progress_wrap").classList.add("hide");
  }
});
