window.addEventListener("load", function () {
  let introAudio = new Audio("audio/explore1/intro.mp3");
  introAudio.play();

  seqGap1();

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore2.html");
  });
});
