window.addEventListener("load", function () {
  let introAudio = new Audio("audio/summary1/intro.mp3");
  introAudio.play();
  // seq_init(119, 40);

  seqGap1();
  this.setTimeout(function () {
    // seqGap2();
  }, 2000);

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "summary2.html");
  });
});
