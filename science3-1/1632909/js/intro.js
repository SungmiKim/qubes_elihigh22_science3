let directiveAudio = new Audio();

window.addEventListener("load", function () {
  seqGif("#seqGif1");
  directiveAudio.src = "audio/intro/directive.mp3";
  setTimeout(function () {
    directiveAudio.play();
    $(".txt").addClass("on");
  }, 1000);

  directiveAudio.addEventListener("ended", function () {
    $(".btn_intro").fadeIn();
  });
});
