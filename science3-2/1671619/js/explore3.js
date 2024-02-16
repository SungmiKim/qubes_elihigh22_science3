let directive1Audio = new Audio("audio/explore3/directive1.mp3");
let directive2Audio = new Audio();
let directive3Audio = new Audio();
let friendsAudio = new Audio();
let clickAudio = new Audio("../common/sound/effect/click.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let chimupAudio = new Audio("audio/explore3/effect_chimup.wav");
let incorrectAudio = new Audio("audio/explore3/effect_incorrect.mp3");

let ellaYes = new Audio("audio/explore3/ella_yes.mp3");
let ellaNo = new Audio("audio/explore3/ella_no.mp3");
let ellaQ1 = new Audio("audio/explore3/ella_q1.mp3");
let ellaQ2 = new Audio("audio/explore3/ella_q2.mp3");
let ellaQ3 = new Audio("audio/explore3/ella_q3.mp3");
let ellaQ4 = new Audio("audio/explore3/ella_q4.mp3");

let haroYes = new Audio("audio/explore3/haro_yes.mp3");
let haroNo = new Audio("audio/explore3/haro_no.mp3");
let haroQ1 = new Audio("audio/explore3/haro_q1.mp3");
let haroQ2 = new Audio("audio/explore3/haro_q2.mp3");
let haroQ3 = new Audio("audio/explore3/haro_q3.mp3");
let haroQ4 = new Audio("audio/explore3/haro_q4.mp3");

let childQ1_1 = new Audio("audio/explore3/child1_1.mp3");
let childQ1_2 = new Audio("audio/explore3/child1_2.mp3");
let childQ1_3 = new Audio("audio/explore3/child1_3.mp3");
let childQ1_4 = new Audio("audio/explore3/child1_4.mp3");
let childQ2_1 = new Audio("audio/explore3/child2_1.mp3");
let childQ2_2 = new Audio("audio/explore3/child2_2.mp3");
let childQ2_3 = new Audio("audio/explore3/child2_3.mp3");
let childQ2_4 = new Audio("audio/explore3/child2_4.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".click_obj").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

let num;
$(".click_obj").click(function () {
  sparkleAudio.play();
  clearTimeout(guide);
  $(".blank").removeClass("hide");
  $(".has_guide").addClass("hide");
  num = $(this).attr("data-num");
  $(this).addClass("on");
  $(".click_obj")
    .not("[data-num=" + num + "]")
    .addClass("hide");
  setTimeout(function () {
    $(".screen1").addClass("hide");
    $(".screen" + num).removeClass("hide");
    $(".screen" + num + " .page_title.tit1").addClass("on");

    directive2Audio.src = "audio/explore3/directive" + num + "_1.mp3";
    directive2Audio.play();
  }, 2000);
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  if (num == 2) {
    $(".select_wrap .s1").addClass("on");
  } else {
    $(".select_wrap .s3").addClass("on");
  }
});

//첫번째 질문 선택
let select;
$(".select_wrap ul.s1 li, .select_wrap ul.s3 li").click(function () {
  //흰색 배경 이미지로 변경
  var img = $(this).find("img");
  img.attr("src", img.attr("src").replace(".png", "_o.png"));
  $(".select_wrap ul").addClass("no_scale");

  clickAudio.play();
  select = $(this).attr("data-num");
  $(".blank").removeClass("hide");
  if (select == 0) {
    setTimeout(function () {
      $(".screen" + num + " .chat1-" + select)
        .removeClass("hide")
        .addClass("on");
      $(".select_wrap ul").removeClass("on");

      if (num == 2) {
        childQ1_1.play();
      } else {
        childQ2_1.play();
      }
    }, 1000);

    setTimeout(function () {
      $(".screen" + num + " .chat2-" + select)
        .removeClass("hide")
        .addClass("on");

      if (num == 2) {
        seqGif("#seqGif1");
        ellaNo.play();
      } else {
        seqGif("#seqGif4");
        haroNo.play();
      }
    }, 3000);

    //캐릭터 뒷모습
    setTimeout(function () {
      $(".screen" + num + " .cha_back").removeClass("hide");
    }, 5000);

    setTimeout(function () {
      $(".screen" + num + " .chat1-1").removeClass("hide");
      if (num == 2) {
        haroQ2.play();
      } else {
        ellaQ2.play();
      }
    }, 7000);

    setTimeout(function () {
      $(".screen" + num + " .chat2-1").removeClass("hide");
      if (num == 2) {
        seqGif("#seqGif1");
        ellaNo.play();
      } else {
        $("#seqGif4").css("display", "none");
        $("#seqGif5").css("display", "block");
        seqGif("#seqGif5");
        haroYes.play();
      }
    }, 9000);
  } else {
    setTimeout(function () {
      $(".screen" + num + " .chat1-" + select)
        .removeClass("hide")
        .addClass("on");
      $(".select_wrap ul").removeClass("on");
      if (num == 2) {
        childQ1_2.play();
      } else {
        childQ2_2.play();
      }
    }, 1000);

    setTimeout(function () {
      $(".screen" + num + " .chat2-" + select)
        .removeClass("hide")
        .addClass("on");
      if (num == 2) {
        seqGif("#seqGif1");
        ellaNo.play();
      } else {
        $("#seqGif4").css("display", "none");
        $("#seqGif5").css("display", "block");
        seqGif("#seqGif5");
        haroYes.play();
      }
    }, 3000);

    //캐릭터 뒷모습
    setTimeout(function () {
      $(".screen" + num + " .cha_back").removeClass("hide");
    }, 5000);

    setTimeout(function () {
      $(".screen" + num + " .chat1-0").removeClass("hide");
      if (num == 2) {
        haroQ1.play();
      } else {
        ellaQ1.play();
      }
    }, 7000);
    setTimeout(function () {
      $(".screen" + num + " .chat2-0").removeClass("hide");
      if (num == 2) {
        seqGif("#seqGif1");
        ellaNo.play();
      } else {
        $("#seqGif5").css("display", "none");
        $("#seqGif4").css("display", "block");
        seqGif("#seqGif4");
        haroNo.play();
      }
    }, 9000);
  }

  setTimeout(function () {
    $(".screen" + num + " .cha_back").addClass("hide");
    $(".blank").addClass("hide");
    $(".select_wrap ul").removeClass("no_scale");
    if (num == 2) {
      $(".select_wrap .s5").addClass("on");
    } else {
      $(".select_wrap .s6").addClass("on");
    }
  }, 11000);
});

//두번째 질문선택
let select2;
$(".select_wrap ul.s5 li, .select_wrap ul.s6 li").click(function () {
  var img = $(this).find("img");
  img.attr("src", img.attr("src").replace(".png", "_o.png"));
  $(".select_wrap ul").addClass("no_scale");

  clickAudio.play();
  select2 = $(this).attr("data-num");
  $(".blank").removeClass("hide");

  if (select2 == 0) {
    setTimeout(function () {
      $(".screen" + num + " .chat3-" + select2)
        .removeClass("hide")
        .addClass("on");
      $(".select_wrap ul").removeClass("on");
      if (num == 2) {
        childQ1_3.play();
      } else {
        childQ2_4.play();
      }
    }, 1000);

    setTimeout(function () {
      $(".screen" + num + " .chat4-" + select2)
        .removeClass("hide")
        .addClass("on");
      if (num == 2) {
        seqGif("#seqGif1");
        ellaNo.play();
      } else {
        $("#seqGif5").css("display", "none");
        $("#seqGif4").css("display", "block");
        seqGif("#seqGif4");
        haroNo.play();
      }
    }, 3000);

    //캐릭터 뒷모습
    setTimeout(function () {
      $(".screen" + num + " .cha_back").removeClass("hide");
    }, 5000);

    setTimeout(function () {
      $(".screen" + num + " .chat3-1").removeClass("hide");
      if (num == 2) {
        haroQ4.play();
      } else {
        ellaQ3.play();
      }
    }, 7000);

    setTimeout(function () {
      $(".screen" + num + " .chat4-1").removeClass("hide");
      if (num == 2) {
        $("#seqGif1").css("display", "none");
        $("#seqGif2").css("display", "block");
        seqGif("#seqGif2");
        ellaYes.play();
      } else {
        $("#seqGif4").css("display", "none");
        $("#seqGif5").css("display", "block");
        seqGif("#seqGif5");
        haroYes.play();
      }
    }, 9000);
  } else {
    setTimeout(function () {
      $(".screen" + num + " .chat3-" + select2)
        .removeClass("hide")
        .addClass("on");
      $(".select_wrap ul").removeClass("on");
      if (num == 2) {
        childQ1_4.play();
      } else {
        childQ2_3.play();
      }
    }, 1000);

    setTimeout(function () {
      $(".screen" + num + " .chat4-" + select2)
        .removeClass("hide")
        .addClass("on");
      if (num == 2) {
        $("#seqGif1").css("display", "none");
        $("#seqGif2").css("display", "block");
        seqGif("#seqGif2");
        ellaYes.play();
      } else {
        $("#seqGif4").css("display", "none");
        $("#seqGif5").css("display", "block");
        seqGif("#seqGif5");
        haroYes.play();
      }
    }, 3000);

    //캐릭터 뒷모습
    setTimeout(function () {
      $(".screen" + num + " .cha_back").removeClass("hide");
    }, 5000);

    setTimeout(function () {
      $(".screen" + num + " .chat3-0").removeClass("hide");
      if (num == 2) {
        haroQ3.play();
      } else {
        ellaQ4.play();
      }
    }, 7000);
    setTimeout(function () {
      $(".screen" + num + " .chat4-0").removeClass("hide");
      if (num == 2) {
        $("#seqGif2").css("display", "none");
        $("#seqGif1").css("display", "block");
        seqGif("#seqGif1");
        ellaNo.play();
      } else {
        $("#seqGif5").css("display", "none");
        $("#seqGif4").css("display", "block");
        seqGif("#seqGif4");
        haroNo.play();
      }
    }, 9000);
  }

  setTimeout(function () {
    $(".screen" + num + " .page_title.tit1").removeClass("on");
    $(".screen" + num + " .page_title.tit2").addClass("on");

    directive3Audio.src = "audio/explore3/directive" + num + "_2.mp3";
    directive3Audio.play();

    $(".blank").removeClass("hide");
    $(".screen" + num + " .cha_back").addClass("hide");
    if (num == 2) {
      $(".select_wrap .s2").addClass("on no_scale");
    } else {
      $(".select_wrap .s4").addClass("on no_scale");
    }
  }, 11000);
});

directive3Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  if (num == 2) {
    $(".select_wrap .s2").removeClass("no_scale");
  } else {
    $(".select_wrap .s4").removeClass("no_scale");
  }
});

// 최종 답안 선택시
$(".select_wrap ul.s2 li, .select_wrap ul.s4 li").click(function () {
  var img = $(this).find("img");
  img.attr("src", img.attr("src").replace(".png", "_o.png"));
  $(".select_wrap ul").addClass("no_scale");

  clickAudio.play();
  $(".blank").removeClass("hide");

  setTimeout(function () {
    $(".screen" + num + " .bubble").addClass("off");
    $(".select_wrap ul").removeClass("on");
    // $(".center").addClass("on");
  }, 1000);

  answer = $(this).hasClass("correct");
  setTimeout(function () {
    $(".screen" + num + " .ani_area")
      .removeClass("hide")
      .addClass("on");
    $(".screen" + num + " .seq_img").addClass("on");

    if (answer) {
      chimupAudio.play();
      seqGif1("#seqGif7");
    } else {
      incorrectAudio.play();
    }
    if (num == 2) {
      setTimeout(function () {
        seqGif("#seqGif3");
      }, 1000);
    } else {
      setTimeout(function () {
        seqGif("#seqGif6");
      }, 1000);
    }
  }, 3000);
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
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}

chimupAudio.addEventListener("ended", function () {
  if (num == 2) {
    friendsAudio.src = "audio/explore3/ella1.mp3";
  } else {
    friendsAudio.src = "audio/explore3/haro1.mp3";
  }
  friendsAudio.play();
});

incorrectAudio.addEventListener("ended", function () {
  if (num == 2) {
    friendsAudio.src = "audio/explore3/ella2.mp3";
  } else {
    friendsAudio.src = "audio/explore3/haro2.mp3";
  }
  friendsAudio.play();
});

friendsAudio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});
