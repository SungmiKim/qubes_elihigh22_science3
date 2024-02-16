//  zoom(스크린넘버);
function zoom(num) {
  $(".screen" + num).addClass("zoom");
  setTimeout(function () {
    $(".screen" + num).addClass("hide");
    num++;
    $(".screen" + num).removeClass("hide");
  }, 2000);
}

var chickCnt = 1;
var cycle = 1;
function chickGif() {
  seqChickGif0 = setInterval(playChickGif, 200);
  function playChickGif() {
    console.log("playChickGif");

    chickCnt++;

    if (chickCnt > 2) {
      chickCnt = 1;
      cycle++;
      //   clearInterval(seqChickGif0);
    }
    $(".chick_gif img").attr("src", "./img/explore/chick" + chickCnt + ".png");
  }
}

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
