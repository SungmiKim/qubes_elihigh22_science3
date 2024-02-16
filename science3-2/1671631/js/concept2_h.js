let directive1Audio = new Audio("audio/concept2_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept2_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".screen1 .click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();
});

$(".screen1 .click_obj").click(function () {
  $(".screen1 .click_wrap").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c1")) {
    answerAudio(true);
    $(".screen1 .click_wrap").addClass("on");

    setTimeout(function () {
      $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
      $(".screen1").addClass("hide");
      $(".screen2, .blank").removeClass("hide");

      directive2Audio.play();
    }, 2000);
  } else {
    answerAudio(false);
    $(this).find(".obj").addClass("vibration");

    setTimeout(function () {
      $(".screen1 .click_wrap").addClass("scale");
      $(".screen1 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
});

directive2Audio.addEventListener("ended", function () {
  $(".screen2 .click_wrap").addClass("scale");
  $(".blank").addClass("hide");
  popWait();

  $(".screen2 .click_obj").click(function () {
    $(".screen2 .click_wrap").removeClass("scale");
    $(".blank").removeClass("hide");

    if ($(this).hasClass("c2")) {
      answerAudio(true);
      $(".screen2 .click_wrap").addClass("on");
      seqGif1("#seqGif2");
      seqGif("#seqGif1");

      setTimeout(function () {
        playFeedback();
      }, 2000);
    } else {
      answerAudio(false);
      seqGif("#seqGif1");
      // $(".screen2 .click_wrap").addClass("off");

      // setTimeout(function () {
      //   $(".screen2 .click_wrap").removeClass("off");
      //   $(".screen2 .click_wrap").addClass("scale");
      //   $(".blank").addClass("hide");
      // }, 3200);
    }
  });
});

//오답 모션 후 첫 이미지로 변경
$("#seqGif1 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif1 .gif").attr("src") === "./img/concept2_h/gif7/59.webp" && !$(".screen2 .click_wrap").hasClass("on")) {
        stopSeqGif("#seqGif1");
        $(".screen2 .click_wrap").removeClass("off");
        $(".screen2 .click_wrap").addClass("scale");
        $(".blank").addClass("hide");
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
