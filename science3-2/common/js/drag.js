(function () {
  // 드래그
  let fixRevert = true;
  let freeRevert = true;
  let fixDragBox, freeDragBox, dataNum, dropBox;
  let offsetTop, offsetLeft;
  let quizArea;

  let fixTop = new Array();
  let fixLeft = new Array();
  let freeTop = new Array();
  let freeLeft = new Array();

  let correctAudio = new Audio("../common/sound/effect/correct.mp3");
  let incorrectAudio = new Audio("../common/sound/effect/incorrect.mp3");
  let dripAudio = new Audio("../common/sound/effect/drip.wav");
  let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

  for (var i = 0; i < $(".fix .drag_box").length; i++) {
    fixTop[i] = $(".fix .drag_box").eq(i).css("top");
    fixLeft[i] = $(".fix .drag_box").eq(i).css("left");
  }
  for (var i = 0; i < $(".free .drag_box").length; i++) {
    freeTop[i] = $(".free .drag_box").eq(i).css("top");
    freeLeft[i] = $(".free .drag_box").eq(i).css("left");
  }

  $(".fix .drag_box").draggable({
    revert: "invalid",
    revertDuration: 0,
    start: function () {
      $(".blank").removeClass("hide");
      // setTimeout(function () {
      try {
        PreelemBridge.playAudio("common/sound/effect/drip.wav", 0);
      } catch (error) {
        dripAudio.play();
      }

      // }, 500);
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
      if ($("#wrap").attr("data-page") == "concept1_h" || $("#wrap").attr("data-page") == "concept2_h" || $("#wrap").attr("data-page") == "concept3_h") {
        if ($(this).data("name") == fixDragBox) {
          $(".blank").addClass("hide");
          fixRevert = false;
          $(ui.draggable).parents(".quiz_area").addClass("on");
          if (dataNum) {
            dropBox = $(this);
            dropCorrect(dataNum, dropBox);
          } else {
            dropCorrect(fixDragBox);
          }
        } else {
          $(ui.draggable).addClass("vibration");
          setTimeout(function () {
            $(".blank").addClass("hide");
            $(ui.draggable).removeClass("vibration");
            $(ui.draggable).parents(".quiz_area").addClass("on");
          }, 500);
          dropIncorrect(fixDragBox);
        }
      } else {
        if ($(this).data("name") == fixDragBox) {
          if (!$(".quiz_area").hasClass("313_once")) {
            try {
              PreelemBridge.playAudio("common/sound/effect/sparkle.wav", 1);
            } catch (error) {
              sparkleAudio.play();
            }
          }

          // var drag_top = $(this).offset().top;
          // var drag_left = $(this).offset().left;
          // var drag_box = ui.draggable;

          // $(drag_box).css({ top: drag_top, left: drag_left });
          // $(".btn_wrap.drag").removeClass("hide");

          fixRevert = false;

          drop(fixDragBox);
        }
      }
    },
  });

  $(".free .drag_box").draggable({
    revert: "invalid",
    revertDuration: 0,
    start: function () {
      setTimeout(function () {
        try {
          PreelemBridge.playAudio("common/sound/effect/drip.wav", 0);
        } catch (error) {
          dripAudio.play();
        }
      }, 500);
      freeDragBox = $(this).data("name");
      quizArea = "free";
    },
  });

  $(".free .drop_box").droppable({
    drop: function (e, ui) {
      try {
        PreelemBridge.playAudio("common/sound/effect/sparkle.wav", 1);
      } catch (error) {
        sparkleAudio.play();
      }
      $(ui.draggable).addClass("on");
      $(".btn_wrap.drag").removeClass("hide");

      freeRevert = false;
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

          try {
            PreelemBridge.stopAudio(2);
            PreelemBridge.playAudio("common/sound/effect/incorrect.mp3", 2);
          } catch (error) {
            incorrectAudio.pause();
            incorrectAudio.currentTime = 0;
            incorrectAudio.play();
          }
          $(ui.draggable).removeClass("on");
          $(ui.draggable).addClass("vibration");
          setTimeout(function () {
            $(".blank").addClass("hide");
            $(ui.draggable).removeClass("vibration");
            $(ui.draggable).parents(".quiz_area").addClass("on");
          }, 500);
        }
      }

      if (quizArea == "free") {
        if (freeRevert == true) {
          $(".drag_area [data-name=" + freeDragBox + "]").css({
            top: freeTop[freeDragBox - 1],
            left: freeLeft[freeDragBox - 1],
          });
          $(ui.draggable).removeClass("on");
        }
      }

      if ($(".drag_box.on").length == 0) {
        $(".btn_wrap.drag").addClass("hide");
      }

      fixRevert = true;
      freeRevert = true;
    },
  });

  $(".fix .replay").click(function () {
    for (var i = 0; i < $(".fix .drag_box").length; i++) {
      $(".fix .drag_box").eq(i).css({ top: fixTop[i], left: fixLeft[i] });
    }
    $(".fix .drag_box.on").removeClass("on");
    $(".btn_wrap.drag").addClass("hide");
  });

  $(".free .replay").click(function () {
    for (var i = 0; i < $(".free .drag_box").length; i++) {
      $(".free .drag_box").eq(i).css({ top: freeTop[i], left: freeLeft[i] });
    }
    $(".free .drag_box.on").removeClass("on");
    $(".btn_wrap.drag").addClass("hide");
  });
})();

$(".drop_box").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($(".drop_box").hasClass("ui-droppable-hover")) {
        if (!target.parentNode.classList.contains("on")) {
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
