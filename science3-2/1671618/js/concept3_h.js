let directive1Audio = new Audio("audio/concept3_h/directive1.mp3");
let directive2Audio = new Audio("audio/concept3_h/directive2.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.WAV");

window.addEventListener("load", function () {
  directive1Audio.play();
});

directive1Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  popWait();
});

directive2Audio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".screen2 .click_obj").addClass("scale");
  popWait();
});

let result;

let sticker = false;
$(".sticker img").on("touchmove", function (e) {
  if (e.originalEvent.touches[0].pageX < $(".sticker .select_box").offset().left) {
    $(".drawing_controller .box_wrap.sticker ul").addClass("active");
    sticker = true;
  }
  if (e.originalEvent.touches[0].pageY < $(".sticker").offset().top) {
    $(".drawing_controller .box_wrap.sticker ul").addClass("active");
    sticker = true;
  }
});

const canvas = document.querySelector(".drawing_canvas");
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

let context = canvas.getContext("2d");

let penColor = "black";
let penWidth = "10";
let isDrawing = false;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.touches[0].clientX - canvas.getBoundingClientRect().left, event.touches[0].clientY - canvas.getBoundingClientRect().top);
  event.preventDefault();
  $(".select_btn, .select_box").removeClass("on");
  $(".drawing_controller .box_wrap.sticker ul").removeClass("active");
  if (mode == "eraser") {
    $(".eraser .select_btn").addClass("on");
  } else {
    $(".pen .select_btn").addClass("on");
  }
}

function draw(event) {
  if (isDrawing) {
    context.lineJoin = "round";
    context.lineCap = "round";
    if (mode == "eraser") {
      $(".eraser .select_btn").addClass("on");
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 60;
    } else {
      $(".pen .select_btn").addClass("on");
      $(".btn_wrap div").removeClass("off");
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = penColor;
      context.lineWidth = penWidth;
    }
    context.lineTo(event.touches[0].clientX - canvas.getBoundingClientRect().left, event.touches[0].clientY - canvas.getBoundingClientRect().top);
    context.stroke();
  }
}

function stop(event) {
  if (isDrawing) {
    isDrawing = false;
  }
}

$(".select_btn").click(function () {
  $(".select_btn").not($(this)).removeClass("on");
  $(".select_box").not($(this).next()).removeClass("on");
  if ($(this).parent().hasClass("paint")) {
    $(".paint .select_btn, .paint .select_box").toggleClass("on");
  } else if ($(this).parent().hasClass("pen")) {
    $(".pen .select_btn, .pen .select_box").toggleClass("on");
    mode = "pen";
  } else if ($(this).parent().hasClass("eraser")) {
    $(this).toggleClass("on");
  } else if ($(this).parent().hasClass("sticker")) {
    $(".sticker .select_btn, .sticker .select_box").toggleClass("on");
  }
  if ($(".select_btn.on").length == 0) {
    if (mode == "pen") {
      $(".pen .select_btn").addClass("on");
    } else {
      $(".eraser .select_btn").addClass("on");
    }
  }
});

$(".paint li").click(function () {
  $(".paint .select_btn, .paint .select_box, .paint li").removeClass("on");
  $(this).addClass("on");
  if (mode == "pen") {
    $(".pen .select_btn").addClass("on");
  } else {
    $(".eraser .select_btn").addClass("on");
  }
  $(".btn_wrap div").removeClass("off");
  $(".drawing_canvas").attr("style", $(this).find("span").attr("style"));
});

let mode = "pen";

$(".pen li").click(function () {
  $(".pen .select_box, .pen li").removeClass("on");
  $(this).addClass("on");
  mode = "pen";
  penColor = $(this).find("span").css("background-color");
});

$(".eraser").click(function () {
  mode = "eraser";
});

$(".sticker img").draggable({
  helper: function () {
    return $(this).clone().css("width", "auto");
  },
  revert: "invalid",
  revertDuration: 0,
  start: function (e, ui) {
    mode = "pen";
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = penColor;
    context.lineWidth = penWidth;
    // $(".drawing_controller .box_wrap.sticker ul").addClass("active");
  },
});

$(".drawing_canvas").droppable({
  drop: function (event, ui) {
    if (sticker == true) {
      context.drawImage(
        $(ui.helper).get(0),
        $(ui.helper).offset().left - $(canvas).offset().left,
        $(ui.helper).offset().top - $(canvas).offset().top,
        $(ui.helper).width(),
        $(ui.helper).height()
      );

      $(".btn_wrap div").removeClass("off");
      // $(".drawing_controller .box_wrap.sticker ul").removeClass("active");
      sticker = false;
    }
  },
});

$("html").droppable({
  drop: function (event, ui) {
    $(".drawing_controller .box_wrap.sticker ul").removeClass("active");
  },
});

$(".replay").click(function () {
  context.clearRect(0, 0, canvas.width, canvas.height);

  $(".drawing_canvas").attr("style", "background-color: #ffffff");
  $(".btn_wrap div").addClass("off");

  $(".select_btn, .select_box, .select_box li").removeClass("on");
  $(".pen .select_btn").addClass("on");
  $(".paint li").eq(0).addClass("on");
  $(".pen li").eq(6).addClass("on");
  mode = "pen";
  penColor = "#000000";
});

$(".complete").click(function () {
  $(".select_btn, .select_box, .select_box li").removeClass("on");
  sparkleAudio.play();
  $(".blank").removeClass("hide");
  $(".screen1 .top .ani_area .info").addClass("on");

  setTimeout(function () {
    $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
    $(".screen1").addClass("hide");
    $(".screen2").removeClass("hide");

    directive2Audio.play();
  }, 2000);
});

$("html").on("touchend", function () {
  $(".drawing_controller .box_wrap.sticker ul").removeClass("active");
});

$(".screen2 .click_obj").click(function () {
  $(".screen2 .click_obj").removeClass("scale");
  $(".blank").removeClass("hide");

  if ($(this).hasClass("c1")) {
    answerAudio(true);
    seqGif1("#seqGif1");
    seqGif("#seqGif2");
    $(".screen2 .click_wrap").addClass("on");

    setTimeout(function () {
      playFeedback();
    }, 2000);
  } else {
    answerAudio(false);
    seqGif("#seqGif2");

    setTimeout(function () {
      $(".screen2 .click_obj").addClass("scale");
      $(".screen2 .click_wrap").removeClass("off");
    }, 3000);
  }
});

//오답 모션 후 첫 이미지로 변경
$("#seqGif2 .gif").each(function () {
  var target = this;
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutations) {
      if ($("#seqGif2 .gif").attr("src") === "./img/concept3_h/gif3/60.webp" && !$(".click_wrap").hasClass("on")) {
        $("#seqGif2 .gif").attr("src", "./img/concept3_h/gif3/1.webp");
        setTimeout(function () {
          $(".click_obj").addClass("scale");
          $(".blank").addClass("hide");
        }, 500);
      }
    });
  });

  var config = {
    attributes: true,
  };

  observer.observe(target, config);
});

// gif동시에 재생시 한번만 재생되게 하도록
function seqGif1(name) {
  var seqCnt = 1;
  var getOption = $(name).attr("data-option");
  var option = getOption.split("//");
  var pageName = $("#wrap").attr("data-page");
  var fileName = option[0];
  var totalCut = option[1];
  var gifOp = option[2];
  var time = option[3];

  seqGif01 = setInterval(playSeqGif1, time);

  function playSeqGif1() {
    seqCnt++;
    // console.log("playSeqGif1");
    if (seqCnt > totalCut) {
      if (gifOp === "once") {
        clearInterval(seqGif01);
        setTimeout(function () {
          $(".quiz_cnt").removeClass("cnt1").addClass("cnt2");
          $(".screen1").addClass("hide");
          $(".screen2").removeClass("hide");
          directive(2);
        }, 1000);
      }
      seqCnt = 0;
    } else {
      $(name + " .gif").attr("src", "./img/" + pageName + "/" + fileName + "/" + seqCnt + ".webp");
    }
  }
}
