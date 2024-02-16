let directiveAudio = new Audio("audio/explore2/directive.mp3");
let directive1Audio = new Audio();
let directive2Audio = new Audio();

let dripAudio = new Audio("audio/effect/drip.mp3");
let pouring = new Audio("audio/effect/water-pouring2.wav");

let drip;

window.addEventListener("load", function () {
  directiveAudio.play();

  drip = setInterval(function () {
    dripAudio.load();
  }, 5000);
});

directiveAudio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".click_obj").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

let num;

$(".click_obj").click(function () {
  dripAudio.play();
  clearInterval(drip);
  num = $(this).attr("data-num");

  clearTimeout(guide);
  $(".blank").removeClass("hide");
  $(".click_obj").removeClass("scale");
  $(".has_guide").addClass("hide");

  $(this).addClass("on");
  $(".click_obj:not(.on)").addClass("hide");
  setTimeout(function () {
    $(".page_title").addClass("hide");
    $(".click_obj.on").addClass("off");
    $(".ani_area, .ani_img").addClass("on");
    $(".ani_img").attr("data-num", num);
    directive1Audio.src = "audio/explore2/directive" + num + "_1.mp3";
    directive1Audio.play();
  }, 2000);
});

directive1Audio.addEventListener("ended", function () {
  seqGif("#seqGif" + num);

  setTimeout(function () {
    directive2Audio.src = "audio/explore2/directive" + num + "_2.mp3";
    directive2Audio.play();

    drip = setInterval(function () {
      dripAudio.load();
    }, 5000);
  }, 1000);
});

directive2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".blank").addClass("hide");
    $(".page_title").removeClass("hide");
    $(".click_obj").removeClass("hide");
    $(".click_obj, .ani_area, .ani_img").removeClass("on");
    $(".click_obj:not(.off)").addClass("scale");

    if ($(".click_obj.off").length == 2) {
      autoNextPage(2000, "explore3.html");
    }
  }, 2000);
});

$(".ani_area .point .ani img").each(function () {
  var target3 = this;
  var _target3 = $(this);
  var observer3 = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if (_target3.attr("src") == "./img/explore2/gif2/50.webp" || _target3.attr("src") == "./img/explore2/gif3/50.webp") {
        pouring.play();
      }
    });
  });

  var config3 = {
    attributes: true,
  };

  observer3.observe(target3, config3);
});
