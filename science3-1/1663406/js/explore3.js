window.addEventListener("load", function () {
  let introAudio = new Audio("audio/explore3/directive.mp3");
  introAudio.play();
  // playGif(".ani");

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore4.html");
  });
});
