let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".click_wrap").addClass("on");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".quiz_area").addClass("on");
});

$(".click_obj").click(function () {
  $(".click_wrap").removeClass("on");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c2")) {
    answerAudio(true);

    $(".click_wrap").addClass("finish");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".click_wrap").addClass("on");
      $(".screen1 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});

function dropCorrect(fixDragBox, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  qs(`.drag_box[data-num='${fixDragBox}']`).style.top = dropBox.parent().css("top");
  qs(`.drag_box[data-num='${fixDragBox}']`).style.left = dropBox.parent().css("left");
  dropBox
    .parent()
    .addClass("on")
    .addClass("on" + fixDragBox);

  qs(`.drag_box[data-num='${fixDragBox}']`).style.pointerEvents = "none";
  qs(`.drag_box[data-num='${fixDragBox}']`).style.zIndex = 0;
  qs(`.drag_box[data-num='${fixDragBox}']`).classList.add("on");

  if ($(".drag_box.on").length == 2) {
    $(".drag_box.d2").addClass("hide");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});

let fixRevert = true;
let fixDragBox, dataNum, dropBox;

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
    $(this).css("zIndex", 4);
  },
});

$(".fix .drop_box").droppable({
  drop: function (e, ui) {
    $(ui.draggable).css("zIndex", 3);
    if (!$(this).parent().hasClass("on")) {
      if ($(this).data("name") == fixDragBox) {
        $(".blank").addClass("hide");
        fixRevert = false;
        $(ui.draggable).parents(".quiz_area").addClass("on");
        dropBox = $(this);
        dropCorrect(dataNum, dropBox);
      } else {
        $(ui.draggable).addClass("vibration");
        setTimeout(function () {
          $(".blank").addClass("hide");
          $(ui.draggable).removeClass("vibration");
          $(ui.draggable).parents(".quiz_area").addClass("on");
        }, 500);
        dropIncorrect(fixDragBox);
      }
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
      $(".drag_area [data-num=" + dataNum + "]").css({
        top: fixTop[dataNum - 1],
        left: fixLeft[dataNum - 1],
      });
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
