let directive1Audio = new Audio("audio/explore4/directive1.mp3");
let completeAudio = new Audio("../common/sound/effect/complete.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on").removeClass("hide");
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("scale");
    $(".has_guide").removeClass("on").addClass("hide");
  }, 3000);
}

function drop() {
  $(".box_wrap").addClass("on");
  $(".quiz_area").addClass("finish");
  seqGif("#seqGif1");
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on").addClass("hide");
  $(".quiz_area").removeClass("scale");
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
      if (_target3.attr("src") == "./img/explore4/gif4/103.webp") {
        autoNextPage(1000, "explore5.html");
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
