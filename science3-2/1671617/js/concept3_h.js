let directive1Audio = new Audio("audio/concept3_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept3_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen1 .quiz_area").addClass("scale");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen2 .click_obj").addClass("scale");
  popWait();
});

function dropCorrect(dataNum, dropBox) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("top");
  qs(`.drag_box[data-num='${dataNum}']`).style.removeProperty("left");
  qs(`.drag_box[data-num='${dataNum}']`).style.pointerEvents = "none";
  qs(`.drag_box[data-num='${dataNum}']`).style.zIndex = 0;
  qs(`.drag_box[data-num='${dataNum}']`).classList.add("on" + dropBox.attr("data-num"));

  dropBox.parent().addClass("hide");

  if ($(".screen1 .box_wrap.hide").length == 3) {
    $(".screen1 .quiz_area").addClass("finish");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    setTimeout(function () {
      $(".blank").addClass("hide");
    }, 500);
  }
}

function dropIncorrect() {}

$(".screen1 .drag_box").bind("mousedown touchstart", function () {
  $(".screen1 .quiz_area").removeClass("scale");
});

$(".screen1 .drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".screen1 .quiz_area").addClass("scale");
  }, 500);
});

$(".click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  $(".blank").removeClass("hide");

  if ($(this).hasClass("c2")) {
    answerAudio(true);
    seqGif1("#seqGif1");
    seqGif("#seqGif2");
    $(".click_wrap").addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    answerAudio(false);
    seqGif("#seqGif1");

    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".click_wrap").removeClass("off");
      // $(".blank").addClass("hide");
    }, 3000);
  }
});

$("#seqGif1 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif1 .gif").attr("src") === "./img/concept3_h/gif2/80.webp" && !$(".click_wrap").hasClass("on")) {
        $("#seqGif1 .gif").attr("src", "./img/concept3_h/gif2/1.webp");
        setTimeout(function () {
          $(".click_obj").addClass("scale");
          $(".blank").addClass("hide");
        }, 500);
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

// gif동시에 재생시 한번만 재생되게 하도록
function seqGif1(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];

  seqGif01 = setInterval(playSeqGif1, time);

  function playSeqGif1() {
    seqCnt++;
    // console.log("playSeqGif1");
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif01);
        setTimeout(function () {
          $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
          $(".screen1").addClass("hide");
          $(".screen2").removeClass("hide");
          directive(2);
        }, 1000);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}
