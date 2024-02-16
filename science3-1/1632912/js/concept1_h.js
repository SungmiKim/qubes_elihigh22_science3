let directiveAudio = new Audio();

window.addEventListener("load", function () {
  directive(1);
});
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

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();
}

directiveAudio.addEventListener("ended", function () {
  popWait();
  if ($(".screen1").hasClass("hide")) {
    $(".quiz_area").addClass("on");
  } else {
    $(".click_obj").addClass("scale");
  }

  $(".blank").addClass("hide");
});

$(".click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  $(".blank").removeClass("hide");
  if ($(this).hasClass("c1")) {
    answerAudio(true);

    seqGif1("#seqGif1");
    seqGif("#seqGif2");
    $(".click_wrap").addClass("on");
  } else {
    answerAudio(false);
    seqGif("#seqGif2");
  }
});

$("#seqGif2 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif2 .gif").attr("src") === "./img/concept1_h/gif5/60.webp" && !$(".click_wrap").hasClass("on")) {
        $("#seqGif2 .gif").attr("src", "./img/concept1_h/gif5/1.webp");
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

function dropCorrect() {
  answerAudio(true);

  $(".quiz_area").addClass("finish");

  setTimeout(function () {
    playFeedback();
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
