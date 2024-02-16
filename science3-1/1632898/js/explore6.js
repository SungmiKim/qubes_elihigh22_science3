window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/explore6/directive.mp3");
  directiveAudio.play();

  playGif(".eo");
  qs(".obj_list").classList.add("on");

  directiveAudio.addEventListener("ended", function () {
    autoNextPage(1000, "explore7.html");
  });
});
