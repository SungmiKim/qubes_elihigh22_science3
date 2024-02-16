let directive1Audio = new Audio("audio/explore4/directive1.mp3");
let directive2Audio = new Audio("audio/explore4/directive2.mp3");
let commonClickAudio = new Audio("../common/sound/effect/click.mp3");

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
  num = $(this).attr("data-name");
  // console.log("클릭");

  if (num == 1) {
    answerAudio(true);
    $(".answer_box[data-name=" + num + "]").addClass("on");

    setTimeout(function () {
      directive2Audio.play();
    }, 1000);
  }
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    playFeedback();
  }, 2000);
});
