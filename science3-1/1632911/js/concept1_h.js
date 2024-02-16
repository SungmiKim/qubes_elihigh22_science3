let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  popWait();
  scale();

  $(".drag_box").bind("mousedown touchstart", function () {
    qs(".screen1 .quiz_area").classList.remove("on");
  });

  $(".drag_box").bind("mouseup touchend", function () {
    setTimeout(function () {
      qs(".screen1 .quiz_area").classList.add("on");
    }, 500);
  });

  qs(".blank").classList.add("hide");
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".quiz_area").addClass("on");
  }, 3000);
}

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
    console.log("playSeqGif", seqCnt);
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif01);
        if (!$(".click_wrap").hasClass("on")) {
          $(".click_obj").addClass("scale");
        }
        $(".screen2 .c1 .obj").attr("src", "./img/concept1_h/obj1_1/1.webp");
        $(".blank").addClass("hide");
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
      qs(".blank").classList.remove("hide");
    }
  }
}

function seqGif2(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];

  seqGif02 = setInterval(playSeqGif2, time);

  function playSeqGif2() {
    seqCnt++;
    console.log("playSeqGif", seqCnt);
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif02);

        setTimeout(function () {
          playFeedback();
        }, 1000);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
      qs(".blank").classList.remove("hide");
      $(".screen1").removeClass("scale");
    }
  }
}

directive2Audio.addEventListener("ended", function () {
  popWait();
  $(".click_obj").addClass("scale");
  qs(".blank").classList.add("hide");
});

$(".screen2 .click_obj").click(function () {
  $(".screen2 .click_wrap").removeClass("on");
  if ($(this).find(".obj").hasClass("answer")) {
    $(".screen2 .click_wrap").addClass("on");
    $(".screen2 .click_wrap").addClass("finish");
    $(".blank").removeClass("hide");
    $(".click_obj").removeClass("scale");
    answerAudio(true);

    seqGif1("#seqGif1");
    seqGif2("#seqGif2");
  } else {
    $(".blank").removeClass("hide");
    $(".click_obj").removeClass("scale");
    answerAudio(false);

    seqGif1("#seqGif1");
  }
});

function dropCorrect(dataNum) {
  answerAudio(true);

  qs(`.drag_box[data-name='${dataNum}']`).classList.add("hide");
  qs(`.drop_box[data-name='${dataNum}']`).parentNode.classList.add("on");

  if (qsa(".screen1 .box_wrap.on").length == 2) {
    if (qs(".screen2").classList.contains("hide")) {
      $(".drag_area").addClass("hide");
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        qs(".quiz_cnt").classList.remove("cnt1");
        qs(".quiz_cnt").classList.add("cnt2");
        qs(".screen1").classList.add("hide");
        qs(".screen2").classList.remove("hide");
        qs(".blank").classList.remove("hide");

        directive2Audio.play();
      }, 1000);
    }
  }
}

function dropIncorrect() {}
