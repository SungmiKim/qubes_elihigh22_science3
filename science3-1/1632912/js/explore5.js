window.addEventListener("load", function () {
  let introAudio = new Audio("audio/explore5/directive1.mp3");
  introAudio.play();
  // seq_init(78, 40);

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore6.html");
  });
});
