window.addEventListener("load", function () {
  let introAudio = new Audio("audio/summary1/intro.mp3");
  introAudio.play();
  seqGap();

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "summary2.html");
  });
});
