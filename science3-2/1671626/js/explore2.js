let directiveAudio = new Audio("audio/explore2/directive.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".has_guide").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("scale");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop() {
  $(".quiz_area").addClass("finish");
  $(".drag_area").addClass("hide");
  $(".box_wrap").addClass("on");

  seqGif("#seqGif1");
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area").removeClass("scale");
  $(".has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});

$(".box_wrap .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore2/gif2/92.webp") {
        autoNextPage(2000, "explore3.html");
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
