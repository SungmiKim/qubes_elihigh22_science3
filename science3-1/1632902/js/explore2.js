let directiveAudio = new Audio("audio/explore2/directive.mp3");
let cameraAudio = new Audio("../common/sound/effect/camera.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
  playGif(".ani img");
});

directiveAudio.addEventListener("ended", function () {
  setTimeout(function () {
    cameraAudio.play();
    $(".blink").removeClass("hide");
    $(".container").addClass("on");
  }, 500);
});

cameraAudio.addEventListener("ended", function () {
  autoNextPage(2000, "explore3.html");
});
