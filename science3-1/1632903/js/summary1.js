window.addEventListener("load", function () {
  let introAudio = new Audio("audio/summary1/intro.mp3");
  introAudio.play();
  // playGif(".ani");

  introAudio.addEventListener("ended", function () {
    autoNextPage(3000, "summary2.html");
  });
});
