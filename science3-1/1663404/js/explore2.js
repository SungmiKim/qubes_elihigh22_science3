let directive1Audio = new Audio("audio/explore2/directive1.mp3");
let directive2Audio = new Audio("audio/explore2/directive2.mp3");
let completeAudio = new Audio("audio/explore2/complete.wav");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on");
  popWait();
  scale();
});

directive2Audio.addEventListener("ended", function () {
  $(".ani_img").removeClass("on");

  autoNextPage(2000, "explore3.html");
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop(fixDragBox) {
  $(".box_wrap[data-name=" + fixDragBox + "]").addClass("on");
  $(".drag_box.d" + fixDragBox).addClass("hide");

  if ($(".box_wrap.on").length < 6) {
    setTimeout(function () {
      $(".blank").addClass("hide");
    }, 500);
  } else {
    $(".quiz_area").addClass("finish");
    $(".ani_area").removeClass("hide");

    seqGif("#seqGif1");
    completeAudio.play();

    setTimeout(function () {
      $(".drop_area").addClass("on");
      $("#seqGif1").addClass("hide");
    }, 2500);
    setTimeout(function () {
      popWait();
      $(".ani_area").addClass("on");

      setTimeout(function () {
        directive2Audio.play();
        setTimeout(function () {
          $(".ani_img").addClass("on").attr("data-num", 1);
        }, 300);
        setTimeout(function () {
          $(".ani_img").attr("data-num", 2);
        }, 2600);
        setTimeout(function () {
          $(".ani_img").attr("data-num", 3);
        }, 4600);
        setTimeout(function () {
          $(".ani_img").attr("data-num", 0);
        }, 5900);
      }, 500);
    }, 3000);
  }
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area, .has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});

$(".drop_box").each(function () {
  let target = this;
  let targetNum = qs(".box_wrap[data-name='" + $(this).attr("data-name") + "']");
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($(".drop_box").hasClass("ui-droppable-hover")) {
        if (!targetNum.classList.contains("on")) {
          targetNum.style.transform = "scale(1.03)";
          qs(".drag_box.ui-draggable-dragging").style.transform = "scale(1.25)";
        }
      } else {
        targetNum.style.transform = "scale(1)";
        $(".drag_box").css("transform", "scale(1)");
      }
    });
  });
  let config = {
    attributes: true,
  };
  observer.observe(target, config);
});

// 드래그
let fixRevert = true;
let fixDragBox, dropBox;

let fixTop = new Array();
let fixLeft = new Array();

let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

for (var i = 0; i < $(".fix .drag_box").length; i++) {
  fixTop[i] = $(".fix .drag_box").eq(i).css("top");
  fixLeft[i] = $(".fix .drag_box").eq(i).css("left");
}

$(".fix .drag_box").draggable({
  revert: "invalid",
  revertDuration: 0,
  start: function () {
    $(".blank").removeClass("hide");
    try {
      PreelemBridge.playAudio("common/sound/effect/drip.wav", 0);
    } catch (error) {
      dripAudio.play();
    }
    fixDragBox = $(this).data("name");
    $(this).css("zIndex", 4);
  },
});

$(".fix .drop_box").droppable({
  drop: function (e, ui) {
    $(ui.draggable).css("zIndex", 3);
    if ($(this).data("name") == fixDragBox) {
      if (!$(".quiz_area").hasClass("313_once")) {
        try {
          PreelemBridge.playAudio("common/sound/effect/sparkle.wav", 1);
        } catch (error) {
          sparkleAudio.play();
        }
      }

      fixRevert = false;

      drop(fixDragBox);
    }
  },
});

$("html").droppable({
  out: function () {
    setTimeout(function () {
      $(".blank").addClass("hide");
      $(ui.draggable).removeClass("vibration");
      $(ui.draggable).parents(".quiz_area").addClass("on");
    }, 500);
  },
  drop: function (e, ui) {
    if (fixRevert == true) {
      $(".drag_area [data-name=" + fixDragBox + "]").css({
        top: fixTop[fixDragBox - 1],
        left: fixLeft[fixDragBox - 1],
      });
      $(ui.draggable).css("zIndex", 3);

      answerAudio(false);
      $(ui.draggable).removeClass("on");
      $(ui.draggable).addClass("vibration");
      $(ui.draggable).css("transform", "scale(1)");
      setTimeout(function () {
        $(".blank").addClass("hide");
        $(ui.draggable).removeClass("vibration");
        $(ui.draggable).parents(".quiz_area").addClass("on");
      }, 500);
    }

    if ($(".drag_box.on").length == 0) {
      $(".btn_wrap.drag").addClass("hide");
    }

    fixRevert = true;
  },
});
