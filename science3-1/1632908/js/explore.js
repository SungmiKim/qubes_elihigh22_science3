function seqDim(name, state) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var fileName = option[0];
  var totalCut = option[1];
  $(name).removeClass("hide");
  seqDim0 = setInterval(playSeqDim, 40);

  function playSeqDim() {
    seqCnt++;
    console.log("playSeqDim");
    if (seqCnt > totalCut) {
      clearInterval(seqDim0);

      setTimeout(function () {
        if (!state) {
          $(name).addClass("hide");
          popWait();
          qs(".blank").classList.add("hide");
          window.addEventListener("devicemotion", handleOrientation);
        }
        $(name + " .gif").attr("src", "./img/" + fileName + "/1.webp");
      }, 1000);
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

var seqHaroCnt = 1;
var totalHaroCut = 60;

function playHaro() {
  seqHaroCnt++;
  console.log("playHaro");
  if (seqHaroCnt > totalHaroCut) {
    seqHaroCnt = 0;
  } else {
    $(" .ani").attr("src", "./img/ani/" + seqHaroCnt + ".webp");
  }
}
