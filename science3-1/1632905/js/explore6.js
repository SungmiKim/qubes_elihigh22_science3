let directive1Audio = new Audio("audio/explore6/directive1.mp3");
let directive2Audio = new Audio("audio/explore6/directive2.mp3");
let directive3Audio = new Audio("audio/explore6/directive3.mp3");
let frog1_1Audio = new Audio("audio/explore6/frog1_1.mp3");
let frog1_2Audio = new Audio("audio/explore6/frog1_2.mp3");
let frog2_1Audio = new Audio("audio/explore6/frog2_1.mp3");
let frog2_2Audio = new Audio("audio/explore6/frog2_2.mp3");
let frog3_1Audio = new Audio("audio/explore6/frog3_1.mp3");
let frog3_2Audio = new Audio("audio/explore6/frog3_2.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let frogAudio = new Audio("audio/frog.mp3");

var idx = 1;

var seqCntFrog = 1;
function playSeqGifFrog() {
  seqCntFrog++;
  if (seqCntFrog > 18) {
    seqCntFrog = 0;
  } else {
    $(".seqGif5 .gif").attr("src", "./img/explore6/frog/" + seqCntFrog + ".webp");
  }
}

function stopSeqGifFrog() {
  clearInterval(seqGifFrog);
  $(".seqGif5 .gif").attr("src", "./img/explore6/frog/1.webp");
}

function scale() {
  guide = setTimeout(function () {
    $(".screen .arrow").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);

  $(".blank").addClass("hide");
  playGuide();
  popWait();
}

var cha313106 = 0;
function seqAni() {
  let randNum = Math.floor(Math.random() * 10000);
  cha313106++;
  if (cha313106 > 28) {
    clearInterval(playAni);
    cha313106 = 0;
  } else {
    $(".screen3 .ani").attr("src", "./img/explore6/ani3_1/" + cha313106 + ".webp" + "?" + randNum);
  }
}

$(".screen .arrow").click(function () {
  sparkleAudio.play();
  clearTimeout(guide);
  $(".screen .arrow").removeClass("scale");
  $(this).addClass("hide");
  $(".has_guide").addClass("hide");
  $(".blank").removeClass("hide");

  // 첫번째 화살표 클릭 후
  if (idx === 1) {
    $(".page_title").addClass("hide");
    $(".content").attr("data-num", "2");
    idx++;
    $(".screen2").removeClass("op0");

    seqGifSec("#seqGif3");
    seqGifFrog = setInterval(playSeqGifFrog, 100);

    setTimeout(function () {
      frog2_1Audio.play();
    }, 1000);
  } else if (idx === 2) {
    $(".page_title").addClass("hide");
    $(".screen3").removeClass("op0");
    playAni = setInterval(seqAni, 100);
    setTimeout(function () {
      frog3_1Audio.play();
      $(".screen3 .op0").removeClass("op0");
      seqGif("#seqGif1");
      playGif(".screen3 .ani3_3");
    }, 3000);
  }
});

$(".has_guide").click(function () {
  clearTimeout(guide);
  $(".screen .arrow.a" + idx).click();
});

window.addEventListener("load", function () {
  frog1_1Audio.play();
  seqGifSec("#seqGif4");
  setTimeout(function () {
    clearInterval(seqGifSec0);
    $(".screen1 .frog").addClass("on");
    $(".screen1 .ani1_1").addClass("op0");
  }, 9000);
});

frog1_1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".screen1 .frog").addClass("play");
    $(".screen1 .egg").removeClass("scale");
    setTimeout(function () {
      frog1_2Audio.play();
      $(".screen1 .ani2").addClass("on");
      $(".screen1 .frog.play").addClass("hide");
      seqGifFrog = setInterval(playSeqGifFrog, 100);
    }, 2000);
  }, 1000);
});

frog1_2Audio.addEventListener("ended", function () {
  stopSeqGifFrog();

  setTimeout(function () {
    directive1Audio.play();
    $(".page_title").removeClass("hide");
    $(".screen1 .arrow.a1").removeClass("hide");
  }, 1000);
});

directive1Audio.addEventListener("ended", function () {
  scale();
});

frog2_1Audio.addEventListener("ended", function () {
  frog2_2Audio.play();
});
frog2_2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    stopSeqGifFrog();
    clearInterval(seqGifSec0);
    directive2Audio.play();
    $(".page_title").removeClass("hide");
    $(".screen2 .arrow.a2").removeClass("hide");
  }, 1000);
});

directive2Audio.addEventListener("ended", function () {
  scale();
});

frog3_1Audio.addEventListener("ended", function () {
  frogAudio.play();
});

frogAudio.addEventListener("ended", function () {
  frog3_2Audio.play();
});
frog3_2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    window.location.href = "explore7.html";
  }, 1000);
});
