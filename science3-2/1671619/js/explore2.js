let directiveAudio = new Audio("audio/explore2/directive1.mp3");
let popAudio = new Audio();

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".has_guide").removeClass("hide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".has_guide").addClass("hide");
    $(".quiz_area").addClass("scale");
  }, 3000);
}

let num;
function drop(fixDragBox) {
  num = fixDragBox;
  $(".drag_box[data-name=" + fixDragBox + "]").addClass("hide");
  $(".drop_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("on");

  setTimeout(function () {
    $(".quiz_area").removeClass("scale");
    openPop(num);
    $(".pop_ct" + num).addClass("on");
  }, 510);

  setTimeout(function () {
    popAudio.src = "audio/explore2/pop" + fixDragBox + ".mp3";
    popAudio.play();
  }, 2000);
}

popAudio.addEventListener("ended", function () {
  closePop(num);
  if ($(".box_wrap.on").length == 4) {
    $(".quiz_area").addClass("finish");
    autoNextPage(2000, "explore3.html");
  } else {
    $(".quiz_area").addClass("scale");
    $(".blank").addClass("hide");
  }
});

// 드래그
let fixRevert = true;
let fixDragBox, dataNum;

let fixTop = new Array();
let fixLeft = new Array();

let dripAudio = new Audio("../common/sound/effect/drip.wav");

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
    if ($(this).data("name") == fixDragBox) {
      answerAudio(true);

      fixRevert = false;

      drop(fixDragBox);
    }
  },
});

$("html").droppable({
  drop: function (e, ui) {
    if (fixRevert == true) {
      $(".drag_area [data-name=" + fixDragBox + "]").css({
        top: fixTop[fixDragBox - 1],
        left: fixLeft[fixDragBox - 1],
      });

      answerAudio(false);
      $(ui.draggable).css("zIndex", 3).removeClass("on").addClass("vibration");
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
  out: function (e, ui) {
    $(".blank").addClass("hide");
  },
  over: function (e, ui) {
    $(".blank").removeClass("hide");
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

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").addClass("hide");
  $(".quiz_area").removeClass("scale");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});
