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
          $(".screen1").addClass("scale");
        }
        $("#seqGif1 img").attr("src", "./img/concept2_h/ani1_1/1.webp");
        qs(".blank").classList.add("hide");
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
        // setTimeout(function () {
        if (qs(".screen2").classList.contains("hide")) {
          qs(".quiz_cnt").classList.remove("cnt1");
          qs(".quiz_cnt").classList.add("cnt2");
          qs(".screen1").classList.add("hide");
          qs(".screen2").classList.remove("hide");
          qs(".blank").classList.remove("hide");
          directive(2);
        }
        // }, 1000);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
      qs(".blank").classList.remove("hide");
      $(".screen1").removeClass("scale");
    }
  }
}

window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept2_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    if (qs(".screen1").classList.contains("hide")) {
      qs(".quiz_area").classList.add("on");
    }

    $(".screen1").addClass("scale");

    $(".drag_box").bind("mousedown touchstart", function () {
      qs(".screen2 .quiz_area").classList.remove("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      setTimeout(function () {
        qs(".screen2 .quiz_area").classList.add("on");
      }, 500);
    });

    qs(".blank").classList.add("hide");
  });
}

qsa(".screen1 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    $(".screen1").removeClass("scale");
    if (this.classList.contains("c2")) {
      this.parentNode.classList.add("on");
      seqGif1("#seqGif1");
      seqGif2("#seqGif2");
      answerAudio(true);
    } else {
      seqGif1("#seqGif1");
      answerAudio(false);
    }
  });
});

function dropCorrect(dataNum) {
  answerAudio(true);

  qs(".blank").classList.remove("hide");
  $(".drag_area").addClass("hide");
  // qs(`.drag_box[data-name='${dataNum}']`).classList.add("hide");
  $(".box_wrap, .drag_box, .drop_area").addClass("on");

  setTimeout(function () {
    playFeedback();
  }, 2000);
}

function dropIncorrect() {}
