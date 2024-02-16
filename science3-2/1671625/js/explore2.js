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

  autoNextPage(9000, "explore3.html");
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

$(".ani1 img").each(function () {
  var target = this;
  var _target = $(this);
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target.attr("src") == "./img/explore2/gif2/60.webp") {
        $(".ani1").addClass("hide");
        $(".ani2").removeClass("hide");
        stopSeqGif("#seqGif1");
        seqGif("#seqGif2");
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});
