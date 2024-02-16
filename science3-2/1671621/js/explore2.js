let directiveAudio = new Audio("audio/explore2/directive1.mp3");
let directive1Audio = new Audio();
let directive2Audio = new Audio();
let clickAudio = new Audio("../common/sound/effect/click.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
});

let screen = 0;
directiveAudio.addEventListener("ended", function () {
  screen++;
  $(".blank").addClass("hide");
  // playGuide();
  popWait();
  scale();
});

let guide;
function scale() {
  // guide = setTimeout(function () {
  // $(".has_guide").addClass("hide");
  $(".screen" + screen + " .click_obj").addClass("scale");
  // }, 2000);
}

$(".click_obj").click(function () {
  clickAudio.play();
  $(".blank").removeClass("hide");
  $(this).addClass("on");
  $(".click_obj").removeClass("scale");
  if (screen == 1) {
    $(".screen1 .page_title").addClass("hide");
    if ($(this).hasClass("c1")) {
      $(".screen1 .ani_area.a1").addClass("on");
      directive1Audio.src = "audio/explore2/directive1_1.mp3";
      setTimeout(function () {
        $(".screen1 .ani_area.a1 .ani_img").attr("data-num", "1");
      }, 3000);
      setTimeout(function () {
        $(".screen1 .ani_area.a1 .ani_img").attr("data-num", "2");
      }, 7000);
    } else {
      $(".screen1 .ani_area.a2").addClass("on");
      directive1Audio.src = "audio/explore2/directive1_2.mp3";
      setTimeout(function () {
        $(".screen1 .ani_area.a2 .ani_img").attr("data-num", "1");
      }, 3000);
      setTimeout(function () {
        $(".screen1 .ani_area.a2 .ani_img").attr("data-num", "2");
      }, 9000);
    }
    setTimeout(function () {
      directive1Audio.play();
    }, 1000);
  } else {
    $(".screen2 .page_title").addClass("hide");
    if ($(this).hasClass("c1")) {
      $(".screen2 .ani_area.a1").addClass("on");
      directive2Audio.src = "audio/explore2/directive2_1.mp3";
      setTimeout(function () {
        $(".screen2 .ani_area.a1 .ani_img").attr("data-num", "1");
      }, 2500);
      setTimeout(function () {
        $(".screen2 .ani_area.a1 .ani_img").attr("data-num", "2");
      }, 7000);
    } else {
      $(".screen2 .ani_area.a2").addClass("on");
      directive2Audio.src = "audio/explore2/directive2_2.mp3";
      setTimeout(function () {
        $(".screen2 .ani_area.a2 .ani_img").attr("data-num", "1");
      }, 2500);
      setTimeout(function () {
        $(".screen2 .ani_area.a2 .ani_img").attr("data-num", "2");
      }, 7000);
    }
    setTimeout(function () {
      directive2Audio.play();
    }, 1000);
  }
});

directive1Audio.addEventListener("ended", function () {
  $(".screen1 .ani_area").removeClass("on");
  if ($(".screen1 .click_obj.on").length == 2) {
    setTimeout(function () {
      $(".screen1").addClass("hide");
      $(".screen2").removeClass("hide");

      directiveAudio.src = "audio/explore2/directive2.mp3";
      directiveAudio.play();
    }, 2000);
  } else {
    $(".blank").addClass("hide");
    $(".screen1 .click_obj").addClass("scale");
    $(".screen1 .page_title").removeClass("hide");
  }
});

directive2Audio.addEventListener("ended", function () {
  if ($(".screen2 .click_obj.on").length == 2) {
    setTimeout(function () {
      playFeedback();
    }, 1000);
  } else {
    $(".blank").addClass("hide");
    $(".screen2 .click_obj").addClass("scale");
    $(".screen2 .ani_area").removeClass("on");
    $(".screen2 .page_title").removeClass("hide");
  }
});
