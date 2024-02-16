let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

$(".click_obj").click(function () {
  $(".click_wrap").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c2")) {
    answerAudio(true);
    $(".click_wrap").addClass("on");
    seqGif("#seqGif1");
    seqGif1("#seqGif2");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2, .blank").removeClass("hide");

      directive2Audio.play();
    }, 4500);
  } else {
    answerAudio(false);
    // $(".click_wrap").addClass("off");
    seqGif("#seqGif1");

    // setTimeout(function () {
    //   $(".click_wrap").addClass("scale");
    //   $(".blank").addClass("hide");
    //   $(".click_wrap").removeClass("off");
    // }, 3000);
  }
});

//오답시 첫모션으로 돌아가기
$("#seqGif1 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif1 .gif").attr("src") === "./img/concept1_h/gif7/79.webp" && !$(".click_wrap").hasClass("on")) {
        stopSeqGif("#seqGif1");
        setTimeout(function () {
          $(".click_wrap").addClass("scale");
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
          // directive(2);
        }, 1000);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

directive2Audio.addEventListener("ended", function () {
  $(".quiz_area").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

function dropCorrect(dataNum) {
  answerAudio(true);
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".blank").addClass("hide");
  }, 500);

  $(".drag_box[data-name=" + dataNum + "]").addClass("hide");
  $(".drop_box[data-name=" + dataNum + "]")
    .parent()
    .addClass("on");

  if ($(".screen2 .box_wrap.on").length == 3) {
    $(".quiz_area").addClass("finish");
    setTimeout(function () {
      playFeedback();
    }, 2000);
  }
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("scale");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("scale");
  }, 500);
});
