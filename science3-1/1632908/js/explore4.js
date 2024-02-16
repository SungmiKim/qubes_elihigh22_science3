let directiveAudio = new Audio("audio/explore4/directive.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();

  seqHaro0 = setInterval(playHaro, 50);

  setTimeout(function () {
    $(".img_wrap").attr("data-num", 2);
  }, 2000);
  setTimeout(function () {
    $(".img_wrap").attr("data-num", 3);
  }, 4000);
});

directiveAudio.addEventListener("ended", function () {
  autoNextPage(2000, "explore5.html");
});
