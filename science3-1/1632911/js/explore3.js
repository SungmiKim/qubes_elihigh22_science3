let directive1Audio = new Audio("audio/explore/directive2_1.mp3");
let directive2Audio = new Audio("audio/explore/directive2_2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
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

$("#seqGif2 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif2 .gif").attr("src") === "./img/explore3/gif3/80.webp") {
        setTimeout(function () {
          $("#seqGif2 .gif").attr("src", "./img/explore3/gif3/1.webp");
          $("#seqGif2").removeClass("on");
          $("#seqGif3").addClass("on");

          seqGif("#seqGif3");
          directive2Audio.play();
        }, 500);
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

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
        if (name === "#seqGif3") {
          $("#seqGif3").addClass("finish");
          autoNextPage(3500, "explore4.html");
        }
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}
function drop() {
  $(".quiz_area").addClass("hide");
  $("#seqGif2").addClass("on");
  seqGif("#seqGif2");
  // setTimeout(function () {
  //   $("#seqGif2").removeClass("on");
  //   $("#seqGif3").addClass("on");

  //   seqGif("#seqGif3");
  //   directive2Audio.play();
  // }, 4100);
}

// directive2Audio.addEventListener("ended", function () {});

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
