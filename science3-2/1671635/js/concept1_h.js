let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".quiz_area").addClass("on");
  $(".blank").addClass("hide");
  popWait();
});

function dropCorrect(fixDragBox) {
  answerAudio(true);

  $(".drag_box[data-name=" + fixDragBox + "]").addClass("hide");
  $(".drop_box[data-name=" + fixDragBox + "]")
    .parent()
    .addClass("on");
  $(".quiz_area").addClass("finish");

  setTimeout(function () {
    $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");

    directive2Audio.play();
  }, 2000);
}

function dropIncorrect() {}

$(".drag_box").bind("mousedown touchstart", function () {
  $(".quiz_area").removeClass("on");
});

$(".drag_box").bind("mouseup touchend", function () {
  setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 500);
});

directive2Audio.addEventListener("ended", function () {
  $(".screen2 .click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();

  $(".screen2 .click_obj").click(function () {
    $(".screen2 .click_wrap").removeClass("scale");
    $(".blank").removeClass("hide");

    if ($(this).hasClass("c1")) {
      answerAudio(true);
      $(".screen2 .click_wrap").addClass("on");
      seqGif1("#seqGif1");
      seqGif("#seqGif2");

      setTimeout(function () {
        playFeedback();
      }, 2000);
    } else {
      answerAudio(false);
      seqGif("#seqGif2");
      $(".screen2 .click_wrap").addClass("off");

      setTimeout(function () {
        $(".screen2 .click_wrap").removeClass("off");
        $(".screen2 .click_wrap").addClass("scale");
        $(".blank").addClass("hide");
      }, 4500);
    }
  });
});

//오답시 첫모션으로 돌아가기
$("#seqGif2 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif2 .gif").attr("src") === "./img/concept1_h/gif13/80.webp" && !$(".click_wrap").hasClass("on")) {
        $("#seqGif2 .gif").attr("src", "./img/concept1_h/gif4/1.webp");

        stopSeqGif("#seqGif2");
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
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif01);
        setTimeout(function () {
          $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
          $(".screen1").addClass("hide");
          $(".screen2").removeClass("hide");
        }, 1000);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}
