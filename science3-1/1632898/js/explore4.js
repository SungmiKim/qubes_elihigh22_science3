window.addEventListener("load", function () {
  drag("directive1_1.mp3");
});

let directive1Audio = new Audio();
let directive2Audio = new Audio();
// let dragAudio = new Audio("../common/sound/effect/drag.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let directive1, directive2, dragName, objName, dataNum;

function drag(directive1) {
  directive1Audio.src = "audio/explore4/" + directive1;
  directive1Audio.play();

  directive1Audio.addEventListener(
    "ended",
    function () {
      popWait();
      qs(".quiz_area").classList.add("on");
      qs(".blank").classList.add("hide");
      setTimeout(function () {
        qs(".has_guide").classList.add("hide");
      }, 3000);
    },
    { once: true }
  );
}

function drop(fixDragBox) {
  if (fixDragBox == 4) {
    directive2 = "directive1_2.mp3";
    dragName = "플라스틱 막대";
    objName = "나무 막대";
    dataNum = 2;
    directive1 = "directive2_1.mp3";
  } else if (fixDragBox == 3) {
    directive2 = "directive2_2.mp3";
    dragName = "플라스틱 막대";
    objName = "금속 막대";
    dataNum = 3;
    directive1 = "directive3_1.mp3";
  } else if (fixDragBox == 2) {
    directive2 = "directive3_2.mp3";
    dragName = "나무 막대";
    objName = "고무 막대";
    dataNum = 4;
    directive1 = "directive4_1.mp3";
  } else if (fixDragBox == 1) {
    directive2 = "directive4_2.mp3";
  }

  try {
    PreelemBridge.stopAudio(1);
    PreelemBridge.playAudio("common/sound/effect/sparkle.mp3", 1);
  } catch (error) {
    sparkleAudio.pause();
    sparkleAudio.currentTime = 0;
    sparkleAudio.play();
  }

  $(".drop_area, .drag_area, [data-name=" + fixDragBox + "]").addClass("hide");

  // sparkleAudio.addEventListener("ended", function () {}, { once: true });
  directive2Audio.src = "audio/explore4/" + directive2;
  directive2Audio.play();

  clearInterval(vib);
  qs(".hand").classList.remove("shadow");
  qs(".ani_area").classList.add("on");

  qs(".ani_area").addEventListener(
    "animationend",
    function () {
      if (fixDragBox == 1) {
        autoNextPage(2000, "explore5.html");
      }
      setTimeout(function () {
        $(".drop_area, .drag_area, .has_guide, .drag_box.d" + (fixDragBox - 1)).removeClass("hide");
        qs(".quiz_area").classList.remove("on");
        qs(".hand").classList.add("shadow");
        qs(".ani_area").classList.remove("on");
        qs(".drag_name").innerText = dragName;
        qs(".obj_name").innerText = objName;
        qs(".ani_area").dataset.num = dataNum;
        qs(".page_title").innerText = objName + "를 " + dragName + "로 긁어 봅시다.";
        qs(".blank").classList.remove("hide");

        if (fixDragBox == 1) {
          autoNextPage(2000, "explore5.html");
        } else {
          drag(directive1);
        }
      }, 2500);
    },
    { once: true }
  );
}
var vib;
function vibration() {
  vib = setInterval(function () {
    $(".drag_box").addClass("vibration");
    console.log("interval");
    setTimeout(function () {
      $(".drag_box").removeClass("vibration");
    }, 500);
  }, 5000);
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearInterval(vib);
  qs(".quiz_area").classList.remove("on");
  qs(".has_guide").classList.add("hide");
  vibration();
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    qs(".quiz_area").classList.add("on");
  }, 500);
});
