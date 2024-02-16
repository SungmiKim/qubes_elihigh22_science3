let directive1Audio = new Audio();
let directive2Audio = new Audio();
let screen;

window.addEventListener("load", function () {
  directive(1);
});

function directive(num) {
  screen = num;
  directive1Audio.src = "audio/explore2/directive" + num + "_1.mp3";
  directive1Audio.play();
}

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on");
  popWait();
  scale();

  $(".drag_box").bind("mousedown touchstart", function () {
    clearTimeout(guide);
    $(".has_guide").removeClass("on");
    qs(".screen" + screen + " .quiz_area").classList.remove("on");
  });

  $(".drag_box").bind("mouseup touchend", function () {
    setTimeout(function () {
      qs(".screen" + screen + " .quiz_area").classList.add("on");
    }, 500);
  });
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("on");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop(fixDragBox) {
  $(".drag_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("hide");
  $(".drop_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("on");

  setTimeout(function () {
    finishAni(fixDragBox);
  }, 1000);
}

function finishAni(num) {
  $(".screen" + num + " .quiz_area").addClass("finish");
  setTimeout(function () {
    directive2Audio.src = "audio/explore2/directive" + num + "_2.mp3";
    directive2Audio.play();
  }, 1000);
  setTimeout(function () {
    $(".screen" + num + " .ani_area .pin").addClass("ani");
  }, 2000);
}

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    if (screen == 1) {
      $(".screen" + screen).addClass("hide");
      $(".screen" + (screen + 1)).removeClass("hide");
      directive(screen + 1);
    } else {
      autoNextPage(0, "explore3.html");
    }
  }, 2000);
});
