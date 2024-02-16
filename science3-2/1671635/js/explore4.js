window.addEventListener("load", function () {
  let introAudio = new Audio("audio/explore4/directive.mp3");
  introAudio.play();

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore5.html");
  });
});
