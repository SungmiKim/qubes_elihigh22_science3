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
    if (num === ".s1") {
      $(".select_wrap").addClass("fix");
    } else {
      $(".select_wrap").removeClass("fix");
    }
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
  chat(".chat2", 4000);
  selectWrap(".s1", 10000);
});

$(".s1 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s1").removeClass("on");
  chat(".chat3-" + s);
  chat(".chat4", 2000);
  chat(".chat5", 4000);
  selectWrap(".s2", 6000);
});

$(".s2 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s2").removeClass("on");
  chat(".chat6-" + s);
  chat(".chat7-" + s, 2000);
  chat(".chat8", 6000);
  chat(".chat9", 10000);
  chat(".chat10", 12000);
  selectWrap(".s3", 14000);
});

$(".s3 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s3").removeClass("on");
  chat(".chat11-" + s);
  chat(".chat12-" + s, 2000);
  chat(".chat13:not(.ing)", 5000);
  chat(".chat13.ing", 12000);
  chat(".chat14", 14000);
  selectWrap(".s4", 16000);
});

$(".s4 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s4").removeClass("on");
  chat(".chat15-" + s);
  chat(".chat16-" + s, 2000);
  if (s == 0) {
    chat(".chat17", 4000);
    chat(".chat18", 6000);
    chat(".chat19", 8000);
    selectWrap(".s5", 10000);
  } else {
    chat(".chat17", 6000);
    chat(".chat18", 8000);
    chat(".chat19", 10000);
    selectWrap(".s5", 12000);
  }
});

$(".s5 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s5").removeClass("on");
  chat(".chat20-" + s);
  chat(".chat21-" + s + ":not(.ing)", 2000);
  chat(".chat21-" + s + ".ing", 4000);
  if (s == 0) {
    chat(".chat22", 14000);
    selectWrap(".s6", 18000);
  } else {
    chat(".chat22", 14000);
    selectWrap(".s6", 18000);
  }
});

var animal;
$(".s6 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s6").removeClass("on");
  chat(".chat23-" + s);
  if (s == 0) {
    animal = "rabbit";
    chat(".chat24.rabbit:not(.ing)", 2000);
    chat(".chat24.rabbit.ing:eq(0)", 4000);
    chat(".chat24.rabbit.ing:eq(1)", 6000);
    selectWrap(".s7.rabbit", 10000);
  } else {
    animal = "cat";
    chat(".chat24.cat:not(.ing)", 2000);
    chat(".chat24.cat.ing:eq(0)", 4000);
    chat(".chat24.cat.ing:eq(1)", 6000);
    selectWrap(".s7.cat", 10000);
  }
});

$(".s7 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s7").removeClass("on");
  if (s == 0) {
    chat(".chat25-" + s);
  } else {
    chat(".chat25-" + s + "." + animal);
  }
  chat(".chat26." + animal + ":not(.ing)", 2000);
  chat(".chat26." + animal + ".ing", 4000);
  selectWrap(".s8", 9000);
});

$(".s8 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s8").removeClass("on");
  chat(".chat27-" + s);
  chat(".chat28", 2000);
  chat(".chat29", 5000);
  chat(".chat30", 8000);
  selectWrap(".s9", 10000);
});

$(".s9 li").click(function () {
  var s = $(this).index();
  $(".chat_area, .s9").removeClass("on");
  chat(".chat31-" + s);

  setTimeout(function () {
    playFeedback();
  }, 2000);
});
