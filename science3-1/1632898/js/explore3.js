window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/explore3/directive.mp3");
  directiveAudio.play();

  qs(".content").classList.add("on");
  playGif(".ani");
  directiveAudio.addEventListener("ended", function () {
    autoNextPage(1000, "explore4.html");
  });
});
