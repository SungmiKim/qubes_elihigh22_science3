let directiveAudio = new Audio("audio/explore/directive1_1.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on").removeClass("hide");
  popWait();
  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
    $(".has_guide").removeClass("on").addClass("hide");
  }, 3000);
}
/**
 * Gif sequence
 */
function seqGif(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];

  seqGif0 = setInterval(playSeqGif, time);

  function playSeqGif() {
    seqCnt++;
    console.log("playSeqGif");
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif0);
        $(".seq_img").addClass("finish");
        autoNextPage(3500, "explore3.html");
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

function drop() {
  $(".quiz_area").addClass("hide");
  $("#seqGif1").addClass("on");

  seqGif("#seqGif1");
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".has_guide").removeClass("on").addClass("hide");
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});
