let directiveAudio = new Audio();
let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

var bar = document.querySelector(".bar");
var RADIUS = 210;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function progress(per) {
  var progress = per / 100;
  var dashoffset = CIRCUMFERENCE * (1 - progress);

  bar.style.strokeDashoffset = dashoffset;
}

let cnt, timerId;
var ani = 2;

window.addEventListener("load", function () {
  directiveAudio.src = "audio/explore7/directive1.mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    qs(".blank").classList.add("hide");
    bar.style.strokeDashoffset = CIRCUMFERENCE;
    if (ani == 6) {
      autoNextPage(2000, "explore8.html");
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
      playGif(".ani_area img");

      setTimeout(function () {
        gifEnd(ani);
      }, 3000);
    }, 1050);
    $(".circle").css("transform", "rotate(90deg) translate(-207px) rotate(-90deg)");
    qs(".circle_progress_wrap").classList.remove("hide");
    bar.style.strokeDasharray = CIRCUMFERENCE;
    cnt = 1;
    rotate = 90;
    timerId = setInterval(function () {
      if (cnt > 99) {
        clearInterval(timerId);
      }
      $(".circle").css("transform", "rotate(" + rotate + "deg) translate(-207px) rotate(-" + rotate + "deg)");
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

let objName;

function gifEnd() {
  if (ani == 2) {
    objName = "나무 막대";
  } else if (ani == 3) {
    objName = "플라스틱 막대";
  } else if (ani == 4) {
    objName = "고무 막대";
  }

  if (ani < 5) {
    qs(".page_title").innerText = objName + "를 손가락으로 길게 눌러 구부려 봅시다.";
    qs(".obj_name").innerText = objName;
    qs(".ani_area img").src = "./img/explore7/ani" + ani + ".png";
    qs(".touch_area").classList.remove("hide");
    qs(".circle_progress_wrap").classList.add("hide");
  }

  directiveAudio.src = "audio/explore7/directive" + ani + ".mp3";
  directiveAudio.play();

  ani++;
}
