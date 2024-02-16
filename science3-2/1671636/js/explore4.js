let directive1Audio = new Audio("audio/explore4/directive.mp3");
let directive2Audio = new Audio();

let doAudio = new Audio("audio/effect/1_do.mp3");
let do2Audio = new Audio("audio/effect/8_do.mp3");

let dripAudio = new Audio("../common/sound/effect/drip.wav");

let drip;

window.addEventListener("load", function () {
  directive1Audio.play();

  drip = setInterval(function () {
    dripAudio.load();
  }, 5000);
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
  dripAudio.play();
  clearInterval(drip);

  num = $(this).attr("data-num");

  clearTimeout(guide);
  $(".blank").removeClass("hide");
  $(".click_obj").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".page_title").addClass("hide");

  $(this).addClass("off");

  $(".ani_area, .ani_img").addClass("on");
  $(".ani_img").attr("data-num", num);

  if (num == 1) {
    setTimeout(function () {
      doAudio.play();
    }, 1800);
    if ($(".point").hasClass("on1")) {
      $(".point").removeClass("on1");
      $(".point").addClass(" on2");
      seqGif("#seqGif2");
    } else {
      $(".point").addClass("on1");
      seqGif("#seqGif1");
    }
  } else {
    setTimeout(function () {
      do2Audio.play();
    }, 2000);
    if ($(".point").hasClass("on1")) {
      $(".point").removeClass("on1");
      $(".point").addClass(" on2");
      seqGif("#seqGif4");
    } else {
      $(".point").addClass("on1");
      seqGif("#seqGif3");
    }
  }

  setTimeout(function () {
    directive2Audio.src = "audio/explore4/directive" + num + ".mp3";
    directive2Audio.play();
  }, 3000);
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    drip = setInterval(function () {
      dripAudio.load();
    }, 5000);

    $(".blank").addClass("hide");
    $(".click_obj").removeClass("hide");
    $(".click_obj:not(.off)").addClass("scale");

    if ($(".click_obj.off").length == 2) {
      playFeedback();
    } else {
      $(".page_title").removeClass("hide");
      $(".ani_area, .ani_img").removeClass("on");
    }
  }, 2000);
});
