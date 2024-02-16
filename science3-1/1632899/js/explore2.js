$(".pop_card .close").click(function () {
  var idx = $(this).attr("data-num");
  console.log(idx);
  closePop(idx);
});

let directive1Audio = new Audio("audio/explore2/directive1.mp3");
let directive2Audio = new Audio("audio/explore2/directive2.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");
let talkAudio = new Audio("audio/explore2/talk.mp3");

window.addEventListener("load", function () {
  playGuide();

  popWait();

  qs(".start").addEventListener("click", function () {
    sparkleAudio.play();
    $(".blank").removeClass("hide");
    qs(".screen1").classList.add("hide");
    qs(".screen2").classList.remove("hide");
    directive1Audio.play();

    directive1Audio.addEventListener("ended", function () {
      $(".blank").addClass("hide");
      $(".cover").addClass("off");
      $(".screen2 .cha_list").addClass("on");
    });
  });

  scale();
});

var guide;
function scale() {
  guide = setTimeout(function () {
    $(".has_guide").addClass("hide");
    qs(".screen1 .start").classList.add("on");
  }, 2500);
}

var video = document.getElementById("camera--view");
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.srcObject = stream;
    video.play();
  });
}

let canvas, dataURL;
$("#picStartBtn").click(function () {
  sparkleAudio.play();
  video.pause();
  $(".screen2").addClass("hide");
  $(".screen3").removeClass("hide");
  $(".profile").addClass("pic").removeClass("img");
  $(".blank").removeClass("hide");

  canvas = document.querySelector("canvas");
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  dataURL = 1;

  directive2Audio.play();
});

$(".cha_list li img").click(function () {
  sparkleAudio.play();
  $(".screen2").addClass("hide");
  $(".screen3").removeClass("hide");
  $(".profile").addClass("img").removeClass("pic");
  $(".profile img").attr("src", $(this).attr("src"));
  $(".blank").removeClass("hide");

  dataURL = $(this).attr("src");

  directive2Audio.play();
});

$(".btn_reply").click(function () {
  sparkleAudio.play();
  video.play();
  $(".screen3").addClass("hide");
  $(".screen2").removeClass("hide");
  $(".btn_wrap").removeClass("on");
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen3 .btn_wrap").addClass("on");
});

let today = new Date();

function chat(num, sec) {
  setTimeout(function () {
    $(num).removeClass("hide");
    today = new Date();
    $(num + " .time").text(today.toLocaleTimeString([], { timeStyle: "short" }));
    talkAudio.play();
    $(".chat_area").scrollTop($(".chat_area")[0].scrollHeight);
  }, sec);
}

function selectWrap(num, sec) {
  setTimeout(function () {
    $(".chat_area, " + num).addClass("on");
    $(".chat_area").scrollTop($(".chat_area")[0].scrollHeight);
  }, sec);
}

$(".btn_finish").click(function () {
  if (dataURL == 1) {
    $(".screen4 .chat_area .chat.user .left").append("<div class='img'></div>").addClass("pic");
    $(".screen4 .chat_area .chat.user .left .img").css("background-image", "url(" + canvas.toDataURL() + ")");
  } else {
    $(".screen4 .chat_area .chat.user .left").css("background-image", "url(" + dataURL + ")");
  }
  sparkleAudio.play();
  $(".screen3").addClass("hide");
  $(".screen4").removeClass("hide");
  sparkleAudio.play();

  chat(".chat1", 1000);
  chat(".chat2", 4500);
  chat(".chat3", 9000);
  selectWrap(".s1", 12500);
});

$(".s1 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s1").removeClass("on");
  chat(".chat4-" + s);
  if (s == 0) {
    chat(".chat5-" + s, 2000);
    chat(".chat6:not(.ing)", 4000);
    chat(".chat6.ing", 8000);
    chat(".chat7", 11000);
    selectWrap(".s2", 16000);
  } else {
    chat(".chat5-" + s + ":not(.ing)", 2000);
    chat(".chat5-" + s + ".ing", 4000);
    chat(".chat6:not(.ing)", 8000);
    chat(".chat6.ing", 12000);
    chat(".chat7", 14000);
    selectWrap(".s2", 20000);
  }
});

$(".s2 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s2").removeClass("on");
  chat(".chat8-" + s);
  if (s == 2) {
    chat(".chat9-1:not(.ing)", 2000);
    chat(".chat9.ing", 4000);
    chat(".chat10", 6000);
    selectWrap(".s3", 8000);
  } else {
    chat(".chat9-0", 2000);
    chat(".chat9.ing", 6500);
    chat(".chat10", 8500);
    selectWrap(".s3", 10500);
  }
});

$(".s3 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s3").removeClass("on");
  chat(".chat11-" + s);
  chat(".chat12-" + s, 2000);
  if (s == 0) {
    chat(".chat13", 4000);
    chat(".chat14:not(.ing)", 8000);
    chat(".chat14.ing", 10000);
    selectWrap(".s4", 12000);
  } else {
    chat(".chat13", 7000);
    chat(".chat14:not(.ing)", 11000);
    chat(".chat14.ing", 13000);
    selectWrap(".s4", 15000);
  }
});

$(".s4 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s4").removeClass("on");
  chat(".chat15-" + s);
  chat(".chat16-" + s, 2000);
  if (s == 0) {
    chat(".chat17:eq(0)", 5000);
    chat(".chat17:eq(1)", 12500);
    chat(".chat17:eq(2)", 14500);
    selectWrap(".s5", 16500);
  } else {
    chat(".chat17:eq(0)", 4000);
    chat(".chat17:eq(1)", 11500);
    chat(".chat17:eq(2)", 13500);
    selectWrap(".s5", 15500);
  }
});

$(".s5 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s5").removeClass("on");
  chat(".chat18-" + s);
  if (s == 0) {
    chat(".chat19-0.haro", 2000);
    chat(".chat19-0.eo", 5500);
    chat(".chat20", 9000);
    selectWrap(".s6", 14000);
  } else {
    chat(".chat19-1", 2000);
    chat(".chat20", 5000);
    selectWrap(".s6", 10000);
  }
});

$(".s6 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s6").removeClass("on");
  chat(".chat21-" + s);
  chat(".chat22", 2000);
  chat(".chat23", 4000);
  chat(".chat24", 10000);
  chat(".chat25", 12000);
  selectWrap(".s7", 14000);
});

$(".s7 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s7").removeClass("on");
  chat(".chat26-" + s);

  setTimeout(function () {
    playFeedback();
  }, 2000);
});
