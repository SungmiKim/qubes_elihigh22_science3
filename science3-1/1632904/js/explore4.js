let directiveAudio = new Audio("audio/explore4/directive.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".click_wrap").addClass("on");
  $(".blank").addClass("hide");
  popWait();
  scale();
});

$(".click_obj").click(function () {
  sparkleAudio.play();
  $(".click_wrap").removeClass("on");
  $(".blank").removeClass("hide");

  var num = $(this).attr("data-num");

  sessionStorage.setItem("click_obj", num);

  setTimeout(function () {
    window.location.href = "explore5.html";
  }, 2000);
});
