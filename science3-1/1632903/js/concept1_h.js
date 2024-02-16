window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    $(".click_obj").addClass("scale");

    $(".blank").addClass("hide");
  });
}

$(".screen1 .click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  if ($(this).hasClass("c1")) {
    $(".blank").removeClass("hide");
    answerAudio(true);

    $(this).parent().addClass("on");

    setTimeout(function () {
      if ($(".screen2").hasClass("hide")) {
        $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");

        directive(2);
      }
    }, 2000);
  } else {
    $(".blank").removeClass("hide");
    answerAudio(false);

    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".blank").addClass("hide");
    }, 500);
  }
});

$(".screen2 .click_obj").click(function () {
  $(".click_obj").removeClass("scale");
  if ($(this).hasClass("c1")) {
    $(".blank").removeClass("hide");
    playGif(".screen2 .c1 .obj");
    playGif(".screen2 .c2 .obj");

    answerAudio(true);

    $(this).parent().addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    $(".blank").removeClass("hide");
    playGif(".screen2 .c2 .obj");

    answerAudio(false);

    setTimeout(function () {
      $(".click_obj").addClass("scale");
      $(".screen2 .c2 .obj").attr("src", "./img/concept1_h/obj2_2.png");
      $(".blank").addClass("hide");
    }, 2000);
  }
});
