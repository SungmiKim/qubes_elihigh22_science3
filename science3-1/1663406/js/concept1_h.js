let directive1Audio = new Audio("audio/concept1_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept1_h/directive2.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {

  popWait();
  $(".click_wrap").addClass("on");

  qs(".blank").classList.add("hide");
});

directive2Audio.addEventListener("ended", function () {
  popWait();
  $(".quiz_area").addClass("on");

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

$(".screen1 .click_obj").click(function () {
  $(".screen1 .click_wrap").removeClass("on");
  if ($(this).find(".obj").attr("alt") == "농구공") {
    answerAudio(true);
    $(".screen1 .click_wrap").addClass("finish");
    $(".blank").removeClass("hide");
    // playFeedback();
  } else {
    answerAudio(false);

    $(this).find(".obj").addClass("vibration");
    setTimeout(function () {
      $(".screen1 .click_obj .obj").removeClass("vibration");
      $(".screen1 .click_wrap").addClass("on");
    }, 500);
  }

  setTimeout(function(){
    if($(".screen1 .click_wrap").hasClass("finish")){
      if($(".screen2").hasClass("hide")){
        $(".quiz_area").removeClass("on");
        qs(".quiz_cnt").classList.remove("cnt1");
        qs(".quiz_cnt").classList.add("cnt2");
        qs(".screen1").classList.add("hide");
        qs(".screen2").classList.remove("hide");
        qs(".blank").classList.remove("hide");

        directive2Audio.play();
      }
    }    
  }, 2000);
});

function dropCorrect(dataNum) {
  answerAudio(true);

  qs(`.drag_box[data-name='${dataNum}']`).classList.add("hide");
  qs(`.drop_box[data-name='${dataNum}']`).parentNode.classList.add("on");

    if (qsa(".screen2 .box_wrap.on").length == 2) {
      $(".screen2 .drag_area").addClass("hide");
      setTimeout(function(){
        playFeedback();
      }, 2000);
    }
}

function dropIncorrect() {}
