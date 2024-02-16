let directiveAudio = new Audio("audio/explore2/directive.mp3");
let directive1Audio = new Audio();
let directive2Audio = new Audio();
let dripAudio = new Audio("../common/sound/effect/drip.WAV");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
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
  clearTimeout(guide);
  dripAudio.play();
  $(".click_obj").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(this).addClass("on");
  $(".click_obj:not(.on)").addClass("hide");

  num = $(this).attr("data-num");
  setTimeout(function () {
    $(".page_title").addClass("hide");
    $(".click_obj.on").addClass("off");
    $(".ani_area, .ani_img").addClass("on");
    $(".ani_img").attr("data-num", num);
    directive1Audio.src = "audio/explore2/directive" + num + "_1.mp3";
    directive1Audio.play();
  }, 2000);
});

directive1Audio.addEventListener("ended", function () {
  directive2Audio.src = "audio/explore2/directive" + num + "_2.mp3";
  directive2Audio.play();
  seqGif("#seqGif" + num);
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".page_title").removeClass("hide");
    $(".click_obj").removeClass("hide");
    $(".click_obj, .ani_area, .ani_img").removeClass("on");
    $(".click_obj:not(.off)").addClass("scale");
  }, 2000);

  if ($(".click_obj.off").length == 2) {
    autoNextPage(4000, "explore3.html");
  }
});
