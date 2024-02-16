let directive1Audio = new Audio("audio/explore7/directive1.mp3");
let directive2Audio = new Audio("audio/explore7/directive2.mp3");

function seqGifSec(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];
  var seqCntSec = option[4];
  var seqTotalCntSec = option[5];
  var isSec = option[6];

  seqGifSec0 = setInterval(playSeqGif, time);

  function playSeqGif() {
    seqCnt++;
    // console.log("playSeqGif");
    // console.log(seqCnt);
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGifSec0);
      }
      if (isSec) {
        seqCnt = seqCntSec;
        totalCut = seqTotalCntSec;
      } else {
        seqCnt = 0;
      }
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  seqGif("#seqGif1");
  $(".blank").addClass("hide");
  $(".has_guide").addClass("on");
  popWait();
  scale();
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
    $(".has_guide").removeClass("on");
  }, 3000);
}

function drop() {
  $(".drag_area").addClass("hide");
  $(".box_wrap").addClass("on");

  setTimeout(function () {
    directive2Audio.play();
  }, 5000);
}

$(".drag_box").bind("mousedown touchstart", function () {
  clearTimeout(guide);
  $(".quiz_area, .has_guide").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});
