let directive1Audio = new Audio();
let directive2Audio = new Audio();
let magnetAudio = new Audio("audio/magnet.mp3");
let screen;

window.addEventListener("load", function () {
  directive(1);
});

function directive(num) {
  screen = num;
  directive1Audio.src = "audio/explore3/directive" + num + "_1.mp3";
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

// 드래그 앤 드롭
let fixRevert = true;
let fixDragBox;

let fixTop = new Array();
let fixLeft = new Array();

let dripAudio = new Audio("../common/sound/effect/drip.wav");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

for (var i = 0; i < $(".fix .drag_box").length; i++) {
  fixTop[i] = $(".fix .drag_box").eq(i).css("top");
  fixLeft[i] = $(".fix .drag_box").eq(i).css("left");
}

$(".fix .drag_box").draggable({
  axis: "x",
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
    $(ui.draggable).css("zIndex", 3).addClass("on").parent().prev().addClass("hide");
    if ($(this).data("name") == fixDragBox) {
      try {
        PreelemBridge.playAudio("common/sound/effect/sparkle.wav", 1);
      } catch (error) {
        sparkleAudio.play();
      }
      fixRevert = false;
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
      }, 530);
      directive2Audio.src = "audio/explore3/directive" + fixDragBox + "_2.mp3";
      directive2Audio.play();
      $(".screen" + fixDragBox).addClass("finish");
      seqGif("#seqGif" + fixDragBox);
      $(".screen" + fixDragBox + " .ani_area").addClass("hide");
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
      $(".drag_area [data-name=" + fixDragBox + "]").removeAttr("style");
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

    if ($(".drag_box.on").length == 0) {
      $(".btn_wrap.drag").addClass("hide");
    }

    fixRevert = true;
  },
});

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

$("#seqGif3 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif3 .gif").attr("src") === "./img/explore3/ani3/51.webp") {
        magnetAudio.play();
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    if (fixDragBox < 3) {
      $(".screen" + fixDragBox).addClass("hide");
      $(".screen" + (fixDragBox + 1)).removeClass("hide");
      directive(fixDragBox + 1);
    } else {
      autoNextPage(0, "explore4.html");
    }
  }, 2000);
});
