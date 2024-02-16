let directiveAudio = new Audio("audio/explore2/directive1.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".screen" + screen + " .has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
    $(".screen" + screen + " .has_guide").removeClass("on");
  }, 3000);
}

let screen = 1;
function drop() {
  $(".screen" + screen + " .quiz_area").addClass("finish");
  $(".screen" + screen + " .drag_area").addClass("hide");
  $(".screen" + screen + " .box_wrap").addClass("on");

  if (screen == 1) {
    seqGif("#seqGif1");
  } else {
    autoNextPage(2000, "explore3.html");
  }
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".screen" + screen + " .quiz_area").removeClass("scale");
  $(".screen" + screen + " .has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen" + screen + " .quiz_area").addClass("scale");
  }, 500);
});

$(".drop_box.next .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore2/gif2/50.webp") {
        setTimeout(function () {
          $(".screen1").addClass("hide");
          $(".screen2").removeClass("hide");

          directiveAudio.src = "audio/explore2/directive2.mp3";
          directiveAudio.play();
          screen++;
        }, 1500);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
