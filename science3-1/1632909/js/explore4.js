let directiveAudio = new Audio("audio/explore4/directive.mp3");
let directive1Audio = new Audio("audio/explore4/directive1.mp3");
let directive2Audio = new Audio();
let directive3Audio = new Audio();
let magnetAudio = new Audio("audio/magnet.mp3");

window.addEventListener("load", function () {
  directiveAudio.play();
  setTimeout(function () {
    $(".paper_list").removeClass("hide");
  }, 1100);
});

directiveAudio.addEventListener("ended", function () {
  directive1Audio.play();
  $(".screen1 .page_title").removeClass("hide");
  $(".screen1").addClass("bg");
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".paper_list li").addClass("scale");
});

$(".paper_list li").click(function () {
  answerAudio(true);
  $(".blank").removeClass("hide");
  $(".paper_list li").removeClass("scale");
  $(this).addClass("on");
  let index = $(this).index() + 1;
  setTimeout(function () {
    $(".content").attr("data-num", index);
    $("#seqGif1 .gif").attr("src", "./img/explore4/ani" + index + "/1.webp");
    $("#seqGif1").attr("data-option", "ani" + index + "//30//once//50");
    $(".screen1").addClass("finish");
    seqGif("#seqGif1");
  }, 1000);
  setTimeout(function () {
    nextScreen(2);
  }, 4500);
});

let screen;
function nextScreen(num) {
  screen = num;
  $(".screen" + (num - 1)).addClass("hide");
  $(".screen" + num).removeClass("hide");
  setTimeout(function () {
    $(".screen" + num + " .hand_wrap").addClass("on");
  }, 1000);
  setTimeout(function () {
    $(".screen" + num + " .ani_magnet").addClass("on");
    if (num === 3) {
      setTimeout(function () {
        magnetAudio.play();
      }, 1300);
    }
  }, 2000);
  setTimeout(function () {
    $(".screen" + num + " .page_title").removeClass("hide");
    directive(num);
    console.log(num);
  }, 3500);
  setTimeout(function () {
    if (num === 2) {
      $(".screen" + num + " .magnet3").removeClass("hide");
    }
  }, 100);
}

function directive(num) {
  directive2Audio.src = "audio/explore4/directive" + num + "_1.mp3";
  directive2Audio.play();

  directive2Audio.addEventListener("ended", function () {
    $(".blank").addClass("hide");
    try {
      clearInterval(id0);
    } catch (error) {}
    playGuide();
    popWait();
    scale();
  });
}

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".click_magnet .cover").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

$(".click_magnet .cover").click(function () {
  answerAudio(true);
  clearTimeout(guide);
  $(".blank").removeClass("hide");
  $(".click_magnet .cover").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(this).addClass("hide");
  setTimeout(function () {
    directive3Audio.src = "audio/explore4/directive" + screen + "_2.mp3";
    directive3Audio.play();
  }, 2000);
});
$(".has_guide").click(function () {
  $(".screen" + screen + " .click_magnet .cover").click();
});

directive3Audio.addEventListener("ended", function () {
  setTimeout(function () {
    if (screen < 3) {
      $(".screen" + screen).addClass("hide");
      $(".screen" + (screen + 1)).removeClass("hide");
      nextScreen(screen + 1);
    } else {
      playFeedback();
    }
  }, 2000);
});
