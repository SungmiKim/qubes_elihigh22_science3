window.addEventListener("load", function () {
  directive(1);
});

let directiveAudio = new Audio();

function directive(num) {
  directiveAudio.src = "audio/concept1_h/directive" + num + ".mp3";
  directiveAudio.play();

  directiveAudio.addEventListener("ended", function () {
    popWait();
    // if (!qs(".screen1").classList.contains("hide")) {
    $(".quiz_area").addClass("on");
    // }

    if (num == 3) {
      $(".click_obj").addClass("scale");
    }

    $(".drag_box").bind("mousedown touchstart", function () {
      $(".quiz_area").removeClass("on");
    });

    $(".drag_box").bind("mouseup touchend", function () {
      setTimeout(function () {
        $(".quiz_area").addClass("on");
      }, 500);
    });

    $(".blank").addClass("hide");
  });
}

function dropCorrect(fixDragBox, dropBox) {
  answerAudio(true);
  if (!$(".screen1").hasClass("hide")) {
    qs(`.drag_box[data-name='${fixDragBox}']`).classList.add("hide");
    qs(`.drop_box[data-name='${fixDragBox}']`).parentNode.classList.add("on");
    if (qsa(".screen1 .box_wrap.on").length == 3) {
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        $(".quiz_cnt").removeClass("cnt1");
        $(".quiz_cnt").addClass("cnt2");
        $(".screen1").addClass("hide");
        $(".screen2").removeClass("hide");
        $(".blank").removeClass("hide");
        directive(2);
      }, 2000);
    }
  } else if (!$(".screen2").hasClass("hide")) {
    console.log(dropBox.parent().css("top"));
    qs(`.drag_box[data-num='${fixDragBox}']`).style.top = dropBox.parent().css("top");
    qs(`.drag_box[data-num='${fixDragBox}']`).style.left = dropBox.parent().css("left");
    dropBox.parent().css("display", "none");
    qs(`.drag_box[data-num='${fixDragBox}']`).style.pointerEvents = "none";
    qs(`.drag_box[data-num='${fixDragBox}']`).style.zIndex = 0;
    qs(`.drag_box[data-num='${fixDragBox}']`).classList.add("on");
    if ($(".screen2 .drag_box.on").length == 2) {
      $(".drag_box").addClass("on");
      $(".screen2 .drag_box.d2, .screen2 .drag_box.d3").addClass("hide");
      setTimeout(function () {
        $(".quiz_area").removeClass("on");
        $(".quiz_cnt").removeClass("cnt2");
        $(".quiz_cnt").addClass("cnt3");
        $(".screen2").addClass("hide");
        $(".screen3").removeClass("hide");
        $(".blank").removeClass("hide");
        directive(3);
      }, 2000);
    }
  }
}

qsa(".screen3 .click_obj").forEach((click) => {
  click.addEventListener("click", function () {
    $(".click_obj").removeClass("scale");
    if (this.classList.contains("c1")) {
      qs(".blank").classList.remove("hide");
      playGif(".c1 .obj");
      playGif(".c2 .obj");
      answerAudio(true);

      this.parentNode.classList.add("on");

      setTimeout(function () {
        setTimeout(function () {
          playFeedback();
        }, 1000);
      }, 1000);
    } else {
      qs(".blank").classList.remove("hide");
      playGif(".c2 .obj");
      answerAudio(false);

      setTimeout(function () {
        setTimeout(function () {
          $(".click_obj").addClass("scale");
          $(".c2 .obj").attr("src", "./img/concept1_h/obj1_2.png");
          qs(".blank").classList.add("hide");
        }, 2000);
      }, 1000);
    }
  });
});

function dropIncorrect() {}
