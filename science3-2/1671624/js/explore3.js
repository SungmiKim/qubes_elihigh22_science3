let directiveAudio = new Audio("audio/explore3/directive1.mp3");

let screen = 1;
window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  if (screen < 3) {
    $(".blank").addClass("hide");
    $(".screen" + screen + " .has_guide")
      .addClass("on")
      .removeClass("hide");
    popWait();
    scale();
  } else {
    autoNextPage(2000, "explore4.html");
  }
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

function drop() {
  $(".screen" + screen + " .box_wrap").addClass("on");
  $(".screen" + screen + " .quiz_area").addClass("finish");
  if (screen == 1) {
    seqGif("#seqGif1");
  } else {
    seqGif("#seqGif2");
  }
}

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

$(".box_wrap .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore3/gif3/66.webp" || _target3.attr("src") == "./img/explore3/gif4/66.webp") {
        setTimeout(function () {
          $(".screen" + screen).addClass("hide");
          screen++;
          $(".screen" + screen).removeClass("hide");
          directiveAudio.src = "audio/explore3/directive" + screen + ".mp3";
          directiveAudio.play();
        }, 2000);
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
