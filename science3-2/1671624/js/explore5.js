let directiveAudio = new Audio("audio/explore5/directive1.mp3");

let screen = 1;
window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen" + screen + " .has_guide")
    .addClass("on")
    .removeClass("hide");
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
    $(".screen" + screen + " .has_guide")
      .removeClass("on")
      .addClass("hide");
  }, 3000);
}

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  if (screen == 1) {
    $(".blank").removeClass("hide");
    $(".screen" + screen + " .box_wrap .n1").addClass("on");
    $(".screen" + screen + " .quiz_area").addClass("finish");
    seqGif("#seqGif1");
  } else {
    $(".blank").removeClass("hide");
    $(".drag_box[data-num=" + dataNum + "]").addClass("hide");
    dropBox.parent().addClass("on");
    dropBox.parent().prev().addClass("off");
    dropBox
      .parent()
      .next()
      .addClass("on" + (dataNum - 1));

    if (dataNum - 1 == 1) {
      seqGif("#seqGif4");
      // console.log("gif4 start");
    } else {
      seqGif("#seqGif5");
    }

    setTimeout(function () {
      $(".screen" + screen + " .quiz_area").removeClass("scale");
    }, 550);

    if (dropBox.parent().hasClass("d1")) {
      sessionStorage.setItem("soilLeft", dataNum);
    }

    if ($(".screen2 .box_wrap.on").length == 2) {
      setTimeout(function () {
        autoNextPage(2000, "explore6.html");
      }, 5000);
    }
  }
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".screen" + screen + " .has_guide")
    .removeClass("on")
    .addClass("hide");
  $(".screen" + screen + " .quiz_area").removeClass("scale");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
  }, 500);
});

// 드래그
let fixRevert = true;
let fixDragBox, dataNum, dropBox;

let fixTop = new Array();
let fixLeft = new Array();

let correctAudio = new Audio("../common/sound/effect/correct.mp3");
let incorrectAudio = new Audio("../common/sound/effect/incorrect.mp3");
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
    if ($(this).hasClass("d1")) {
      $(this).css("zIndex", 5);
    } else {
      $(this).css("zIndex", 4);
    }
  },
  drag: function () {
    $(this).parents(".quiz_area").removeClass("scale");
  },
});

$(".fix .drop_box").droppable({
  drop: function (e, ui) {
    if ($(ui.draggable).hasClass("d1")) {
      $(ui.draggable).css("zIndex", 4);
    } else {
      $(ui.draggable).css("zIndex", 3);
    }
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
      if ($(ui.draggable).hasClass("d1")) {
        $(ui.draggable).css("zIndex", 4);
      } else {
        $(ui.draggable).css("zIndex", 3);
      }

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

    if ($(".drag_box.on").length == 0) {
      $(".btn_wrap.drag").addClass("hide");
    }

    fixRevert = true;
    freeRevert = true;
  },
});

$(".drop_box").each(function () {
  var target = this;
  var _target = $(this);
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($(".drop_box").hasClass("ui-droppable-hover")) {
        if (!target.parentNode.classList.contains("on")) {
          _target.parent(".box_wrap").css("transform", "scale(1.03)");
        }
      } else {
        _target.parent(".box_wrap").css("transform", "scale(1)");
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

$(".drag_box").each(function () {
  var target2 = this;
  var _target2 = $(this);
  var observer2 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (!$(".drag_box").hasClass("ui-draggable-dragging")) {
        if (_target2.hasClass("d1")) {
          _target2.css("zIndex", 4);
        } else {
          _target2.css("zIndex", 3);
        }
      }
    });
  });

  var config2 = {
    attributes: true,
  };

  observer2.observe(target2, config2);
});

$(".area div img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore5/gif8/43.webp" || _target3.attr("src") == "./img/explore5/gif9/43.webp") {
        $(".blank").addClass("hide");
        $(".screen" + screen + " .quiz_area").addClass("scale");
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});

$(".next .ani img").each(function () {
  var target4 = this;
  var _target4 = $(this);
  var observer4 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target4.attr("src") == "./img/explore5/gif5/55.webp") {
        $(".screen" + screen + " .box_wrap .n2").addClass("on");
        setTimeout(function () {
          seqGif("#seqGif2");
        }, 500);
      }
      if (_target4.attr("src") == "./img/explore5/gif6/78.webp") {
        $(".screen" + screen + " .box_wrap .n3").addClass("on");
        setTimeout(function () {
          seqGif("#seqGif3");
        }, 500);
      }
      if (_target4.attr("src") == "./img/explore5/gif7/69.webp") {
        setTimeout(function () {
          $(".screen" + screen).addClass("hide");
          screen++;
          $(".screen" + screen).removeClass("hide");
          directiveAudio.src = "audio/explore5/directive" + screen + ".mp3";
          directiveAudio.play();
        }, 2000);
      }
    });
  });

  var config4 = {
    attributes: true,
  };

  observer4.observe(target4, config4);
});
