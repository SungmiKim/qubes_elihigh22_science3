window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept3_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    $(".click_obj").addClass("scale");

    qs(".blank").classList.add("hide");
  });
}

qsa(".screen1 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    $(".click_obj").removeClass("scale");
    if (this.classList.contains("c2")) {
      qs(".blank").classList.remove("hide");
      playGif(".screen1 .c1 .obj");
      playGif(".screen1 .c2 .obj");

      answerAudio(true);

      this.parentNode.classList.add("on");

      setTimeout(function () {
        if (qs(".screen2").classList.contains("hide")) {
          qs(".quiz_cnt").classList.remove("cnt1");
          qs(".quiz_cnt").classList.add("cnt2");
          qs(".screen1").classList.add("hide");
          qs(".screen2").classList.remove("hide");

          directive(2);
        }
      }, 2500);
    } else {
      qs(".blank").classList.remove("hide");
      playGif(".screen1 .c1 .obj");

      answerAudio(false);
      setTimeout(function () {
        $(".click_obj").addClass("scale");
        $(".screen1 .c1 .obj").attr("src", "./img/concept3_h/obj1_1.png");
        qs(".blank").classList.add("hide");
      }, 3000);
    }
  });
});

qsa(".screen2 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    $(".click_obj").removeClass("scale");
    if (this.classList.contains("c1")) {
      qs(".blank").classList.remove("hide");
      answerAudio(true);
      this.parentNode.classList.add("on");

      setTimeout(function () {
        playFeedback();
      }, 1500);
    } else {
      qs(".blank").classList.remove("hide");
      playGif(".screen2 .c2 .obj");
      answerAudio(false);

      setTimeout(function () {
        $(".click_obj").addClass("scale");
        $(".screen2 .c2 .obj").attr("src", "./img/concept3_h/obj2_2.png");
        qs(".blank").classList.add("hide");
      }, 3000);
    }
  });
});
