let directive1Audio = new Audio("audio/explore3/directive1.mp3");
let directive2Audio = new Audio("audio/explore3/directive2.mp3");
let commonClickAudio = new Audio("../common/sound/effect/click.mp3");

let bellAudio = new Audio("audio/effect/bell.mp3");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".blank").addClass("hide");
    playGuide();
    popWait();
    scale();
  }, 300);
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".click_area").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

let num = 0;
$(".click_box").click(function () {
  clearTimeout(guide);
  $(".click_area").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".blank").removeClass("hide");
  $(".page_title").addClass("hide");

  $(".quiz_area").addClass("finish");
  num = $(this).attr("data-name");

  if (num == 1) {
    answerAudio(true);

    $(".answer_box[data-name=" + num + "]").addClass("on");

    setTimeout(function () {
      $(".answer_box .sound_wrap").addClass("on");
    }, 1200);
    setTimeout(function () {
      bellAudio.play();
    }, 1500);

    setTimeout(function () {
      directive2Audio.play();
    }, 8500);
  }
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    autoNextPage(2000, "explore4.html");
  }, 500);
});
