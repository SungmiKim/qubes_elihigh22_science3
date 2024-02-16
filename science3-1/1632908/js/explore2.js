window.addEventListener("load", function () {
  let introAudio = new Audio("audio/explore2/directive.mp3");
  introAudio.play();

  seqHaro0 = setInterval(playHaro, 50);

  setTimeout(function () {
    $(".img_wrap").attr("data-num", 2);
  }, 2500);

  introAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore3.html");
  });
});
