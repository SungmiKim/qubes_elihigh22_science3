window.addEventListener("load", function () {
  let introAudio = new Audio("audio/explore1/intro.mp3");
  introAudio.play();

  seqGap();

  introAudio.addEventListener("ended", function () {
    autoNextPage(3000, "explore2.html");
  });
});
