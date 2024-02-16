let directive1Audio = new Audio("audio/concept2_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept2_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});


directive1Audio.addEventListener("ended", function () {
  popWait();
  $(".click_obj").addClass("scale");

  $(".blank").addClass("hide");
});

$(".screen1 .click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  if ($(this).hasClass("c1")) {
    $(".blank").removeClass("hide");
    $(".screen1 .click_wrap").addClass("finish");
    $(".screen1 .c1 img.obj").attr("src", "./img/concept2_h/obj1_1_o.png");
    $(".screen1 .c1 img.obj_name").attr("src", "./img/concept2_h/obj1_name1_o.png");
    answerAudio(true);

    setTimeout(function () {
      if ($(".screen2").hasClass("hide")) {
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");

        directive2Audio.play();
      }
    }, 2000);
  } else {
    $(".blank").removeClass("hide");
    answerAudio(false);

    $(this).find(".obj").addClass("vibration");
    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".screen1 .click_obj .obj").removeClass("vibration");
      $(".blank").addClass("hide");
    }, 500);
  }
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
    console.log("playSeqGif", seqCnt);
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif01);

        setTimeout(function () {
          playFeedback();
          $(".blank").removeClass("hide");
        }, 1000);
      }
      seqCnt = 0;
    }
     else {
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
        if (!$(".click_wrap").hasClass("on")) {
          $(".click_obj").addClass("scale");
        }
        if ($(".screen2 .click_wrap").hasClass("finish")) {
          $("#seqGif2 img").attr("src", "./img/concept2_h/gif4/80.webp");  
        } else {
          $("#seqGif2 img").attr("src", "./img/concept2_h/gif4/1.webp");
        }
        
        $(".blank").addClass("hide");
      } 
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
      qs(".blank").classList.remove("hide");
      $(".click_obj").removeClass("scale");
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

    seqGif2("#seqGif2");
  }
});
