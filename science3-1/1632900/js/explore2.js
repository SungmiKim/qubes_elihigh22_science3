window.addEventListener("load", function () {
  let directiveAudio = new Audio("audio/explore2/directive.mp3");
  directiveAudio.play();

  $(".obj1").addClass("on");

  setTimeout(function () {
    $(".obj2").addClass("on");
  }, 1300);

  setTimeout(function () {
    $(".obj3").addClass("on");
  }, 2600);

  directiveAudio.addEventListener("ended", function () {
    autoNextPage(2000, "explore3.html");
  });
});
