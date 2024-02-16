let chicken1Audio = new Audio("audio/explore4/chicken1.mp3");
let chicken2Audio = new Audio("audio/explore4/chicken2.mp3");
let chicken3_1Audio = new Audio("audio/explore4/chicken3_1.mp3");
let chicken3_2Audio = new Audio("audio/explore4/chicken3_2.mp3");
let directive1Audio = new Audio("audio/explore4/directive1.mp3");
let directive1_1Audio = new Audio("audio/explore4/directive1_1.mp3");
let directive1_2Audio = new Audio("audio/explore4/directive1_2.mp3");
let directive2Audio = new Audio("audio/explore4/directive2.mp3");
let directive2_1Audio = new Audio("audio/explore4/directive2_1.mp3");
let directive3Audio = new Audio("audio/explore4/directive3.mp3");
let directive3_1Audio = new Audio("audio/explore4/directive3_1.mp3");
let directive3_2Audio = new Audio("audio/explore4/directive3_2.mp3");
let directive4Audio = new Audio("audio/explore4/directive4.mp3");
let chickAudio = new Audio("audio/chick.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  chicken1Audio.play();
  chickGif();
  chickAudio.play();
  setTimeout(function () {
    chickAudio.play();
  }, 2000);
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".screen1 .chickens li").addClass("scale");
    $(".has_guide").addClass("hide");
  }, 2000);
}

var cha313104 = 0;
function seqAni() {
  let randNum = Math.floor(Math.random() * 10000);
  console.log(num);
  var cut;
  var aniName;
  var screenNum;
  if (num === 1) {
    cut = 45;
    aniName = "chicken2_1";
    screenNum = 2;
  } else {
    cut = 38;
    aniName = "chicken3_1";
    screenNum = 3;
  }
  cha313104++;
  if (cha313104 > cut) {
    cha313104 = 0;
  } else {
    $(".screen" + screenNum + " .ani").attr("src", "./img/explore4/" + aniName + "/" + cha313104 + ".webp" + "?" + randNum);
  }
}

let num;
$(".screen1 .chickens li").click(function () {
  clearTimeout(guide);
  $(".screen1 .chickens li").removeClass("scale");
  $(".has_guide").addClass("hide");
  $(".blank").removeClass("hide");
  $(".page_title").addClass("hide");

  $(".screen1").addClass("hide");
  if ($(this).hasClass("c2")) {
    num = 1;
    $(".screen2").removeClass("hide");
    playAni = setInterval(seqAni, 100);
  } else if ($(this).hasClass("c3")) {
    num = 2;
    $(".screen3").removeClass("hide");
    playAni = setInterval(seqAni, 100);
  } else {
    num = 3;
    $(".screen4").removeClass("hide");
  }
  sparkleAudio.play();
});

sparkleAudio.addEventListener("ended", function () {
  if (num == 1) {
    directive1_1Audio.play();
  } else if (num == 2) {
    directive2_1Audio.play();
  } else {
    directive3_1Audio.play();
    // playGif(".screen4 .ani.a2");
    seqGif("#seqGif2");
  }
});

chicken1Audio.addEventListener("ended", function () {
  clearInterval(seqChickGif0);
  $(".page_title").removeClass("hide");
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
  stopGif(".screen1 .c2 img");
});

directive1_1Audio.addEventListener("ended", function () {
  directive1_2Audio.play();
});

directive1_2Audio.addEventListener("ended", function () {
  clearInterval(playAni);
  setTimeout(function () {
    $(".screen1").attr("data-num", 2).removeClass("hide");
    $(".screen:not(.screen1)").addClass("hide");
    $(".c2").addClass("off");
    $(".c3").removeClass("off");

    chicken2Audio.play();
    chickGif();
    playGif(".screen1 .c2 img");
    playGif(".screen1 .c3 img");
  }, 1000);
});

chicken2Audio.addEventListener("ended", function () {
  $(".page_title").removeClass("hide");
  directive2Audio.play();
  clearInterval(seqChickGif0);
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
  stopGif(".screen1 .c2 img");
  stopGif(".screen1 .c3 img");
});

directive2_1Audio.addEventListener("ended", function () {
  setTimeout(function () {
    clearInterval(playAni);
    $(".screen1").attr("data-num", 3).removeClass("hide");
    $(".screen:not(.screen1)").addClass("hide");
    $(".c3").addClass("off");
    $(".c1, .c4").removeClass("off");

    chicken3_1Audio.play();
    console.log("닭 시작");
    playGif(".screen1 .c2 img");
    playGif(".screen1 .c3 img");
    chickGif();
  }, 1000);
});

chicken3_1Audio.addEventListener("ended", function () {
  clearInterval(seqChickGif0);
  chicken3_2Audio.play();
  // playGif(".screen1 .c4 img");
  seqGif("#seqGif1");
});

chicken3_2Audio.addEventListener("ended", function () {
  $(".page_title").removeClass("hide");
  directive3Audio.play();
  // stopGif(".screen1 .c4 img");
  stopSeqGif("#seqGif1");
});

directive3Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();

  stopGif(".screen1 .c2 img");
  stopGif(".screen1 .c3 img");
});

directive3_1Audio.addEventListener("ended", function () {
  directive3_2Audio.play();
  // stopGif(".screen4 .ani.a2");
  stopSeqGif("#seqGif2");
  // playGif(".screen4 .ani.a1");
  seqGif("#seqGif3");
});

directive3_2Audio.addEventListener("ended", function () {
  setTimeout(function () {
    $(".screen1").attr("data-num", 4).removeClass("hide");
    stopSeqGif("#seqGif3");
    $(".screen:not(.screen1)").addClass("hide");
    $(".c1, .c4").addClass("off");

    directive4Audio.play();
    $(".screen1 .chickens li").removeClass("off");
    setTimeout(function () {
      $(".c5").addClass("scale");
    }, 2000);
    setTimeout(function () {
      $(".c5").removeClass("scale");
      $(".c2").addClass("scale");
      playGif(".screen1 .c2 img");
    }, 3800);
    setTimeout(function () {
      $(".c2").removeClass("scale");
      stopGif(".screen1 .c2 img");
      $(".c3").addClass("scale");
      playGif(".screen1 .c3 img");
    }, 5400);
    setTimeout(function () {
      $(".c3").removeClass("scale");
      stopGif(".screen1 .c3 img");
      $(".c1, .c4").addClass("scale");
      chickGif();
      // playGif(".screen1 .c4 img");
      seqGif("#seqGif1");
    }, 7200);
  }, 1000);
});

directive4Audio.addEventListener("ended", function () {
  $(".c1, .c4").removeClass("scale");
  clearInterval(seqChickGif0);
  // stopGif(".screen1 .c4 img");
  stopSeqGif("#seqGif1");
  autoNextPage(2000, "explore5.html");
});
