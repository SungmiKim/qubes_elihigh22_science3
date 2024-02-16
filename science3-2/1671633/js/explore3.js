let directiveAudio = new Audio();
let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

var bar = document.querySelector(".bar");
var RADIUS = 298; //반지름
var CIRCUMFERENCE = 2 * Math.PI * RADIUS; //원둘레

function progress(per) {
  var progress = per / 100;
  var dashoffset = CIRCUMFERENCE * (1 - progress);

  bar.style.strokeDashoffset = dashoffset;
}

let cnt, timerId;
var ani = 1;

window.addEventListener("load", function () {
  directiveAudio.src = "audio/explore3/directive1.mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    qs(".blank").classList.add("hide");
    bar.style.strokeDashoffset = CIRCUMFERENCE;
    if (ani == 2) {
      autoNextPage(2000, "explore4.html");
    } else {
      // 손가락 보이기
      playGuide();
      setTimeout(function () {
        // 손가락 사라짐
        $(".has_guide").addClass("hide");
      }, 1800);
    }
  });
});

let touchArea = qs(".touch_area");
let circleTimeout;
let circle = true;

// touchArea.addEventListener("mousedown", function () {
touchArea.addEventListener("touchstart", function () {
  dripAudio.play();
  // 손가락 사라짐
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
      $(".ani_area").addClass("on");
      $(".page_title").addClass("hide");

      setTimeout(function () {
        seqGif("#seqGif1");
      }, 1000);

      setTimeout(function () {
        directiveAudio.src = "audio/explore3/directive2.mp3";
        directiveAudio.play();
        ani++;
      }, 1500);
    }, 1150);

    $(".circle").css("transform", "rotate(90deg) translate(-288px) rotate(-90deg)");
    qs(".circle_progress_wrap").classList.remove("hide");
    bar.style.strokeDasharray = CIRCUMFERENCE;
    cnt = 1;
    rotate = 90;
    timerId = setInterval(function () {
      if (cnt > 99) {
        clearInterval(timerId);
      }
      $(".circle").css("transform", "rotate(" + rotate + "deg) translate(-288px) rotate(-" + rotate + "deg)");
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
