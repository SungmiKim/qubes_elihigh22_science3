let directiveAudio = new Audio("audio/explore2/directive1.mp3");
let endDirectiveAudio = new Audio("audio/explore2/endDirective.mp3");
let drag1Audio = new Audio();
let drag2Audio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  // playGuide();
  $(".has_guide").removeClass("hide").addClass("on");
  popWait();
  $(".blank").addClass("hide");

  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".has_guide").addClass("hide");
    $(".quiz_area").addClass("on");
  }, 3000);
}

let num;
function drop(fixDragBox) {
  num = fixDragBox;
  $(".drag_box[data-name=" + fixDragBox + "]")
    .addClass("opa0")
    .removeClass("start");
  $(".drop_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("on")
    .removeClass("start");

  setTimeout(function () {
    $(".screen0").addClass("hide");
    $(".screen" + fixDragBox).removeClass("hide");
    drag1Audio.src = "audio/explore2/drag" + fixDragBox + "_1.mp3";
    drag1Audio.play();
  }, 500);
}

drag1Audio.addEventListener("ended", function () {
  popWait();
  drag2Audio.src = "audio/explore2/drag" + num + "_2.mp3";
  drag2Audio.play();
});

drag2Audio.addEventListener("ended", function () {
  popWait();
  setTimeout(function () {
    $(".quiz_area").removeClass("on");
    $(".screen" + num).addClass("hide");
    $(".screen0").removeClass("hide");

    // setTimeout(function () {
    $(".drop_box[data-name=" + num + "]")
      .parent()
      .addClass("finish");
    if (num == 1) {
      $(".zoom").addClass("finish");
    }
    if (num < 4) {
      $(".screen0").attr("data-num", num + 1);
      $(".drag_box[data-name=" + (num + 1) + "]").addClass("start");
      $(".drop_box[data-name=" + (num + 1) + "]")
        .parent()
        .addClass("start");
      directiveAudio.src = "audio/explore2/directive" + (num + 1) + ".mp3";
      directiveAudio.play();
    } else {
      $(".screen0").attr("data-num", 5);
      $(".screen0").addClass("finish");
      $(".box_wrap").removeClass("on");
      endDirectiveAudio.play();
      setTimeout(function () {
        $(".box_wrap.d1").addClass("on");
      }, 1900);
      setTimeout(function () {
        $(".box_wrap.d1").removeClass("on");
        $(".box_wrap.d2").addClass("on");
      }, 2700);
      setTimeout(function () {
        $(".box_wrap.d2").removeClass("on");
        $(".box_wrap.d3").addClass("on");
      }, 4900);
      setTimeout(function () {
        $(".box_wrap.d3").removeClass("on");
        $(".box_wrap.d4").addClass("on");
      }, 6500);
    }
    // }, 500);
  }, 2000);
});

endDirectiveAudio.addEventListener("ended", function () {
  playFeedback();
});

(function () {
  // 드래그
  let fixRevert = true;
  let fixDragBox, dataNum;
  let offsetTop, offsetLeft;
  let quizArea;

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
      dataNum = $(this).data("num");
      offsetTop = $(this).offset().top;
      offsetLeft = $(this).offset().left;
      quizArea = "fix";
      $(this).css("zIndex", 4);
    },
  });

  $(".fix .drop_box").droppable({
    drop: function (e, ui) {
      $(ui.draggable).css("zIndex", 3);
      if ($(this).data("name") == fixDragBox) {
        try {
          PreelemBridge.playAudio("common/sound/effect/sparkle.wav", 1);
        } catch (error) {
          sparkleAudio.play();
        }

        fixRevert = false;

        drop(fixDragBox);
      }
    },
  });

  $("html").droppable({
    drop: function (e, ui) {
      if (quizArea == "fix") {
        if (fixRevert == true) {
          if (dataNum) {
            $(".drag_area [data-num=" + dataNum + "]").css({
              top: fixTop[dataNum - 1],
              left: fixLeft[dataNum - 1],
            });
          } else {
            $(".drag_area [data-name=" + fixDragBox + "]").css({
              top: fixTop[fixDragBox - 1],
              left: fixLeft[fixDragBox - 1],
            });
          }
          $(ui.draggable).css("zIndex", 3);

          answerAudio(false);
          $(ui.draggable).removeClass("on");
          $(ui.draggable).addClass("vibration");
          setTimeout(function () {
            $(".blank").addClass("hide");
            $(ui.draggable).removeClass("vibration");
            $(ui.draggable).parents(".quiz_area").addClass("on");
          }, 500);
        }
      }

      if ($(".drag_box.on").length == 0) {
        $(".btn_wrap.drag").addClass("hide");
      }

      fixRevert = true;
      freeRevert = true;
    },
    out: function (e, ui) {
      $(".blank").addClass("hide");
    },
    over: function (e, ui) {
      $(".blank").removeClass("hide");
    },
  });

  $(".fix .replay").click(function () {
    for (var i = 0; i < $(".fix .drag_box").length; i++) {
      $(".fix .drag_box").eq(i).css({ top: fixTop[i], left: fixLeft[i] });
    }
    $(".fix .drag_box.on").removeClass("on");
    $(".btn_wrap.drag").addClass("hide");
  });
})();

$(".drop_box").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($(".drop_box").hasClass("ui-droppable-hover")) {
        if (!target.parentNode.classList.contains("on") && target.parentNode.classList.contains("start")) {
          target.parentNode.style.transform = "scale(1.03)";
        }
      } else {
        target.parentNode.style.transform = "scale(1)";
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").addClass("hide");
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});
