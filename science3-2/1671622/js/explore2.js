let directive1Audio = new Audio("audio/explore2/directive.mp3");
let popAudio = new Audio();
let sparkleAudio = new Audio("../common/sound/effect/sparkle.WAV");
let dripAudio = new Audio("../common/sound/effect/drip.WAV");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  playGuide();
  popWait();
  scale();
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".has_guide").addClass("hide");
    $(".click_obj").addClass("scale");
  }, 2000);
}

let target;
let num;
let zIndex;
$(".click_obj .obj").click(function () {
  clearTimeout(guide);

  zIndex = $(this).parent().siblings(".on");
  if (zIndex.length == 0) {
    $(this).parent().find(".line").css("z-index", "1");
  } else if (zIndex.length == 1) {
    $(this).parent().find(".line").css("z-index", "2");
  } else {
    $(this).parent().find(".line").css("z-index", "3");
  }

  $(".has_guide").addClass("hide");
  $(".click_obj").removeClass("scale");
  $(".blank").removeClass("hide");
  sparkleAudio.play();
  $(this).parent().addClass("on");

  num = $(this).parent().attr("data-name");
  if ($(this).parent().hasClass("c1")) {
    seqGif("#seqGif1");
    // penColor = "#ee6e5f";
  } else if ($(this).parent().hasClass("c2")) {
    seqGif("#seqGif2");
    // penColor = "#5625e3";
  } else {
    seqGif("#seqGif3");
    // penColor = "#ffb92e";
  }
  // target = document.querySelector(".click_obj.c" + num + " .move");
  // start();

  //drip효과음 타이밍 각각 다르게 들어간 상태
  if (num == 1 || num == 2) {
    setTimeout(function () {
      dripAudio.play();
    }, 8500);
    setTimeout(function () {
      openPop(num);
      setTimeout(function () {
        popAudio.src = "audio/explore2/pop" + num + ".mp3";
        popAudio.play();
      }, 1000);
    }, 9000);
  } else {
    setTimeout(function () {
      dripAudio.play();
    }, 7800);
    setTimeout(function () {
      openPop(num);
      setTimeout(function () {
        popAudio.src = "audio/explore2/pop" + num + ".mp3";
        popAudio.play();
      }, 1000);
    }, 8300);
  }
});

popAudio.addEventListener("ended", function () {
  setTimeout(function () {
    closePop(num);
    $(".blank").addClass("hide");
    $(".click_obj").addClass("scale");
    $(".click_obj[data-name=" + num + "]")
      .find(".line")
      .hide();
    // .css("opacity", "0.5");

    $(".mid .gif" + num).show();
    if (zIndex.length == 0) {
      $(".mid .gif" + num).css("z-index", "1");
    } else if (zIndex.length == 1) {
      $(".mid .gif" + num).css("z-index", "2");
    } else {
      $(".mid .gif" + num).css("z-index", "3");
    }

    $(".end .obj[data-name=" + num + "]").addClass("on");

    if ($(".end .obj.on").length == 3) {
      autoNextPage(2000, "explore3.html");
    }
  }, 1000);
});

// const canvas = document.querySelector(".drawing_canvas");
// canvas.width = canvas.getBoundingClientRect().width;
// canvas.height = canvas.getBoundingClientRect().height;

// if (window.innerWidth <= "1280") {
//   $(".drawing_canvas").css("margin-left", "40px");
// }

// let context = canvas.getContext("2d");

// let penColor;
// let penWidth = "20";
// let isDrawing = false;

// let interval;
// function start() {
//   context.beginPath();
//   context.moveTo(target.getBoundingClientRect().left + target.clientWidth / 2, target.getBoundingClientRect().top + target.clientHeight / 2);

//   interval = setInterval(draw, 100);
// }

// function draw() {
//   context.lineJoin = "round";
//   context.lineCap = "round";
//   context.globalCompositeOperation = "source-over";
//   context.strokeStyle = penColor;
//   context.lineWidth = penWidth;
//   context.lineTo(target.getBoundingClientRect().left + target.clientWidth / 2, target.getBoundingClientRect().top + target.clientHeight / 2);
//   context.stroke();
// }
