window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/explore8/directive.mp3");
  directiveAudio.play();

  playGif(".ani_img.bg");
  playGif(".ani_img.eo");

  directiveAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore9.html");
  });
});
