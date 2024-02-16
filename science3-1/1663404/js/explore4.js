let directiveAudio = new Audio("audio/explore4/directive1.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  directiveAudio.play();
});

directiveAudio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  popWait();
});

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
  },
});

$(".drawing_canvas").droppable({
  drop: function (event, ui) {
    if (sticker == true) {
      context.drawImage($(ui.helper).get(0), $(ui.helper).offset().left - $(canvas).offset().left, $(ui.helper).offset().top - $(canvas).offset().top, $(ui.helper).width(), $(ui.helper).height());

      $(".btn_wrap div").removeClass("off");
      $(".drawing_controller .box_wrap.sticker ul").removeClass("active");
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
  sparkleAudio.play();
  $(".select_btn, .select_box, .select_box li").removeClass("on");
  $(".blank").removeClass("hide");

  setTimeout(function () {
    playFeedback();
  }, 2000);
});

$("html").on("touchend", function () {
  $(".drawing_controller .box_wrap.sticker ul").removeClass("active");
});
